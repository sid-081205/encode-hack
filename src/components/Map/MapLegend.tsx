import { FIRE_SOURCES, PREDICTION_LEVELS } from '@/lib/constants'

interface MapLegendProps {
  showPredictions?: boolean
}

export function MapLegend({ showPredictions = false }: MapLegendProps) {
  return (
    <div className="legend bg-white rounded-lg shadow-lg p-3 max-w-xs">
      <h3 className="font-semibold text-sm mb-2">Map Legend</h3>
      
      {/* Fire Detection Sources */}
      <div className="mb-3">
        <h4 className="font-medium text-xs mb-1 text-gray-700">Fire Detections</h4>
        <div className="space-y-1">
          {Object.entries(FIRE_SOURCES).map(([key, source]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: source.color }}
              />
              <span>{source.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3">
              <svg viewBox="0 0 16 16" className="w-full h-full">
                <polygon 
                  points="8,2 10,6 14,6 11,9 12,13 8,11 4,13 5,9 2,6 6,6" 
                  fill="#f59e0b" 
                  stroke="white" 
                  strokeWidth="1"
                />
              </svg>
            </div>
            <span>User Reported</span>
          </div>
        </div>
      </div>

      {/* Fire Risk Predictions */}
      {showPredictions && (
        <div className="mb-3">
          <h4 className="font-medium text-xs mb-1 text-gray-700">Fire Risk Prediction</h4>
          <div className="space-y-1">
            {Object.entries(PREDICTION_LEVELS).map(([key, level]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 border border-gray-300"
                  style={{ backgroundColor: level.color, opacity: 0.6 }}
                />
                <span>{level.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="border-t pt-2 mt-2">
        <p className="text-xs text-gray-600">
          Click markers for details
        </p>
        {!showPredictions && (
          <p className="text-xs text-gray-600">
            Click map to report fire
          </p>
        )}
      </div>
    </div>
  )
}