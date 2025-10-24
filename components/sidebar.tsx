"use client"

import { useState } from "react"
import { ChevronDown, Globe, Bookmark } from "lucide-react"

const countries = [
  { name: "Afghanistan", flag: "🇦🇫", region: "Asia" },
  { name: "Albania", flag: "🇦🇱", region: "Europe" },
  { name: "Algeria", flag: "🇩🇿", region: "Africa" },
  { name: "Andorra", flag: "🇦🇩", region: "Europe" },
  { name: "Angola", flag: "🇦🇴", region: "Africa" },
  { name: "Argentina", flag: "🇦🇷", region: "South America" },
  { name: "Armenia", flag: "🇦🇲", region: "Asia" },
  { name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { name: "Austria", flag: "🇦🇹", region: "Europe" },
  { name: "Azerbaijan", flag: "🇦🇿", region: "Asia" },
  { name: "Bahamas", flag: "🇧🇸", region: "North America" },
  { name: "Bahrain", flag: "🇧🇭", region: "Middle East" },
  { name: "Bangladesh", flag: "🇧🇩", region: "Asia" },
  { name: "Barbados", flag: "🇧🇧", region: "North America" },
  { name: "Belarus", flag: "🇧🇾", region: "Europe" },
]

export function Sidebar() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [expandedRegion, setExpandedRegion] = useState<string | null>("Asia")
  const [favorites, setFavorites] = useState<string[]>([])

  const regions = Array.from(new Set(countries.map((c) => c.region)))
  const groupedCountries = regions.reduce(
    (acc, region) => {
      acc[region] = countries.filter((c) => c.region === region)
      return acc
    },
    {} as Record<string, typeof countries>,
  )

  const toggleFavorite = (countryName: string) => {
    setFavorites((prev) =>
      prev.includes(countryName) ? prev.filter((c) => c !== countryName) : [...prev, countryName],
    )
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto hidden lg:block">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-sm font-semibold text-sidebar-foreground mb-2 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Countries
          </h2>
          <p className="text-xs text-sidebar-foreground/60">Select a country to explore</p>
        </div>

        {/* Regions */}
        <div className="space-y-3">
          {regions.map((region) => (
            <div key={region}>
              <button
                onClick={() => setExpandedRegion(expandedRegion === region ? null : region)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors text-sidebar-foreground text-sm font-medium"
              >
                <span>{region}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedRegion === region ? "rotate-180" : ""}`}
                />
              </button>

              {/* Countries in region */}
              {expandedRegion === region && (
                <div className="mt-2 ml-2 space-y-1 border-l border-sidebar-border/50 pl-3">
                  {groupedCountries[region].map((country) => (
                    <button
                      key={country.name}
                      onClick={() => setSelectedCountry(country.name)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                        selectedCountry === country.name
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "hover:bg-sidebar-accent/30 text-sidebar-foreground"
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1 text-left">{country.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(country.name)
                        }}
                        className={`p-1 rounded transition-colors ${
                          favorites.includes(country.name)
                            ? "text-accent"
                            : "text-sidebar-foreground/40 hover:text-sidebar-foreground"
                        }`}
                      >
                        <Bookmark
                          className="w-3 h-3"
                          fill={favorites.includes(country.name) ? "currentColor" : "none"}
                        />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Favorites section */}
        {favorites.length > 0 && (
          <div className="pt-4 border-t border-sidebar-border">
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 mb-3 uppercase tracking-wider">
              Favorites ({favorites.length})
            </h3>
            <div className="space-y-1">
              {countries
                .filter((c) => favorites.includes(c.name))
                .map((country) => (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country.name)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent/30 transition-colors text-sm text-sidebar-foreground"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="flex-1 text-left">{country.name}</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
