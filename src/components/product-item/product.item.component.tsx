import { FunctionComponent, useContext } from 'react'
import Product from '../../types/products.types'
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product.item.styles'
import CustomButton from '../custom-button/custom-button.component'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext)

  const handleAddToCartClick = () => {
    addProductToCart(product)
  }

  return (
    <ProductContainer>
      <ProductImage imageurl={product.imageUrl}>
        <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCartClick}>
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>R$ {product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
