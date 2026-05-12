import type { Event } from '../types/event'
import { EventCard } from './EventCard'
import { LoadingSkeleton } from './LoadingSkeleton'

interface Props {
  events: Event[]
  loading: boolean
  error?: string | null
  isMock?: boolean
}

export function EventGrid({ events, loading }: Props) {
  if (loading) return <LoadingSkeleton />

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <span className="text-5xl">🎵</span>
        <h3 className="text-lg font-semibold text-white/80">No events found</h3>
        <p className="text-sm text-white/40">Try a different date range or category, or hit Refresh.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
