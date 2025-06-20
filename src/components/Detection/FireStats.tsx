import { FireDetection, UserReportedFire } from '@/types/fire'
import { Flame, Users, TrendingUp, AlertTriangle } from 'lucide-react'

interface FireStatsProps {
  fires: FireDetection[]
  userReportedFires: UserReportedFire[]
  loading: boolean
}

export function FireStats({ fires, userReportedFires, loading }: FireStatsProps) {
  const totalFires = fires.length + userReportedFires.length
  const todayFires = fires.filter(fire => {
    const today = new Date().toISOString().split('T')[0]
    return fire.acq_date === today
  }).length

  const highConfidenceFires = fires.filter(fire => fire.confidence >= 80).length
  const averageConfidence = fires.length > 0 
    ? Math.round(fires.reduce((sum, fire) => sum + fire.confidence, 0) / fires.length)
    : 0

  const stats = [
    {
      label: 'Total Detections',
      value: totalFires,
      icon: Flame,
      color: 'text-fire-red'
    },
    {
      label: 'Today',
      value: todayFires,
      icon: TrendingUp,
      color: 'text-fire-orange'
    },
    {
      label: 'High Confidence',
      value: highConfidenceFires,
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      label: 'User Reports',
      value: userReportedFires.length,
      icon: Users,
      color: 'text-blue-600'
    }
  ]

  if (loading) {
    return (
      <div className="flex gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-16 w-24"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-3 min-w-[100px]">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-gray-600">{stat.label}</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {stat.value.toLocaleString()}
            </div>
          </div>
        )
      })}
      
      {fires.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-3 min-w-[100px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded"></div>
            <span className="text-xs text-gray-600">Avg Confidence</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {averageConfidence}%
          </div>
        </div>
      )}
    </div>
  )
}