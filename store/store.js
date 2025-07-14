// store.js

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Reducers
import authReducer from './reducers/authReducer';
import customerReducer from './reducers/customerReducer';
import menuReducer from './reducers/menuReducer';
import orderReducer from './reducers/orderReducer';
import posReducer from './reducers/posReducer';

// Root Saga
import rootSaga from './sagas/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    menu: menuReducer,
    orders: orderReducer,
    pos: posReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
