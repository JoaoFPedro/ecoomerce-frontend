import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer
} from './category.overview.styles'

interface CategoryOverViewProps {
  category: Category
}

const CategoryOverView: FunctionComponent<CategoryOverViewProps> = ({
  category
}) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <p key={product.id}> {product.name}</p>
        ))}
      </ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverView
