import React, {Component} from "react";
import "./Products.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import basketWhite from "../../img/basketWhite.svg";
import {addItem} from "../../features/cart/cartSlice";

export class Products extends Component {
    constructor(props) {
        super(props)

        this.addToCart = this.addToCart.bind(this)

    }

    addToCart(product) {
        var fullProduct = {};
        console.log(product, "inside")

        fullProduct["name"] = product.name;
        fullProduct["id"] = product.id;
        fullProduct["brand"] = product.brand;
        fullProduct["gallery"] = product.gallery;
        fullProduct["price"] = product.prices;
        let details = {}
        product.attributes.forEach(element => {
            details[element.name] = element.items[0].value

        });

        fullProduct["attrDetails"] = details
        fullProduct["attributes"] = product.attributes;
        console.log(fullProduct, "full")
        this.props.addItem(fullProduct);


    }

    render() {
        const currentCurrency = this.props.selectedCurrency;
        let price = this.props.product.prices[0];
        for (const p of this.props.product.prices) {
            if (p.currency.label === currentCurrency.label) {
                price = p.amount;
                break;
            }
        }

        return (
            <>

                {this.props.product.inStock ? (

                    <div className="container">
                        <Link className="links" to={`/product/${this.props.product.id}`}>
                            <div className="img--container">

                                <img
                                    className="prod--img"
                                    src={this.props.product.gallery[0]}
                                    alt="product img"
                                />
                            </div>
                            <div className="prod--name">{this.props.product.name}</div>
                            <div className="prod--price">
                                {currentCurrency.symbol}
                                {price}
                            </div>
                        </Link>
                        <div className="basket--img--pro--circ" onClick={() => this.addToCart(this.props.product)}>
                            <img
                                src={basketWhite}
                                alt="basket--img--pro"
                                className=""
                            />
                        </div>
                    </div>

                ) : (
                    <>
                        <Link className="links" to={`/product/${this.props.product.id}`}>
                            <div className="container--out ">
                                <div className="text--outof">OUT OF STOCK</div>
                                <img
                                    className="prod--img"
                                    src={this.props.product.gallery[0]}
                                    alt="product img"
                                />
                                <div className="prod--name">{this.props.product.name}</div>
                                <div className="prod--price">
                                    {currentCurrency.symbol}
                                    {price}
                                </div>

                            </div>
                        </Link>
                    </>
                )}
            </>
        );
    }
}

function mapStateToProps(state) {
    const product = state.cart.products;
    const selectedCurrency = state.currency.currency;
    return {
        selectedCurrency,
    };
}

const mapDispatchToProps = {addItem};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
