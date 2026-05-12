import type { Filters, DateRange } from '../types/event'

interface Props {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  onRefresh: () => void
  loading: boolean
  total: number
}

const CATEGORIES = [
  { value: 'all',        label: 'All Events' },
  { value: 'concert',    label: 'Concerts' },
  { value: 'dj',         label: 'DJ & Electronic' },
  { value: 'party',      label: 'Parties' },
  { value: 'electronic', label: 'Electronic' },
]

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: 'today',        label: 'Today' },
  { value: 'this_weekend', label: 'Weekend' },
  { value: 'this_week',    label: 'This Week' },
  { value: 'this_month',   label: 'This Month' },
]

function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
        active
          ? 'bg-violet-600 border-violet-600 text-white'
          : 'bg-transparent border-white/10 text-white/50 hover:border-violet-500/60 hover:text-white/80 hover:bg-violet-600/10'
      }`}
    >
      {children}
    </button>
  )
}

export function FilterBar({ filters, onFilterChange, onRefresh, loading, total }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-xl bg-[#0f0f1a] border border-white/[0.06]">
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map(c => (
          <PillBtn key={c.value} active={filters.category === c.value} onClick={() => onFilterChange({ category: c.value })}>
            {c.label}
          </PillBtn>
        ))}
      </div>

      <div className="w-px h-5 bg-white/10 hidden sm:block" />

      <div className="flex flex-wrap gap-1.5">
        {DATE_RANGES.map(d => (
          <PillBtn key={d.value} active={filters.dateRange === d.value} onClick={() => onFilterChange({ dateRange: d.value })}>
            {d.label}
          </PillBtn>
        ))}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {total > 0 && (
          <span className="text-xs text-white/25">{total} events</span>
        )}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 text-xs font-medium transition-all duration-150 hover:bg-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}
