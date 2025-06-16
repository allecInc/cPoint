const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let items = [];
let idCounter = 1;

// Create item
app.post('/items', (req, res) => {
  const item = { id: idCounter++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// Read all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Read single item
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Update item
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  Object.assign(item, req.body);
  res.json(item);
});

// Delete item
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Item not found');
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
