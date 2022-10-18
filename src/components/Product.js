import React, { Component } from 'react'

export class Product extends Component {
    
    
  render() {
    return (
        <>
        <div>
        {this.props.product.name}
        </div>
        </>
    )
  }
}

export default Product