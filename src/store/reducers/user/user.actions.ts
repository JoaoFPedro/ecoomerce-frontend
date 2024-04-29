import User from '../../../types/user.type'
import userAcontionsTypes from './user.actions-types'

export const loginUser = (payload: User) => ({
  type: userAcontionsTypes.LOGIN,
  payload
})

export const logOutUser = () => ({
  type: userAcontionsTypes.LOGOUT
})
