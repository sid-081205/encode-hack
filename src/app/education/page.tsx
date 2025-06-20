'use client'

import { useState } from 'react'
import { EnvironmentalImpact } from '@/components/Education/EnvironmentalImpact'
import { HealthImpact } from '@/components/Education/HealthImpact'
import { EconomicImpact } from '@/components/Education/EconomicImpact'
import { Solutions } from '@/components/Education/Solutions'
import { PolicySection } from '@/components/Education/PolicySection'
import { Statistics } from '@/components/Education/Statistics'
import { Leaf, Heart, DollarSign, Lightbulb, FileText, BarChart3 } from 'lucide-react'

type Section = 'overview' | 'environmental' | 'health' | 'economic' | 'solutions' | 'policy'

export default function EducationPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview')

  const sections = [
    {
      id: 'overview' as const,
      title: 'Overview',
      icon: BarChart3,
      description: 'Key statistics and facts'
    },
    {
      id: 'environmental' as const,
      title: 'Environmental Impact',
      icon: Leaf,
      description: 'Air quality and climate effects'
    },
    {
      id: 'health' as const,
      title: 'Health Impact',
      icon: Heart,
      description: 'Effects on human health'
    },
    {
      id: 'economic' as const,
      title: 'Economic Impact',
      icon: DollarSign,
      description: 'Financial costs and losses'
    },
    {
      id: 'solutions' as const,
      title: 'Solutions',
      icon: Lightbulb,
      description: 'Alternative practices'
    },
    {
      id: 'policy' as const,
      title: 'Policies',
      icon: FileText,
      description: 'Government regulations'
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Statistics />
      case 'environmental':
        return <EnvironmentalImpact />
      case 'health':
        return <HealthImpact />
      case 'economic':
        return <EconomicImpact />
      case 'solutions':
        return <Solutions />
      case 'policy':
        return <PolicySection />
      default:
        return <Statistics />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Understanding Stubble Burning Impact
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn about the environmental, health, and economic impacts of stubble burning, 
              and explore sustainable alternatives for agricultural waste management.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
              <h2 className="font-semibold text-gray-900 mb-4">Topics</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {section.description}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}