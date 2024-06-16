import Complaint from '../../models/complaint.js';
import ComplaintUpvoter from '../../models/complaint_upvoters.js';
import { transformComplaint, transformDetailComplaint, transformResolvedComplaint, getupVoteStatus } from '../../helpers/common.js';
import { errorNames } from '../../helpers/errorConstants.js';


export default {
    createComplaint: async (args, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT);
        }
        const complaint = new Complaint({
            complaint_category: args.complaintInput.complaint_category,
            section: args.complaintInput.section,
            department: args.complaintInput.department,
            complaint_details: args.complaintInput.complaint_details,
            createdAt: new Date(),
            complainee: req.userId
        });
        try {
            let result = await complaint.save();
            return transformComplaint(result);
        } catch (err) {
            throw err;
        }
    },

    listComplaints: async ({ status, userId }, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT);
        }
        let conditions = status ? { status } : {};
        conditions = userId ? { ...conditions, complainee: userId } : conditions;
        try {
            const complaints = await Complaint.find(conditions);
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            await sleep(2000)
            return complaints.map(complaint => {
                return transformComplaint(complaint);
            });
        } catch (err) {
            throw err;
        }
    },

    upVoteComplaint: async ({ complaintId }, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT);
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId,
                    status: 'Active'
                }
            );
            if (!complaint) {
                throw new Error(errorNames.INVALID_COMPLAINT);
            }

            const isUpvoted = await getupVoteStatus(complaintId, req.userId);
            if (isUpvoted) {
                throw new Error(errorNames.ALREADY_UPVOTED);
            }
            if (complaint.complainee == req.userId) {
                throw new Error(errorNames.UPVOTE_NOT_ALLOWED);
            }
            let result = await Complaint.findByIdAndUpdate(
                { _id: complaintId },
                { $set: { upvotes: ++complaint._doc.upvotes } },
                { new: true });

            const upvoter = new ComplaintUpvoter({
                user_id: req.userId,
                complaint_id: complaintId,
                createdAt: new Date()
            });
            const stored = await upvoter.save();
            return transformComplaint(result);
        } catch (err) {
            throw err;
        }

    },

    viewComplaint: async ({ complaintId, userId }, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT);
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId
                }
            );
            if (!complaint) {
                throw new Error(errorNames.INVALID_COMPLAINT);
            }

            let result = await Complaint.findByIdAndUpdate(
                { _id: complaintId },
                { $set: { views: ++complaint._doc.views } },
                { new: true });
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            await sleep(2000)
            return transformDetailComplaint(result, userId);
        } catch (err) {
            throw err;
        }

    },

    viewResolvedComplaint: async ({ complaintId, userId }, req) => {
        if (!req.isAuth) {
            throw new Error(errorNames.UNAUTHORIZED_CLIENT);
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId
                }
            );
            if (!complaint) {
                throw new Error(errorNames.INVALID_COMPLAINT);
            }

            let result = await Complaint.findByIdAndUpdate(
                { _id: complaintId },
                { $set: { views: ++complaint._doc.views } },
                { new: true });

            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            await sleep(2000)
            return transformResolvedComplaint(result);
        } catch (err) {
            throw err;
        }

    },

    resolveComplaint: async (args, req) => {
        if (!req.isDeanAuth) {
            throw new Error(errorNames.UNAUTHORIZED_DEAN);
        }
        let new_text = args.resolveInput.resolveText ? args.resolveInput.resolveText : '';
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: args.resolveInput.complaintId,
                    status: 'Active'
                }, {
                status: 1
            }
            );
            if (!complaint) {
                throw new Error(errorNames.INVALID_COMPLAINT);
            }
            let result = await Complaint.findByIdAndUpdate(
                { _id: args.resolveInput.complaintId },
                {
                    $set: {
                        status: 'Resolved',
                        resolvement: new_text,
                        resolvedAt: new Date(),
                        resolvedBy: req.userId
                    }
                },
                { new: true }
            );
            return transformResolvedComplaint(result);
        } catch (err) {
            throw err;
        }
    }
};