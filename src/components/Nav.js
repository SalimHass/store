import React, { Component } from 'react'
import "./Nav.css";

export class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <a className='cat--select' href='#'>WOMEN</a>  
          <a className='cat--select cat-b' href='sdsd'>MEN</a>
          <a className='cat--select' href='aaaa'>KIDS</a>
          <img className='img--logo' src="./img/logo.png" alt="logo"  />
          <a className='cur--select'>curruncy</a>
          <a className='basket--comp'>basket comp</a>
        </nav>
      </div>
    )
  }
}

export default Nav