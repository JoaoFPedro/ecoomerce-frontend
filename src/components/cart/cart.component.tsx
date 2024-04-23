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

const Cart = () => {
  const { isvisible, toggleCart, products, productsTotalPrice } = useContext(CartContext)
  return (
    <CartContainer isvisible={isvisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map(product => <CartItem key={product.id} product={product} />)}

        <CartTotal>R${productsTotalPrice}</CartTotal>

        <CustomButton startIcon={<BsCartCheck />}>Fazer Checkout</CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
