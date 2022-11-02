import React, {Component} from 'react'
import "./Products.css";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import basketWhite from "../../img/basketWhite.svg"



export class Products extends Component {

    render() {
        const currentCurrency = this.props.selectedCurrency
        let price = this.props.product.prices[0]
        for (const p of this.props.product.prices) {
            if (p.currency.label === currentCurrency.label) {
                price = p.amount
                break;
            }
        }

        return (

            <Link className='links' to={`/product/${this.props.product.id}`}>
                <div className='container'>

                    <img className='prod--img' src={this.props.product.gallery[0]} alt="product img"/>
                    <div className='prod--name'>{this.props.product.name}</div>
                    <div className='prod--price'>{currentCurrency.symbol}{price}</div>
                    <div className='basket--img--pro--circ'><img src={basketWhite} alt='basket--img--pro' className=''></img></div>

                </div>
            </Link>
        )
    }
}

function mapStateToProps(state) {
    const selectedCurrency = state.currency.currency;
    return {
        selectedCurrency
    };
}


export default connect(mapStateToProps)(Products)
