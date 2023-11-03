import { gql } from "@apollo/client";

export const mutationDeleteAd = gql`
  mutation DeleteAd($deleteAdId: ID!) {
    deleteAd(id: $deleteAdId) {
      id
      title
    }
  }
`;
