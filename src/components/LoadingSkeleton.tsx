export function LoadingSkeleton() {
  return (
    <div className="event-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-meta" />
            <div className="skeleton skeleton-meta" style={{ width: '60%' }} />
            <div className="skeleton skeleton-desc" />
            <div className="skeleton skeleton-desc" style={{ width: '80%' }} />
            <div className="skeleton skeleton-btn" />
          </div>
        </div>
      ))}
    </div>
  )
}
