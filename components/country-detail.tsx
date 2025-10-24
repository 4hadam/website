"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { getChannelsByCountry } from "@/lib/youtube-channels"

interface CountryDetailProps {
  country: string
  channel: string
  onBack: () => void
}

export default function CountryDetail({ country, channel, onBack }: CountryDetailProps) {
  const [streamUrl, setStreamUrl] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [channelLogo, setChannelLogo] = useState<string>("")

  useEffect(() => {
    setLoading(true)
    setError("")
    setIsPlaying(false)

    const fetchChannels = async () => {
      try {
        const channels = await getChannelsByCountry(country)
        console.log(`[v0] Fetched ${channels.length} channels for ${country}`)

        const selectedChannel = channels.find((c) => c.name === channel)
        console.log(`[v0] Selected channel:`, selectedChannel)

        if (selectedChannel && selectedChannel.url) {
          const url = selectedChannel.url.trim()
          if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("rtmp://")) {
            setStreamUrl(url)
            setChannelLogo(selectedChannel.logo || "")
            setIsPlaying(true)
          } else {
            setError("Invalid stream URL format")
          }
        } else {
          setError("Stream not found in database")
        }
      } catch (err) {
        setError("Failed to load stream")
        console.error("[v0] Error loading stream:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchChannels()
  }, [country, channel])

  return (
    <div className="w-full h-full bg-black flex items-center justify-center relative p-4 sm:p-8">
      {/* Video Player Window */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={onBack}
                className="p-2 bg-lime-500 hover:bg-lime-600 rounded-lg transition-colors flex-shrink-0 shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-white truncate">{country}</h2>
                <p className="text-xs sm:text-sm text-slate-400 truncate">{channel}</p>
              </div>
            </div>
            <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Video Player */}
          <div className="bg-black aspect-video flex items-center justify-center relative w-full">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" />
                <div className="text-slate-500 text-sm">Loading stream...</div>
              </div>
            ) : error ? (
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <div className="text-red-400 mb-2 text-sm font-medium">Stream Error</div>
                <p className="text-xs text-slate-600 max-w-xs">{error}</p>
              </div>
            ) : streamUrl && isPlaying ? (
              <video
                key={streamUrl}
                className="w-full h-full"
                controls
                autoPlay
                muted
                onError={() => {
                  setError("Failed to load video stream. The stream may be offline or unavailable.")
                  setIsPlaying(false)
                }}
              >
                <source src={streamUrl} type="application/x-mpegURL" />
                <source src={streamUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-center">
                <div className="text-slate-500 mb-4 text-sm">Stream not available</div>
                <p className="text-xs text-slate-600">This channel stream is not currently available</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>LIVE</span>
            </div>
            <div className="hidden sm:block">{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
