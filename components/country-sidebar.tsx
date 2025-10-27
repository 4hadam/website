"use client"

import { useState, useMemo, useEffect, memo } from "react"
import { useQuery } from "@apollo/client/react"
import { Search, ChevronLeft, X } from "lucide-react"
import { GET_ALL_COUNTRIES } from "@/lib/graphql-queries"
import { getChannelsByCountry, getAllCountries } from "@/lib/youtube-channels"
import { COUNTRY_CODE_MAP } from "@/lib/country-codes"
import type { YouTubeChannel } from "@/lib/youtube-channels"

interface CountrySidebarProps {
  selectedCountry: string | null
  onSelectCountry: (country: string) => void
  onSelectChannel: (channel: string) => void
  onClose?: () => void
}

const CountrySidebar = memo(function CountrySidebar({
  selectedCountry,
  onSelectCountry,
  onSelectChannel,
  onClose,
}: CountrySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showingChannels, setShowingChannels] = useState(false)
  const [channels, setChannels] = useState<YouTubeChannel[]>([])
  const [loadingChannels, setLoadingChannels] = useState(false)
  const [countries, setCountries] = useState<string[]>([])
  const [loadingCountries, setLoadingCountries] = useState(true)

  const {
    data: graphqlCountries,
    loading: graphqlLoading,
    error: graphqlError,
  } = useQuery(GET_ALL_COUNTRIES, {
    errorPolicy: "all",
  })

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true)
      try {
        // Try GraphQL data first
        if (graphqlCountries?.countries?.nodes && !graphqlError) {
          const countryNames = graphqlCountries.countries.nodes.map((c: any) => c.title)
          setCountries(countryNames)
          console.log("[v0] Loaded countries from GraphQL")
        } else {
          // Fallback to local data
          const fetchedCountries = await getAllCountries()
          setCountries(fetchedCountries)
          console.log("[v0] Loaded countries from local data")
        }
      } catch (error) {
        console.error("[v0] Error fetching countries:", error)
        setCountries([])
      } finally {
        setLoadingCountries(false)
      }
    }
    fetchCountries()
  }, [graphqlCountries, graphqlError])

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => country.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, countries])

  useEffect(() => {
    if (selectedCountry && !showingChannels) {
      setShowingChannels(true)
    }
  }, [selectedCountry, showingChannels])

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
    <div className="w-full h-full bg-slate-950 border-l border-slate-800 flex flex-col mt-16 lg:mt-0 shadow-2xl">
      <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 border-b border-slate-800 flex justify-between items-center flex-shrink-0 gap-3 bg-gradient-to-r from-slate-900 to-slate-950">
        {showingChannels && selectedCountry ? (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={handleBack}
              className="p-1.5 hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-all duration-300 ease-in-out flex-shrink-0"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold text-white truncate">{selectedCountry}</h2>
          </div>
        ) : (
          <h2 className="text-base sm:text-lg font-semibold text-white">Select a Country</h2>
        )}
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-all duration-300 ease-in-out flex-shrink-0 lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {!showingChannels && (
        <div className="px-4 sm:px-5 md:px-6 py-4 border-b border-slate-800 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 ease-in-out"
              aria-label="Search countries"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto min-h-0">
        {showingChannels && selectedCountry ? (
          loadingChannels ? (
            <div className="px-4 sm:px-5 md:px-6 py-12 text-center text-slate-400 text-sm">Loading streams...</div>
          ) : channels.length > 0 ? (
            <ul className="list-none divide-y divide-slate-800">
              {channels.map((channel) => (
                <li key={channel.name}>
                  <button
                    onClick={() => handleSelectChannel(channel)}
                    className="w-full px-4 sm:px-5 md:px-6 py-3.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-900/50 active:bg-slate-900 text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {channel.logo ? (
                        <img
                          src={channel.logo || "/placeholder.svg"}
                          alt={channel.name}
                          className="w-8 h-8 rounded-md flex-shrink-0 object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md flex-shrink-0 shadow-lg" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm group-hover:text-cyan-400 transition-all duration-300 ease-in-out truncate">
                          {channel.name}
                        </h3>
                        {channel.category && <p className="text-xs text-slate-500 truncate">{channel.category}</p>}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 sm:px-5 md:px-6 py-12 text-center text-slate-400 text-sm">
              No streams available for this country
            </div>
          )
        ) : loadingCountries || graphqlLoading ? (
          <div className="px-4 sm:px-5 md:px-6 py-12 text-center text-slate-400 text-sm">Loading countries...</div>
        ) : (
          <ul className="list-none divide-y divide-slate-800">
            {filteredCountries.map((country) => (
              <li key={country}>
                <button
                  onClick={() => handleSelectCountry(country)}
                  className={`w-full px-4 sm:px-5 md:px-6 py-3.5 cursor-pointer transition-all duration-300 ease-in-out text-left group ${
                    selectedCountry === country ? "bg-slate-900/80" : "hover:bg-slate-900/50 active:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex-shrink-0 rounded-md overflow-hidden shadow-lg"
                      style={{
                        backgroundImage: `url('https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${COUNTRY_CODE_MAP[country]}.svg')`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "28px",
                        height: "21px",
                      }}
                      aria-label={`Flag of ${country}`}
                    />
                    <h3
                      className={`font-medium text-sm truncate transition-all duration-300 ease-in-out ${
                        selectedCountry === country ? "text-cyan-400" : "text-white group-hover:text-cyan-400"
                      }`}
                    >
                      {country}
                    </h3>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-4 sm:px-5 md:px-6 py-3 border-t border-slate-800 text-xs text-slate-500 text-center flex-shrink-0 bg-gradient-to-r from-slate-950 to-slate-900">
        {showingChannels && selectedCountry
          ? `${channels.length} stream${channels.length !== 1 ? "s" : ""} available`
          : `${filteredCountries.length} countr${filteredCountries.length !== 1 ? "ies" : "y"} available`}
      </div>
    </div>
  )
})

export default CountrySidebar
