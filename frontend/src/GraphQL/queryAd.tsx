import { gql } from "@apollo/client";

export const queryAd = gql`
  query ad($id: ID!) {
    item: ad(id: $id) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        id
        type
      }
      tags {
        id
        content
      }
    }
  }
`;
