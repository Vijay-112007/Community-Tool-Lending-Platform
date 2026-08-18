import './LoadingState.css';

function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="state-message loading-state" role="status" aria-live="polite">
      <div className="loading-state__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;
