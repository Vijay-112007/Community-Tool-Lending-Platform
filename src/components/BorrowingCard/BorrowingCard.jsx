import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge/StatusBadge';
import './BorrowingCard.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function BorrowingCard({ borrowing }) {
  return (
    <article className="borrowing-card card">
      <img
        src={borrowing.toolImage}
        alt={borrowing.toolName}
        className="borrowing-card__image"
        loading="lazy"
      />
      <div className="borrowing-card__body">
        <div className="borrowing-card__header">
          <h3 className="borrowing-card__name">{borrowing.toolName}</h3>
          <StatusBadge status={borrowing.status} size="small" />
        </div>
        <p className="borrowing-card__owner">Owner: {borrowing.owner.name}</p>
        <p className="borrowing-card__period">
          {formatDate(borrowing.startDate)} — {formatDate(borrowing.endDate)}
        </p>
        <p className="borrowing-card__due">
          Due: <strong>{formatDate(borrowing.dueDate)}</strong>
        </p>
        <Link to={`/tools/${borrowing.toolId}`} className="btn btn-ghost borrowing-card__action">
          View
        </Link>
      </div>
    </article>
  );
}

export default BorrowingCard;
