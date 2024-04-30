import User from '../../../types/user.type'
import UserActionTypes from './user.actions-types'

interface LoginUserAction {
  type: typeof UserActionTypes.LOGIN
  payload: User
}

export const loginUser = (payload: User): LoginUserAction => ({
  type: UserActionTypes.LOGIN,
  payload
})

interface LogoutUserAction {
  type: typeof UserActionTypes.LOGOUT
}

export const logOutUser = (): LogoutUserAction => ({
  type: UserActionTypes.LOGOUT
})

export type UserActions = LoginUserAction | LogoutUserAction
