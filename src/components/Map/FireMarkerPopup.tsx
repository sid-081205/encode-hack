import { FireDetection } from '@/types/fire'
import { FIRE_SOURCES } from '@/lib/constants'

interface FireMarkerPopupProps {
  fire: FireDetection
}

export function FireMarkerPopup({ fire }: FireMarkerPopupProps) {
  const sourceInfo = FIRE_SOURCES[fire.source as keyof typeof FIRE_SOURCES] || { color: '#666', name: 'Unknown', description: 'Unknown source' }
  
  return (
    <div className="p-2 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-3 h-3 rounded-full border border-white"
          style={{ backgroundColor: sourceInfo.color }}
        />
        <h3 className="font-semibold text-sm">{sourceInfo.name} Detection</h3>
      </div>
      
      <div className="space-y-1 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p><strong>Lat:</strong> {fire.latitude.toFixed(4)}</p>
            <p><strong>Lng:</strong> {fire.longitude.toFixed(4)}</p>
          </div>
          <div>
            <p><strong>Confidence:</strong> {fire.confidence}%</p>
            <p><strong>Brightness:</strong> {fire.brightness}K</p>
          </div>
        </div>
        
        <hr className="my-2" />
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p><strong>Date:</strong> {fire.acq_date}</p>
            <p><strong>Time:</strong> {fire.acq_time}</p>
          </div>
          <div>
            <p><strong>Satellite:</strong> {fire.satellite}</p>
            <p><strong>Instrument:</strong> {fire.instrument}</p>
          </div>
        </div>
        
        <hr className="my-2" />
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p><strong>FRP:</strong> {fire.frp} MW</p>
            <p><strong>Day/Night:</strong> {fire.daynight === 'D' ? 'Day' : 'Night'}</p>
          </div>
          <div>
            <p><strong>Scan:</strong> {fire.scan.toFixed(1)}</p>
            <p><strong>Track:</strong> {fire.track.toFixed(1)}</p>
          </div>
        </div>
        
        {fire.bright_t31 > 0 && (
          <>
            <hr className="my-2" />
            <p><strong>Brightness T31:</strong> {fire.bright_t31}K</p>
          </>
        )}
        
        <hr className="my-2" />
        <p className="text-gray-500">
          <strong>Source:</strong> {sourceInfo.description}
        </p>
        <p className="text-gray-500">
          <strong>Detected:</strong> {new Date(fire.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  )
}