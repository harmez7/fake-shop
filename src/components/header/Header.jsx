import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './sass/header.scss'

const Header = () => {

  const cart = useSelector(state => state.cart)

  return (
    <div className='header'>

      <Link to={'/'}>
      <div className='title' title='Fake Shop'>
        Fake Shop
      </div>
      </Link>

      <Link to={'cart'} style={{textDecoration: 'none'}}>
      <div className='card-icon-container' title='open your cart'>
      <div className="fas fa-shopping-cart"></div>
      <div className='cyrcle-border'></div>
      <div className='cyrcle-outline'></div>
      {cart.length > 0 && <span className='cart-length'>{cart.length}</span>}
      </div>
      </Link>

    </div>
  )
}

export default Header