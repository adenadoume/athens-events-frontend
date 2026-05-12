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

  const { events, loading, error, total, isMock, refresh } = useEvents(filters)

  return (
    <div className="min-h-screen flex flex-col bg-[#08080f] text-white font-sans">

      {/* Header */}
      <header className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0f0a1e] to-[#08080f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.18),transparent)] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl">🎶</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Athens <span className="text-violet-500">Events</span>
            </h1>
          </div>
          <p className="text-sm text-white/40 tracking-wide">
            Concerts · DJ Sets · Parties · Nightlife in Athens, Greece
          </p>
        </div>
      </header>

      {/* Mock data banner */}
      {isMock && !loading && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-400">
          ⚠ Preview mode — showing sample events. Backend not yet connected.
        </div>
      )}

      {/* Main */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <FilterBar
          filters={filters}
          onFilterChange={(partial) => setFilters(prev => ({ ...prev, ...partial }))}
          onRefresh={refresh}
          loading={loading}
          total={total}
        />
        <EventGrid events={events} loading={loading} error={error} isMock={isMock} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-5 text-center text-[0.7rem] text-white/20">
        Data sourced from Viva.gr · Resident Advisor · TicketSwap · Ticketmaster
      </footer>
    </div>
  )
}
