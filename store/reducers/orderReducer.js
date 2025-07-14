const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  totalOrders: 0,
  totalRevenue: 0,
  salesByDay: [],
  popularItems: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case "FETCH_REPORTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_REPORTS_SUCCESS":
      return {
        ...state,
        loading: false,
        salesByDay: action.payload.salesByDay,
        popularItems: action.payload.popularItems
      };
    case "FETCH_REPORTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        totalOrders: action.payload.length,
        totalRevenue: action.payload.reduce((sum, order) => sum + order.total, 0),
        loading: false,
        error: null
      };
    
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        totalOrders: state.totalOrders + 1,
        totalRevenue: state.totalRevenue + action.payload.total,
        loading: false,
        error: null
      };
    
    default:
      return state;
  }
};

export default orderReducer;