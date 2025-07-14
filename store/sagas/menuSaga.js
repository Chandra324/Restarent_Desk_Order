import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../services/api';

function* fetchMenu() {
  try {
    const response = yield call(api.get, '/menu');
    yield put({ type: 'FETCH_MENU_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ 
      type: 'FETCH_MENU_FAILURE', 
      payload: error.response?.data?.message || 'Failed to fetch menu' 
    });
  }
}

function* fetchCategories() {
  try {
    const response = yield call(api.get, '/menu/categories');
    yield put({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data.data });
  } catch (error) {
    yield put({ 
      type: 'FETCH_CATEGORIES_FAILURE', 
      payload: error.response?.data?.message || 'Failed to fetch categories' 
    });
  }
}

function* createMenuItem(action) {
  try {
    const response = yield call(api.post, '/menu', action.payload);
    yield put({ type: 'CREATE_MENU_ITEM_SUCCESS', payload: response.data });
    
    // Refresh menu after creation
    yield put({ type: 'FETCH_MENU_REQUEST' });
  } catch (error) {
    yield put({ 
      type: 'CREATE_MENU_ITEM_FAILURE', 
      payload: error.response?.data?.message || 'Failed to create menu item' 
    });
  }
}

function* updateMenuItem(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(api.put, `/menu/${id}`, data);
    yield put({ type: 'UPDATE_MENU_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ 
      type: 'UPDATE_MENU_ITEM_FAILURE', 
      payload: error.response?.data?.message || 'Failed to update menu item' 
    });
  }
}

function* deleteMenuItem(action) {
  try {
    yield call(api.delete, `/menu/${action.payload}`);
    yield put({ type: 'DELETE_MENU_ITEM_SUCCESS', payload: action.payload });
  } catch (error) {
    yield put({ 
      type: 'DELETE_MENU_ITEM_FAILURE', 
      payload: error.response?.data?.message || 'Failed to delete menu item' 
    });
  }
}

export default function* menuSaga() {
  yield takeEvery('FETCH_MENU_REQUEST', fetchMenu);
  yield takeEvery('FETCH_CATEGORIES_REQUEST', fetchCategories);
  yield takeEvery('CREATE_MENU_ITEM_REQUEST', createMenuItem);
  yield takeEvery('UPDATE_MENU_ITEM_REQUEST', updateMenuItem);
  yield takeEvery('DELETE_MENU_ITEM_REQUEST', deleteMenuItem);
}