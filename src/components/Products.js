import React, { Component } from 'react'
import "./Products.css";
import {Link} from "react-router-dom";


export class Products extends Component {
  render() {
    return (
        
      <Link className='links' to={`/product/${this.props.product.id}`}>
      <div className='container'>

<img className='prod--img' src={this.props.product.gallery[0]} alt="product img"></img>
<div className='prod--name'>{this.props.product.name}</div>
<div className='prod--price'>{this.props.product.prices[0].currency.label}{this.props.product.prices[0].amount}</div>

</div>
</Link>
    )
  }
}

export default Products