import './EmptyState.css';

function EmptyState({ title, message, action }) {
  return (
    <div className="state-message empty-state" role="status">
      <div className="empty-state__icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="16" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 16V12a8 8 0 0 1 16 0v4" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="28" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
