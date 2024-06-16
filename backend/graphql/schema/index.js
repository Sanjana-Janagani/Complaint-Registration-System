import { buildSchema } from 'graphql';

const complaint_schema =  buildSchema(`
type Complaint {
  _id: ID!
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
  status: String!
  upvotes: Int!
  views: Int!
  resolvement: String
  resolvedBy: User
  resolvedAt: String
  updatedAt: String
  complainee: User!
}

type ResolvedComplaint {
  _id: ID!
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
  createdAt: String!
  status: String!
  upvotes: Int!
  views: Int!
  resolvement: String
  resolvedBy: User!
  resolvedAt: String!
  updatedAt: String
  complainee: User!
}

type Comment{
  _id: ID!
  comment_text: String!
  createdAt: String!
  updatedAt: String
  complaint: Complaint!
  commenter: User!
}


type User {
  _id: ID!
  name: String!
  identification_num: String!
  email: String!
}

type AuthData {
  token: String!
  userId: String!
  role: String!
}

type Feedback {
  _id: ID!
  feedback_text: String!
  createdAt: String!
  updatedAt: String
  feedbacker: User!
  feedback_complaint: Complaint!
}

type DetailComplaint{
  complaint: Complaint!
  upvoted: Boolean!
  viewer: User!
}

input ComplaintInput {
  complaint_category: String!
  section: String!
  department: String!
  complaint_details: String!
}

input CommentInput {
  comment_text: String!
  complaint_id: ID!
}

input FeedbackupInput {
  feedback_text: String!
  complaint_id: ID!
}

input ResolveInput {
  resolveText: String
  complaintId: ID!
}

input UserInput {
  name : String!
  identification_num: String!
  email: String!
  password: String!
  role: String
}

input LogInput{
  identification_num: String!
  password: String!
  role: String
}

type RootQuery {
    listComplaints(status: String, userId: ID): [Complaint!]!
    listComments(complaintId: ID!): [Comment!]!
    login(logInput: LogInput): AuthData!
    getFeedback(complaintId: ID!): Feedback!
    viewComplaint(complaintId: ID!, userId: ID!): DetailComplaint
    viewResolvedComplaint(complaintId: ID!, userId: ID!): ResolvedComplaint
}

type RootMutation {
    createComplaint(complaintInput: ComplaintInput): Complaint
    createUser(userInput: UserInput): User
    createComment(commentInput: CommentInput): Comment
    upVoteComplaint(complaintId: ID!): Complaint
    resolveComplaint(resolveInput: ResolveInput): ResolvedComplaint
    createFeedback(feedbackInput: FeedbackupInput!): Feedback
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

export default complaint_schema;