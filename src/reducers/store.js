const initialState = {
  store: {}
}

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STORE': {
      const store = action.payload
      return {
        ...state,
        store: store
      }
    }
    case 'UPDATE_IS_FOLLOWING': {
      const isFollowing = action.payload
      const newStore = state.store
      newStore.isFollowing = isFollowing

      return {
        ...state,
        store: newStore
      }
    }
    case 'UPDATE_LEVEL': {
      const level = action.payload
      const newStore = state.store
      newStore.level = level

      return {
        ...state,
        store: newStore
      }
    }

    default: {
      return state
    }
  }
}

export default storeReducer
