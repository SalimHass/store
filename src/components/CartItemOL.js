import React, { Component } from 'react'
import { connect } from "react-redux";
import arrowleft from "../img/arrowleft.png";
import arrowright from "../img/arrowright.png";
import { addItem,updateItem,removeItem } from "./cart/cartSlice";
import "./CartItemOL.css";


export class CartItemOL extends Component {
  constructor(props){
    super(props)
     
    // Set initial state
    this.state = {imgIndex : 0,
    }
    this.clickLeft = this.clickLeft.bind(this)
  }
  clickLeft(){
    (this.state.imgIndex-1)<0? (this.setState({imgIndex : this.props.cartItem.gallery.length-1 })):(this.setState({imgIndex : this.state.imgIndex-1 }))
     
  }
  clickRigth(){
    (this.state.imgIndex+1)>this.props.cartItem.gallery.length-1? (this.setState({imgIndex : 0 })):(this.setState({imgIndex : this.state.imgIndex+1 }))
     
  }

  render() {
    

    const pro=this.props.cartItem
    const currency = this.props.currency;
    console.log(this.props)
    
    

    
    
    
    

    let price = 0;
    for(const p of pro.price ){
      if(p.currency.label===currency.label){
        price = p.amount
        break;
      }
    }
     
    
  

   
    
    
    return (
      <div className="cart--prod--heroOL">
        
        <div className="cart--containerOL ">
          
            <div>
              <div className="pro--detailsOL">
                <div className="init--detailsOL">
                  <div className="pro--brandOL">{pro.brand}</div>
                  <div className="pro--nameOL">{pro.name}</div>
                  <div className="pro--priceOL">
                    {currency.symbol}
                    
                    {price*pro.quantity}
                  </div>
                  {pro.attributes.map((att) => (
                    <>
                      <div className="attr--nameOL"> {att.name}: </div>
                      <div>
                        {att.type === "swatch" ? (
                          <div className="attr--colorOL">
                            {att.items.map((item) => (
                                this.props.cartItem.attrDetails.Color===item.value? (<><div
                                  
                                 
                                  className="attr--color--boxOL color--selectedOL"
                                  style={{ background: `${item.value}` }}
                                ></div></>):(<><div
                                  onClick={() => this.props.updateItem(this.props.cartItem)}

                                  className="attr--color--boxOL"
                                  style={{ background: `${item.value}` }}
                                ></div></>)
                                
                              ))}
                          </div>
                        ) : (
                          <div className="attr--not--colorOL">
                            {att.items.map((item) => (
                                this.props.cartItem.attrDetails[att.name]!==item.value? (<div
                                  onClick={() => this.props.updateItem(this.props.cartItem)}
                                  className="attr--textOL"
                                >
                                  
                                  {item.value}
                                </div>):(<div
                                
                                  className="attr--text--selectedOL"
                                >
                                  
                                  {item.value}
                                </div>)
                               
                                
                              ))}
                          </div>
                        )}
                      </div>
                    </>
                  ))}
                </div>
                <div className="qnt--heroOL">
                  <div className="qnt--plusOL" onClick={() => this.props.addItem(pro)} >+</div>
                  <div className="pro--qntOL">{pro.quantity}</div>
                  <div className="qnt--minusOL" onClick={() => this.props.removeItem(pro)}>-</div>
                </div>
                <div className="pro--imgOL">
                  
                  <img
                    className="img--selector--imgOL"
                    
                    src={pro.gallery[this.state.imgIndex]}
                    
                    alt="pro pictures"
                  />
                  
                </div>
              </div>
              <div className="line--itemOL"></div>
            </div>
          
        </div>


      </div>
    )
  }
}


function mapStateToProps(state) {
    
    const currency = state.currency.currency;
    const product = state.cart.products;
    return {
      
      currency,product
    };
  }
  const mapDispatchToProps = { addItem,updateItem,removeItem };
export default connect(mapStateToProps,mapDispatchToProps)(CartItemOL)
