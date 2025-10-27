"use client"

import { useState, useEffect, memo } from "react"
import { AlertCircle, ChevronLeft, X } from "lucide-react"
import { getChannelsByCountry } from "@/lib/youtube-channels"

interface CountryDetailProps {
  country: string
  channel: string
  onBack: () => void
}

const CountryDetail = memo(function CountryDetail({ country, channel, onBack }: CountryDetailProps) {
  const [streamUrl, setStreamUrl] = useState<string>("")
  const [backupUrls, setBackupUrls] = useState<string[]>([]) // Added backup URLs state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0) // Track which URL is being used

  useEffect(() => {
    setLoading(true)
    setError("")
    setIsPlaying(false)
    setCurrentUrlIndex(0)

    const fetchChannels = async () => {
      try {
        const channels = await getChannelsByCountry(country)
        const selectedChannel = channels.find((c) => c.name === channel)

        if (selectedChannel && selectedChannel.url) {
          const url = selectedChannel.url.trim()

          if (url.endsWith(".m3u8") || url.endsWith(".mpd") || url.startsWith("http")) {
            setStreamUrl(url)
            setBackupUrls(selectedChannel.urls || [])
            setIsPlaying(true)
          } else {
            setError("Invalid stream URL format")
          }
        } else {
          setError("Stream not found in database")
        }
      } catch (err) {
        setError("Failed to load stream")
        console.error("Error loading stream:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchChannels()
  }, [country, channel])

  const handleStreamError = () => {
    if (backupUrls.length > currentUrlIndex) {
      const nextUrl = backupUrls[currentUrlIndex]
      setStreamUrl(nextUrl)
      setCurrentUrlIndex(currentUrlIndex + 1)
    } else {
      setError("All stream sources failed. Please try again later.")
    }
  }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center relative p-1 sm:p-2 md:p-4 lg:p-8">
      {/* Video Player Window */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
              <button
                onClick={onBack}
                className="p-2 sm:p-2.5 bg-lime-500 hover:bg-lime-600 active:bg-lime-700 rounded-lg transition-colors flex-shrink-0 shadow-lg"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">{country}</h2>
                <p className="text-xs sm:text-sm text-slate-400 truncate">{channel}</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="p-2 sm:p-2.5 hover:bg-slate-700 active:bg-slate-600 rounded transition-colors flex-shrink-0"
              aria-label="Close player"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
            </button>
          </div>

          {/* Video Player */}
          <div className="bg-black aspect-video flex items-center justify-center relative w-full">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-cyan-400 mx-auto mb-3 sm:mb-4" />
                <div className="text-slate-500 text-xs sm:text-sm">Loading stream...</div>
              </div>
            ) : error ? (
              <div className="text-center px-4">
                <AlertCircle className="w-8 sm:w-12 h-8 sm:h-12 text-red-400 mx-auto mb-3 sm:mb-4" />
                <div className="text-red-400 mb-2 text-xs sm:text-sm font-medium">Stream Error</div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xs">{error}</p>
              </div>
            ) : streamUrl && isPlaying ? (
              <video
                key={streamUrl}
                className="w-full h-full"
                controls
                autoPlay
                crossOrigin="anonymous"
                onError={handleStreamError}
              >
                <source
                  src={streamUrl}
                  type={streamUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "application/dash+xml"}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-center">
                <div className="text-slate-500 mb-3 sm:mb-4 text-xs sm:text-sm">Stream not available</div>
                <p className="text-xs sm:text-sm text-slate-600">This channel stream is not currently available</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-800 px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between text-xs sm:text-sm text-slate-400 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>LIVE</span>
            </div>
            <div className="hidden sm:block text-xs">{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CountryDetail
