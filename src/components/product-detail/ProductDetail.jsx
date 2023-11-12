import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Loading from "../loading/Loading"
import { cartActions } from "../../redux/cartSlice"
import formatCurrency from "../../utilities/formatCurrency"
import './sass/product-detail.scss'

const ProductDetail = () => {

    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const fetchProduct = async () => {
      axios.get(`https://fakestoreapi.com/products/${productId}`)
        .then(resp => setProduct(
          {...resp.data, inCart: false, quantity: 1}
          ))
        .catch(err => alert(err.message))
    }

    const handleAddToCart = (e, product, isProductInCart) => {
      e.target.innerText = 'IN THE CART'
      if(!isProductInCart) dispatch(cartActions.addToCart(product))
    }

    const selectedProductElement = () => {
      const {id, title, price, description, category, image} = product
      const formattedPrice = formatCurrency(price)
      const isProductInCart = cart.some(item => item.id === id)

      return(
        <div className="product-detail" id={id}>

          <div className="product-detail__img-container">
            <img src={image} alt={title} />
          </div>

          <div className="product-detail__info">
            <h4 className="product-detail__info__title">{title}</h4>
            <div className="product-detail__info__category">{category}</div>
            <div className="product-detail__info__description">{description}</div>
            <div className="product-detail__info__buttons">
              <button
              className="product-detail__info__buttons__add-to-cart"
              onClick={e => handleAddToCart(e, product, isProductInCart)}
              title="Add this product to your Cart"
              >
                {isProductInCart ? 'IN THE CART' : 'ADD TO CART'}
              </button>
              <div className="product-detail__info__buttons__price-tag">
                <span className="tag"></span>
                <span className="price" title={formattedPrice}>{formattedPrice}</span>
              </div>
            </div>
          </div>

        </div>
      )
    }

    useEffect(() => {
      fetchProduct()
    }, [])

  return (
    <>
      {product?.title ? selectedProductElement() : <Loading />}
    </>
  )
}

export default ProductDetail