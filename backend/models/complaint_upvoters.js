import mongoose from 'mongoose';

const complaintUpvoterSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  complaint_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint'
  },
  createdAt: {
    type: Date,
    required: false,
    default: null
  }
});

const ComplaintUpvoter = mongoose.model('ComplaintUpvoter', complaintUpvoterSchema);
export default ComplaintUpvoter;
