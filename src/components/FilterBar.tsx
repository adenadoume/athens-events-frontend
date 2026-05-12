import { RefreshCw } from 'lucide-react'
import type { Filters, DateRange } from '../types/event'

interface Props {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  onRefresh: () => void
  loading: boolean
  total: number
}

const CATEGORIES = [
  { value: 'all', label: 'All Events' },
  { value: 'concert', label: 'Concerts' },
  { value: 'dj', label: 'DJ & Electronic' },
  { value: 'party', label: 'Parties' },
  { value: 'electronic', label: 'Electronic' },
]

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'this_weekend', label: 'Weekend' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
]

export function FilterBar({ filters, onFilterChange, onRefresh, loading, total }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`filter-btn ${filters.category === cat.value ? 'active' : ''}`}
            onClick={() => onFilterChange({ category: cat.value })}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="filter-group">
        {DATE_RANGES.map(dr => (
          <button
            key={dr.value}
            className={`filter-btn ${filters.dateRange === dr.value ? 'active' : ''}`}
            onClick={() => onFilterChange({ dateRange: dr.value })}
          >
            {dr.label}
          </button>
        ))}
      </div>

      <div className="filter-actions">
        <span className="result-count">{total > 0 ? `${total} events` : ''}</span>
        <button
          className={`refresh-btn ${loading ? 'spinning' : ''}`}
          onClick={onRefresh}
          disabled={loading}
          title="Refresh events"
        >
          <RefreshCw size={16} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}
