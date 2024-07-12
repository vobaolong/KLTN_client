import { combineReducers } from 'redux'
import accountReducer from './account'
import sellerReducer from './seller'
import userReducer from './user'
import storeReducer from './store'
import productReducer from './product'

const rootReducer = combineReducers({
  user: userReducer,
  store: storeReducer,
  seller: sellerReducer,
  product: productReducer,
  account: accountReducer
})

export default rootReducer
