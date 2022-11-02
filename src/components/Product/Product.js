import React, {Component} from "react";
import "./Product.css";
import {GET_PRODUCT} from "../../GraphQL/Queries";
import {Query} from "@apollo/client/react/components";
import parse from "html-react-parser";
import {withRouter} from "../../router/withRouter";
import {addItem} from "../../features/cart/cartSlice";
import {connect} from "react-redux";

export class Product extends Component {


    constructor(props) {
        super(props)


        this.state = {productAttrAdded: {details: {}},
                        imgIndex: 0}
        this.attrAdded = this.attrAdded.bind(this)
        this.selectImg=this.selectImg.bind(this)

    }
    selectImg(index){
        this.setState(p=> ({
         imgIndex:index
        }));
     }
    attrAdded(name, value) {

        (this.setState(prevState => ({
            productAttrAdded: {
                details: {
                    ...prevState.productAttrAdded.details,
                    [name]: value
                }
            }
        })))

    }


    addToCart(data) {
        var fullProduct = {};

        fullProduct["name"] = data.product.name;
        fullProduct["id"] = data.product.id;
        fullProduct["brand"] = data.product.brand;
        fullProduct["gallery"] = data.product.gallery;
        fullProduct["price"] = data.product.prices;
        fullProduct["attrDetails"] = this.state.productAttrAdded.details;
        fullProduct["attributes"] = data.product.attributes;
        this.props.addItem(fullProduct);


    }

    render() {
        const {productId} = this.props.router.params;
        const atrAddLength = this.attrAddLenght = Object.keys(this.state.productAttrAdded.details).length


        return (
            <Query query={GET_PRODUCT} variables={{productId}}>
                {({loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${JSON.stringify(error, null, 2)}`;
                    const attLength = Object.keys(data.product.attributes).length
                    const currentCurrency = this.props.selectedCurrency
                    let price = data.product.prices[0]
                    for (const p of data.product.prices) {
                        if (p.currency.label === currentCurrency.label) {
                            price = p.amount
                            break;
                        }
                    }

                    return (

                        <>
                            <div className="product--container">
                                <div className="">
                                    {console.log(data.product.gallery)}
                                    {data.product.gallery.map((pic , index) => (
                                        

                                        <img  className="gallery-pics" src={pic} alt="pordcut-img" onClick={()=>this.selectImg(index)} />
                                       
                                        

                                    ))}
                                   
                                </div>
                                <div>
                                    <img
                                        className="main--pic"
                                        src={data.product.gallery[this.state.imgIndex]}
                                        alt="main-img"
                                    />
                                </div>
                                <div className="product--details">
                                    <div className="product--brand"> {data.product.brand}</div>
                                    <div className="product--name">{data.product.name}</div>
                                    <div>
                                        {data.product.attributes.map((att) => (
                                            <>
                                                <div className="attr--name"> {att.name}:</div>
                                                <div>
                                                    {att.type === "swatch" ? (
                                                        <div className="attr--color ">

                                                            {att.items.map((item) => (
                                                                this.state.productAttrAdded.details.Color === item.value ? (<>
                                                                    <div
                                                                        onClick={() =>
                                                                            this.attrAdded(att.name, item.value)
                                                                        }
                                                                        className="attr--color--box color--selected"
                                                                        style={{background: `${item.value}`}}
                                                                    />
                                                                </>) : (<>
                                                                    <div
                                                                        onClick={() =>
                                                                            this.attrAdded(att.name, item.value)
                                                                        }
                                                                        className="attr--color--box"
                                                                        style={{background: `${item.value}`}}
                                                                    />
                                                                </>)

                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="attr--not--color">
                                                            {att.items.map((item) => (
                                                                this.state.productAttrAdded.details[att.name] !== item.value ? (
                                                                    <div
                                                                        onClick={() =>
                                                                            this.attrAdded(att.name, item.value)
                                                                        }
                                                                        className="attr--text"
                                                                    >

                                                                        {item.value}
                                                                    </div>) : (<div
                                                                    onClick={() =>
                                                                        this.attrAdded(att.name, item.value)
                                                                    }
                                                                    className="attr--text--selected"
                                                                >

                                                                    {item.value}
                                                                </div>)


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


                                        {attLength === atrAddLength ? (<button
                                            className="addToCart--btn"
                                            onClick={() => this.addToCart(data)}
                                        >
                                            ADD TO CART
                                        </button>) : (<button
                                            className="addToCart--btn--unactive"

                                        >
                                            Please Select All Options
                                        </button>)}


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
    const product = state.cart.products;
    const selectedCurrency = state.currency.currency;
    return {
        product, selectedCurrency
    };
}

const mapDispatchToProps = {addItem};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Product));
