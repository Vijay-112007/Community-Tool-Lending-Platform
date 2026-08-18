import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge/StatusBadge';
import './ToolCard.css';

function ToolCard({ tool }) {
  return (
    <article className="tool-card card">
      <div className="tool-card__image-wrap">
        <img src={tool.image} alt={tool.name} className="tool-card__image" loading="lazy" />
        <div className="tool-card__badge">
          <StatusBadge status={tool.availability} size="small" />
        </div>
      </div>
      <div className="tool-card__body">
        <h3 className="tool-card__name">{tool.name}</h3>
        <p className="tool-card__meta">
          <span className="tool-card__category">{tool.category}</span>
          <span className="tool-card__separator">·</span>
          <span>{tool.condition}</span>
        </p>
        <p className="tool-card__owner">Owned by {tool.owner.name}</p>
        <Link to={`/tools/${tool.id}`} className="btn btn-secondary tool-card__action">
          View Tool
        </Link>
      </div>
    </article>
  );
}

export default ToolCard;
