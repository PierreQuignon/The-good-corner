import { gql } from "@apollo/client";

export const queryCategories = gql`
  query Query {
    items: allCategories {
      id
      type
    }
  }
`;
