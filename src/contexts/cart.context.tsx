import { FunctionComponent, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/products.types'

interface ICartContext {
  isvisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
}
interface ChildrenProps {
  children: any
}

export const CartContext = createContext<ICartContext>({
  isvisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {}
})

const CartContextProvider: FunctionComponent<ChildrenProps> = ({
  children
}) => {
  const [isvisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  const addProductToCart = (product: Product) => {
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  return (
    <CartContext.Provider
      value={{ isvisible, products, toggleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
