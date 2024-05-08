import { Dispatch } from 'redux'
import Category from '../../../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase.config'
import { categoryConverter } from '../../../converts/firestore.converts'
import CategoryActionsTypes from './category.actions.types'

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CategoryActionsTypes.FETCH_CATEGORIES_START })

    try {
      const categoriesFromFirestore: Category[] = []

      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      dispatch({
        type: CategoryActionsTypes.FETCH_CATEGORIES_SUCCES,
        payload: categoriesFromFirestore
      })
    } catch (error) {
      dispatch({
        type: CategoryActionsTypes.FETCH_CATEGORIES_FAILURE
      })
    }
  }
}
