import { FileText, Scale, AlertTriangle, Target, Shield, Users } from 'lucide-react'

export function PolicySection() {
  const policies = [
    {
      level: 'Central Government',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      policies: [
        {
          name: 'National Clean Air Programme (NCAP)',
          year: '2019',
          description: 'Comprehensive plan to reduce air pollution by 20-30% by 2024',
          status: 'Active',
          impact: 'Pan-India framework for air quality improvement'
        },
        {
          name: 'Central Sector Scheme on Promotion of Agricultural Mechanization',
          year: '2018',
          description: 'Subsidies for Happy Seeder and other in-situ management equipment',
          status: 'Active',
          impact: '₹1,151 crore allocated for stubble management machinery'
        },
        {
          name: 'Commission for Air Quality Management (CAQM)',
          year: '2021',
          description: 'Statutory body for air quality management in NCR and adjoining areas',
          status: 'Active',
          impact: 'Unified approach to tackle air pollution'
        }
      ]
    },
    {
      level: 'State Governments',
      icon: Scale,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      policies: [
        {
          name: 'Punjab Pollution Control Board Guidelines',
          year: '2020',
          description: 'Strict monitoring and penalties for stubble burning',
          status: 'Active',
          impact: 'Red entries in land records for violators'
        },
        {
          name: 'Haryana Crop Residue Management Scheme',
          year: '2019',
          description: 'Incentives for adopting alternative practices',
          status: 'Active',
          impact: '₹25,000 per village for zero burning achievement'
        },
        {
          name: 'Delhi Graded Response Action Plan (GRAP)',
          year: '2017',
          description: 'Emergency measures during severe pollution episodes',
          status: 'Active',
          impact: 'Automatic implementation based on AQI levels'
        }
      ]
    },
    {
      level: 'Judicial Interventions',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      policies: [
        {
          name: 'Supreme Court Directives',
          year: '2019-2023',
          description: 'Multiple orders for stubble burning control and accountability',
          status: 'Ongoing',
          impact: 'Mandatory reporting and action plans from states'
        },
        {
          name: 'NGT Orders',
          year: '2018-2023',
          description: 'National Green Tribunal directions on air pollution control',
          status: 'Ongoing',
          impact: 'Environmental compensation and restoration measures'
        },
        {
          name: 'High Court Interventions',
          year: '2020-2023',
          description: 'State-specific judicial monitoring of air quality',
          status: 'Ongoing',
          impact: 'Regular court monitoring of government actions'
        }
      ]
    }
  ]

  const regulations = [
    {
      type: 'Prohibitive Measures',
      icon: AlertTriangle,
      color: 'text-red-600',
      measures: [
        'Complete ban on stubble burning',
        'Penalties up to ₹15,000 for violations',
        'FIR registration for repeat offenders',
        'Red entries in land revenue records',
        'Denial of government benefits for violators'
      ]
    },
    {
      type: 'Incentive Schemes',
      icon: Target,
      color: 'text-green-600',
      measures: [
        '80% subsidy on crop residue management machinery',
        'Custom hiring centers for equipment sharing',
        'Direct benefit transfer for adopting alternatives',
        'Village-level incentives for zero burning',
        'Carbon credit opportunities'
      ]
    },
    {
      type: 'Monitoring Systems',
      icon: Users,
      color: 'text-blue-600',
      measures: [
        'Satellite monitoring for fire detection',
        'Mobile app for citizen reporting',
        'Ground-level monitoring teams',
        'GPS-enabled fire detection systems',
        'Real-time air quality monitoring'
      ]
    }
  ]

  const challenges = [
    {
      challenge: 'Implementation Gap',
      description: 'Disconnect between policy formulation and ground-level execution',
      impact: 'Limited effectiveness of well-intentioned policies'
    },
    {
      challenge: 'Farmer Resistance',
      description: 'Economic pressures and lack of awareness about alternatives',
      impact: 'Continued reliance on burning despite regulations'
    },
    {
      challenge: 'Enforcement Issues',
      description: 'Insufficient monitoring and weak penalty enforcement',
      impact: 'High violation rates and low compliance'
    },
    {
      challenge: 'Coordination Problems',
      description: 'Poor coordination between different government levels',
      impact: 'Conflicting approaches and resource wastage'
    }
  ]

  const recommendations = [
    {
      category: 'Policy Enhancement',
      recommendations: [
        'Strengthen inter-state coordination mechanisms',
        'Integrate stubble management with MSP procurement',
        'Develop region-specific policy frameworks',
        'Create dedicated monitoring and enforcement units'
      ]
    },
    {
      category: 'Economic Instruments',
      recommendations: [
        'Increase subsidy rates for alternative technologies',
        'Develop markets for agricultural residue',
        'Implement carbon pricing mechanisms',
        'Create crop insurance linked to sustainable practices'
      ]
    },
    {
      category: 'Technology & Innovation',
      recommendations: [
        'Promote research in residue management technologies',
        'Develop cost-effective mechanical solutions',
        'Enhance digital monitoring capabilities',
        'Support startup ecosystem for agri-tech solutions'
      ]
    }
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Policies & Regulations</h2>
        <p className="text-gray-600">
          Comprehensive overview of government policies, regulations, and judicial interventions to address stubble burning
        </p>
      </div>

      {/* Policy Framework */}
      <div className="space-y-6">
        {policies.map((level, index) => {
          const Icon = level.icon
          return (
            <div key={index} className={`${level.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`h-6 w-6 ${level.color}`} />
                <h3 className="font-semibold text-gray-900">{level.level}</h3>
              </div>
              
              <div className="space-y-4">
                {level.policies.map((policy, policyIndex) => (
                  <div key={policyIndex} className="bg-white rounded-lg p-4 border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{policy.name}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {policy.year}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{policy.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {policy.status}
                      </span>
                      <span className="text-xs text-gray-600">{policy.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Regulatory Measures */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Measures</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regulations.map((regulation, index) => {
            const Icon = regulation.icon
            return (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`h-5 w-5 ${regulation.color}`} />
                  <h4 className="font-medium text-gray-900">{regulation.type}</h4>
                </div>
                <ul className="space-y-2">
                  {regulation.measures.map((measure, measureIndex) => (
                    <li key={measureIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Implementation Challenges */}
      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Implementation Challenges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-900 mb-2">{challenge.challenge}</h4>
              <p className="text-sm text-gray-700 mb-2">{challenge.description}</p>
              <p className="text-sm text-red-600 font-medium">Impact: {challenge.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Effectiveness */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Effectiveness Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">15%</div>
            <div className="text-sm text-gray-600">Reduction in burning incidents (2018-2023)</div>
          </div>
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">35%</div>
            <div className="text-sm text-gray-600">Farmers using alternatives</div>
          </div>
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">₹2,300 Cr</div>
            <div className="text-sm text-gray-600">Government investment in solutions</div>
          </div>
        </div>
      </div>

      {/* Policy Recommendations */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Recommendations</h3>
        <div className="space-y-6">
          {recommendations.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
              <ul className="space-y-2">
                {category.recommendations.map((recommendation, recIndex) => (
                  <li key={recIndex} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Developments */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Policy Developments (2023-2024)</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Enhanced Monitoring System</h4>
              <span className="text-xs text-gray-500">Dec 2023</span>
            </div>
            <p className="text-sm text-gray-700">
              Introduction of AI-powered satellite monitoring system for real-time fire detection and automated alerts
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Increased Penalty Structure</h4>
              <span className="text-xs text-gray-500">Oct 2023</span>
            </div>
            <p className="text-sm text-gray-700">
              Revision of penalty structure with progressive fines and stronger enforcement mechanisms
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Bio-decomposer Expansion</h4>
              <span className="text-xs text-gray-500">Sep 2023</span>
            </div>
            <p className="text-sm text-gray-700">
              Large-scale distribution of PUSA bio-decomposer for in-situ stubble management across Punjab and Haryana
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}