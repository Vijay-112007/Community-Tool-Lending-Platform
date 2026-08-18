const STATUS_CONFIG = {
  available: {
    label: 'Available',
    className: 'status-badge--available',
  },
  borrowed: {
    label: 'Borrowed',
    className: 'status-badge--borrowed',
  },
  pending: {
    label: 'Pending',
    className: 'status-badge--pending',
  },
  completed: {
    label: 'Completed',
    className: 'status-badge--completed',
  },
  active: {
    label: 'Active',
    className: 'status-badge--active',
  },
  unavailable: {
    label: 'Currently Unavailable',
    className: 'status-badge--unavailable',
  },
};

function StatusBadge({ status, size = 'default' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.unavailable;

  return (
    <span
      className={`status-badge ${config.className} ${size === 'small' ? 'status-badge--small' : ''}`}
      role="status"
    >
      <span className="status-badge__dot" aria-hidden="true" />
      {config.label}
    </span>
  );
}

export default StatusBadge;
