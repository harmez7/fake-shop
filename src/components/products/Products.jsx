import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../redux/productsSlice'
import Loading from '../loading/Loading'
import formatCurrency from '../../utilities/formatCurrency'
import './sass/products.scss'

const Products = () => {

    const {products, loading, error} = useSelector(state => state.products)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const productElements = products.map(product => {
        const modifiedProduct = {...product, inCart: false}
        const {title, image, id, price, category} = modifiedProduct
        const isProductInCart = cart.some(item => item.id === id)

        return (
        <Link to={`product/${id}`} key={id} >
            <div
            className={`product ${isProductInCart ? 'in-cart' : ''}`}
            id={id}
            >
                <div className='product__img-container'>
                    <img src={image} alt={title} />
                </div>
                <h4 className='product__title'>{title}</h4>
                <span className='product__price'>{formatCurrency(price)}</span>
                <span className='product__category'>{category}</span>
            </div>
        </Link>
        )
    })

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

  return (
    <main className='main'>
    {!loading && productElements}
    {error && alert(error)}
    {loading && <Loading />}
    </main>
  )
}

export default Products