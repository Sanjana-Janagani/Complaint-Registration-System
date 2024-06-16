import authResolver from './auth.js';
import complaintsResolver from './complaint.js';
import commentsResolver from './comment.js';
import feedbackResolver from './feedback.js';

const rootResolver = {
  ...authResolver,
  ...complaintsResolver,
  ...commentsResolver,
  ...feedbackResolver
};

export default rootResolver;