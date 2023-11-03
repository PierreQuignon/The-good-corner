import { gql } from "@apollo/client";

export const queryAdsByCategory = gql`
query AdsByCategory($categoryId: ID!) {
  items: adsByCategory(categoryId: $categoryId) {
    id
    title
    description
  }
}
`
