'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'

interface FileEntry {
  file: File
  preview: string
  altText: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  progress: number
  error?: string
  id?: string
}

function cleanFilenameToAlt(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^.]+$/, '')
  const cleaned = nameWithoutExt.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

const BulkUploadView: React.FC = () => {
  const [files, setFiles] = useState<FileEntry[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // PERF-12: keep a ref in sync with the latest `files` so the unmount
  // cleanup can revoke every object URL that wasn't manually removed.
  const filesRef = useRef<FileEntry[]>([])
  useEffect(() => {
    filesRef.current = files
  }, [files])
  useEffect(() => {
    return () => {
      for (const entry of filesRef.current) {
        URL.revokeObjectURL(entry.preview)
      }
    }
  }, [])

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const imageFiles = Array.from(newFiles).filter((f) => f.type.startsWith('image/'))
    const tooLarge = imageFiles.filter((f) => f.size > MAX_FILE_SIZE)
    if (tooLarge.length > 0) {
      alert(
        `${tooLarge.length} Datei(en) ueberschreiten das Limit von 10 MB und wurden nicht hinzugefuegt:\n${tooLarge.map((f) => `${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`).join('\n')}`,
      )
    }
    const entries: FileEntry[] = imageFiles
      .filter((f) => f.size <= MAX_FILE_SIZE)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        altText: cleanFilenameToAlt(file.name),
        status: 'pending' as const,
        progress: 0,
      }))
    setFiles((prev) => [...prev, ...entries])
    setUploadComplete(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
      }
    },
    [addFiles],
  )

  const updateAltText = useCallback((index: number, value: string) => {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, altText: value } : f)))
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const removed = prev[index]
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const uploadAll = useCallback(async () => {
    setIsUploading(true)
    setUploadComplete(false)

    for (let i = 0; i < files.length; i++) {
      const entry = files[i]
      if (entry.status === 'done') continue

      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading', progress: 30 } : f)),
      )

      try {
        const formData = new FormData()
        formData.append('file', entry.file)
        formData.append('alt', entry.altText)

        const response = await fetch('/api/media', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData?.message || `HTTP ${response.status}`)
        }

        const data = await response.json()

        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: 'done', progress: 100, id: data.doc?.id || data.id } : f,
          ),
        )
      } catch (err) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? { ...f, status: 'error', progress: 0, error: (err as Error).message }
              : f,
          ),
        )
      }
    }

    setIsUploading(false)
    setUploadComplete(true)
  }, [files])

  const successCount = files.filter((f) => f.status === 'done').length
  const pendingCount = files.filter((f) => f.status === 'pending' || f.status === 'error').length

  return (
    <div style={{ padding: '40px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        Massen-Upload
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Mehrere Bilder gleichzeitig hochladen. Alt-Texte werden automatisch aus dem Dateinamen
        erzeugt.
      </p>

      {/* Drop Zone */}
      <label
        htmlFor="bulk-upload-input"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        style={{
          display: 'block',
          border: `2px dashed ${isDragging ? '#2563eb' : '#d1d5db'}`,
          borderRadius: '12px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? '#eff6ff' : '#f9fafb',
          transition: 'all 0.2s',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>
          {isDragging ? '\u{1F4E5}' : '\u{1F5BC}\uFE0F'}
        </div>
        <p style={{ fontSize: '16px', fontWeight: 500 }}>
          Bilder hierher ziehen oder klicken zum Auswaehlen
        </p>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
          PNG, JPEG, WebP, SVG, GIF
        </p>
        <input
          id="bulk-upload-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </label>

      {/* File List */}
      {files.length > 0 && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {files.map((entry, index) => (
              <div
                key={`${entry.file.name}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: entry.status === 'done' ? '#f0fdf4' : entry.status === 'error' ? '#fef2f2' : '#fff',
                }}
              >
                {/* Thumbnail */}
                <img
                  src={entry.preview}
                  alt={entry.altText}
                  style={{
                    width: '64px',
                    height: '64px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    flexShrink: 0,
                  }}
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.file.name}
                  </p>
                  <input
                    type="text"
                    value={entry.altText}
                    onChange={(e) => updateAltText(index, e.target.value)}
                    placeholder="Alt-Text eingeben"
                    disabled={entry.status === 'done' || entry.status === 'uploading'}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {entry.status === 'error' && (
                    <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                      Fehler: {entry.error}
                    </p>
                  )}
                </div>

                {/* Progress / Status */}
                <div style={{ width: '80px', textAlign: 'center', flexShrink: 0 }}>
                  {entry.status === 'pending' && (
                    <span style={{ color: '#9ca3af', fontSize: '13px' }}>Bereit</span>
                  )}
                  {entry.status === 'uploading' && (
                    <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px' }}>
                      <div
                        style={{
                          width: `${entry.progress}%`,
                          height: '100%',
                          backgroundColor: '#2563eb',
                          borderRadius: '3px',
                          transition: 'width 0.3s',
                        }}
                      />
                    </div>
                  )}
                  {entry.status === 'done' && (
                    <span style={{ color: '#16a34a', fontSize: '13px', fontWeight: 500 }}>
                      Fertig
                    </span>
                  )}
                  {entry.status === 'error' && (
                    <span style={{ color: '#dc2626', fontSize: '13px' }}>Fehler</span>
                  )}
                </div>

                {/* Remove Button */}
                {entry.status !== 'uploading' && entry.status !== 'done' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#9ca3af',
                      flexShrink: 0,
                    }}
                    title="Entfernen"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={uploadAll}
              disabled={isUploading || pendingCount === 0}
              style={{
                padding: '10px 24px',
                backgroundColor: isUploading || pendingCount === 0 ? '#9ca3af' : '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: isUploading || pendingCount === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {isUploading ? 'Wird hochgeladen...' : `${pendingCount} Datei(en) hochladen`}
            </button>

            {uploadComplete && successCount > 0 && (
              <span style={{ color: '#16a34a', fontSize: '14px' }}>
                {successCount} von {files.length} erfolgreich hochgeladen
              </span>
            )}
          </div>

          {/* Success Links */}
          {uploadComplete && successCount > 0 && (
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
              }}
            >
              <p style={{ fontWeight: 500, marginBottom: '8px' }}>
                Erfolgreich hochgeladen:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {files
                  .filter((f) => f.status === 'done' && f.id)
                  .map((f, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      <a
                        href={`/admin/collections/media/${f.id}`}
                        style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '14px' }}
                      >
                        {f.file.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BulkUploadView
