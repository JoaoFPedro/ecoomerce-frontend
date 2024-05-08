import { useEffect } from 'react'

import CategoryItem from '../category-item/category-item.componente'

import { CategoriesContainer, CategoryContent } from './categories.styles'

import { useDispatch } from 'react-redux'
import { fetchCategories } from '../../store/reducers/category/category.actions'
import { useAppSelector } from '../../hooks/redux.hook'


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
