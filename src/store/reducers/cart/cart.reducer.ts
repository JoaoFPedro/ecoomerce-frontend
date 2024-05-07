import CartProduct from '../../../types/cart.types'
import CartActionTypes from './cart.action-types'

interface InitialState {
  isVisible: boolean

  products: CartProduct[]
}

const initialState: InitialState = {
  isVisible: false,
  products: []
}

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CartActionTypes.toggleCart:
      return { ...state, isVisible: !state.isVisible }
    case CartActionTypes.addProductToCart: {
      const product = action.payload

      // Verificar se o produto já esta no carrinho
      const productIsAlreadyInCart = state.products.some(
        (item) => item.id === product.id
      )

      // Se sim -> aumentar quantidade
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }]
      }
    }

    case CartActionTypes.removeProductFromCart:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        )
      }

    case CartActionTypes.increaseProductQuantity:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      }

    case CartActionTypes.decreaseProductQuantity:
      return {
        ...state,
        products: state.products.map((product) =>
          action.payload === product.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      }

    case CartActionTypes.clearProducts:
      return {
        ...state,
        products: []
      }
    default:
      return { ...state }
  }
}

export default cartReducer
