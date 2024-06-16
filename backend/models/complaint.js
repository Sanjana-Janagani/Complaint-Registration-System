import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  complaint_category: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  complaint_details: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false,
    enum: ['Active', 'Resolved'],
    default: 'Active'
  },
  upvotes: {
    type: Number,
    required: false,
    default: 0
  },
  views: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: null
  },
  resolvement: {
    type: String,
    required: false,
    default: ''
  },
  resolvedAt: {
    type: Date,
    required: false,
    default: null
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null
  },
  complainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
