import './ErrorState.css';

function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="state-message error-state" role="alert">
      <div className="error-state__icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
          <path d="M24 16v12M24 32v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="error-state__title">Unable to load</h3>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-secondary error-state__retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
