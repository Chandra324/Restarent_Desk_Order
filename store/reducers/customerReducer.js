import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE
} from '../actions/customerActions';

const initialState = {
  customers: [],
  loading: false,
  error: null,
  totalCustomers: 0
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
    case ADD_CUSTOMER_REQUEST:
    case UPDATE_CUSTOMER_REQUEST:
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_CUSTOMERS_SUCCESS:
      console.log("action.payload",action.payload)
      return {
        ...state,
        customers: action.payload,
        totalCustomers: action.payload.length,
        loading: false,
        error: null
      };
    
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        totalCustomers: state.totalCustomers + 1,
        loading: false,
        error: null
      };
    
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer._id === action.payload._id ? action.payload : customer
        ),
        loading: false,
        error: null
      };
    
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(customer => customer._id !== action.payload),
        totalCustomers: state.totalCustomers - 1,
        loading: false,
        error: null
      };
    
    case FETCH_CUSTOMERS_FAILURE:
    case ADD_CUSTOMER_FAILURE:
    case UPDATE_CUSTOMER_FAILURE:
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default customerReducer;