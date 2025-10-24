"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, ChevronLeft, X } from "lucide-react"
import { getChannelsByCountry } from "@/lib/youtube-channels"
import { COUNTRY_CODE_MAP } from "@/lib/country-codes"
import type { YouTubeChannel } from "@/lib/youtube-channels"

interface CountrySidebarProps {
  selectedCountry: string | null
  onSelectCountry: (country: string) => void
  onSelectChannel: (channel: string) => void
  onClose?: () => void
}

const COUNTRIES = Object.keys(COUNTRY_CODE_MAP)

export default function CountrySidebar({
  selectedCountry,
  onSelectCountry,
  onSelectChannel,
  onClose,
}: CountrySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showingChannels, setShowingChannels] = useState(false)
  const [channels, setChannels] = useState<YouTubeChannel[]>([])
  const [loadingChannels, setLoadingChannels] = useState(false)

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((country) => country.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  useEffect(() => {
    if (selectedCountry && showingChannels) {
      setLoadingChannels(true)
      const fetchChannels = async () => {
        try {
          const fetchedChannels = await getChannelsByCountry(selectedCountry)
          setChannels(fetchedChannels)
        } catch (error) {
          console.error("[v0] Error fetching channels:", error)
          setChannels([])
        } finally {
          setLoadingChannels(false)
        }
      }
      fetchChannels()
    }
  }, [selectedCountry, showingChannels])

  const handleSelectCountry = (country: string) => {
    onSelectCountry(country)
    setShowingChannels(true)
  }

  const handleSelectChannel = (channel: YouTubeChannel) => {
    onSelectChannel(channel.name)
    onClose?.()
  }

  const handleBack = () => {
    setShowingChannels(false)
    onSelectCountry(null)
    setChannels([])
  }

  return (
    <div className="w-full h-full bg-slate-900/80 border-l border-slate-700 flex flex-col mt-16 lg:mt-0">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
        {showingChannels && selectedCountry ? (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button onClick={handleBack} className="p-1 hover:bg-slate-700 rounded transition-colors flex-shrink-0">
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
            </button>
            <h2 className="text-base font-medium text-white truncate">{selectedCountry}</h2>
          </div>
        ) : (
          <h2 className="text-base font-medium text-white">Select a Country</h2>
        )}
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded transition-colors flex-shrink-0 lg:hidden">
          <X className="w-4 h-4 text-slate-400" />
        </button>
        <div className="text-xs sm:text-sm text-slate-400 hidden sm:block flex-shrink-0">
          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Search - only show when not showing channels */}
      {!showingChannels && (
        <div className="px-4 sm:px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>
      )}

      {/* Countries List or Channels List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {showingChannels && selectedCountry ? (
          loadingChannels ? (
            <div className="px-4 sm:px-6 py-8 text-center text-slate-400 text-sm">Loading streams...</div>
          ) : channels.length > 0 ? (
            channels.map((channel) => (
              <div
                key={channel.name}
                onClick={() => handleSelectChannel(channel)}
                className="px-4 sm:px-6 py-3 cursor-pointer transition-colors border-l-2 border-l-transparent hover:bg-slate-800/30 hover:border-l-cyan-400"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {channel.logo ? (
                    <img
                      src={channel.logo || "/placeholder.svg"}
                      alt={channel.name}
                      className="w-4 h-4 rounded flex-shrink-0 object-cover"
                    />
                  ) : (
                    <div className="w-4 h-4 bg-red-500 rounded flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm truncate">{channel.name}</h3>
                  </div>
                  {channel.category && <span className="text-xs text-slate-500 flex-shrink-0">{channel.category}</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 sm:px-6 py-8 text-center text-slate-400 text-sm">
              No streams available for this country
            </div>
          )
        ) : (
          filteredCountries.map((country) => (
            <div
              key={country}
              onClick={() => handleSelectCountry(country)}
              className={`px-4 sm:px-6 py-3 cursor-pointer transition-colors border-l-2 ${
                selectedCountry === country
                  ? "bg-slate-800/60 border-l-cyan-400"
                  : "border-l-transparent hover:bg-slate-800/30"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex-shrink-0"
                  style={{
                    backgroundImage: `url('https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${COUNTRY_CODE_MAP[country]}.svg')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: "20px",
                    height: "15px",
                  }}
                />
                <h3 className="font-medium text-white text-sm truncate">{country}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-slate-700 text-xs text-slate-500 text-center flex-shrink-0">
        {showingChannels && selectedCountry
          ? `${channels.length} streams available`
          : `${filteredCountries.length} countries available`}
      </div>
    </div>
  )
}
