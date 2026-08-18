import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGreeting } from '../../hooks/useGreeting';
import SearchBar from '../../components/SearchBar/SearchBar';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import BorrowingCard from '../../components/BorrowingCard/BorrowingCard';
import ToolCard from '../../components/ToolCard/ToolCard';
import LoadingState from '../../components/LoadingState/LoadingState';
import { getBorrowings, getBorrowingSummary } from '../../services/borrowings';
import { getRecentTools } from '../../services/tools';
import { getNotifications } from '../../services/notifications';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const greeting = useGreeting();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [summary, setSummary] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [recentTools, setRecentTools] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getBorrowingSummary(),
      getBorrowings(),
      getRecentTools(6),
      getNotifications(),
    ])
      .then(([summaryData, borrowingsData, toolsData, notificationsData]) => {
        setSummary(summaryData);
        setBorrowings(borrowingsData);
        setRecentTools(toolsData);
        setNotifications(notificationsData.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    navigate(`/browse?search=${encodeURIComponent(query)}`);
  };

  const activeBorrowings = borrowings.filter((b) => b.status === 'active');

  if (loading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard">
      <section className="dashboard__hero">
        <div className="dashboard__greeting">
          <h1>{greeting}, {user?.name}</h1>
          <p>Find something useful from your community.</p>
        </div>
        <div className="dashboard__search">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            showBrowseButton
            onBrowse={() => navigate('/browse')}
          />
        </div>
      </section>

      <section className="section dashboard__summary">
        <div className="dashboard__summary-grid">
          <SummaryCard
            label="Active Borrowings"
            count={summary?.activeBorrowings ?? 0}
            variant="success"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" />
                <path d="M16 7V5a4 4 0 0 0-8 0v2" stroke="currentColor" strokeWidth="2" />
              </svg>
            }
          />
          <SummaryCard
            label="Pending Requests"
            count={summary?.pendingRequests ?? 0}
            variant="warning"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <SummaryCard
            label="Due Soon"
            count={summary?.dueSoon ?? 0}
            variant="default"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
        </div>
      </section>

      <section className="section" id="my-borrowings">
        <div className="section-header">
          <h2>Current Borrowings</h2>
        </div>
        {activeBorrowings.length > 0 ? (
          <div className="dashboard__borrowings">
            {activeBorrowings.map((borrowing) => (
              <BorrowingCard key={borrowing.id} borrowing={borrowing} />
            ))}
          </div>
        ) : (
          <p className="dashboard__empty-text">You have no active borrowings right now.</p>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recently Added Tools</h2>
          <Link to="/browse" className="section-link">View all</Link>
        </div>
        <div className="tool-grid tool-grid--horizontal">
          {recentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {notifications.length > 0 && (
        <section className="section dashboard__notifications">
          <div className="section-header">
            <h2>Recent Notifications</h2>
          </div>
          <ul className="dashboard__notification-list">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`dashboard__notification ${!notification.read ? 'dashboard__notification--unread' : ''}`}
              >
                <span className="dashboard__notification-dot" aria-hidden="true" />
                <span>{notification.message}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
