const initialState = {
  store: {}
}

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VENDOR': {
      const store = action.payload
      return {
        ...state,
        store: store
      }
    }

    default: {
      return state
    }
  }
}

export default vendorReducer
