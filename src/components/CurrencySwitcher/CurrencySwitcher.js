import React, {Component} from "react";
import "./CurrencySwitcher.css";
import vector from "../../img/vector.svg"
import {changeCurrency} from '../../features/currencySwitcher/CurrencySwitcherSlice'
import {connect} from 'react-redux'

export class CurrencySwitcher extends Component {

    render() {
        return (
            <div className="dropdown">

                <button className="dropbtn">{this.props.selectedCurrency.symbol} <img className="img--vector"
                                                                                      src={vector} alt="arrow pic"/></button>

                <div className="dropdown-content">
                    {this.props.currency.map((cur) => (

                        <div key={cur.symbol} className="cur--option"
                             onClick={() => this.props.changeCurrency(cur)}>{`${cur.symbol} ${cur.label}`}</div>
                    ))}
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const selectedCurrency = state.currency.currency;
    return {
        selectedCurrency
    };
}

const mapDispatchToProps = {changeCurrency};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher)

;
