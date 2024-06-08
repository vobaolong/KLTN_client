import { combineReducers } from 'redux'
import accountReducer from './account'
import sellerReducer from './seller'
import userReducer from './user'
import storeReducer from './store'
import productReducer from './product'

const rootReducer = combineReducers({
  account: accountReducer,
  seller: sellerReducer,
  user: userReducer,
  store: storeReducer,
  product: productReducer
})

export default rootReducer
