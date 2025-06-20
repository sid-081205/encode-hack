import { NextRequest, NextResponse } from 'next/server'
import { createPredictionModel } from '@/lib/prediction-model'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const region = searchParams.get('region') as 'punjab' | 'haryana'
    const predictionDate = searchParams.get('date') || new Date().toISOString().split('T')[0]
    const horizonDays = parseInt(searchParams.get('horizon') || '7')

    if (!region || !['punjab', 'haryana'].includes(region)) {
      return NextResponse.json(
        { error: 'Invalid region. Must be punjab or haryana' },
        { status: 400 }
      )
    }

    const model = createPredictionModel()
    const predictions = await model.getPredictions(region, predictionDate, horizonDays)

    return NextResponse.json({
      predictions,
      metadata: {
        region,
        prediction_date: predictionDate,
        prediction_horizon: horizonDays,
        total_predictions: predictions.length,
        high_risk_count: predictions.filter(p => p.probability > 0.7).length,
        medium_risk_count: predictions.filter(p => p.probability > 0.4 && p.probability <= 0.7).length,
        low_risk_count: predictions.filter(p => p.probability <= 0.4).length
      }
    })
  } catch (error) {
    console.error('Error fetching predictions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { region, date, horizon = 7 } = body

    if (!region || !['punjab', 'haryana'].includes(region)) {
      return NextResponse.json(
        { error: 'Invalid region. Must be punjab or haryana' },
        { status: 400 }
      )
    }

    const predictionDate = date ? new Date(date) : new Date()
    const model = createPredictionModel()
    
    console.log(`Generating predictions for ${region} on ${predictionDate.toISOString().split('T')[0]}`)
    
    const predictions = await model.generatePredictions(region, predictionDate, horizon)

    return NextResponse.json({
      success: true,
      message: `Generated ${predictions.length} predictions for ${region}`,
      predictions: predictions.slice(0, 10), // Return top 10 predictions
      metadata: {
        region,
        prediction_date: predictionDate.toISOString().split('T')[0],
        prediction_horizon: horizon,
        total_predictions: predictions.length
      }
    })
  } catch (error) {
    console.error('Error generating predictions:', error)
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}