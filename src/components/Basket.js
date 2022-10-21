import React, { Component } from 'react'
import "./Basket.css"
import basket from "../img/basket.svg"

export class Basket extends Component {
  render() {
    return (
      <div className='basket--nav'>
        <img className='basket--img'  src={basket} alt="Basket"/>
        <div className='basket--items'>3</div>
        
      </div>
    )
  }
}

export default Basket