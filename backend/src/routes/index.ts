// API Routes
import express from 'express';

const router = express.Router();

// Example route
router.get('/example', (req, res) => {
  res.json({ message: 'Example route' });
});

export default router;
