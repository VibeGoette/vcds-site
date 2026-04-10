import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

/**
 * Auto-Update Version Check API
 *
 * GET /api/update?channel=stable
 * GET /api/update?channel=beta
 * GET /api/update?channel=stable&current=25.3.1
 *
 * Returns the latest version info for the given channel.
 * VCDS software can poll this endpoint to check for updates.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const channel = searchParams.get('channel') ?? 'stable'
  const currentVersion = searchParams.get('current') ?? null

  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'downloads',
      where: {
        and: [
          { isActive: { equals: true } },
          { category: { equals: 'vcds' } },
          { 'autoUpdate.isLatest': { equals: true } },
          { 'autoUpdate.channel': { equals: channel } },
        ],
      },
      sort: '-releaseDate',
      limit: 1,
    })

    if (docs.length === 0) {
      return NextResponse.json({
        updateAvailable: false,
        channel,
        message: 'Keine Updates verfügbar.',
      })
    }

    const latest = docs[0]

    // Resolve download URL
    let downloadUrl = ''
    if (latest.downloadSource === 'upload' && latest.downloadFile && typeof latest.downloadFile === 'object' && 'url' in latest.downloadFile) {
      downloadUrl = (latest.downloadFile as { url: string }).url
    } else {
      downloadUrl = latest.downloadUrl ?? ''
    }

    // Check if current version needs update
    const updateAvailable = currentVersion ? currentVersion !== latest.version : true

    // Check minimum version requirement
    let canUpdate = true
    if (currentVersion && latest.autoUpdate?.minVersion) {
      canUpdate = compareVersions(currentVersion, latest.autoUpdate.minVersion) >= 0
    }

    return NextResponse.json({
      updateAvailable,
      canUpdate,
      channel,
      latest: {
        version: latest.version,
        dataDate: latest.dataDate ?? null,
        releaseDate: latest.releaseDate ?? null,
        downloadUrl,
        fileSize: latest.fileSize ?? null,
        checksum: latest.checksum ?? null,
        releaseNotes: latest.autoUpdate?.releaseNotes ?? null,
        isMandatory: latest.autoUpdate?.isMandatory ?? false,
        minVersion: latest.autoUpdate?.minVersion ?? null,
        systemRequirements: latest.systemRequirements ?? null,
      },
    })
  } catch (err) {
    console.error('[Update] Version-Check fehlgeschlagen:', err)
    return NextResponse.json(
      { error: 'Update-Check fehlgeschlagen.' },
      { status: 500 }
    )
  }
}

/**
 * Simple numeric version comparison: returns -1, 0, or 1.
 *
 * PERF-15: pre-release suffixes (e.g. '25.3.1-beta.1') are truncated before
 * parsing so they don't produce NaN components. The comparison is purely
 * numeric on the major.minor.patch segments — pre-release ordering is NOT
 * honoured. Good enough for VCDS's min-version gate; switch to `semver` if
 * full SemVer precedence is ever needed.
 *
 * Non-numeric garbage in any segment (e.g. "25.x.1") is coerced to 0 via the
 * Number.isFinite guard, matching how the rest of the route treats invalid
 * data as "no update available" rather than crashing.
 */
function compareVersions(a: string, b: string): number {
  const parse = (v: string): number[] =>
    v.split('-')[0]
      .split('.')
      .map((segment) => {
        const n = Number(segment)
        return Number.isFinite(n) ? n : 0
      })
  const pa = parse(a)
  const pb = parse(b)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const na = pa[i] ?? 0
    const nb = pb[i] ?? 0
    if (na > nb) return 1
    if (na < nb) return -1
  }
  return 0
}
