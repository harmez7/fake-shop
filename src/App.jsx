import { Routes, Route } from 'react-router-dom'
import Cart from './components/cart/Cart'
import Header from './components/header/Header'
import ProductDetail from './components/product-detail/ProductDetail'
import Products from './components/products/Products'

const App = () => {

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='product/:productId' element={<ProductDetail />}/>
      <Route path='cart' element={<Cart />} />
      
      <Route path='*' element="This page does not exist"></Route>
    </Routes>
    </>
  )
}

export default App