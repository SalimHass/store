import React, { Component } from "react";
import "./Nav.css";
import CurrencySwitcher from "./CurrencySwitcher";
import Basket from "./Basket";
import logo from "../img/logo.png";
export class Nav extends Component {
  render() {
    const selectedCategoryIndex = this.props.selectedCategoryIndex;
    return (
      <div>
        <nav >
          {this.props.cats.categories.map((cat, index) => 
            selectedCategoryIndex === index ? (
              <p
                className="cat--selected"
                onClick={() => this.props.onCategoryChanged(index)}
              >
                {cat.name}
              </p>
            ) : (
              <p
                className="cat--select"
                onClick={() => this.props.onCategoryChanged(index)}
              >
                {cat.name}
              </p>
            )
          )}

          <img className="img--logo" src={logo} alt="logo" />
          <div className="cur--select">
            <CurrencySwitcher currency={this.props.cats.currencies} />
          </div>
          <Basket />
        </nav>
      </div>
    );
  }
}

export default Nav;
