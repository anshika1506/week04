
import { useState } from 'react';
import Modal from './Modal';

function Table() {
  const [data, setData] = useState([
    { id: 1, name: 'Anshika Singh', email: 'anshika156s@gmail.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Dimple Gaur', email: 'dimplegaur22204@gmail.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Harshika', email: 'harshika1522@gmail.com', role: 'Editor', status: 'Active' },
    { id: 4, name: 'Shivni Sharma', email: 'shivani23@gmail.com', role: 'User', status: 'Pending' },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    setData(data.filter((item) => item.id !== deleteId));
    setSuccessMessage('User deleted successfully');
    setDeleteId(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="table-container">
      <h2>User Management</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search users"
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData('id')} aria-sort={sortConfig.key === 'id' ? sortConfig.direction : 'none'}>ID</th>
            <th onClick={() => sortData('name')} aria-sort={sortConfig.key === 'name' ? sortConfig.direction : 'none'}>Name</th>
            <th onClick={() => sortData('email')} aria-sort={sortConfig.key === 'email' ? sortConfig.direction : 'none'}>Email</th>
            <th onClick={() => sortData('role')} aria-sort={sortConfig.key === 'role' ? sortConfig.direction : 'none'}>Role</th>
            <th onClick={() => sortData('status')} aria-sort={sortConfig.key === 'status' ? sortConfig.direction : 'none'}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => setDeleteId(item.id)} aria-label={`Delete user ${item.name}`}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteId && (
        <Modal
          title="Confirm Delete"
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          confirmText="Delete"
          cancelText="Cancel"
        >
          Are you sure you want to delete this user?
        </Modal>
      )}
    </div>
  );
}

export default Table;