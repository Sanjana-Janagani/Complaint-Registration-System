import { gql } from "@apollo/client";

export const LIST_COMMENTS = gql`
  query LIST_COMMENTS($complaintId : ID!) {
    listComments(complaintId: $complaintId ) {
        _id,
        comment_text,
        commenter{
            name
        }
    }
  }
`;



export const CREATE_COMMENT = gql`
  mutation CreateComment($commentInput: CommentInput) {
    createComment(commentInput: $commentInput) {
      _id
    }
  }
`;
