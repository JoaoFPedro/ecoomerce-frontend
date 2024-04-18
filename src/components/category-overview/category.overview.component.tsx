import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import { CategoryContainer, CategoryTitle } from './category.overview.styles'

interface CategoryOverViewProps {
  category: Category
}

const CategoryOverView: FunctionComponent<CategoryOverViewProps> = ({
  category
}) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>
    </CategoryContainer>
  )
}

export default CategoryOverView
