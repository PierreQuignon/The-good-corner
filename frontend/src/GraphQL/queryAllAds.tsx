import { gql } from "@apollo/client";

export const queryAllAds = gql`
  query ads($where: AdsWhere) {
    items: allAds(where: $where) {
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
