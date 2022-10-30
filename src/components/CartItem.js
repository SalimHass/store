import React, { Component } from 'react'
import { connect } from "react-redux";
import arrowleft from "../img/arrowleft.png";
import arrowright from "../img/arrowright.png";
import { addItem,updateItem,removeItem } from "./cart/cartSlice";


export class CartItem extends Component {
  constructor(props){
    super(props)
     
    // Set initial state
    this.state = {imgIndex : 0}
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
    //const this.cartItem = this.props.this.cartItem;
    const currency = this.props.currency;
    
    

    
    
    
    

    let price = 0;
    for(const p of pro.price ){
      if(p.currency.label===currency.label){
        price = p.amount
        break;
      }
    }
     
    
  

   
    
    
    return (
      <div className="cart--prod--hero">
        
        <div className="cart--container">
          
            <div>
              <div className="pro--details">
                <div className="init--details">
                  <div className="pro--brand">{pro.brand}</div>
                  <div className="pro--name">{pro.name}</div>
                  <div className="pro--price">
                    {currency.symbol}
                    
                    {price*pro.quantity}
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
                  <div className="qnt--plus" onClick={() => this.props.addItem(pro)} >+</div>
                  <div className="pro--qnt">{pro.quantity}</div>
                  <div className="qnt--minus" onClick={() => this.props.removeItem(pro)}>-</div>
                </div>
                <div className="pro--img">
                  
                  <img
                    className="img--selector--img"
                    
                    src={pro.gallery[this.state.imgIndex]}
                    
                    alt="pro pictures"
                  />
                  <div className="img--selector">
                    <div className="img--selector--arr" onClick={()=>this.clickLeft()}>
                      <img src={arrowleft} alt="left arrow" />
                    </div>
                    <div className="img--selector--arr" onClick={()=> this.clickRigth()}>
                      <img src={arrowright} alt="right arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="line--item"></div>
            </div>
          
        </div>


      </div>
    )
  }
}


function mapStateToProps(state) {
    
    const currency = state.currency.currency;
    return {
      
      currency,
    };
  }
  const mapDispatchToProps = { addItem,updateItem,removeItem };
export default connect(mapStateToProps,mapDispatchToProps)(CartItem)
