import { useState } from 'react'
import { FilterBar } from '../components/FilterBar'
import { EventGrid } from '../components/EventGrid'
import { useEvents } from '../hooks/useEvents'
import type { Filters } from '../types/event'

export function Home() {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    dateRange: 'this_week',
  })

  const { events, loading, error, total, refresh } = useEvents(filters)

  function handleFilterChange(partial: Partial<Filters>) {
    setFilters(prev => ({ ...prev, ...partial }))
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🎶</span>
            <span className="logo-text">Athens <span className="logo-accent">Events</span></span>
          </div>
          <p className="tagline">Concerts · DJ Sets · Parties · Nightlife in Athens, Greece</p>
        </div>
      </header>

      <main className="main">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onRefresh={refresh}
          loading={loading}
          total={total}
        />
        <EventGrid events={events} loading={loading} error={error} />
      </main>

      <footer className="site-footer">
        <p>Data sourced from Viva.gr · Resident Advisor · TicketSwap · Ticketmaster</p>
      </footer>
    </div>
  )
}
