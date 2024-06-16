import { gql } from '@apollo/client';


export const LOGIN = gql`
  query Login($logInput : LogInput) {
    login(logInput: $logInput ) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($userInput : UserInput) {
    createUser(userInput: $userInput ) {
      _id
      name
    }
  }
`;

