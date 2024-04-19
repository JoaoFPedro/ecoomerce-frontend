import { FunctionComponent } from 'react'
import Category from '../../types/category.types'

import { CategoryItemContainer, CategoryName } from './category-item.styles'
import { useNavigate } from 'react-router-dom'

interface CategoryItemProps {
  category: Category
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate()

  const handleDetailsClick = () => {
    navigate(`/category-details/${category.id}`)
  }

  return (
    <CategoryItemContainer style={{ backgroundImage: `url('${category.imageUrl}')` }}>
      <CategoryName onClick={handleDetailsClick}>
      
        <p>{category.displayName}</p>
        <p>Explorar</p>
      
      </CategoryName>
    
    </CategoryItemContainer>
  )
}

export default CategoryItem
