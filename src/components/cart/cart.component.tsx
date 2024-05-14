import { BsCartCheck } from 'react-icons/bs'
import CustomButton from '../custom-button/custom-button.component'
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'

import CartItem from '../cart-item/cart.item.component'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux.hook'

import { useDispatch } from 'react-redux'
import {
  selectProductsCount,
  selectProductsTotalPrice
} from '../../store/reducers/cart/cart.selector'
import { toggleCart } from '../../store/toolkit/cart/cart.slice'

const Cart = () => {
  /* const {
     isvisible,  toggleCart, products  
    productsTotalPrice, 
    productsCart
  } = useContext(CartContext) */

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isVisible, products } = useAppSelector((state) => state.cartReducer)

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice)
  const productsCart = useAppSelector(selectProductsCount)

  const handleCheckOutPageClick = () => {
    navigate('/checkout')
    dispatch(toggleCart())
  }

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart())
  }
  return (
    <CartContainer isvisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCart > 0 && <CartTotal>R${productsTotalPrice}</CartTotal>}

        {productsCart > 0 && (
          <CustomButton
            startIcon={<BsCartCheck />}
            onClick={handleCheckOutPageClick}
          >
            Fazer Checkout
          </CustomButton>
        )}

        {productsCart === 0 && <p>Nenhum item no carrinho!</p>}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
