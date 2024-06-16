import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment_text: {
    type: String,
    required: true
  },
  upvote: {
    type: Number,
    required: true,
    default: 0
  },
  downvote: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: null
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null
  },
  complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint'
  },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}

});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
