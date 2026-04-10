import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { compareVersions } from '@/lib/compare-versions'

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

// compareVersions moved to src/lib/compare-versions.ts: Next.js 15 forbids
// named exports other than HTTP method handlers in API route files, and
// keeping it here as a local function blocks unit tests. Import at the top.
