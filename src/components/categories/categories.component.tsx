import { useContext, useEffect } from 'react'


import CategoryItem from '../category-item/category-item.componente'


import { CategoriesContainer, CategoryContent } from './categories.styles'
import { CategoryContext } from '../../contexts/category.context'

const Categories = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      <CategoryContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoryContent>
    </CategoriesContainer>
  )
}

export default Categories
