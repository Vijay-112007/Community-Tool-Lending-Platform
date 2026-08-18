import './SummaryCard.css';

function SummaryCard({ label, count, icon, variant = 'default' }) {
  return (
    <div className={`summary-card card summary-card--${variant}`}>
      <div className="summary-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="summary-card__content">
        <span className="summary-card__count">{count}</span>
        <span className="summary-card__label">{label}</span>
      </div>
    </div>
  );
}

export default SummaryCard;
