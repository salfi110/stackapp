const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

let users = [];
let items = [];
let idCounter = 1;

// Register
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).send('User already exists');
  }
  users.push({ email, password });
  res.send('Registered successfully');
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Login successful');
});

// Get Items
app.get('/items', (req, res) => {
  res.json(items);
});

// Add Item
app.post('/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.json(newItem);
});

// Delete Item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id != id);
  res.send('Item deleted');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
