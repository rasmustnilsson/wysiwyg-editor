import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import storeSynchronize from 'redux-localstore'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

storeSynchronize(store)

export default store