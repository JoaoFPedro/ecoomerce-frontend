import { FunctionComponent } from 'react'
import Product from '../../types/products.types'
import { ProductContainer, ProductImage, ProductInfo } from './product.item.styles'
import CustomButton from '../custom-button/custom-button.component'
import { BsCartPlus } from 'react-icons/bs'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageurl={product.imageUrl} >
        <CustomButton startIcon={<BsCartPlus/>}>
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
