import { FETCH_USERS } from 'client/actions/index';

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
}