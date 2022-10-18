import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components';

import Product from "./Product.js"
import { LOAD_DATA } from '../GraphQL/Queries'

class GetData extends Component {
  
  render() {
      

    
    
    return (
      <Query query={LOAD_DATA} >
        
        {({loading,data}) =>{
          if (loading) return "Loading...."
          return (
            <div>
              {console.log(data)}
            {
              data.category.products.map(product => (
                <>
                <Product key={product.name} product={product}/>
                
              </>
                ))
              }
              </div>

          )

        }
      }
        
      </Query>
    )
  }
}

export default GetData;