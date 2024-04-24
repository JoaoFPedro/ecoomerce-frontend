import { FunctionComponent, useContext, useState } from 'react'
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
import axios from 'axios'

import Loading from '../loading/loading.component'

const CheckOut: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false)

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        {
          products
        }
      )

      window.location.href = data.url
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loading />}

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

            <CustomButton
              startIcon={<BsBagCheck />}
              onClick={handleFinishPurchaseClick}
            >
              Finalizar Compra
            </CustomButton>
          </>
        ) : (
          <p> Seu carrinho esta vazio!</p>
        )}
      </CheckoutContainer>
    </>
  )
}

export default CheckOut
