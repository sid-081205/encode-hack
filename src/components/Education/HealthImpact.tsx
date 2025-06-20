import { Heart, Brain, Baby, Users, AlertCircle, Activity } from 'lucide-react'

export function HealthImpact() {
  const healthEffects = [
    {
      title: 'Respiratory Diseases',
      icon: Activity,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Severe impact on lung function and respiratory health',
      effects: [
        'Asthma attacks increase by 40% during burning season',
        'Chronic Obstructive Pulmonary Disease (COPD) exacerbation',
        'Bronchitis and pneumonia cases surge',
        'Reduced lung function in children and elderly'
      ],
      statistics: '35% increase in respiratory admissions'
    },
    {
      title: 'Cardiovascular Impact',
      icon: Heart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Increased risk of heart diseases and strokes',
      effects: [
        'Heart attacks increase by 24% during peak pollution',
        'High blood pressure and irregular heartbeat',
        'Increased risk of stroke in vulnerable populations',
        'Blood clotting and inflammation'
      ],
      statistics: '20% increase in cardiac emergencies'
    },
    {
      title: 'Neurological Effects',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Impact on brain function and cognitive abilities',
      effects: [
        'Reduced cognitive function in children',
        'Increased risk of dementia in elderly',
        'Headaches and mental fatigue',
        'Potential neurodevelopmental delays'
      ],
      statistics: '15% decline in cognitive performance'
    },
    {
      title: 'Child Health',
      icon: Baby,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Severe impact on children&apos;s developing systems',
      effects: [
        'Stunted lung development',
        'Increased school absenteeism',
        'Higher susceptibility to infections',
        'Long-term developmental issues'
      ],
      statistics: '50% increase in pediatric admissions'
    },
    {
      title: 'Pregnancy Complications',
      icon: Heart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Risks to maternal and fetal health',
      effects: [
        'Increased risk of premature birth',
        'Low birth weight babies',
        'Pregnancy complications',
        'Potential birth defects'
      ],
      statistics: '18% increase in pregnancy complications'
    },
    {
      title: 'Cancer Risk',
      icon: AlertCircle,
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      description: 'Long-term carcinogenic effects',
      effects: [
        'Increased lung cancer risk',
        'Exposure to carcinogenic compounds',
        'DNA damage from fine particles',
        'Accelerated aging of cells'
      ],
      statistics: '12% increase in cancer risk'
    }
  ]

  const vulnerableGroups = [
    {
      group: 'Children (0-14 years)',
      population: '15 million',
      risk: 'Very High',
      description: 'Developing respiratory systems make children extremely vulnerable'
    },
    {
      group: 'Elderly (65+ years)',
      population: '8 million',
      risk: 'Very High',
      description: 'Pre-existing conditions worsen during pollution episodes'
    },
    {
      group: 'Pregnant Women',
      population: '2.5 million',
      risk: 'High',
      description: 'Risks to both maternal and fetal health'
    },
    {
      group: 'Outdoor Workers',
      population: '12 million',
      risk: 'High',
      description: 'Prolonged exposure to polluted air'
    },
    {
      group: 'Pre-existing Conditions',
      population: '20 million',
      risk: 'Very High',
      description: 'Asthma, COPD, heart disease patients'
    }
  ]

  const healthCosts = [
    { category: 'Hospital Admissions', cost: '₹8,000 crores', increase: '45%' },
    { category: 'Medication Costs', cost: '₹5,500 crores', increase: '35%' },
    { category: 'Lost Productivity', cost: '₹12,000 crores', increase: '25%' },
    { category: 'Premature Deaths', cost: '₹4,500 crores', increase: '15%' }
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Impact</h2>
        <p className="text-gray-600">
          Stubble burning severely affects public health, causing respiratory diseases, cardiovascular problems, and long-term health complications
        </p>
      </div>

      {/* Health Effects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthEffects.map((effect, index) => {
          const Icon = effect.icon
          return (
            <div key={index} className={`${effect.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`h-6 w-6 ${effect.color}`} />
                <h3 className="font-semibold text-gray-900">{effect.title}</h3>
              </div>
              <p className="text-gray-700 mb-4">{effect.description}</p>
              <ul className="space-y-2 mb-4">
                {effect.effects.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                effect.color.replace('text-', 'text-') + ' bg-white'
              }`}>
                {effect.statistics}
              </div>
            </div>
          )
        })}
      </div>

      {/* Vulnerable Populations */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          Most Vulnerable Populations
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Group</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Population</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Risk Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody>
              {vulnerableGroups.map((group, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{group.group}</td>
                  <td className="py-3 px-4 text-gray-600">{group.population}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      group.risk === 'Very High' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {group.risk}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{group.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Health Emergency Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="text-2xl font-bold text-red-700">2.1M</div>
          <div className="text-sm text-gray-600">Premature deaths annually</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">15M</div>
          <div className="text-sm text-gray-600">People seek medical help</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">40%</div>
          <div className="text-sm text-gray-600">Increase in respiratory diseases</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">₹30K Cr</div>
          <div className="text-sm text-gray-600">Annual healthcare costs</div>
        </div>
      </div>

      {/* Economic Health Costs */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Economic Health Impact (Annual)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthCosts.map((cost, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{cost.category}</h4>
                <span className="text-red-600 text-sm font-medium">+{cost.increase}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{cost.cost}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Advisory */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          Health Protection Measures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Individual Protection</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Use N95 or better quality masks outdoors</li>
              <li>• Keep windows closed during peak pollution</li>
              <li>• Use air purifiers indoors</li>
              <li>• Avoid outdoor activities during morning hours</li>
              <li>• Stay hydrated and eat antioxidant-rich foods</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Medical Attention</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Seek immediate help for breathing difficulty</li>
              <li>• Monitor children and elderly closely</li>
              <li>• Keep emergency medications ready</li>
              <li>• Regular health check-ups during season</li>
              <li>• Follow doctor&apos;s advice for chronic conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}