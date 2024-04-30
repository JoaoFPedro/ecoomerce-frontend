import User from '../../../types/user.type'
import UserActionTypes from './user.actions-types'


interface LoginUserAction {
  type: typeof UserActionTypes.LOGIN
  payload: User
}

export const loginUser = (payload: User): LoginUserAction => {
  return {
    type: UserActionTypes.LOGIN,
    payload
  }
}

export const logOutUser = () => ({
  type: UserActionTypes.LOGOUT
})
