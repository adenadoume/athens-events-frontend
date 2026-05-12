import { useState, useEffect, useCallback } from 'react'
import { fetchEvents } from '../utils/api'
import type { Event, Filters } from '../types/event'

interface UseEventsResult {
  events: Event[]
  loading: boolean
  error: string | null
  total: number
  fetchedAt: string | null
  refresh: () => void
}

export function useEvents(filters: Filters): UseEventsResult {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [fetchedAt, setFetchedAt] = useState<string | null>(null)
  const [refreshTick, setRefreshTick] = useState(0)

  const refresh = useCallback(() => setRefreshTick(t => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

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
        setError(err.message)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [filters.category, filters.dateRange, refreshTick])

  return { events, loading, error, total, fetchedAt, refresh }
}
