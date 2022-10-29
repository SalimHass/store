import React, { Component } from "react";
import "./Product.css";
import { GET_PRODUCT } from "../GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import parse from "html-react-parser";
import { withRouter } from "../router/withRouter";
import { addItem } from "./cart/cartSlice";
import { useSelector, useDispatch, connect } from "react-redux";
import Cart from "./Cart";
export class Product extends Component {
  productAttrAdded = { details: {} };


  attrAdded(name, value) {
    this.productAttrAdded.details.name
      ? (this.productAttrAdded.details.name = value)
      : (this.productAttrAdded.details[name] = value);

    
  }

  addToCart(data) {
    var fullProduct = {
    
    };
    
    fullProduct["name"] = data.product.name;
    fullProduct["id"] = data.product.id;
    fullProduct["brand"] = data.product.brand;
    fullProduct["gallery"] = data.product.gallery;
    fullProduct["price"] = data.product.prices;
    fullProduct["attrDetails"] = this.productAttrAdded;
    fullProduct["attributes"] = data.product.attributes;
    this.props.addItem(fullProduct);
    this.productAttrAdded = { details: {} };

    
  }

  render() {
    const { productId } = this.props.router.params;
    
    

    return (
      <Query query={GET_PRODUCT} variables={{ productId }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${JSON.stringify(error, null, 2)}`;
          
          const currentCurrency = this.props.selectedCurrency
          let price = data.product.prices[0]
          for(const p of data.product.prices)
          {
            if(p.currency.label===currentCurrency.label){
              price = p.amount
              break;
            }
          }
          return (

            <>
              <div className="product--container">
                <div className="">
                  {data.product.gallery.map((pic) => (
                    <img className="gallery-pics" src={pic} alt="pordcut-img" />
                  ))}
                </div>
                <div>
                  <img
                    className="main--pic"
                    src={data.product.gallery[0]}
                    alt="main-img"
                  />
                </div>
                <div className="product--details">
                  <div className="product--brand"> {data.product.brand}</div>
                  <div className="product--name">{data.product.name}</div>
                  <div>
                    {data.product.attributes.map((att) => (
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

                    <div className="product--price">price:</div>
                    <div className="product--price--number">
                      {`${this.props.selectedCurrency.symbol} ${price}`}
                    </div>

                    
                    <button
                      className="addToCart--btn"
                      onClick={() => this.addToCart(data)}
                    >
                      ADD TO CART
                    </button>
                    <div className="product--discreption">
                      {parse(`${data.product.description}`)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

function mapStateToProps(state) {
  const product = state.cart.product;
  const selectedCurrency = state.currency.currency;
  return {
    product,selectedCurrency
  };
}
const mapDispatchToProps = { addItem };



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
