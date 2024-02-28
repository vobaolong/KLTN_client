const initialState = {
  user: {}
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT': {
      const user = action.payload
      return {
        ...state,
        user: user
      }
    }
    case 'UPDATE_AVATAR': {
      const newUser = state.user
      newUser.avatar = action.payload
      return {
        ...state,
        user: newUser
      }
    }

    default: {
      return state
    }
  }
}

export default accountReducer
