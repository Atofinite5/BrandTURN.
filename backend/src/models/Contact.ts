import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    default: 'Unknown',
  },
  region: {
    type: String,
    default: 'Unknown',
  },
  type: {
    type: String,
    enum: ['Business', 'General', 'Support', 'Other'],
    default: 'General',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.model('Contact', contactSchema);
