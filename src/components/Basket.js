import React, { Component } from 'react'
import "./Basket.css"
import basket from "../img/basket.svg"
import { connect } from 'react-redux'
import {Link} from "react-router-dom";


export class Basket extends Component {
  render() {
    const sum = this.props.products.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,0
    )
    return (
      <Link to="/cart" className='basket--nav'>
        <img className='basket--img'  src={basket} alt="Basket"/>
        <div className='basket--items'>{sum}</div>
        
      </Link>
    )
  }
}



function mapStateToProps(state) {
    
  const products = state.cart.products;
  return {
      products
  };
}

export default connect(mapStateToProps)(Basket);