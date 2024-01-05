import { gql } from "@apollo/client";

export const queryMe = gql`
  query Query {
    item: me {
      email
      id
    }
  }
`;
