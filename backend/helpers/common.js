import User from '../models/user.js';
import ComplaintUpvoter from '../models/complaint_upvoters.js';
import Complaint from '../models/complaint.js';
import { errorNames } from './errorConstants.js';


const dateToString = date => new Date(date).toISOString();

const user = async userId => {
  try {

    let user = await User.findOne({
      _id: userId
    },
      {
        name: 1,
        identification_num: 1,
        _id: 1,
        email: 1
      }
    );

    if (!user) {
      throw new Error(errorNames.INVALID_USER);
    }
    return {
      ...user._doc,
      _id: user.id
    };
  } catch (err) {
    throw err;
  }
};

const transformComplaint = complaint => {
  return {
    ...complaint._doc,
    _id: complaint.id,
    createdAt: dateToString(complaint._doc.createdAt),
    updatedAt: dateToString(complaint._doc.updatedAt),
    complainee: user.bind(this, complaint._doc.complainee)
  };
};

const getComplaint = async (id, req_status = null) => {
  let conditions = { _id: id };
  conditions = req_status ? { ...conditions, status: req_status } : conditions;
  let result = await Complaint.findOne(conditions);
  return result;
};

const transformFeedback = async feedback => {
  return {
    ...feedback._doc,
    _id: feedback.id,
    createdAt: dateToString(feedback._doc.createdAt),
    updatedAt: dateToString(feedback._doc.updatedAt),
    feedbacker: user.bind(this, feedback._doc.feedbacker),
    feedback_complaint: transformComplaint.bind(this, await getComplaint(feedback._doc.complaint))
  };
};

const transformComment = async (comment, commented_complaint = null) => {
  return {
    ...comment._doc,
    _id: comment.id,
    createdAt: dateToString(comment._doc.createdAt),
    updatedAt: dateToString(comment._doc.updatedAt),
    complaint: commented_complaint ?? transformComplaint.bind(this, await getComplaint(comment._doc.complaint)),
    commenter: user.bind(this, comment._doc.commenter)
  };
};


const getupVoteStatus = async (cid, uid) => {
  try {
    let upvoter = await ComplaintUpvoter.findOne({
      complaint_id: cid,
      user_id: uid
    });
    return upvoter ? true : false;
  } catch (err) {
    throw err;
  }

};

const transformDetailComplaint = (complaint, userId) => {
  return {
    complaint: transformComplaint(complaint),
    upvoted: getupVoteStatus(complaint.id, userId),
    viewer: user.bind(this, userId)
  };
};

const transformResolvedComplaint = complaint => {
  return {
    ...complaint._doc,
    _id: complaint.id,
    createdAt: dateToString(complaint._doc.createdAt),
    updatedAt: dateToString(complaint._doc.updatedAt),
    complainee: user.bind(this, complaint._doc.complainee),
    resolvedBy: user.bind(this, complaint._doc.resolvedBy),
    resolvedAt: dateToString(complaint._doc.resolvedAt)
  };
};

export {
  transformComplaint,
  transformDetailComplaint,
  transformComment,
  getComplaint,
  transformFeedback,
  transformResolvedComplaint,
  getupVoteStatus
};