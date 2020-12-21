import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/root";

console.log("store:", process.env.REACT_APP_MODE);

export default (preloadedState) =>
  createStore(reducer, preloadedState, applyMiddleware(thunk));

// process.env.REACT_APP_MODE === "development"
// ? compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// : applyMiddleware(thunk)

// compose(
//   applyMiddleware(thunk),
//   process.env.REACT_APP_MODE === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     : undefined
// )
