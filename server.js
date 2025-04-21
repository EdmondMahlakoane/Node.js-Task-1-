const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample Data
let movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];

let series = [
  { id: 1, title: 'Breaking Bad', seasons: 5 },
  { id: 2, title: 'Stranger Things', seasons: 4 }
];

let songs = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd' },
  { id: 2, title: 'Bohemian Rhapsody', artist: 'Queen' }
];

// Helper
const getArrayByRoute = (route) => {
  if (route === 'movies') return movies;
  if (route === 'series') return series;
  if (route === 'songs') return songs;
  return null;
};

// GET
app.get('/:type', (req, res) => {
  const data = getArrayByRoute(req.params.type);
  if (!data) return res.status(404).send({ error: 'Not Found' });
  res.send(data);
});

// POST
app.post('/:type', (req, res) => {
  const data = getArrayByRoute(req.params.type);
  if (!data) return res.status(404).send({ error: 'Not Found' });

  const newItem = { id: data.length + 1, ...req.body };
  data.push(newItem);
  res.send(data);
});

// PUT
app.put('/:type/:id', (req, res) => {
  const data = getArrayByRoute(req.params.type);
  if (!data) return res.status(404).send({ error: 'Not Found' });

  const index = data.findIndex(item => item.id == req.params.id);
  if (index === -1) return res.status(404).send({ error: 'Item not found' });

  data[index] = { ...data[index], ...req.body };
  res.send(data);
});

// DELETE
app.delete('/:type/:id', (req, res) => {
  const data = getArrayByRoute(req.params.type);
  if (!data) return res.status(404).send({ error: 'Not Found' });

  const index = data.findIndex(item => item.id == req.params.id);
  if (index === -1) return res.status(404).send({ error: 'Item not found' });

  data.splice(index, 1);
  res.send(data);
});

// 404 for all other routes
app.use((req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
