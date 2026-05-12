export type EventCategory = 'concert' | 'dj' | 'party' | 'electronic'
export type DateRange = 'today' | 'this_weekend' | 'this_week' | 'this_month'
export type TicketSource = 'viva' | 'ticketswap' | 'ticketmaster' | 'ra' | 'door' | 'other'

export interface Event {
  id: string
  title: string
  date: string
  venue: string
  location: string
  category: EventCategory
  description: string
  image_url: string
  ticket_url: string
  ticket_source: TicketSource
  price: string | null
  artists: string[]
}

export interface EventResponse {
  events: Event[]
  total: number
  fetched_at: string
  source_count: number
}

export interface Filters {
  category: string
  dateRange: DateRange
}
