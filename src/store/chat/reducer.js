import * as types from './actionTypes'
import db from '../../assets/developers.json'

const initialState = {
  projectList: db.items
}

const chat = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD:
      state.projectList.push(action.message);
      return { ...state}
      case types.UPDATE:
      state.projectList[action.message.id] = action.message;
      return { ...state};
      case types.REMOVE:
        let index = state.projectList.findIndex(function(obj){return obj.id === parseInt(action.message.id)});
        state.projectList.splice(index, 1);
        return { ...state};
    default:
      return state
  }
}

export default chat
