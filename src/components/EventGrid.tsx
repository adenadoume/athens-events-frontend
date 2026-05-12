import type { Event } from '../types/event'
import { EventCard } from './EventCard'
import { LoadingSkeleton } from './LoadingSkeleton'

interface Props {
  events: Event[]
  loading: boolean
  error: string | null
}

export function EventGrid({ events, loading, error }: Props) {
  if (loading) return <LoadingSkeleton />

  if (error) {
    return (
      <div className="empty-state">
        <span className="empty-icon">⚡</span>
        <h3>Connection error</h3>
        <p>{error}</p>
        <p className="hint">Make sure the backend is running on Oracle VM and VITE_API_URL is set correctly.</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🎵</span>
        <h3>No events found</h3>
        <p>Try a different date range or category, or hit Refresh to fetch live data.</p>
      </div>
    )
  }

  return (
    <div className="event-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
