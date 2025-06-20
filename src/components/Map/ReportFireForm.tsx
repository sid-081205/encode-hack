'use client'

import { useState } from 'react'
import { LatLng } from 'leaflet'
import { UserReportedFire } from '@/types/fire'
import { X, MapPin, Upload } from 'lucide-react'

interface ReportFireFormProps {
  location: LatLng
  onSubmit: (fire: Omit<UserReportedFire, 'id' | 'created_at' | 'updated_at' | 'verified'>) => void
  onCancel: () => void
}

export function ReportFireForm({ location, onSubmit, onCancel }: ReportFireFormProps) {
  const [formData, setFormData] = useState({
    intensity: 'MEDIUM',
    smoke_visibility: false,
    estimated_area: 1,
    description: '',
    reporter_name: '',
    reporter_contact: '',
    photos: [] as string[]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        latitude: location.lat,
        longitude: location.lng,
        intensity: formData.intensity,
        smoke_visibility: formData.smoke_visibility,
        estimated_area: formData.estimated_area,
        description: formData.description || undefined,
        reporter_name: formData.reporter_name || undefined,
        reporter_contact: formData.reporter_contact || undefined,
        photos: JSON.stringify(formData.photos)
      })
    } catch (error) {
      console.error('Error submitting fire report:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real implementation, you would upload these files to a cloud storage service
      // and get back URLs to store in the database
      const photoUrls = Array.from(files).map(file => URL.createObjectURL(file))
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...photoUrls]
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Report Fire</h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Location Display */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>
            {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </span>
        </div>
      </div>

      {/* Fire Intensity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fire Intensity *
        </label>
        <select
          value={formData.intensity}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            intensity: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' 
          }))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-red"
          required
        >
          <option value="LOW">Low - Small scattered fires</option>
          <option value="MEDIUM">Medium - Moderate burning</option>
          <option value="HIGH">High - Intense, large fires</option>
        </select>
      </div>

      {/* Estimated Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estimated Area (hectares) *
        </label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={formData.estimated_area}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            estimated_area: parseFloat(e.target.value) 
          }))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-red"
          required
        />
      </div>

      {/* Smoke Visibility */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.smoke_visibility}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              smoke_visibility: e.target.checked 
            }))}
            className="rounded border-gray-300 text-fire-red focus:ring-fire-red"
          />
          <span className="text-sm font-medium text-gray-700">
            Smoke visible from fire
          </span>
        </label>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            description: e.target.value 
          }))}
          placeholder="Additional details about the fire..."
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-red"
        />
      </div>

      {/* Reporter Information */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name (optional)
          </label>
          <input
            type="text"
            value={formData.reporter_name}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              reporter_name: e.target.value 
            }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-red"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact (optional)
          </label>
          <input
            type="text"
            value={formData.reporter_contact}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              reporter_contact: e.target.value 
            }))}
            placeholder="Phone or email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-red"
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photos (optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              Click to upload fire photos
            </span>
          </label>
          {formData.photos.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {formData.photos.length} photo(s) selected
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-fire-red text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-fire-red disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Report Fire'}
        </button>
      </div>
    </form>
  )
}