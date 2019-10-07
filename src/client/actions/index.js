export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => async (dispatch, getState, api)  => { // 2nd and 3rd because of thunk.withExtraArgument, api = axiosInstance
  const res = await api.get('http://react-ssr-api.herokuapp.com/users');
  dispatch({
    type: FETCH_USERS,
    payload: res
  })
}
