import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import BorrowRequestModal from '../../components/BorrowRequestModal/BorrowRequestModal';
import LoadingState from '../../components/LoadingState/LoadingState';
import ErrorState from '../../components/ErrorState/ErrorState';
import { getToolById } from '../../services/tools';
import { getPendingReservationForTool } from '../../services/reservations';
import './ToolDetails.css';

function ToolDetails() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [pendingReservation, setPendingReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const fetchTool = async () => {
    setLoading(true);
    setError(null);
    try {
      const [toolData, pendingData] = await Promise.all([
        getToolById(id),
        getPendingReservationForTool(id),
      ]);
      setTool(toolData);
      setPendingReservation(pendingData);
    } catch (err) {
      setError(err.message || 'Failed to load tool details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTool();
  }, [id]);

  const getActionState = () => {
    if (requestSubmitted || pendingReservation) return 'pending';
    if (tool.availability === 'available') return 'available';
    return 'unavailable';
  };

  const renderActionButton = () => {
    const actionState = getActionState();

    switch (actionState) {
      case 'available':
        return (
          <button
            type="button"
            className="btn btn-primary btn-lg btn-full tool-details__action-btn"
            onClick={() => setModalOpen(true)}
          >
            Request to Borrow
          </button>
        );
      case 'pending':
        return (
          <button type="button" className="btn btn-secondary btn-lg btn-full tool-details__action-btn" disabled>
            Request Pending
          </button>
        );
      default:
        return (
          <button type="button" className="btn btn-secondary btn-lg btn-full tool-details__action-btn" disabled>
            Currently Unavailable
          </button>
        );
    }
  };

  const handleRequestSuccess = () => {
    setRequestSubmitted(true);
    setPendingReservation({ toolId: Number(id), status: 'pending' });
  };

  if (loading) {
    return <LoadingState message="Loading tool details..." />;
  }

  if (error || !tool) {
    return (
      <ErrorState
        message={error || 'Tool not found.'}
        onRetry={fetchTool}
      />
    );
  }

  return (
    <div className="tool-details">
      <Link to="/browse" className="tool-details__back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Tools
      </Link>

      <div className="tool-details__layout">
        <div className="tool-details__image-section">
          <div className="tool-details__image-wrap card">
            <img src={tool.image} alt={tool.name} className="tool-details__image" />
          </div>
        </div>

        <div className="tool-details__info-section">
          <div className="tool-details__header">
            <h1>{tool.name}</h1>
            <StatusBadge status={tool.availability} />
          </div>

          <dl className="tool-details__meta">
            <div className="tool-details__meta-item">
              <dt>Category</dt>
              <dd>{tool.category}</dd>
            </div>
            <div className="tool-details__meta-item">
              <dt>Condition</dt>
              <dd>{tool.condition}</dd>
            </div>
            <div className="tool-details__meta-item">
              <dt>Owner</dt>
              <dd>{tool.owner.name}</dd>
            </div>
          </dl>

          <div className="tool-details__action tool-details__action--desktop">
            {renderActionButton()}
          </div>
        </div>
      </div>

      <div className="tool-details__content">
        <section className="tool-details__section card">
          <h2>Description</h2>
          <p>{tool.description}</p>
        </section>

        <section className="tool-details__section card">
          <h2>Lending Agreement</h2>
          <p className="tool-details__terms">{tool.lendingTerms}</p>
        </section>

        <section className="tool-details__section card">
          <h2>Additional Information</h2>
          <dl className="tool-details__additional">
            <div>
              <dt>Listed on</dt>
              <dd>{new Date(tool.addedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</dd>
            </div>
            <div>
              <dt>Tool ID</dt>
              <dd>#{tool.id}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="tool-details__action tool-details__action--mobile">
        {renderActionButton()}
      </div>

      <BorrowRequestModal
        tool={tool}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleRequestSuccess}
      />
    </div>
  );
}

export default ToolDetails;
