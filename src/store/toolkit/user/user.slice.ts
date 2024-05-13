import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import User from '../../../types/user.type'

interface InitialState {
  currentUser: User | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
    logOutUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    }
  }
})
export const { loginUser, logOutUser } = userSlice.actions

export default userSlice.reducer
