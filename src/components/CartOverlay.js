import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "./cart/cartSlice";
import { withRouter } from "../router/withRouter";
import "./CartOverlay.css";
import { Link } from "react-router-dom";

import CartItemOL from "./CartItemOL";

export class CartOverlay extends Component {
  render() {
    const products = this.props.products;
    const currency = this.props.currency;

    let currIndex = 0;
    if (products.length) {
      for (const p of products[0]?.price) {
        if (p.currency.label === currency.label) {
          break;
        }
        currIndex++;
      }
    }

    let sum = 0;
    products.map((p) => (sum = sum + p.price[currIndex].amount * p.quantity));
    let quantity = 0;
    products.map((p) => (quantity = quantity + p.quantity));

    return (
      <div className="overlay--full">
        <div className="overlay--hero">
          <div className="bag--title--div">
            <h1 className="title--bag">My Bag: {quantity} items</h1>
          </div>

          {products.map((p) =>
            p.quantity ? <CartItemOL cartItem={p} /> : <></>
          )}

          <div className="total--container">
            <div className="summery--total"> Total: </div>
            <div className="summery--numbers">
              {this.props.currency.symbol}
              {sum}
            </div>
          </div>
          <div className="btns--container">
            <Link to="/cart" className="cart--link">
              <div className="btn--viewbag">VIEW BAG</div>
            </Link>
            <div className="btn--checkout">CHECK OUT</div>
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartOverlay));
