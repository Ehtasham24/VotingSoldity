// import { GET_DISTRIBUTOR_ORDERS } from "../config/constants";
// import getDistributorOrdersAPI from "../apis/getDistributorOrders";

// const getDistributorOrdersAction = (productionId, cb = () => { }) => async dispatch => {
//     try {
//         dispatch({ type: GET_DISTRIBUTOR_ORDERS.REQUEST });
//         var response = await getDistributorOrdersAPI(productionId);
//         console.log(response, 'response');
//         if (response.error) {
//             dispatch({ type: GET_DISTRIBUTOR_ORDERS.FAIL, payload: response });
//             cb(response)
//         } else {
//             dispatch({ type: GET_DISTRIBUTOR_ORDERS.SUCCESS, payload: response });
//             cb(response);
//         }
//     }
//     catch (e) {
//         console.log(e, 'err');
//         cb(false);
//         dispatch({ type: GET_DISTRIBUTOR_ORDERS.FAIL, payload: response });
//     }
//     finally {
//         dispatch({ type: GET_DISTRIBUTOR_ORDERS.COMPLETE, payload: response });
//     }
// };

// export { getDistributorOrdersAction }

// actions/getDistributorOrders.js
import {
  GET_DISTRIBUTOR_ORDERS,
  UPDATE_DISTRIBUTOR_ORDER,
} from "../config/constants";
import { MOCK_ORDERS } from "../mockData";

export const getDistributorOrdersAction = () => (dispatch) => {
  dispatch({ type: GET_DISTRIBUTOR_ORDERS.REQUEST });
  setTimeout(() => {
    dispatch({
      type: GET_DISTRIBUTOR_ORDERS.SUCCESS,
      payload: MOCK_ORDERS,
    });
  }, 1000);
};

export const updateDistributorOrderAction = (orderId, status) => (dispatch) => {
  dispatch({ type: UPDATE_DISTRIBUTOR_ORDER.REQUEST });
  setTimeout(() => {
    dispatch({
      type: UPDATE_DISTRIBUTOR_ORDER.SUCCESS,
      payload: { order_id: orderId, status },
    });
  }, 800);
};
