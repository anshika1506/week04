import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from 'recharts';

function Charts() {
  const [chartType, setChartType] = useState('line');
  const data = [
    { name: 'Jan', users: 400, sales: 2400 },
    { name: 'Feb', users: 300, sales: 1398 },
    { name: 'Mar', users: 200, sales: 9800 },
    { name: 'Apr', users: 278, sales: 3908 },
    { name: 'May', users: 189, sales: 4800 },
    { name: 'Jun', users: 239, sales: 3800 },
  ];

  return (
    <div>
      <h2>Analytics</h2>
      <div className="chart-toggle">
        <button
          className={chartType === 'line' ? 'active' : ''}
          onClick={() => setChartType('line')}
          aria-label="Show line chart"
        >
          Line Chart
        </button>
        <button
          className={chartType === 'bar' ? 'active' : ''}
          onClick={() => setChartType('bar')}
          aria-label="Show bar chart"
        >
          Bar Chart
        </button>
      </div>
      <div className="chart-container">
        <h3>{chartType === 'line' ? 'User Growth (Line)' : 'User Growth (Bar)'}</h3>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;