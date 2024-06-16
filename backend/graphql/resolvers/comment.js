import Comment from '../../models/comment.js';
import {transformComment, getComplaint, transformComplaint} from '../../helpers/common.js';
import { errorNames } from '../../helpers/errorConstants.js';

export default {
  createComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorNames.UNAUTHORIZED_CLIENT); 
    }

    let commented_complaint =await getComplaint(args.commentInput.complaint_id, 'Active');
    if (!commented_complaint) {
      throw new Error(errorNames.INVALID_COMPLAINT);
    }
    const comment = new Comment({
      comment_text: args.commentInput.comment_text,
      createdAt: new Date(),
      complaint: args.commentInput.complaint_id,
      commenter: req.userId
    });
    try {
      let result = await comment.save();
      return transformComment(result, await transformComplaint(commented_complaint));
    } catch (err) {
      throw err;
    }
  },


  listComments: async ({ complaintId }, req) => {
    if (!req.isAuth) {
       throw new Error(errorNames.UNAUTHORIZED_CLIENT); 
    }
    try {
      const comments = await Comment.find({
        complaint: complaintId
      });
      let commented_complaint = transformComplaint(await getComplaint(complaintId));
      return comments.map(comment => {
        return transformComment(comment, commented_complaint);
      });
    } catch (err) {
      throw err;
    }
  }

};