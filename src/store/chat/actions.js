import * as types from './actionTypes'

export const addChat = (message) => {
    return (dispatch) => {
      dispatch(addChatMessage(message))
    }
  }

  export const updateChat = (message) => {
    return (dispatch) => {
      dispatch(updateChatList(message))
    }
  }

  export const chatDelete = (message) => {
    return (dispatch) => {
      dispatch(chatDeleteMessage(message))
    }
  }

  const addChatMessage = message => ({
    type: types.ADD,
    message
  })

  const updateChatList = message => ({
    type: types.UPDATE,
    message
  })

  const chatDeleteMessage = message => ({
    type: types.REMOVE,
    message
  })