import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  identification_num : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'dean'],
    default: 'student',
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: null
  },
});

const User = mongoose.model('User', userSchema);
export default User;
