import { FunctionComponent, useContext, useEffect } from 'react'
import { Container } from './categories.overview.styles'
import { CategoryContext } from '../../contexts/category.context'
import CategoryOverView from '../category-overview/category.overview.component'

const CategoriesOverview: FunctionComponent = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  })

  return (
    <Container>
      {categories.map((category) => (
       <CategoryOverView key={category.id} category={category}></CategoryOverView>
      ))}
    </Container>
  )
}

export default CategoriesOverview
