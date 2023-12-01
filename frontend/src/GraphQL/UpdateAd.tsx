import { gql } from "@apollo/client";

export const mutationUpdateAd = gql`
mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {
  updateAd(data: $data, id: $updateAdId) {
    title
    description
    owner
    price
    picture
    location
    category {
      type
    }
    tags {
      content
    }
  }
}
`;
