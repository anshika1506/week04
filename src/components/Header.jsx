import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Header({ toggleSidebar }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="header">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        ☰
      </button>
      <h1>Admin Dashboard</h1>
      <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}

export default Header;