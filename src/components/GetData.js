import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components';


import { LOAD_DATA } from '../GraphQL/Queries'

class GetData extends Component {
  
  render() {
      

    
    
    return (
      <Query query={LOAD_DATA} >
        
        {({data}) =>
        
        <div> Render data here ...</div>}
      </Query>
    )
  }
}

export default GetData;