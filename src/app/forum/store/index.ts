import { rootReducer } from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { navigateMiddleware } from '../components/middleware/navigate-middleware';

// const logger =  (store: any) => (next: any) => (action: any) => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd()
//   return result
// }
// const middleware = applyMiddleware(
//   logger,
//   navigateMiddleware
// );
// const devTools = process.env.NODE_ENV === 'development' 
//     ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() : null;
// export const store = createStore(
//   rootReducer,
//   compose(
//     middleware,
//     devTools,
//   )
// );

export const store = createStore(
  rootReducer,
  applyMiddleware(navigateMiddleware)
)

