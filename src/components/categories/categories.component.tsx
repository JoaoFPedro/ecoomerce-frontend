import { useEffect } from 'react'

import CategoryItem from '../category-item/category-item.componente'

import { CategoriesContainer, CategoryContent } from './categories.styles'

import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../hooks/redux.hook'
import { fetchCategories } from '../../store/toolkit/category/category.slice'

const Categories = () => {
  // const { categories } = useContext(CategoryContext)

  const { categories } = useAppSelector((state) => state.categoryReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories() as any)
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
