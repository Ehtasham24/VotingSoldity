// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import StockCard from "../../../Common/StockCard";
// import Web3 from "web3";
// import MedisecureABI from "../../../MedisecureABI.json";
// const ViewStocks = ({ user }) => {
//   const [medicines, setMedicines] = useState([]);
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       setWeb3(web3Instance);
//       window.ethereum
//         .request({ method: "eth_requestAccounts" })
//         .then((accounts) => setAccount(accounts[0]))
//         .catch((error) => console.error(error));
//       const contractInstance = new web3Instance.eth.Contract(
//         MedisecureABI,
//         "0xb93746FfC6eb1D679365680E9f4C54f3394a53e5"
//       );
//       setContract(contractInstance);
//     } else {
//       alert("Please install MetaMask!");
//     }
//   }, []);

//   useEffect(() => {
//     if (contract && account) {
//       getStocks();
//     }
//   }, [contract, account]);

//   const getStocks = async () => {
//     try {
//       console.log("getting stocks from blockchain");
//       const stocks = await contract.methods
//         .view_stocks_by_manufacturer(user.name)
//         .call({ from: account });
//       console.log(stocks, "stocks from blockchain");
//       setMedicines(stocks);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const convertWeiToBNB = (wei) => {
//     return web3.utils.fromWei(wei, "ether");
//   };

//   return (
//     <div>
//       <div>
//         <h2>Your Stocks</h2>
//       </div>
//       <div className="d-flex flex-row flex-wrap">
//         {medicines.length === 0 ? (
//           <h5>No stocks found</h5>
//         ) : (
//           medicines.map((e, index) => (
//             <div key={index} className="d-flex m-2">
//               <StockCard
//                 name={e.medicine_id}
//                 units={e.quantity}
//                 price={convertWeiToBNB(e.price)}
//                 manDate={new Date(
//                   parseInt(e.manufacture_date)
//                 ).toLocaleDateString()}
//                 expiryDate={new Date(
//                   parseInt(e.expiry_date)
//                 ).toLocaleDateString()}
//               />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = ({ Register, Login }) => ({
//   isLoading: Register.isLoading,
//   error: Register.error,
//   user: Login.user,
// });

// export default connect(mapStateToProps)(ViewStocks);

// // // ViewStocks.js
// // import React, { useEffect } from "react";
// // import { connect } from "react-redux";
// // import StockCard from "../../../Common/StockCard";
// // import { stocksActions } from "../../../actions/stocks"; // adjust the path

// // const ViewStocks = ({ user, stocks, isLoading, error, getStocks }) => {
// //   useEffect(() => {
// //     getStocks();
// //   }, [getStocks]);

// //   return (
// //     <div>
// //       <div>
// //         <h2>Your Stocks</h2>
// //       </div>
// //       {isLoading && <p>Loading stocks...</p>}
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       <div className="d-flex flex-row flex-wrap">
// //         {stocks && stocks.length > 0 ? (
// //           stocks.map((stock, index) => (
// //             <div key={index} className="d-flex m-2">
// //               <StockCard
// //                 name={stock.name}
// //                 units={stock.quantity}
// //                 price={`${stock.price} BNB`}
// //                 manDate={new Date(stock.manufacture_date).toLocaleDateString()}
// //                 expiryDate={new Date(stock.expiry_date).toLocaleDateString()}
// //               />
// //             </div>
// //           ))
// //         ) : (
// //           <h5>No stocks found</h5>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const mapStateToProps = (state) => ({
// //   stocks: state.stocks.stocks,
// //   isLoading: state.stocks.isLoading,
// //   error: state.stocks.error,
// //   user: state.Login.user, // adjust if needed
// // });

// // const mapDispatchToProps = (dispatch) => ({
// //   getStocks: () => dispatch(stocksActions.getStocks()),
// // });

// // export default connect(mapStateToProps, mapDispatchToProps)(ViewStocks);

// Screens/Stocks/View.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StockCard from "../../../Common/StockCard";
import { MOCK_STOCKS } from "../../../actions/mockData";
import Swal from "sweetalert2";

const ViewStocks = ({ user }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStocks(MOCK_STOCKS);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (stockId) => {
    setStocks((prev) => prev.filter((stock) => stock.stock_id !== stockId));
    Swal.fire("Deleted!", "Stock removed successfully", "success");
  };

  if (loading) return <div>Loading stocks...</div>;

  return (
    <div>
      <h2>Your Stocks</h2>
      <div className="d-flex flex-row flex-wrap">
        {stocks.length === 0 ? (
          <h5>No stocks found</h5>
        ) : (
          stocks.map((stock, index) => (
            <div key={index} className="d-flex m-2">
              <StockCard
                {...stock}
                onDelete={() => handleDelete(stock.stock_id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ Login }) => ({
  user: Login.user,
});

export default connect(mapStateToProps)(ViewStocks);
