import { gql } from "@apollo/client";

export const mutationSignUp = gql`
  mutation Signup($data: UserCreateInput!) {
    item: signup(data: $data) {
      id
    }
  }
`;
