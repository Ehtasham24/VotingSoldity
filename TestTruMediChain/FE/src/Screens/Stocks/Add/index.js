// import React, { Fragment, useState, useEffect } from "react";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import {
//   Col,
//   Row,
//   Card,
//   CardBody,
//   CardTitle,
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   CardSubtitle,
// } from "reactstrap";
// import { connect } from "react-redux";
// import Swal from "sweetalert2";
// import Web3 from "web3";
// import MedisecureABI from "../../../MedisecureABI.json";

// const AddStocks = ({ user, history }) => {
//   const [formData, setFormData] = useState({
//     stock_id: "",
//     medicine_id: "",
//     price: "",
//     units: "",
//     manDate: "",
//     expiryDate: "",
//   });
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [medicines, setMedicines] = useState([]);
//   const [loadingForm, setLoadingForm] = useState(false);

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
//       Swal.fire({
//         title: "Error",
//         text: "Please install MetaMask!",
//         icon: "error",
//         confirmButtonText: "Ok",
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (contract && account) {
//       getMedicines();
//     }
//   }, [contract, account]);

//   const getMedicines = async () => {
//     try {
//       const medicines = await contract.methods
//         .view_medicine_by_manufacturer(user.name)
//         .call({ from: account });
//       setMedicines(medicines);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//   };

//   const onInput = (e, key) => {
//     const value = e.target.value;
//     setFormData({ ...formData, [key]: value });
//   };

//   const addStock = async () => {
//     const { stock_id, medicine_id, price, units, manDate, expiryDate } =
//       formData;

//     if (
//       !stock_id ||
//       !medicine_id ||
//       !price ||
//       !units ||
//       !manDate ||
//       !expiryDate
//     ) {
//       Swal.fire({
//         title: "Missing Inputs",
//         text: "Please fill all the fields.",
//         icon: "warning",
//         confirmButtonText: "Ok",
//       });
//       return;
//     }

//     if (units < 1 || price < 0.00000001) {
//       Swal.fire({
//         title: "Invalid Input",
//         text: "Units and price cannot have a value less than 1 or 0.00000001 BNB respectively",
//         icon: "warning",
//         confirmButtonText: "Ok",
//       });
//       return;
//     }

//     // Convert price from BNB to WEI
//     const priceInWei = web3.utils.toWei(price, "ether");
//     console.log("PRICE", priceInWei);

//     try {
//       setLoadingForm(true);
//       await contract.methods
//         .add_stock(
//           stock_id,
//           medicine_id,
//           priceInWei,
//           units,
//           new Date(manDate).getTime(),
//           new Date(expiryDate).getTime()
//         )
//         .send({ from: account });
//       setLoadingForm(false);

//       Swal.fire({
//         title: "Success",
//         text: "Stock added successfully!",
//         icon: "success",
//         confirmButtonText: "Ok",
//       }).then(() => {
//         history.push("/stocks");
//       });
//     } catch (error) {
//       setLoadingForm(false);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to add stock!",
//         icon: "error",
//         confirmButtonText: "Ok",
//       });
//       console.error(error);
//     }
//   };

//   const { stock_id, price, units, manDate, expiryDate } = formData;

//   return (
//     <Fragment>
//       <ReactCSSTransitionGroup
//         className="login-page"
//         component="div"
//         transitionName="TabsAnimation"
//         transitionAppear={true}
//         transitionAppearTimeout={0}
//         transitionEnter={false}
//         transitionLeave={false}
//       >
//         <Card className="login-card mb-3 pt-2 pb-2">
//           <CardBody>
//             <CardTitle>Add Stocks</CardTitle>
//             <CardSubtitle>
//               Produced some new stocks? Add it into Medisecure.
//             </CardSubtitle>
//             <Form onSubmit={submitForm}>
//               <Row form>
//                 <Col md={6}>
//                   <FormGroup>
//                     <Label for="stock_id">Stock ID</Label>
//                     <Input
//                       value={stock_id}
//                       onChange={(e) => onInput(e, "stock_id")}
//                       type="text"
//                       name="stock_id"
//                       id="stock_id"
//                       placeholder="Enter Stock ID"
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                   <FormGroup>
//                     <Label for="exampleSelect">Select Medicine</Label>
//                     <Input
//                       value={formData.medicine_id}
//                       onChange={(e) => onInput(e, "medicine_id")}
//                       type="select"
//                       name="select"
//                       id="exampleSelect"
//                     >
//                       <option value="">Select a medicine</option>
//                       {medicines && medicines.length > 0 ? (
//                         medicines.map((med, index) => (
//                           <option key={index} value={med.medicine_id}>
//                             {med.name}
//                           </option>
//                         ))
//                       ) : (
//                         <option>No medicines available</option>
//                       )}
//                     </Input>
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row form>
//                 <Col md={6}>
//                   <FormGroup>
//                     <Label for="exampleUnits">Units</Label>
//                     <Input
//                       value={units}
//                       onChange={(e) => onInput(e, "units")}
//                       type="number"
//                       name="units"
//                       id="units"
//                       placeholder="Enter No. of Units"
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                   <FormGroup>
//                     <Label for="examplePrice">Price per Unit (BNB)</Label>
//                     <Input
//                       value={price}
//                       onChange={(e) => onInput(e, "price")}
//                       type="number"
//                       name="price"
//                       id="price"
//                       placeholder="Enter Price in BNB"
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>

//               <Row form>
//                 <Col md={6}>
//                   <FormGroup>
//                     <Label for="exampleManDate">Manufacturing Date</Label>
//                     <Input
//                       value={manDate}
//                       onChange={(e) => onInput(e, "manDate")}
//                       type="date"
//                       name="manDate"
//                       id="manDate"
//                       placeholder="Enter Manufacturing Date"
//                     />
//                   </FormGroup>
//                 </Col>
// <Col md={6}>
//   <FormGroup>
//     <Label for="exampleExpiryDate">Expiry Date</Label>
//     <Input
//       value={expiryDate}
//       onChange={(e) => onInput(e, "expiryDate")}
//       type="date"
//       name="expiryDate"
//       id="expiryDate"
//       placeholder="Enter Expiry Date"
//     />
//   </FormGroup>
// </Col>
//               </Row>
//               <div className="d-flex justify-content-end align-items-center">
//                 <Button onClick={addStock} color="primary" className="mt-2">
//                   {loadingForm ? "Loading..." : "Add Stocks"}
//                 </Button>
//               </div>
//             </Form>
//           </CardBody>
//         </Card>
//       </ReactCSSTransitionGroup>
//     </Fragment>
//   );
// };

// const mapStateToProps = ({ Register, Login }) => ({
//   isLoading: Register.isLoading,
//   error: Register.error,
//   user: Login.user,
// });

// export default connect(mapStateToProps)(AddStocks);

// Screens/Stocks/Add.js
import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardSubtitle,
} from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { MOCK_MEDICINES } from "../../Medicines/MedicineMock";

