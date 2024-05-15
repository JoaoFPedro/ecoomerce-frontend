import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Category from '../../../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { categoryConverter } from '../../../converts/firestore.converts'
import { db } from '../../../config/firebase.config'

interface InitialState {
  categories: Category[]
  isLoading: boolean
}

const initialState: InitialState = {
  categories: [],
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const categoriesFromFirestore: Category[] = []

    const querySnapshot = await getDocs(
      collection(db, 'categories').withConverter(categoryConverter)
    )
    querySnapshot.forEach((doc) => {
      categoriesFromFirestore.push(doc.data())
    })
    return categoriesFromFirestore
  }
)
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // inicio da action
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    })

    // sucesso
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })

    // caso de erro
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default categorySlice.reducer
