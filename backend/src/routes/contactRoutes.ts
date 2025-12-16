import express from 'express';
import { Contact } from '../models/Contact';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/contacts - Create a new contact
router.post('/', protect, async (req, res) => {
  try {
    const { name, email, subject, message, city, region, type } = req.body;
    
    // Simple logic to infer type/city if not provided (mocking geo-location for now)
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      city: city || 'Mumbai', // Default for demo
      region: region || 'Maharashtra', // Default for demo
      type: type || 'General'
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/contacts - Get all contacts (Admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/contacts/stats - Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    
    // Group by Type
    const typeStats = await Contact.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    // Group by Region
    const regionStats = await Contact.aggregate([
      { $group: { _id: '$region', count: { $sum: 1 } } }
    ]);

    // Group by City
    const cityStats = await Contact.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } }
    ]);

    res.json({
      totalContacts,
      typeStats,
      regionStats,
      cityStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
