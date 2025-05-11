import {compose, createStore, applyMiddleware, Middleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage"
import {thunk} from 'redux-thunk';

const middleware = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean) as Middleware[];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistreducer = persistReducer<any, any>(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(persistreducer, undefined, composedEnhancers);

export const persistor = persistStore(store);