const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'First Item' },
  { id: 2, name: 'Second Item' }
];
let nextId = 3;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get single item
app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = items.find(i => i.id === id);
  if (!found) return res.status(404).json({ error: 'Item not found' });
  res.json(found);
});

// Create item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  items[idx].name = name;
  res.json(items[idx]);
});

// Delete item
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  const removed = items.splice(idx, 1)[0];
  res.json(removed);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
