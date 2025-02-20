// import { GET_DISTRIBUTOR_ORDERS, UPDATE_DISTRIBUTOR_ORDER } from "../config/constants";

// const INITIAL_STATE = {
//     isAuthenticated: false,
//     isLoading: false,
//     error: null,
// };

// export default function reducer(state = INITIAL_STATE, action) {
//     const { type, payload } = action;
//     switch (type) {
//         // GET ORDERS
//         case GET_DISTRIBUTOR_ORDERS.REQUEST:
//             return { ...state, isLoading: true, error: null };

//         case GET_DISTRIBUTOR_ORDERS.SUCCESS:
//             return { ...state, error: null, distributorOrders: payload.data };

//         case GET_DISTRIBUTOR_ORDERS.FAIL:
//             return { ...state, error: payload.error, loading: false, distributorOrders: [] };

//         case GET_DISTRIBUTOR_ORDERS.COMPLETE:
//             return { ...state, isLoading: false };
//         // Update ORDER
//         case UPDATE_DISTRIBUTOR_ORDER.REQUEST:
//             return { ...state, isLoading: true, error: null };

//         case UPDATE_DISTRIBUTOR_ORDER.SUCCESS:
//             return { ...state, error: null, };

//         case UPDATE_DISTRIBUTOR_ORDER.FAIL:
//             return { ...state, error: payload.error, loading: false, };

//         case UPDATE_DISTRIBUTOR_ORDER.COMPLETE:
//             return { ...state, isLoading: false };

//         default:
//             return state;
//     }
// };

// reducers/DistributorOrders.js
import {
  GET_DISTRIBUTOR_ORDERS,
  UPDATE_DISTRIBUTOR_ORDER,
} from "../config/constants";

const INITIAL_STATE = {
  distributorOrders: [],
  isLoading: false,
  error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DISTRIBUTOR_ORDERS.REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_DISTRIBUTOR_ORDERS.SUCCESS:
      return {
        ...state,
        distributorOrders: action.payload,
        isLoading: false,
      };

    case GET_DISTRIBUTOR_ORDERS.FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case UPDATE_DISTRIBUTOR_ORDER.REQUEST:
      return { ...state, isLoading: true };

    case UPDATE_DISTRIBUTOR_ORDER.SUCCESS:
      return {
        ...state,
        distributorOrders: state.distributorOrders.map((order) =>
          order.order_id === action.payload.order_id
            ? { ...order, status: action.payload.status }
            : order
        ),
        isLoading: false,
      };

    case UPDATE_DISTRIBUTOR_ORDER.FAIL:
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
}
