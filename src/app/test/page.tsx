'use client'

import { useState, useEffect } from 'react'

export default function TestPage() {
  const [fires, setFires] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFires()
  }, [])

  const fetchFires = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/fires?startDate=2024-01-01&endDate=2024-12-31&region=punjab&sources=MODIS,VIIRS&confidence=0')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setFires(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching fires:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="mb-4">
        <button 
          onClick={fetchFires}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reload Fire Data
        </button>
      </div>

      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {!loading && !error && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Fire Data ({fires.length} records)</h2>
          <div className="grid gap-4">
            {fires.slice(0, 5).map((fire: any) => (
              <div key={fire.id} className="border p-4 rounded">
                <p><strong>Location:</strong> {fire.latitude}, {fire.longitude}</p>
                <p><strong>Source:</strong> {fire.source}</p>
                <p><strong>Confidence:</strong> {fire.confidence}%</p>
                <p><strong>Date:</strong> {fire.acq_date} {fire.acq_time}</p>
                <p><strong>Satellite:</strong> {fire.satellite}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}