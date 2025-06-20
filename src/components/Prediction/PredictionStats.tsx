import { FirePrediction } from '@/types/fire'
import { AlertTriangle, TrendingUp, Target, Zap } from 'lucide-react'

interface PredictionStatsProps {
  predictions: FirePrediction[]
  loading: boolean
}

export function PredictionStats({ predictions, loading }: PredictionStatsProps) {
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

  const highRisk = predictions.filter(p => p.probability > 0.7).length
  const mediumRisk = predictions.filter(p => p.probability > 0.4 && p.probability <= 0.7).length
  const lowRisk = predictions.filter(p => p.probability <= 0.4).length
  const avgConfidence = predictions.length > 0 
    ? Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length * 100)
    : 0

  const maxProbability = predictions.length > 0
    ? Math.max(...predictions.map(p => p.probability))
    : 0

  const stats = [
    {
      label: 'High Risk Areas',
      value: highRisk,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Medium Risk',
      value: mediumRisk,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Total Predictions',
      value: predictions.length,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Max Risk',
      value: `${Math.round(maxProbability * 100)}%`,
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="flex gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className={`${stat.bgColor} rounded-lg border p-3 min-w-[100px]`}>
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-gray-600">{stat.label}</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>
          </div>
        )
      })}
      
      {predictions.length > 0 && (
        <div className="bg-green-50 rounded-lg border p-3 min-w-[100px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
            <span className="text-xs text-gray-600">Avg Confidence</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {avgConfidence}%
          </div>
        </div>
      )}
    </div>
  )
}