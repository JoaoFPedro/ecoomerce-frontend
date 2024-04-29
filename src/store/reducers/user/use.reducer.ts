import User from '../../../types/user.type'
import UserActionTypes from './user.actions-types'

interface InitialState {
  currentUser: User | any
  isAuthenticated: boolean
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false
}
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, currentUser: action.payload, isAuthenticated: true }

    case UserActionTypes.LOGOUT:
      return { ...state, currentUser: null, isAuthenticated: false }

    default:
      return {
        ...state
      }
  }
}

export default userReducer
