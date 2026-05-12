import { useState, useEffect, useCallback } from 'react'
import { fetchEvents } from '../utils/api'
import { MOCK_EVENTS } from '../utils/mockData'
import type { Event, Filters } from '../types/event'

interface UseEventsResult {
  events: Event[]
  loading: boolean
  error: string | null
  total: number
  fetchedAt: string | null
  isMock: boolean
  refresh: () => void
}

export function useEvents(filters: Filters): UseEventsResult {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [fetchedAt, setFetchedAt] = useState<string | null>(null)
  const [isMock, setIsMock] = useState(false)
  const [refreshTick, setRefreshTick] = useState(0)

  const refresh = useCallback(() => setRefreshTick(t => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setIsMock(false)

    fetchEvents(filters)
      .then(res => {
        if (cancelled) return
        setEvents(res.events)
        setTotal(res.total)
        setFetchedAt(res.fetched_at)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        // Fall back to mock data so the UI is always usable
        setEvents(MOCK_EVENTS)
        setTotal(MOCK_EVENTS.length)
        setIsMock(true)
        setError(err.message)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [filters.category, filters.dateRange, refreshTick])

  return { events, loading, error, total, fetchedAt, isMock, refresh }
}
