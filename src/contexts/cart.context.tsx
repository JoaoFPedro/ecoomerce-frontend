import {
  FunctionComponent,
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/products.types'

interface ICartContext {
  isvisible: boolean
  products: CartProduct[]
  productsTotalPrice: number
  productsCart: number
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  decreaseProductQuantity: (productId: string) => void
}
interface ChildrenProps {
  children: any
}

export const CartContext = createContext<ICartContext>({
  isvisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  productsTotalPrice: 0,
  productsCart: 0
})

const CartContextProvider: FunctionComponent<ChildrenProps> = ({
  children
}) => {
  const [isvisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  useEffect(() => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem('cartProducts')!
    )

    setProducts(productsFromLocalStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products))
  }, [products])

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  const productsCart = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity
    }, 0)
  }, [products])

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
  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        productId === product.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        productId === product.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        isvisible,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        productsTotalPrice,
        productsCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
