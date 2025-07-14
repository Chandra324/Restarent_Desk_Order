import { all, fork } from 'redux-saga/effects';
import customerSaga from './customerSaga';
import menuSaga from './menuSaga';
import orderSaga from './orderSaga';

export default function* rootSaga() {
  yield all([
    fork(customerSaga),
    fork(menuSaga),
    fork(orderSaga)
  ]);
}