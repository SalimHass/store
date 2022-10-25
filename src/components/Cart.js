import React, {Component} from 'react'
import {useSelector, useDispatch, connect} from 'react-redux'
import {addItem} from "./cart/cartSlice";
import {withRouter} from "../router/withRouter";

export class Cart extends Component {


    render() {
        const counter = this.props.counter
        return (
            <div>
                <div>
                    <button
                        onClick={() => (this.props.addItem(1))}
                    >
                        Increment
                    </button>
                    <span>Cart {counter}</span>
                    <button
                        onClick={() => (this.props.addItem(-1))}
                    >
                        Decrement
                    </button>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state) {
    const counter = state.cart.value;
    return {
        counter,
    };
}

const mapDispatchToProps = {addItem};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));