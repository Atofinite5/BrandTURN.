import express from 'express';
import { Contact } from '../models/Contact';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/contacts - Create a new contact (PUBLIC - no auth required)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, city, region, type } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject) {
      return res.status(400).json({ message: 'Name, email, and subject are required' });
    }

    // Determine inquiry type based on subject/message content
    let inferredType = type || 'General';
    const lowerSubject = (subject + ' ' + message).toLowerCase();
    if (lowerSubject.includes('business') || lowerSubject.includes('partnership') || lowerSubject.includes('company')) {
      inferredType = 'Business';
    } else if (lowerSubject.includes('support') || lowerSubject.includes('help') || lowerSubject.includes('issue')) {
      inferredType = 'Support';
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message: message || '',
      city: city || 'Unknown',
      region: region || 'Unknown',
      type: inferredType
    });

    await newContact.save();
    res.status(201).json({ success: true, message: 'Contact submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact', error });
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
