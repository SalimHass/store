import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "./cart/cartSlice";
import { withRouter } from "../router/withRouter";
import "./Cart.css";
import arrowleft from "../img/arrowleft.png";
import arrowright from "../img/arrowright.png";

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
        <div className="cart--container">
          {products.map((pro) => (
            <div>
              <div className="pro--details">
                <div className="init--details">
                  <div className="pro--brand">{pro.brand}</div>
                  <div className="pro--name">{pro.name}</div>
                  <div className="pro--price">
                    {currency.symbol}
                    
                    {pro.price[currIndex].amount*pro.quantity}
                  </div>
                  {pro.attributes.map((att) => (
                    <>
                      <div className="attr--name"> {att.name}: </div>
                      <div>
                        {att.type === "swatch" ? (
                          <div className="attr--color">
                            {att.items.map((item) => (
                              <div
                                onClick={() =>
                                  this.attrAdded(att.name, item.value)
                                }
                                className="attr--color--box"
                                style={{ background: `${item.value}` }}
                              ></div>
                            ))}
                          </div>
                        ) : (
                          <div className="attr--not--color">
                            {att.items.map((item) => (
                              <div
                                onClick={() =>
                                  this.attrAdded(att.name, item.value)
                                }
                                className="attr--text"
                              >
                                {item.value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ))}
                </div>
                <div className="qnt--hero">
                  <div className="qnt--plus" >+</div>
                  <div className="pro--qnt">{pro.quantity}</div>
                  <div className="qnt--minus">-</div>
                </div>
                <div className="pro--img">
                  
                  <img
                    className="img--selector--img"
                    
                    src={pro.gallery[0]}
                    alt="pro pictures"
                  />
                  <div className="img--selector">
                    <div className="img--selector--arr">
                      <img src={arrowleft} alt="left arrow" />
                    </div>
                    <div className="img--selector--arr">
                      <img src={arrowright} alt="right arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="line--item"></div>
            </div>
          ))}
        </div>
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
