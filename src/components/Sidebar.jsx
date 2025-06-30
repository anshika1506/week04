import { Link } from 'react-router-dom';

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? '' : 'collapsed'}`} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <h2>Menu</h2>
      <Link to="/" aria-label="Go to Dashboard" data-icon="🏠">Dashboard</Link>
      <Link to="/table" aria-label="Go to Users" data-icon="👤">Users</Link>
      <Link to="/charts" aria-label="Go to Analytics" data-icon="📊">Analytics</Link>
      <Link to="/calendar" aria-label="Go to Calendar" data-icon="📅">Calendar</Link>
      <Link to="/kanban" aria-label="Go to Kanban" data-icon="📋">Kanban</Link>
    </div>
  );
}

export default Sidebar;