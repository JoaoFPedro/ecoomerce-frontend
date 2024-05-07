const CartActionTypes = {
  toggleCart: 'cart/toggle' as const,
  addProductToCart: 'cart/addProduct'as const,
  removeProductFromCart: 'cart/removeProduct'as const,
  increaseProductQuantity: 'cart/increaseProductQuantity'as const,
  decreaseProductQuantity: 'cart/descreseProductQuantity'as const,
  clearProducts: 'cart/clearProducts' as const
}

export default CartActionTypes
