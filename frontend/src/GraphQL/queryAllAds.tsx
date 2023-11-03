import { gql } from "@apollo/client";

export const queryAllAds = gql`
  query Query {
    items: allAds {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
    }
  }
`;
