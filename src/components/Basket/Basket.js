import React, {Component} from 'react'
import "./Basket.css"
import basket from "../../img/basket.svg"
import {connect} from 'react-redux'
import CartOverlay from "../CartOverlay/CartOverlay"


export class Basket extends Component {
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            showOL: 0,
        }
        this.showOverLay = this.showOverLay.bind(this)
    }

    showOverLay() {
        this.state.showOL ? (this.setState({showOL: 0})) : (this.setState({showOL: 1}))

    }

    render() {
        const sum = this.props.products.reduce(
            (previousValue, currentValue) => previousValue + currentValue.quantity, 0
        )
        return (

            <div className='basket--nav'>


                <div onClick={this.showOverLay} className="overlay--click">


                    <img className='basket--img' src={basket} alt="Basket"/>

                    <div className='basket--items'>{sum}</div>
                </div>
                {this.state.showOL ? (<CartOverlay overlayClose={this.showOverLay}/>) : (<></>)}
            </div>


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