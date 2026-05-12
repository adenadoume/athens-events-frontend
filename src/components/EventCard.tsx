import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import type { Event } from '../types/event'
import { formatDate, formatTime, categoryLabel, sourceLabel, placeholderImage } from '../utils/format'

interface Props {
  event: Event
}

const CATEGORY_BADGE: Record<string, string> = {
  concert:    'bg-violet-600/80 text-white',
  dj:         'bg-cyan-500/80 text-white',
  party:      'bg-pink-500/80 text-white',
  electronic: 'bg-emerald-500/80 text-white',
}

export function EventCard({ event }: Props) {
  const time = formatTime(event.date)
  const imgSrc = event.image_url || placeholderImage(event.category)
  const badgeClass = CATEGORY_BADGE[event.category] ?? 'bg-violet-600/80 text-white'

  return (
    <article className="group flex flex-col rounded-2xl border border-white/[0.07] bg-[#131320] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:border-violet-500/40 hover:bg-[#1a1a2e]">

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#0f0f1a]">
        <img
          src={imgSrc}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = placeholderImage(event.category) }}
        />
        <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${badgeClass}`}>
          {categoryLabel(event.category)}
        </span>
        {event.price && (
          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm border border-white/10">
            {event.price}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-bold text-[0.95rem] leading-snug text-white/90">
          {event.title}
        </h3>

        {event.artists.length > 0 && (
          <p className="text-xs text-cyan-400 font-medium truncate">
            {event.artists.join(' · ')}
          </p>
        )}

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="flex items-center gap-1 text-[0.72rem] text-white/50">
            <Calendar size={11} className="shrink-0" />
            {formatDate(event.date)}
          </span>
          {time && (
            <span className="flex items-center gap-1 text-[0.72rem] text-white/50">
              <Clock size={11} className="shrink-0" />
              {time}
            </span>
          )}
          <span className="flex items-center gap-1 text-[0.72rem] text-white/50">
            <MapPin size={11} className="shrink-0" />
            {event.venue}{event.location && event.location !== 'Athens' ? `, ${event.location}` : ''}
          </span>
        </div>

        <p className="text-[0.78rem] text-white/40 leading-relaxed line-clamp-3 flex-1">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-[0.65rem] text-white/25">{sourceLabel(event.ticket_source)}</span>
          <a
            href={event.ticket_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-cyan-500 text-white text-[0.75rem] font-semibold transition-colors duration-150"
            onClick={(e) => !event.ticket_url && e.preventDefault()}
          >
            Get Tickets
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </article>
  )
}
