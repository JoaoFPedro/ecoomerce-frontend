import { FunctionComponent } from 'react'
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton
} from './cart.item.styles'
import CartProduct from '../../types/cart.types'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'

import { useDispatch } from 'react-redux'
import {
  clearProducts,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart
} from '../../store/toolkit/cart/cart.slice'

interface CartItemProps {
  product: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  /*
  const {
     removeProductFromCart,
     increaseProductQuantity,
     decreaseProductQuantity,
     clearProduct
  } = useContext(CartContext)
*/
  const dispatch = useDispatch()

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id))
  }
  const handleIncreaseClick = () => {
    dispatch(increaseProductQuantity(product.id))
  }

  const handleDecreseClick = () => {
    if (product.quantity > 0) {
      dispatch(decreaseProductQuantity(product.id))
    }
    if (product.quantity <= 1) {
      dispatch(clearProducts())
    }
  }

  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R$ {product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} onClick={handleDecreseClick} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncreaseClick} />
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton onClick={handleRemoveClick}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
