import { gql } from "@apollo/client";

export const LOAD_DATA = gql`
  query {
    category {
      name
      products {
        name
        inStock
        gallery
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`
