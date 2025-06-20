import { DollarSign, TrendingDown, Building2, Users, Plane, Factory } from 'lucide-react'

export function EconomicImpact() {
  const economicSectors = [
    {
      sector: 'Healthcare',
      impact: '₹12,000 crores',
      description: 'Increased medical costs and hospital admissions',
      icon: Building2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      breakdown: [
        'Emergency treatments: ₹5,000 crores',
        'Medication costs: ₹3,500 crores',
        'Long-term care: ₹2,500 crores',
        'Preventive measures: ₹1,000 crores'
      ]
    },
    {
      sector: 'Agriculture',
      impact: '₹8,500 crores',
      description: 'Soil degradation and reduced crop yields',
      icon: Factory,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      breakdown: [
        'Soil fertility loss: ₹3,500 crores',
        'Increased fertilizer costs: ₹2,500 crores',
        'Reduced crop quality: ₹1,800 crores',
        'Water management: ₹700 crores'
      ]
    },
    {
      sector: 'Transportation',
      impact: '₹4,200 crores',
      description: 'Flight delays, accidents, and transport disruptions',
      icon: Plane,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      breakdown: [
        'Aviation delays: ₹2,000 crores',
        'Road accidents: ₹1,200 crores',
        'Railway disruptions: ₹600 crores',
        'Logistics costs: ₹400 crores'
      ]
    },
    {
      sector: 'Productivity',
      impact: '₹5,800 crores',
      description: 'Reduced workforce productivity and absenteeism',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      breakdown: [
        'Sick leave costs: ₹2,500 crores',
        'Reduced efficiency: ₹2,000 crores',
        'Early retirements: ₹800 crores',
        'Training replacements: ₹500 crores'
      ]
    }
  ]

  const costComparison = [
    {
      practice: 'Stubble Burning',
      immediate: '₹0',
      longTerm: '₹30,500 crores',
      environmental: 'Severe',
      health: 'Critical'
    },
    {
      practice: 'Happy Seeder',
      immediate: '₹8,000/hectare',
      longTerm: '₹2,000 crores savings',
      environmental: 'Positive',
      health: 'Safe'
    },
    {
      practice: 'Biomass Management',
      immediate: '₹5,000/hectare',
      longTerm: '₹5,000 crores revenue',
      environmental: 'Positive',
      health: 'Safe'
    },
    {
      practice: 'Composting',
      immediate: '₹3,000/hectare',
      longTerm: '₹1,500 crores savings',
      environmental: 'Positive',
      health: 'Safe'
    }
  ]

  const regionalImpact = [
    { state: 'Punjab', impact: '₹18,500 crores', population: '30M', gdpImpact: '2.1%' },
    { state: 'Haryana', impact: '₹7,800 crores', population: '25M', gdpImpact: '1.8%' },
    { state: 'Delhi NCR', impact: '₹4,200 crores', population: '30M', gdpImpact: '0.9%' }
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Economic Impact</h2>
        <p className="text-gray-600">
          Stubble burning imposes massive economic costs across healthcare, agriculture, transportation, and productivity sectors
        </p>
      </div>

      {/* Total Economic Impact */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
        <div className="text-center">
          <div className="text-4xl font-bold text-red-700 mb-2">₹30,500 Crores</div>
          <div className="text-lg text-gray-700 mb-4">Total Annual Economic Impact</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">0.15%</div>
              <div className="text-sm text-gray-600">of India&apos;s GDP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">50M+</div>
              <div className="text-sm text-gray-600">People affected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">3 States</div>
              <div className="text-sm text-gray-600">Primary impact regions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Economic Sectors Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {economicSectors.map((sector, index) => {
          const Icon = sector.icon
          return (
            <div key={index} className={`${sector.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`h-6 w-6 ${sector.color}`} />
                <h3 className="font-semibold text-gray-900">{sector.sector}</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{sector.impact}</div>
              <p className="text-gray-700 mb-4">{sector.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Cost Breakdown:</h4>
                {sector.breakdown.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Regional Economic Impact */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Regional Economic Impact Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">State/Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Impact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Population</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">GDP Impact</th>
              </tr>
            </thead>
            <tbody>
              {regionalImpact.map((region, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{region.state}</td>
                  <td className="py-3 px-4 text-red-600 font-semibold">{region.impact}</td>
                  <td className="py-3 px-4 text-gray-600">{region.population}</td>
                  <td className="py-3 px-4 text-gray-600">{region.gdpImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cost-Benefit Analysis: Alternatives vs. Burning
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Practice</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Immediate Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Long-term Impact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Environment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Health</th>
              </tr>
            </thead>
            <tbody>
              {costComparison.map((practice, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{practice.practice}</td>
                  <td className="py-3 px-4 text-gray-600">{practice.immediate}</td>
                  <td className="py-3 px-4">
                    <span className={index === 0 ? 'text-red-600' : 'text-green-600'}>
                      {practice.longTerm}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      practice.environmental === 'Severe' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {practice.environmental}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      practice.health === 'Critical' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {practice.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hidden Costs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Hidden Costs of Burning
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Loss of soil nutrients worth ₹5,000/hectare annually</li>
            <li>• Increased fertilizer costs by ₹3,000/hectare</li>
            <li>• Reduced property values in affected areas</li>
            <li>• Tourism losses during pollution season</li>
            <li>• Infrastructure maintenance costs</li>
            <li>• Insurance premium increases</li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Economic Benefits of Alternatives
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Biomass revenue: ₹8,000-12,000/hectare</li>
            <li>• Improved soil health saves ₹4,000/hectare</li>
            <li>• Reduced healthcare spending</li>
            <li>• Job creation in rural areas</li>
            <li>• Carbon credit opportunities</li>
            <li>• Sustainable agriculture premium</li>
          </ul>
        </div>
      </div>

      {/* Investment Opportunity */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Investment Opportunity in Solutions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">₹15,000 Cr</div>
            <div className="text-sm text-gray-600 mt-1">Required investment in alternatives</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">₹45,000 Cr</div>
            <div className="text-sm text-gray-600 mt-1">Potential savings over 10 years</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">3:1</div>
            <div className="text-sm text-gray-600 mt-1">Return on investment ratio</div>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-700">
          <p>
            Investing in sustainable alternatives to stubble burning would generate significant economic returns 
            while protecting health and environment. The 3:1 ROI makes it one of the most attractive 
            environmental investments available.
          </p>
        </div>
      </div>
    </div>
  )
}