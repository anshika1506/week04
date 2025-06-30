import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Table from './components/Table';
import Charts from './components/Charts';
import Calendar from './components/Calendar';
import Kanban from './components/Kanban';
import { ThemeProvider } from './components/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/main.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    console.log('Sidebar toggled, isOpen:', !isSidebarOpen); // Debug log
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <Sidebar isOpen={isSidebarOpen} />
          <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
            <Header toggleSidebar={toggleSidebar} />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/table" element={<Table />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/kanban" element={<Kanban />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;