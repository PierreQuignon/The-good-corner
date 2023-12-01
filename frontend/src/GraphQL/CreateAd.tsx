import { gql } from "@apollo/client";

export const mutationCreateAd = gql`
  mutation createAd($data: AdInput!) {
    item: createAd(data: $data) {
      id
    }
  }
`;
