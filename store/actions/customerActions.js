// Action Types
export const FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';

export const ADD_CUSTOMER_REQUEST = 'ADD_CUSTOMER_REQUEST';
export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';
export const ADD_CUSTOMER_FAILURE = 'ADD_CUSTOMER_FAILURE';

export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILURE = 'UPDATE_CUSTOMER_FAILURE';

export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';
// actions/reports.js
export const FETCH_REPORTS_REQUEST = 'FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_FAILURE = 'FETCH_REPORTS_FAILURE';

// Action Creators
export const fetchCustomersRequest = () => ({
  type: FETCH_CUSTOMERS_REQUEST
});

export const fetchCustomersSuccess = (customers) => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: customers
});

export const fetchCustomersFailure = (error) => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: error
});

export const addCustomerRequest = (action) => ({
  type: ADD_CUSTOMER_REQUEST,
  payload:action
});

export const addCustomerSuccess = (customer) => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: customer
});

export const addCustomerFailure = (error) => ({
  type: ADD_CUSTOMER_FAILURE,
  payload: error
});

export const updateCustomerRequest = () => ({
  type: UPDATE_CUSTOMER_REQUEST
});

export const updateCustomerSuccess = (customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer
});

export const updateCustomerFailure = (error) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: error
});

export const deleteCustomerRequest = () => ({
  type: DELETE_CUSTOMER_REQUEST
});

export const deleteCustomerSuccess = (customerId) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customerId
});

export const deleteCustomerFailure = (error) => ({
  type: DELETE_CUSTOMER_FAILURE,
  payload: error
});