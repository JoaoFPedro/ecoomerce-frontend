import { BrowserRouter } from 'react-router-dom'
import Category from '../../types/category.types'
import CategoryItem from './category-item.componente'
import { render } from '@testing-library/react'

describe('Category Item', () => {
  it('should render category correctly', () => {
    const category: Category = {
      id: '1',
      displayName: 'Lorem Ipsum',
      imageUrl: 'image_url',
      name: 'lorem-ipsum',
      products: []
    }

    const { getByText } = render(
      <BrowserRouter>
        <CategoryItem category={category} />
      </BrowserRouter>
    )

    getByText('Lorem Ipsum')
    getByText('Explorar')
  })
})
