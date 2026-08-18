import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import BrowseTools from './pages/BrowseTools/BrowseTools';
import ToolDetails from './pages/ToolDetails/ToolDetails';

// Component styles
import './components/StatusBadge/StatusBadge.css';
import './components/ToolGrid/ToolGrid.css';

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/browse" element={<BrowseTools />} />
          <Route path="/tools/:id" element={<ToolDetails />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
