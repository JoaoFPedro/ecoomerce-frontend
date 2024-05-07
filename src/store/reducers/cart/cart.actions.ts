import Product from '../../../types/products.types'
import CartActionTypes from './cart.action-types'

export const toggleCart = () => ({
  type: 'cart/toggle'
})

export const addProductToCart = (payload: Product) => ({
  type: CartActionTypes.addProductToCart,
  payload
})

export const removeProductFromCart = (payload: string) => ({
  type: CartActionTypes.removeProductFromCart,
  payload
})

export const increaseProductQuantity = (payload: string) => ({
  type: CartActionTypes.increaseProductQuantity,
  payload
})

export const decreaseProductQuantity = (payload: string) => ({
  type: CartActionTypes.decreaseProductQuantity,
  payload
})

export const clearProducts = () => ({
  type: CartActionTypes.clearProducts
})
