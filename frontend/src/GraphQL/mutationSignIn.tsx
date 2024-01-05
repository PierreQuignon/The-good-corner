import { gql } from "@apollo/client";

export const mutationSignIn = gql`
  mutation Signin($password: String!, $email: String!) {
    item: signin(password: $password, email: $email) {
      id
    }
  }
`;
