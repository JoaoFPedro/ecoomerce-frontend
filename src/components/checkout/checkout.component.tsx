import { FunctionComponent, useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'
import CartItem from '../cart-item/cart.item.component'
import CustomButton from '../custom-button/custom-button.component'
import { BsBagCheck } from 'react-icons/bs'

const CheckOut: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext)

  return (
    <CheckoutContainer>
      <CheckoutTitle>CheckOut</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>
            <p>R$ {productsTotalPrice}</p>
          </CheckoutTotal>

          <CustomButton startIcon={<BsBagCheck />}>
            Finalizar Compra
          </CustomButton>
        </>
      ) : (
        <p> Seu carrinho esta vazio!</p>
      )}
    </CheckoutContainer>
  )
}

export default CheckOut
