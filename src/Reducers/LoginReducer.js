import { SET_LOGIN_TYPE } from '../Actions/LoginActions'

const initialState = {
  isUserLogged: false
}
export function loginInfo (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_TYPE:
      return Object.assign({}, state, {
        isUserLogged: action.loginType
      })
      default:
        return state   
  }
}

