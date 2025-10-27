"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/header"
import CountrySidebar from "@/components/country-sidebar"

const GlobeViewer = dynamic(() => import("@/components/globe-viewer"), {
  loading: () => <div className="flex-1 bg-black" />,
  ssr: false,
})

const CountryDetail = dynamic(() => import("@/components/country-detail"), {
  loading: () => (
    <div className="flex-1 bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  ),
  ssr: false,
})

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
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden relative" role="main">
        {/* Globe Viewer - Always mounted, hidden when video player is active */}
        <div
          className={`flex-1 relative min-w-0 ${selectedCountry && selectedChannel ? "hidden" : ""}`}
          role="region"
          aria-label="Interactive globe viewer"
        >
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <GlobeViewer selectedCountry={selectedCountry} onCountryClick={handleGlobeCountryClick} />
          </Suspense>
        </div>

        {/* Video Player - Only shown when both country and channel are selected */}
        {selectedCountry && selectedChannel && (
          <div className="flex-1 relative min-w-0" role="region" aria-label="Video player">
            <Suspense
              fallback={
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-white">Loading...</div>
                </div>
              }
            >
              <CountryDetail
                country={selectedCountry}
                channel={selectedChannel}
                onBack={() => {
                  setSelectedCountry(null)
                  setSelectedChannel(null)
                }}
              />
            </Suspense>
          </div>
        )}

        {/* Country Sidebar - Responsive */}
        <div
          className={`fixed lg:static inset-y-0 right-0 z-40 w-full sm:w-96 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
          role="complementary"
          aria-label="Country and channel selection sidebar"
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
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            role="presentation"
            aria-hidden="true"
          />
        )}
      </main>
    </div>
  )
}
