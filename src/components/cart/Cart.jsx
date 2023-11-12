import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartActions } from '../../redux/cartSlice'
import formatCurrency from '../../utilities/formatCurrency'
import './sass/cart.scss'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const cartTotal = cart.reduce((total, item) => {
      return total += item.subtotal
    }, 0)

    const FIXED_CART_TOTAL = formatCurrency(cartTotal)

    const decreaseQuantity = (id, quantity) => {
      quantity === 1 ? dispatch(cartActions.removeCartItem(id))
      : dispatch(cartActions.decreaseQuantity(id))
    }

    const handlePurchese = () => {
      if(cart.length === 0) {
        alert("YOUR CART IS EMPTY !")
        return
      }
      alert('THANK YOU FOR YOUR PURCHESE !')
      dispatch(cartActions.clearCart())
    }

    const cartItems = cart.map(item => {
        const {title, image, id, price, quantity, subtotal} = item

        return (

          <div className='cart__item-data' key={id}>

            <div className='cart__item-data__item'>
            <Link
            to={`/product/${id}`}
            style={{textDecoration: 'none', color: 'unset'}}
            >
              <div className="cart__item-data__item__img-container">
              <img src={image} alt={title} />
              </div>
            </Link>
              <span className='cart__item-data__item__item-name'>{title}</span>
            </div>
            
            <div className='cart__item-data__price'>{formatCurrency(price)}</div>

            <div className='cart__item-data__quantity'>
              <div >
                <span className='cart__item-data__quantity__quantity'>{quantity}</span>
                <div className='quantity-buttons'>
                  <span className='quantity-btn fa fa-plus'
                  onClick={() => dispatch(cartActions.increaseQuantity(id))}
                  title='Increase Quantity'></span>
                  <span className='quantity-btn fa fa-minus'
                  onClick={() => decreaseQuantity(id, quantity)}
                  title='Decrease Quantity'></span>
                </div>
              </div>
            </div>

            <div className='cart__item-data__subtotal'>{formatCurrency(subtotal)}</div>
            <div
            className='cart__item-data__remove-btn'
            onClick={() => dispatch(cartActions.removeCartItem(id))}>
              <i className='fa fa-remove'></i>
            </div>

          </div>
        )
    })

  return (
    <div className='cart'>

      <h2 className='cart__title'>- YOUR SHOPING CART -</h2>
      <hr />

      {cartItems.length ? <div className="cart-grid">

        <div className="cart-grid__header">
          <span>CART ITEMS</span>
          <span>PRICE</span>
          <span>QUANTITY</span>
          <span>SUBTOTAL</span>
        </div>

        <div className="cart-grid__body">{cartItems}</div>

      </div> : <center>YOUR CART IS EMPTY !</center>}

      <div className='cart__checkout'>
        <div className='cart-total'>
          YOUR TOTAL : <span title={FIXED_CART_TOTAL}>{FIXED_CART_TOTAL}</span>
        </div>
        <button className='btn' onClick={handlePurchese}
        title="PURCHESE"
        >Purchese</button>
      </div>

    </div>
  )
}

export default Cart