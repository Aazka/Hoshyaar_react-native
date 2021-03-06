import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import AppNavigation from '../Navigation/AppNavigation'

/* ------------- Assemble The Reducers ------------- */
export default combineReducers({
  // nav: createNavigationReducer(AppNavigation),
  nav: require('./NavigationRedux').reducer,
  auth: require('./AuthRedux').reducer,
  // ADD_REDUX_REDUCER
})
