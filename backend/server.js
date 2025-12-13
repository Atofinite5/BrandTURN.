const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BrandTURN Backend API' });
});

// API routes for frontend integration
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Placeholder routes for potential frontend needs
app.get('/api/blog', (req, res) => {
  // Placeholder for blog posts
  res.json({ posts: [] });
});

app.post('/api/contact', (req, res) => {
  // Placeholder for contact form
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  res.json({ success: true, message: 'Message received' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
