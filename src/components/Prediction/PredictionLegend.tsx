import { PREDICTION_LEVELS } from '@/lib/constants'

export function PredictionLegend() {
  return (
    <div className="legend bg-white rounded-lg shadow-lg p-3 max-w-xs">
      <h3 className="font-semibold text-sm mb-3">Fire Risk Prediction</h3>
      
      {/* Risk Levels */}
      <div className="space-y-2 mb-4">
        {Object.entries(PREDICTION_LEVELS).map(([key, level]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div 
              className="w-4 h-4 border border-gray-300 opacity-60"
              style={{ backgroundColor: level.color }}
            />
            <span>{level.name}</span>
            <span className="text-gray-500 ml-auto">
              {key === 'HIGH' ? '>70%' : key === 'MEDIUM' ? '40-70%' : '<40%'}
            </span>
          </div>
        ))}
      </div>

      {/* Model Features */}
      <div className="border-t pt-3 mb-3">
        <h4 className="font-medium text-xs mb-2 text-gray-700">Model Features</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Historical Fire Patterns</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Weather Conditions</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Seasonal Factors</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Agricultural Calendar</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="border-t pt-3">
        <p className="text-xs text-gray-600 mb-1">
          <strong>Grid Resolution:</strong> ~11km squares
        </p>
        <p className="text-xs text-gray-600 mb-1">
          <strong>Update:</strong> Daily predictions
        </p>
        <p className="text-xs text-gray-600">
          Click prediction areas for details
        </p>
      </div>

      {/* Accuracy Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-3">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> Predictions are estimates based on historical patterns and current conditions. Always verify with ground observations.
        </p>
      </div>
    </div>
  )
}