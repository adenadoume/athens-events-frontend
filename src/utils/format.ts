export function formatDate(isoDate: string): string {
  try {
    const d = new Date(isoDate)
    return d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return isoDate
  }
}

export function formatTime(isoDate: string): string {
  try {
    const d = new Date(isoDate)
    const hours = d.getHours()
    const minutes = d.getMinutes()
    if (hours === 0 && minutes === 0) return ''
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    concert: 'Live',
    dj: 'DJ Set',
    party: 'Party',
    electronic: 'Electronic',
  }
  return labels[category] ?? category
}

export function sourceLabel(source: string): string {
  const labels: Record<string, string> = {
    viva: 'Viva.gr',
    ticketswap: 'TicketSwap',
    ticketmaster: 'Ticketmaster',
    ra: 'Resident Advisor',
    door: 'Door',
    other: 'Tickets',
  }
  return labels[source] ?? source
}

export function placeholderImage(category: string): string {
  const colors: Record<string, string> = {
    concert: '7c3aed',
    dj: '06b6d4',
    party: 'ec4899',
    electronic: '10b981',
  }
  const color = colors[category] ?? '7c3aed'
  return `https://placehold.co/600x400/${color}/ffffff?text=Athens+Events`
}
