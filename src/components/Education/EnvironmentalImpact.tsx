import { Wind, CloudRain, Thermometer, TreePine, Globe, AlertTriangle } from 'lucide-react'

export function EnvironmentalImpact() {
  const impacts = [
    {
      title: 'Air Quality Degradation',
      icon: Wind,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Massive release of particulate matter and toxic gases',
      details: [
        'PM2.5 concentrations increase by 300-500% during burning season',
        'PM10 levels exceed WHO guidelines by 10-15 times',
        'Release of carbon monoxide, nitrogen oxides, and volatile organic compounds',
        'Formation of ground-level ozone contributing to smog'
      ]
    },
    {
      title: 'Climate Change',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Significant greenhouse gas emissions',
      details: [
        '8.9 million tonnes of CO2 equivalent emissions annually',
        'Contributes to global warming and climate change',
        'Black carbon emissions affect regional climate patterns',
        'Reduces carbon sequestration capacity of agricultural soils'
      ]
    },
    {
      title: 'Soil Degradation',
      icon: TreePine,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Loss of soil nutrients and beneficial microorganisms',
      details: [
        'Destroys beneficial bacteria and fungi in soil',
        'Loss of organic matter and soil carbon',
        'Reduced soil fertility requiring more chemical fertilizers',
        'Increased soil erosion and water runoff'
      ]
    },
    {
      title: 'Water Pollution',
      icon: CloudRain,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Contamination of water sources',
      details: [
        'Ash and chemicals wash into rivers and groundwater',
        'Increased water treatment costs for municipalities',
        'Contamination of drinking water sources',
        'Eutrophication of water bodies'
      ]
    },
    {
      title: 'Biodiversity Loss',
      icon: TreePine,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Harm to wildlife and ecosystems',
      details: [
        'Direct mortality of small animals and insects',
        'Destruction of habitat for ground-nesting birds',
        'Disruption of food chains and ecological balance',
        'Reduced pollinator populations affecting crop yields'
      ]
    },
    {
      title: 'Visibility and Transport',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Reduced visibility causing transport disruptions',
      details: [
        'Airport closures and flight delays in Delhi-NCR',
        'Highway accidents due to reduced visibility',
        'Train delays and cancellations',
        'Economic losses from transport disruptions'
      ]
    }
  ]

  const airQualityData = [
    { location: 'Delhi', aqi: 450, status: 'Severe', increase: '300%' },
    { location: 'Gurgaon', aqi: 420, status: 'Severe', increase: '280%' },
    { location: 'Noida', aqi: 380, status: 'Very Poor', increase: '250%' },
    { location: 'Faridabad', aqi: 400, status: 'Severe', increase: '270%' },
    { location: 'Chandigarh', aqi: 350, status: 'Very Poor', increase: '220%' }
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Environmental Impact</h2>
        <p className="text-gray-600">
          Stubble burning causes severe environmental degradation affecting air, water, soil, and climate systems
        </p>
      </div>

      {/* Impact Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impacts.map((impact, index) => {
          const Icon = impact.icon
          return (
            <div key={index} className={`${impact.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`h-6 w-6 ${impact.color}`} />
                <h3 className="font-semibold text-gray-900">{impact.title}</h3>
              </div>
              <p className="text-gray-700 mb-4">{impact.description}</p>
              <ul className="space-y-2">
                {impact.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Air Quality Impact Table */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Air Quality Impact During Peak Burning Season
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">AQI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Increase</th>
              </tr>
            </thead>
            <tbody>
              {airQualityData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{row.location}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      row.aqi >= 400 ? 'bg-red-100 text-red-800' :
                      row.aqi >= 300 ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {row.aqi}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Severe' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-red-600 font-medium">{row.increase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Long-term Effects */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Long-term Environmental Consequences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Soil Health</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 25% reduction in soil organic carbon</li>
              <li>• Loss of beneficial microorganisms</li>
              <li>• Increased need for chemical fertilizers</li>
              <li>• Reduced water retention capacity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Climate Impact</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 0.05% contribution to global CO2 emissions</li>
              <li>• Regional temperature increase</li>
              <li>• Altered monsoon patterns</li>
              <li>• Increased frequency of heat waves</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison with Natural Decomposition */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Natural Decomposition vs. Burning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-700 mb-2">Burning (Current Practice)</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Immediate release of all carbon as CO2</li>
              <li>• Complete loss of organic matter</li>
              <li>• Destruction of soil microbes</li>
              <li>• Air pollution and health impacts</li>
              <li>• Time to complete: 2-3 hours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-700 mb-2">Natural Decomposition</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Gradual carbon release over 1-2 years</li>
              <li>• Nutrients returned to soil</li>
              <li>• Enhanced soil microbial activity</li>
              <li>• Improved soil structure and fertility</li>
              <li>• Carbon sequestration in soil</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}