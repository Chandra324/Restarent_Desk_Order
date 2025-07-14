import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../services/api';
import { all } from 'axios';

function* fetchOrders() {
  try {
    const response = yield call(api.get, '/orders');
    yield put({ type: 'FETCH_ORDERS_SUCCESS', payload: response.data.data });
  } catch (error) {
    yield put({ type: 'FETCH_ORDERS_FAILURE', payload: error.response?.data?.message || 'Failed to fetch orders' });
  }
}

function* createOrder(action) {
  try {
    const response = yield call(api.post, '/orders', action.payload);
    yield put({ type: 'CREATE_ORDER_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'CREATE_ORDER_FAILURE', payload: error.response?.data?.message || 'Failed to create order' });
  }
}
function* fetchReportsSaga() {
  try {
     const salesRes = yield call(api.get, '/orders/stats/daily');
    console.log('✅ Daily Stats:', salesRes?.data);

    const popularRes = yield call(api.get, '/menu/popular');
    yield put({
      type: "FETCH_REPORTS_SUCCESS",
      payload: {
        salesByDay: salesRes?.data?.data || [],
        popularItems: popularRes?.data?.data || []
      }
    });
  } catch (error) {
    console.error('❌ FETCH_REPORTS_FAILURE', error);
    yield put({
      type: "FETCH_REPORTS_FAILURE",
      payload: error.message
    });
  }
}

export default function* orderSaga() {
  yield takeEvery('FETCH_ORDERS_REQUEST', fetchOrders);
  yield takeEvery('CREATE_ORDER_REQUEST', createOrder);
  yield takeEvery("FETCH_REPORTS_REQUEST", fetchReportsSaga);
}