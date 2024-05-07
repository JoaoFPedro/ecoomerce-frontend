import Product from '../../../types/products.types'
import CartActionTypes from './cart.action-types'

interface ToggleCartAction {
  type: typeof CartActionTypes.toggleCart
  [key: string]: any;
}

export const toggleCart = (): ToggleCartAction => ({
  type: CartActionTypes.toggleCart
})

interface AddProductToCartAction {
  type: typeof CartActionTypes.addProductToCart,
  payload: Product
  [key: string]: any;
}

export const addProductToCart = (payload: Product): AddProductToCartAction => ({
  type: CartActionTypes.addProductToCart,
  payload
})

interface RemoveProductFromCartAction {
  type: typeof CartActionTypes.removeProductFromCart,
  payload: string

  [key: string]: any;
}

export const removeProductFromCart = (payload: string): RemoveProductFromCartAction => ({
  type: CartActionTypes.removeProductFromCart,
  payload
})

interface IncreseProductQuantityAction {
  type: typeof CartActionTypes.increaseProductQuantity,
  payload: string
  [key: string]: any;
}

export const increaseProductQuantity = (payload: string): IncreseProductQuantityAction => ({
  type: CartActionTypes.increaseProductQuantity,
  payload
})

interface DecreseProductQuantityAction{
  type: typeof CartActionTypes.decreaseProductQuantity,
  payload: string
  [key: string]: any;
}

export const decreaseProductQuantity = (payload: string): DecreseProductQuantityAction => ({
  type: CartActionTypes.decreaseProductQuantity,
  payload
})


interface ClearProductsAction {
  type: typeof CartActionTypes.clearProducts
  [key: string]: any;
}
export const clearProducts = (): ClearProductsAction => ({
  type: CartActionTypes.clearProducts
})

export type CartActions = ToggleCartAction | AddProductToCartAction | IncreseProductQuantityAction | DecreseProductQuantityAction | ClearProductsAction | RemoveProductFromCartAction
