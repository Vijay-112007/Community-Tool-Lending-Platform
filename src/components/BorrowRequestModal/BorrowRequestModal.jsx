import { useState } from 'react';
import { createReservation } from '../../services/reservations';
import './BorrowRequestModal.css';

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getDefaultEndDate() {
  const d = new Date();
  d.setDate(d.getDate() + 8);
  return d.toISOString().split('T')[0];
}

function BorrowRequestModal({ tool, isOpen, onClose, onSuccess }) {
  const [startDate, setStartDate] = useState(getTomorrow());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !tool) return null;

  const validate = () => {
    if (!startDate || !endDate) {
      return 'Please select both start and end dates.';
    }
    if (new Date(endDate) <= new Date(startDate)) {
      return 'End date must be after start date.';
    }
    if (!agreed) {
      return 'You must agree to the lending terms.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await createReservation({
        toolId: tool.id,
        startDate,
        endDate,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick} role="presentation">
      <div
        className="borrow-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="borrow-modal-title"
      >
        <div className="borrow-modal__header">
          <h2 id="borrow-modal-title">Request to Borrow</h2>
          <button type="button" className="borrow-modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="borrow-modal__tool-name">{tool.name}</p>

        <form onSubmit={handleSubmit}>
          <fieldset className="borrow-modal__fieldset">
            <legend>Borrowing Period</legend>
            <div className="borrow-modal__dates">
              <div className="form-group">
                <label htmlFor="start-date">From</label>
                <input
                  id="start-date"
                  type="date"
                  className="form-input"
                  value={startDate}
                  min={getTomorrow()}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-date">To</label>
                <input
                  id="end-date"
                  type="date"
                  className="form-input"
                  value={endDate}
                  min={startDate || getTomorrow()}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </fieldset>

          <div className="borrow-modal__terms">
            <h3>Lending Agreement</h3>
            <p>{tool.lendingTerms}</p>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree-terms">I agree to these terms.</label>
            </div>
          </div>

          {error && <p className="form-error borrow-modal__error" role="alert">{error}</p>}

          <div className="borrow-modal__actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BorrowRequestModal;
