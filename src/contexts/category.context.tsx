import { FunctionComponent, createContext, useState } from 'react'
import Category from '../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converts/firestore.converts'
import Loading from '../components/loading/loading.component'

interface ICategoryContext {
  categories: Category[]
  isLoading: boolean
  fetchCategories: () => Promise<void>
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  fetchCategories: () => Promise.resolve()
})

const CategoryContextProvider: FunctionComponent<{ children: any }> = ({
  children
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsloading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsloading(true)
      const categoriesFromFirestore: Category[] = []

      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log({ error })
    } finally {
      setIsloading(false)
    }
  }
  return (
    <CategoryContext.Provider value={{ isLoading, categories, fetchCategories }}>
      {isLoading && <Loading />}

      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
