import { MapPin, Calendar, Clock, Tag } from 'lucide-react'
import type { Event } from '../types/event'
import { formatDate, formatTime, categoryLabel, sourceLabel, placeholderImage } from '../utils/format'

interface Props {
  event: Event
}

export function EventCard({ event }: Props) {
  const time = formatTime(event.date)
  const imgSrc = event.image_url || placeholderImage(event.category)

  return (
    <article className="event-card">
      <div className="card-image-wrapper">
        <img
          src={imgSrc}
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage(event.category)
          }}
        />
        <span className={`badge badge-${event.category}`}>{categoryLabel(event.category)}</span>
        {event.price && <span className="price-badge">{event.price}</span>}
      </div>

      <div className="card-body">
        <h3 className="event-title">{event.title}</h3>

        {event.artists.length > 0 && (
          <p className="artists">{event.artists.join(' · ')}</p>
        )}

        <div className="event-meta">
          <span className="meta-item">
            <Calendar size={13} />
            {formatDate(event.date)}
          </span>
          {time && (
            <span className="meta-item">
              <Clock size={13} />
              {time}
            </span>
          )}
          <span className="meta-item">
            <MapPin size={13} />
            {event.venue}{event.location && event.location !== 'Athens' ? `, ${event.location}` : ''}
          </span>
        </div>

        <p className="description">{event.description}</p>

        <div className="card-footer">
          <span className="source-badge">
            <Tag size={11} />
            {sourceLabel(event.ticket_source)}
          </span>
          <a
            href={event.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            onClick={(e) => !event.ticket_url && e.preventDefault()}
          >
            Get Tickets →
          </a>
        </div>
      </div>
    </article>
  )
}
