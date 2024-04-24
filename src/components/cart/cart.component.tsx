import { BsCartCheck } from 'react-icons/bs'
import CustomButton from '../custom-button/custom-button.component'
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart.item.component'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { isvisible, toggleCart, products, productsTotalPrice, productsCart } =
    useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckOutPageClick = () => {
    navigate('/checkout')
    toggleCart()
  }
  return (
    <CartContainer isvisible={isvisible}>
      <CartEscapeArea onClick={toggleCart} />
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
