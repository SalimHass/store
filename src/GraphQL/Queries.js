import {gql} from "@apollo/client";

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
export const GET_CATEGORY_Currency_LIST = gql`
query {
  categories {
    name
  }
  currencies {
    label
    symbol
  }
}`;

export const GET_PRODUCTS_CATEGORY = gql`
query products($category: String!) {
  category(input: { title: $category }) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      brand
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}`;


export const GET_TEST_PRODUCT = gql`
query {
  product(id:  "ps-5" ){
    name
    inStock
    gallery
    description
   brand
    attributes{
      name
      type
      items{
        displayValue
        value
        id
      }
      
      
    }
    prices{
      currency{
        label
        symbol
        
      }
      amount
      
    }
    
  }
  
  
}`

export const GET_PRODUCT = gql`
query getProduct($productId: String!) {
  product(id: $productId){
    id
    name
    inStock
    gallery
    description
   brand
    attributes{
      name
      type
      items{
        displayValue
        value
        id
      }
    }
    prices{
      currency{
        label
        symbol
      }
      amount
    }
  }
   
}`