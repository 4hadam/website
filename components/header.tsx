"use client"

import { Menu, Search, Share2, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  onMenuClick?: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
    onMenuClick?.()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-slate-800 h-16">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 h-full">
        {/* Logo and Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={handleMenuClick} className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-lime-400 text-black font-bold px-2 py-1 rounded text-xs sm:text-sm">TV</div>
            <span className="text-white font-semibold text-sm sm:text-base">garden</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors hidden sm:block">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export { Header }
export default Header
