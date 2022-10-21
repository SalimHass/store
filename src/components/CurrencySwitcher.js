import React, { Component } from "react";
import "./CurrencySwitcher.css";
import vector from "../img/vector.svg"

export class CurrencySwitcher extends Component {
  render() {
    return (
      <div className="dropdown">
        
        <button className="dropbtn">{this.props.currency[0].symbol} <img className="img--vector" src={vector}/></button>
        
        <div className="dropdown-content">
          {this.props.currency.map((cur) => (

            <a href="#">{`${cur.symbol} ${cur.label}`}</a>
            ))}
        </div>
          
      </div>
    );
  }
}

export default CurrencySwitcher;
