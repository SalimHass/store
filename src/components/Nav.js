import React, { Component } from 'react'
import "./Nav.css";
import logo from "../img/logo.png"
export class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            {console.log(this.props.cats)}
            </div>
            {
              this.props.cats.map(cat => (
                <a className='cat--select' href={cat.name}>{cat.name}</a>
                ))
              }
          
          
          <img className='img--logo' src={logo} alt="logo"  />
          <a className='cur--select'>curruncy</a>
          <a className='basket--comp'>basket comp</a>
        </nav>
      </div>
    )
  }
}

export default Nav