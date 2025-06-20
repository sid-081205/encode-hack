import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Flame, Wind, Droplets, TreePine, Users, Building2 } from 'lucide-react'

export function Statistics() {
  const emissionData = [
    { year: '2018', CO2: 8.2, PM25: 2.1, NOx: 1.5 },
    { year: '2019', CO2: 9.1, PM25: 2.3, NOx: 1.7 },
    { year: '2020', CO2: 7.8, PM25: 1.9, NOx: 1.4 },
    { year: '2021', CO2: 8.5, PM25: 2.2, NOx: 1.6 },
    { year: '2022', CO2: 9.3, PM25: 2.4, NOx: 1.8 },
    { year: '2023', CO2: 8.9, PM25: 2.3, NOx: 1.7 }
  ]

  const regionData = [
    { name: 'Punjab', incidents: 71000, color: '#dc2626' },
    { name: 'Haryana', incidents: 9000, color: '#ea580c' },
    { name: 'UP', incidents: 3000, color: '#f59e0b' },
    { name: 'Others', incidents: 2000, color: '#8b5cf6' }
  ]

  const monthlyData = [
    { month: 'Oct', fires: 25000 },
    { month: 'Nov', fires: 45000 },
    { month: 'Dec', fires: 15000 },
    { month: 'Jan', fires: 5000 },
    { month: 'Feb', fires: 2000 },
    { month: 'Mar', fires: 8000 }
  ]

  const keyStats = [
    {
      title: 'Annual Fire Incidents',
      value: '85,000+',
      subtitle: 'Reported cases in 2023',
      icon: Flame,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'PM2.5 Emissions',
      value: '2.3M tonnes',
      subtitle: 'Fine particulate matter released',
      icon: Wind,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'CO2 Equivalent',
      value: '8.9M tonnes',
      subtitle: 'Greenhouse gas emissions',
      icon: TreePine,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Population Affected',
      value: '50M+',
      subtitle: 'People in affected regions',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Economic Loss',
      value: '₹30,000 Cr',
      subtitle: 'Annual economic impact',
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Water Impact',
      value: '3x increase',
      subtitle: 'Water demand for crops',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    }
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stubble Burning: By the Numbers</h2>
        <p className="text-gray-600">
          Understanding the scale and impact of agricultural residue burning in North India
        </p>
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <h3 className="font-semibold text-gray-900">{stat.title}</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.subtitle}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regional Distribution */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fire Incidents by Region (2023)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="incidents"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Incidents']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Distribution */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Seasonal Pattern (Oct 2023 - Mar 2024)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Fire Incidents']} />
                <Line type="monotone" dataKey="fires" stroke="#dc2626" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Emissions Trend */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Annual Emissions Trend (Million Tonnes)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="CO2" fill="#dc2626" name="CO2 Equivalent" />
              <Bar dataKey="PM25" fill="#ea580c" name="PM2.5" />
              <Bar dataKey="NOx" fill="#f59e0b" name="NOx" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Facts */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Peak Season:</strong> Stubble burning peaks in November, contributing to severe air pollution in Delhi-NCR
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Crop Cycle:</strong> Rice harvesting (Oct-Nov) followed by wheat sowing creates tight timeline pressure
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Regional Impact:</strong> Punjab accounts for 84% of total stubble burning incidents in North India
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Health Crisis:</strong> Contributes to respiratory diseases affecting millions in North India
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Economic Burden:</strong> Healthcare costs and productivity losses exceed ₹30,000 crores annually
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Alternative Solutions:</strong> Happy Seeder, biomass management can reduce incidents by 80%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}