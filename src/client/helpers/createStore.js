import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
export default (req) => {
  const axiosInstance = axios.create({
    headers: { cookie: req.get('cookie') || '' }
  });

  const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance), logger)));

  return store;
}