// import React, { Fragment, useState, useEffect } from "react";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { connect, useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
// import OrderTable from "../../../Common/OrderTable";
// import { getDistributorOrdersAction } from "../../../actions/getDistributorOrders";
// import { useLocation } from 'react-router-dom';

// const OrderDetails = ({ history, loginAction, user, getDistributorOrdersAction, params }) => {
//     const [order, setOrder] = useState([]);
//     const location = useLocation();
//     useEffect(() => {
//         getOrders();
//     }, [])
//     const getOrders = () => {
//         var order = location.state;
//         console.log(order, 'order');
//     }

//     return (
//         <Fragment>
//             <h3>
//                 Order
//             </h3>
//         </Fragment>
//     )
// };

// const mapStateToProps = ({ Register, Login }) => ({
//     isLoading: Register.isLoading,
//     error: Register.error,
//     user: Login.user,
// });

// const mapDispatchToProps = {
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(OrderDetails);

// Screens/Orders/Detail.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { MOCK_ORDERS } from "../mockOrder";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Get order ID from URL params
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("orderId");

    // Find mock order
    const foundOrder = MOCK_ORDERS.find((o) => o.order_id === orderId);
    setOrder(foundOrder || null);
  }, [location]);

  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-4">
      <h3>Order Details</h3>
      <div className="order-details-card">
        <div className="detail-item">
          <span>Order ID:</span>
          <strong>{order.order_id}</strong>
        </div>
        <div className="detail-item">
          <span>Medicine ID:</span>
          <strong>{order.medicine_id}</strong>
        </div>
        <div className="detail-item">
          <span>Distributor:</span>
          <strong>{order.distributor}</strong>
        </div>
        <div className="detail-item">
          <span>Quantity:</span>
          <strong>{order.quantity}</strong>
        </div>
        <div className="detail-item">
          <span>Status:</span>
          <span className={`status-badge ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
        <div className="detail-item">
          <span>Order Date:</span>
          <strong>{order.order_date}</strong>
        </div>
        <div className="detail-item">
          <span>Delivery Date:</span>
          <strong>{order.delivery_date}</strong>
        </div>
      </div>
    </div>
  );
};

export default connect(({ Login }) => ({ user: Login.user }))(OrderDetails);
