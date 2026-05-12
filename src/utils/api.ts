import type { EventResponse, Filters } from '../types/event'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function fetchEvents(filters: Partial<Filters> = {}): Promise<EventResponse> {
  const { category = 'all', dateRange = 'this_week' } = filters
  const params = new URLSearchParams({ category, date_range: dateRange })
  const res = await fetch(`${BASE_URL}/events?${params}`)
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json()
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL.replace('/api', '')}/health`)
    return res.ok
  } catch {
    return false
  }
}
