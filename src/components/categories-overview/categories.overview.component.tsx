import { FunctionComponent, useEffect } from 'react'
import { Container } from './categories.overview.styles'

import CategoryOverView from '../category-overview/category.overview.component'
import Loading from '../loading/loading.component'
import { useAppSelector } from '../../hooks/redux.hook'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '../../store/toolkit/category/category.slice'


const CategoriesOverview: FunctionComponent = () => {
  // const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  const { categories, isLoading } = useAppSelector(
    state => state.categoryReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories() as any)
    }
  }, [])

  if (isLoading) return <Loading />
  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverView
          key={category.id}
          category={category}
        ></CategoryOverView>
      ))}
    </Container>
  )
}

export default CategoriesOverview
