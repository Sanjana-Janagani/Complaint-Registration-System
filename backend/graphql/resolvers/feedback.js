import Feedback from '../../models/feedback.js';
import {getComplaint, transformFeedback} from '../../helpers/common.js';
import { errorNames } from '../../helpers/errorConstants.js';


export default {
    createFeedback: async (args, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT); 
        }
        let req_complaint = await getComplaint(args.feedbackInput.complaint_id, 'Resolved');
        if (!req_complaint) {
            throw new Error(errorNames.UNRESOLVED_COMPLAINT);
        }
        if (req_complaint.complainee != req.userId) {
            throw new Error(errorNames.FEEDBACK_UNAUTH);
        }
        try {
            let exist_feedback = await Feedback.findOne({
                complaint: args.feedbackInput.complaint_id,
                feedbacker: req.userId
            });
            if (exist_feedback) {
                throw new Error(errorNames.FEEDBACK_EXIST);
            }
            const feedback = new Feedback({
                feedback_text: args.feedbackInput.feedback_text,
                createdAt: new Date(),
                complaint: args.feedbackInput.complaint_id,
                feedbacker: req.userId
            });
            let result = await feedback.save();
            return transformFeedback(result);
        } catch (err) {
            throw err;
        }
    },


    getFeedback: async ({ complaintId }, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT); 
        }
        let req_complaint = await getComplaint(complaintId, 'Resolved');
        if (!req_complaint) {
            throw new Error(errorNames.UNRESOLVED_COMPLAINT);
        }
        if (!req.isDeanAuth) {
            throw new Error(errorNames.FEEDBACK_UNAUTH);
        }
        try {
            let feedback = await Feedback.findOne({
                complaint: complaintId
            });
            console.log(feedback);
            return transformFeedback(feedback);
        } catch (err) {
            throw err;
        }
    }
};