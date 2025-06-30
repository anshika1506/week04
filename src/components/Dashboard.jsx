import { useState } from 'react';

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('30d');
  const [expandedCard, setExpandedCard] = useState(null);

  const data = {
    '7d': { users: 300, sales: 2500, orders: 120, revenue: 15000 },
    '30d': { users: 1234, sales: 12345, orders: 567, revenue: 78910 },
    '90d': { users: 3500, sales: 35000, orders: 1500, revenue: 200000 },
  };

  const toggleCard = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div className="filter">
        <select onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod} aria-label="Select time period">
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>
      <div className="dashboard">
        <div className="card" onClick={() => toggleCard('users')} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && toggleCard('users')}>
          <h3>Active Users</h3>
          <p>{data[timePeriod].users}</p>
          {expandedCard === 'users' && <div className="card-details">Users active in the selected period</div>}
        </div>
        <div className="card" onClick={() => toggleCard('sales')} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && toggleCard('sales')}>
          <h3>Total Sales</h3>
          <p>${data[timePeriod].sales}</p>
          {expandedCard === 'sales' && <div className="card-details">Sales for the selected period</div>}
        </div>
        <div className="card" onClick={() => toggleCard('orders')} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && toggleCard('orders')}>
          <h3>Pending Orders</h3>
          <p>{data[timePeriod].orders}</p>
          {expandedCard === 'orders' && <div className="card-details">Orders awaiting processing</div>}
        </div>
        <div className="card" onClick={() => toggleCard('revenue')} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && toggleCard('revenue')}>
          <h3>Revenue</h3>
          <p>${data[timePeriod].revenue}</p>
          {expandedCard === 'revenue' && <div className="card-details">Total revenue for the selected period</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;