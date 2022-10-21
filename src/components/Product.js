import React, { Component } from "react";
import "./Product.css";
import { GET_TEST_PRODUCT } from "../GraphQL/Queries";
import { Query } from "@apollo/client/react/components";

export class Product extends Component {
  render() {
    return (
      <Query query={GET_TEST_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${JSON.stringify(error, null, 2)}`;
          return (
            <>
              {console.log(data.product)}
              <div className="product--container">
                <div className="">
                  {data.product.gallery.map((pic) => (
                    <img className="gallery-pics" src={pic} alt="pordcut-img" />
                  ))}
                </div>
                <div>
                  <img
                    className="main-pic"
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
                          {att.type !== "color" ? (
                            <div className="attr--not--color">
                              {att.items.map((item) => (
                                <div className="attr--text">{item.value}</div>
                              ))}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </>
                    ))}

                    <div className="product--price">price:</div>
                    <div className="product--price--number">
                      {`${data.product.prices[0].currency.symbol} ${data.product.prices[0].amount}`}
                    </div>
                    <button className="addToCart--btn">ADD TO CART
                    </button>
                    <div className="product--discreption">
                        {data.product.description}
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

export default Product;
