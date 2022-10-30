import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "./cart/cartSlice";
import { withRouter } from "../router/withRouter";
import "./Cart.css";

import CartItem from "./CartItem";

export class Cart extends Component {
  render() {
    const products = this.props.products;
    const currency = this.props.currency;
    console.log(products);
    console.log(currency);
    let currIndex=0
    if (products.length){

      for(const p of products[0]?.price)
      {
        if(p.currency.label===currency.label){
          
          break;
        }
        currIndex++
      }
    }
   
    

    let sum = 0;
    products.map((p) => (sum = sum + (
      p.price[currIndex].amount*p.quantity)));
    let quantity=0;
    products.map((p) => (quantity = quantity + p.quantity));

    
    

    return (
      <div className="cart--hero">
        <div className="title--div">
          <h1 className="title--cart">CART</h1>
          <div className="title--line--main"></div>
        </div>
        {products.map((p) => (
          p.quantity? (<CartItem cartItem={p} />): (<></>)
        ))}
        
        <div className="summery--container">
        <p className="summery--tax"> Tax 21%:<span className="summery--numbers">{sum * 0.21}</span> </p>
        <p className="summery--tax"> Quantity:<span className="summery--numbers">{quantity}</span> </p>
         
          <p className="summery--tax"> Total:<span className="summery--numbers">{sum }</span> </p>
          <button className="btn--order">Order</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const products = state.cart.products;
  const currency = state.currency.currency;
  return {
    products,
    currency,
  };
}

const mapDispatchToProps = { addItem };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
