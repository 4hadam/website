"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import GlobeViewer from "@/components/globe-viewer"
import CountrySidebar from "@/components/country-sidebar"
import CountryDetail from "@/components/country-detail"

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleGlobeCountryClick = (countryName: string) => {
    setSelectedCountry(countryName)
    setSidebarOpen(true)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Globe Viewer or Video Player */}
        <div className="flex-1 relative min-w-0">
          {!(selectedCountry && selectedChannel) && (
            <GlobeViewer selectedCountry={selectedCountry} onCountryClick={handleGlobeCountryClick} />
          )}

          {selectedCountry && selectedChannel && (
            <CountryDetail
              country={selectedCountry}
              channel={selectedChannel}
              onBack={() => {
                setSelectedChannel(null)
              }}
            />
          )}
        </div>

        {/* Country Sidebar - Responsive */}
        <div
          className={`fixed lg:static inset-y-0 right-0 z-40 w-full sm:w-96 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          <CountrySidebar
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            onSelectChannel={setSelectedChannel}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </div>
  )
}
