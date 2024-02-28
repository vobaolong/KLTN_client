import { combineReducers } from 'redux'
import accountReducer from './account'
import vendorReducer from './vendor'
import userReducer from './user'
import storeReducer from './store'
import productReducer from './product'

const rootReducer = combineReducers({
  account: accountReducer,
  vendor: vendorReducer,
  user: userReducer,
  store: storeReducer,
  product: productReducer
})

export default rootReducer
