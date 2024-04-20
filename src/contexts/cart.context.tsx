import { FunctionComponent, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/products.types'

interface ICartContext {
  isvisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
}
interface ChildrenProps {
  children: any
}

export const CartContext = createContext<ICartContext>({
  isvisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {}
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
    // Check if product is already in the Cart
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    )

    if (productIsAlreadyInCart) {
      return setProducts((prevState) =>
        prevState.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    )
  }

  return (
    <CartContext.Provider
      value={{
        isvisible,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
