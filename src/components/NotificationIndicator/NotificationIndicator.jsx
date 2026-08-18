import './NotificationIndicator.css';

function NotificationIndicator({ count = 0 }) {
  return (
    <span className="notification-indicator" aria-label={`${count} unread notifications`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {count > 0 && (
        <span className="notification-indicator__badge">{count > 9 ? '9+' : count}</span>
      )}
    </span>
  );
}

export default NotificationIndicator;
