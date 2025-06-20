'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, TrendingUp, BookOpen } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/detection',
      label: 'Fire Detection',
      icon: MapPin,
      description: 'Real-time fire detection and reporting'
    },
    {
      href: '/prediction',
      label: 'Fire Prediction',
      icon: TrendingUp,
      description: 'AI-powered fire risk prediction'
    },
    {
      href: '/education',
      label: 'Impact Education',
      icon: BookOpen,
      description: 'Learn about stubble burning impacts'
    }
  ]

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-fire-red" />
              <span className="font-bold text-xl text-gray-900">
                Fire Guard
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-fire-red text-fire-red'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  title={item.description}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}