"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"

export function WorldMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>("asia")
  const [isAnimating, setIsAnimating] = useState(true)

  const regions = [
    {
      id: "north-america",
      name: "North America",
      description: "Movies, Music & Entertainment",
      color: "from-pink-500 to-purple-500",
      position: "top-1/4 left-1/4",
      content: "Hollywood blockbusters and pop culture",
    },
    {
      id: "south-america",
      name: "South America",
      description: "Music & Culture",
      color: "from-purple-500 to-pink-500",
      position: "bottom-1/4 left-1/3",
      content: "Latin rhythms and vibrant culture",
    },
    {
      id: "europe",
      name: "Europe",
      description: "Cinema & Arts",
      color: "from-cyan-500 to-blue-500",
      position: "top-1/3 left-1/2",
      content: "European cinema and fine arts",
    },
    {
      id: "africa",
      name: "Africa",
      description: "Music & Storytelling",
      color: "from-yellow-500 to-orange-500",
      position: "center",
      content: "African music and traditional stories",
    },
    {
      id: "middle-east",
      name: "Middle East",
      description: "Cinema & Drama",
      color: "from-orange-500 to-red-500",
      position: "top-1/3 right-1/4",
      content: "Middle Eastern cinema and drama",
    },
    {
      id: "asia",
      name: "Asia",
      description: "Film & Technology",
      color: "from-green-500 to-cyan-500",
      position: "top-1/4 right-1/4",
      content: "Asian cinema and tech innovation",
    },
    {
      id: "oceania",
      name: "Oceania",
      description: "Entertainment & Nature",
      color: "from-blue-500 to-purple-500",
      position: "bottom-1/3 right-1/4",
      content: "Oceania entertainment and nature docs",
    },
  ]

  const selectedRegionData = regions.find((r) => r.id === selectedRegion)

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isAnimating ? "Pause" : "Play"}
        </button>
      </div>

      {/* Main map container */}
      <div className="relative w-full aspect-video bg-gradient-to-b from-background via-background to-primary/5 rounded-2xl border border-border overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5" />
          {isAnimating && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          )}
        </div>

        {/* Regions grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-96">
            {regions.map((region) => (
              <button
                key={region.id}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => setSelectedRegion(region.id)}
                className={`absolute w-24 h-24 rounded-xl transition-all duration-300 transform flex items-center justify-center flex-col gap-1 ${
                  selectedRegion === region.id
                    ? "scale-125 shadow-2xl ring-2 ring-accent"
                    : hoveredRegion === region.id
                      ? "scale-110 shadow-lg"
                      : "hover:scale-105"
                } bg-gradient-to-br ${region.color} opacity-80 hover:opacity-100`}
                style={{
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
              >
                <span className="text-xs font-bold text-white text-center px-1 leading-tight">
                  {region.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-white/80 text-center px-1">{region.description.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {(hoveredRegion || selectedRegion) && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground whitespace-nowrap shadow-lg">
            <p className="font-semibold">{regions.find((r) => r.id === (hoveredRegion || selectedRegion))?.name}</p>
            <p className="text-xs text-muted-foreground">
              {regions.find((r) => r.id === (hoveredRegion || selectedRegion))?.description}
            </p>
          </div>
        )}
      </div>

      {/* Region details */}
      {selectedRegionData && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedRegionData.color} opacity-80`} />
            <div>
              <h3 className="text-xl font-bold text-foreground">{selectedRegionData.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedRegionData.description}</p>
            </div>
          </div>
          <p className="text-foreground/80">{selectedRegionData.content}</p>
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Explore {selectedRegionData.name}
          </button>
        </div>
      )}
    </div>
  )
}
