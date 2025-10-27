"use client"

import { useEffect, useRef, useMemo, memo } from "react"

interface GlobeViewerProps {
  selectedCountry: string | null
  onCountryClick?: (countryName: string) => void
}

const GlobeViewer = memo(function GlobeViewer({ selectedCountry, onCountryClick }: GlobeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const hoveredPolygonRef = useRef<any>(null)
  const polygonsDataRef = useRef<any>(null)

  const getPolygonColor = useMemo(
    () => (d: any) => {
      const countryName = d.properties?.ADMIN || ""
      if (countryName === selectedCountry) {
        return "rgba(255, 0, 0, 0.8)"
      }
      if (d === hoveredPolygonRef.current) {
        return "rgba(100, 200, 255, 0.7)"
      }
      const hash = countryName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const hue = (hash * 137.5) % 360
      return `hsl(${hue}, 70%, 50%)`
    },
    [selectedCountry],
  )

  useEffect(() => {
    if (!containerRef.current) return

    const initGlobe = async () => {
      const Globe = (await import("globe.gl")).default

      const globe = Globe()
        .globeImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg")
        .backgroundImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png")
        .showAtmosphere(true)
        .atmosphereColor("#ffffff")
        .atmosphereAltitude(0.15)(containerRef.current)

      globeRef.current = globe

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson",
        )

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const geojsonData = await response.json()
        polygonsDataRef.current = geojsonData.features

        globe
          .polygonsData(geojsonData.features)
          .polygonGeoJsonGeometry((d: any) => d.geometry)
          .polygonCapColor((d: any) => getPolygonColor(d))
          .polygonSideColor(() => "rgba(100, 100, 100, 0.3)")
          .polygonStrokeColor(() => "rgba(200, 200, 200, 0.4)")
          .polygonLabel((d: any) => d.properties?.ADMIN || "")
          .onPolygonHover((hoverD: any) => {
            hoveredPolygonRef.current = hoverD
            if (globeRef.current) {
              globeRef.current.polygonCapColor(getPolygonColor)
            }
          })
          .onPolygonClick((clickedD: any) => {
            const countryName = clickedD.properties?.ADMIN || ""
            if (countryName && onCountryClick) {
              onCountryClick(countryName)
            }
          })

        globe.controls().autoRotate = false
      } catch (error) {
        console.error("Error loading countries data:", error)
      }
    }

    initGlobe()

    const handleResize = () => {
      if (!containerRef.current || !globeRef.current) return
      globeRef.current.width(containerRef.current.clientWidth).height(containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!globeRef.current || !polygonsDataRef.current) return
    globeRef.current.polygonCapColor(getPolygonColor)
  }, [selectedCountry, getPolygonColor])

  return <div ref={containerRef} className="w-full h-full" aria-label="Interactive globe viewer" />
})

export default GlobeViewer
