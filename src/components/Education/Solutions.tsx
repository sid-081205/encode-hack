import { Leaf, Recycle, Zap, Tractor, DollarSign, CheckCircle } from 'lucide-react'

export function Solutions() {
  const solutions = [
    {
      title: 'Happy Seeder Technology',
      icon: Tractor,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Direct sowing of wheat in rice stubble without burning',
      cost: '₹8,000/hectare',
      savings: '₹12,000/hectare annually',
      benefits: [
        'No need to burn stubble',
        'Saves time and labor',
        'Improves soil health',
        'Reduces diesel consumption by 20%',
        'Increases wheat yield by 8-10%'
      ],
      adoption: '35%',
      effectiveness: '95%'
    },
    {
      title: 'Biomass Collection & Processing',
      icon: Recycle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Converting stubble into useful biomass products',
      cost: '₹5,000/hectare',
      savings: '₹15,000/hectare revenue',
      benefits: [
        'Creates additional income stream',
        'Reduces waste completely',
        'Generates employment',
        'Produces renewable energy',
        'Manufacturing bio-products'
      ],
      adoption: '25%',
      effectiveness: '90%'
    },
    {
      title: 'Bio-Energy Production',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Converting stubble to electricity and biofuels',
      cost: '₹6,000/hectare',
      savings: '₹18,000/hectare revenue',
      benefits: [
        'Renewable energy generation',
        'Significant revenue potential',
        'Reduces carbon footprint',
        'Creates rural jobs',
        'Supports energy independence'
      ],
      adoption: '15%',
      effectiveness: '85%'
    },
    {
      title: 'Composting & Organic Matter',
      icon: Leaf,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Converting stubble into organic compost and fertilizer',
      cost: '₹3,000/hectare',
      savings: '₹8,000/hectare savings',
      benefits: [
        'Improves soil organic matter',
        'Reduces fertilizer costs',
        'Enhances water retention',
        'Increases biodiversity',
        'Long-term soil health benefits'
      ],
      adoption: '40%',
      effectiveness: '80%'
    }
  ]

  const successStories = [
    {
      location: 'Fatehgarh Sahib, Punjab',
      farmer: 'Harpreet Singh',
      area: '20 hectares',
      solution: 'Happy Seeder',
      result: 'Saved ₹2.4 lakh annually, increased wheat yield by 12%',
      quote: 'Happy Seeder not only eliminated burning but actually increased my profits.'
    },
    {
      location: 'Karnal, Haryana',
      farmer: 'Cooperative Society',
      area: '500 hectares',
      solution: 'Biomass Collection',
      result: 'Generated ₹75 lakh revenue from stubble sales',
      quote: 'What was once waste is now our biggest income source.'
    },
    {
      location: 'Sangrur, Punjab',
      farmer: 'Jasbir Kaur',
      area: '15 hectares',
      solution: 'Composting',
      result: 'Reduced fertilizer costs by 60%, improved soil health',
      quote: 'My soil is healthier and more productive than ever before.'
    }
  ]

  const governmentSupport = [
    {
      scheme: 'Central Sector Scheme',
      subsidy: '80%',
      maxAmount: '₹1.6 lakh',
      description: 'For purchase of Happy Seeder and other machinery'
    },
    {
      scheme: 'PUSA Decomposer',
      subsidy: '100%',
      maxAmount: '₹1,000/hectare',
      description: 'Free bio-decomposer spray for in-situ management'
    },
    {
      scheme: 'Custom Hiring Centers',
      subsidy: '40%',
      maxAmount: '₹10 lakh',
      description: 'Setting up machinery rental services'
    },
    {
      scheme: 'Biomass Plants',
      subsidy: '25%',
      maxAmount: '₹5 crore',
      description: 'Establishing biomass power and pellet plants'
    }
  ]

  const implementationSteps = [
    {
      step: 1,
      title: 'Assessment',
      description: 'Evaluate farm size, soil type, and current practices'
    },
    {
      step: 2,
      title: 'Choose Solution',
      description: 'Select appropriate technology based on resources'
    },
    {
      step: 3,
      title: 'Access Funding',
      description: 'Apply for government subsidies and support schemes'
    },
    {
      step: 4,
      title: 'Training',
      description: 'Get trained on new equipment and techniques'
    },
    {
      step: 5,
      title: 'Implementation',
      description: 'Start using alternative practices in the field'
    },
    {
      step: 6,
      title: 'Monitor & Optimize',
      description: 'Track results and optimize for better outcomes'
    }
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sustainable Solutions</h2>
        <p className="text-gray-600">
          Proven alternatives to stubble burning that are economically viable and environmentally friendly
        </p>
      </div>

      {/* Solution Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutions.map((solution, index) => {
          const Icon = solution.icon
          return (
            <div key={index} className={`${solution.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`h-6 w-6 ${solution.color}`} />
                <h3 className="font-semibold text-gray-900">{solution.title}</h3>
              </div>
              
              <p className="text-gray-700 mb-4">{solution.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Investment</div>
                  <div className="font-semibold text-gray-900">{solution.cost}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Returns</div>
                  <div className="font-semibold text-green-600">{solution.savings}</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {solution.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Current Adoption</div>
                  <div className="font-medium text-gray-900">{solution.adoption}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Effectiveness</div>
                  <div className="font-medium text-gray-900">{solution.effectiveness}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Success Stories */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900">{story.farmer}</h4>
                <p className="text-sm text-gray-600">{story.location}</p>
                <p className="text-sm text-gray-600">{story.area} • {story.solution}</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">{story.result}</p>
              <blockquote className="text-sm italic text-gray-600 border-l-2 border-blue-300 pl-3">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Government Support */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-600" />
          Government Support & Subsidies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governmentSupport.map((support, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{support.scheme}</h4>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {support.subsidy} subsidy
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Max support: <span className="font-medium">{support.maxAmount}</span>
              </div>
              <p className="text-sm text-gray-700">{support.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {implementationSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <h4 className="font-medium text-gray-900">{step.title}</h4>
              </div>
              <p className="text-sm text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Comparison */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Economic Benefits of Adopting Alternatives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">₹12,000</div>
            <div className="text-sm text-gray-600">Average savings per hectare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">3-5 years</div>
            <div className="text-sm text-gray-600">Payback period</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">25%</div>
            <div className="text-sm text-gray-600">Increase in farm income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">80%</div>
            <div className="text-sm text-gray-600">Reduction in pollution</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Make the Switch?</h3>
          <p className="mb-4">
            Join thousands of farmers who have already adopted sustainable alternatives to stubble burning
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium">Contact Agricultural Department</div>
              <div>For subsidies and training programs</div>
            </div>
            <div>
              <div className="font-medium">Visit Nearest KVK</div>
              <div>For technical guidance and support</div>
            </div>
            <div>
              <div className="font-medium">Join Farmer Groups</div>
              <div>For collective purchasing and sharing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}