const generateStockId = () =>
  `STOCK-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

const AddStocks = ({ user, history }) => {
  const [formData, setFormData] = useState({
    stock_id: generateStockId(),
    medicine_id: "",
    price: "",
    units: "",
    manDate: "",
    expiryDate: "",
  });

  const [medicines] = useState(MOCK_MEDICINES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      manufacturer: user && user.name ? user.name : "Demo Pharma",
    }));
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStock();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addStock = async () => {
    const requiredFields = [
      "medicine_id",
      "price",
      "units",
      "manDate",
      "expiryDate",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      Swal.fire({
        title: "Missing Fields",
        text: `Please fill in: ${missingFields.join(", ")}`,
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (formData.units < 1 || formData.price < 0.00000001) {
      Swal.fire({
        title: "Invalid Input",
        text: "Units must be ≥1 and price ≥0.00000001",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create mock stock entry
    const newStock = {
      ...formData,
      stock_id: generateStockId(),
      name:
        (medicines.find((m) => m.medicine_id === formData.medicine_id)
          ? medicines.find((m) => m.medicine_id === formData.medicine_id).name
          : "") || "",
      manufacture_date: new Date(formData.manDate).getTime(),
      expiry_date: new Date(formData.expiryDate).getTime(),
    };

    console.log("Mock Stock Added:", newStock);

    setLoading(false);

    Swal.fire({
      title: "Success!",
      text: "Stock added successfully (mock)",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      history.push("/stocks");
    });
  };

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        className="login-page"
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card className="login-card mb-3 pt-2 pb-2">
          <CardBody>
            <CardTitle>Add Stocks</CardTitle>
            <CardSubtitle>
              Produced some new stocks? Add it into Medisecure.
            </CardSubtitle>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="stock_id">Stock ID</Label>
                    <Input
                      value={formData.stock_id}
                      type="text"
                      name="stock_id"
                      id="stock_id"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="medicine_id">Select Medicine</Label>
                    <Input
                      value={formData.medicine_id}
                      onChange={handleInputChange}
                      type="select"
                      name="medicine_id"
                      id="medicine_id"
                    >
                      <option value="">Select a medicine</option>
                      {medicines.map((med) => (
                        <option key={med.medicine_id} value={med.medicine_id}>
                          {med.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="units">Units</Label>
                    <Input
                      value={formData.units}
                      onChange={handleInputChange}
                      type="number"
                      name="units"
                      id="units"
                      placeholder="Enter No. of Units"
                      min="1"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="price">Price per Unit (BNB)</Label>
                    <Input
                      value={formData.price}
                      onChange={handleInputChange}
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter Price in BNB"
                      step="0.00000001"
                      min="0.00000001"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="manDate">Manufacturing Date</Label>
                    <Input
                      value={formData.manDate}
                      onChange={handleInputChange}
                      type="date"
                      name="manDate"
                      id="manDate"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="expiryDate">Expiry Date</Label>
                    <Input
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      type="date"
                      name="expiryDate"
                      id="expiryDate"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <div className="d-flex justify-content-end align-items-center">
                <Button
                  type="submit"
                  color="primary"
                  className="mt-2"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Stocks"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: (state && state.Login && state.Login.user) || null,
});

export default connect(mapStateToProps)(AddStocks);
