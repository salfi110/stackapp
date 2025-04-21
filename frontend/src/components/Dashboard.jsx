import { useState, useEffect } from 'react';
import API from '../api';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const fetchItems = async () => {
    const res = await API.get('/items'); // Make sure backend has /items route
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newItem) {
      alert('Write something!');
      return;
    }
    await API.post('/items', { name: newItem });
    setNewItem('');
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input placeholder="New item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
