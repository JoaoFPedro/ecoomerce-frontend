import { FunctionComponent, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'

interface ICartContext {
    isvisible: boolean
  products: CartProduct[]
  toggleCart: () => void
}
interface ChildrenProps {
  children: any
}

export const CartContext = createContext<ICartContext>({
  isvisible: false,
  products: [],
  toggleCart: () => {}
})

const CartContextProvider: FunctionComponent<ChildrenProps> = ({
  children
}) => {
  const [isvisible, setIsVisible] = useState(false)
  const [products] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  return (
    <CartContext.Provider value={{ isvisible, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
