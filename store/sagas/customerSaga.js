import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../services/api';
import {
  FETCH_CUSTOMERS_REQUEST,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  ADD_CUSTOMER_REQUEST,
  addCustomerSuccess,
  addCustomerFailure,
  UPDATE_CUSTOMER_REQUEST,
  updateCustomerSuccess,
  updateCustomerFailure,
  DELETE_CUSTOMER_REQUEST,
  deleteCustomerSuccess,
  deleteCustomerFailure
} from '../actions/customerActions';

function* fetchCustomers() {
  try {
    const response = yield call(api.get, '/customers');
    console.log("response",response)
    yield put(fetchCustomersSuccess(response.data.data));
  } catch (error) {
    yield put(fetchCustomersFailure(error.response?.data?.message || 'Failed to fetch customers'));
  }
}

function* addCustomer(action) {
  try {
    console.log("action",action.payload)
    const response = yield call(api.post, '/customers', action.payload);
    yield put(addCustomerSuccess(response.data));
  } catch (error) {
    yield put(addCustomerFailure(error.response?.data?.message || 'Failed to add customer'));
  }
}

function* updateCustomer(action) {
  try {
    const response = yield call(api.put, `/customers/${action.payload.id}`, action.payload.data);
    yield put(updateCustomerSuccess(response.data));
  } catch (error) {
    yield put(updateCustomerFailure(error.response?.data?.message || 'Failed to update customer'));
  }
}

function* deleteCustomer(action) {
  try {
    yield call(api.delete, `/customers/${action.payload}`);
    yield put(deleteCustomerSuccess(action.payload));
  } catch (error) {
    yield put(deleteCustomerFailure(error.response?.data?.message || 'Failed to delete customer'));
  }
}

export default function* customerSaga() {
  yield takeEvery(FETCH_CUSTOMERS_REQUEST, fetchCustomers);
  yield takeEvery(ADD_CUSTOMER_REQUEST, addCustomer);
  yield takeEvery(UPDATE_CUSTOMER_REQUEST, updateCustomer);
  yield takeEvery(DELETE_CUSTOMER_REQUEST, deleteCustomer);
}