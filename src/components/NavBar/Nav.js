import React, {Component} from "react";
import "./Nav.css";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import Basket from "../Basket/Basket";
import logo from "../../img/logo.svg";
import {Link} from "react-router-dom";

export class Nav extends Component {
    render() {
        const selectedCategoryIndex = this.props.selectedCategoryIndex;
        return (
            <div >
                <nav>

                    {this.props.cats.categories.map((cat, index) =>
                        selectedCategoryIndex === index ? (
                            <Link key={cat.name} to="/"
                                  className="cat--selected"
                                  onClick={() => this.props.onCategoryChanged(index)}
                            >
                                {cat.name}
                            </Link>
                        ) : (
                            <Link key={cat.name} to="/"
                                  className="cat--select"
                                  onClick={() => this.props.onCategoryChanged(index)}
                            >
                                {cat.name}
                            </Link>
                        )
                    )}

                    <img className="img--logo" src={logo} alt="logo"/>
                    <div className="cur--select">
                        <CurrencySwitcher currency={this.props.cats.currencies}/>
                    </div>
                    <div>

                        <Basket/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;
