import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import headerReducer from "./header-reducer"
import appReducer from "./app-reducer"
import { reducer as formReducer } from 'redux-form'
import toolsReducer from "redux/tools-reducer";
import formsValuesReducer from "redux/forms-values-reducer";

let reducers = combineReducers( {
  app: appReducer,
  header: headerReducer,
  tools: toolsReducer,
  formsValues: formsValuesReducer,
  form: formReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;
