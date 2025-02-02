import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import {
  Row,
  Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from "reactstrap";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import { connect } from "react-redux";
import {
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";
import {
  faAngleUp,
  faArrowRight,
  faArrowLeft,
  faAngleDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 6000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
];

const stockData = [
  { name: "Q1", stock: 230 },
  { name: "Q2", stock: 345 },
  { name: "Q3", stock: 480 },
  { name: "Q4", stock: 520 },
];

class AnalyticsDashboard1 extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
      activeTab1: "11",
      totalStocks: 1500,
      soldStocks: 920,
      remainingStocks: 580,
      totalOrders: 45,
      pending: 12,
      accepted: 28,
      rejected: 5,
    };
  }

  componentDidMount() {
    // Simulate loading delay
    setTimeout(() => this.fetchMockDashboardData(), 500);
  }

  fetchMockDashboardData = () => {
    // Static mock data
    this.setState({
      totalStocks: 1500,
      soldStocks: 920,
      remainingStocks: 580,
      totalOrders: 45,
      pending: 12,
      accepted: 28,
      rejected: 5,
    });
  };

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  toggle1 = (tab) => {
    if (this.state.activeTab1 !== tab) {
      this.setState({ activeTab1: tab });
    }
  };

  render() {
    const {
      pending,
      accepted,
      rejected,
      totalStocks,
      soldStocks,
      remainingStocks,
      totalOrders,
      activeTab1,
    } = this.state;

    const { user } = this.props;

    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            <PageTitle
              heading={`Hello, ${
                user && user.ownerName ? user.ownerName : "Admin"
              }`}
              subheading="This is the dashboard for monitoring your inventory and orders"
              icon="pe-7s-car icon-gradient bg-mean-fruit"
            />
            <Row>
              <Col md="12" lg="6">
                <Card className="mb-3">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"></i>
                      Orders Reports
                    </div>
                    <div className="btn-actions-pane-right">
                      <Button
                        outline
                        className={classnames(
                          "border-0 btn-pill btn-wide btn-transition",
                          {
                            active: activeTab1 === "11",
                          }
                        )}
                        color="primary"
                        onClick={() => this.toggle1("11")}
                      >
                        Overview
                      </Button>
                      <Button
                        outline
                        className={classnames(
                          "ml-1 btn-pill btn-wide border-0 btn-transition",
                          {
                            active: activeTab1 === "22",
                          }
                        )}
                        color="primary"
                        onClick={() => this.toggle1("22")}
                      >
                        Trends
                      </Button>
                    </div>
                  </CardHeader>
                  <TabContent activeTab={activeTab1}>
                    <TabPane tabId="11">
                      <CardBody className="pt-2">
                        <Row className="mt-3">
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Total Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="danger"
                                    value={(totalOrders / 50) * 100}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Accepted Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="success"
                                    value={(
                                      (accepted / totalOrders) *
                                      100
                                    ).toFixed(0)}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="divider mt-4" />
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Pending Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="primary"
                                    value={(
                                      (pending / totalOrders) *
                                      100
                                    ).toFixed(0)}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Rejected Orders
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="warning"
                                    value={(
                                      (rejected / totalOrders) *
                                      100
                                    ).toFixed(0)}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <div className="widget-chart p-0">
                        <div className="widget-chart-content">
                          <div className="widget-description mt-0 text-warning">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span className="pl-1">175.5%</span>
                            <span className="text-muted opacity-8 pl-1">
                              Monthly Sales Trend
                            </span>
                          </div>
                        </div>
                        <ResponsiveContainer height={187}>
                          <AreaChart
                            data={salesData}
                            margin={{ top: -45, right: 0, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorSales"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="10%"
                                  stopColor="var(--warning)"
                                  stopOpacity={0.7}
                                />
                                <stop
                                  offset="90%"
                                  stopColor="var(--warning)"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="sales"
                              stroke="var(--warning)"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorSales)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabPane>
                    <TabPane tabId="22">
                      <div className="widget-chart p-0">
                        <ResponsiveContainer height={179}>
                          <ComposedChart data={stockData}>
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area
                              type="monotone"
                              dataKey="stock"
                              fill="#f7ffd0"
                              stroke="#85a200"
                            />
                            <Bar
                              dataKey="stock"
                              barSize={16}
                              fill="var(--primary)"
                            />
                            <Line
                              type="monotone"
                              dataKey="stock"
                              strokeWidth="3"
                              stroke="var(--danger)"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                        <div className="widget-chart-content mt-3 mb-2">
                          <div className="widget-description mt-0 text-success">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <span className="pl-2 pr-2">24.8%</span>
                            <span className="text-muted opacity-8">
                              Quarterly Stock Growth
                            </span>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
              <Col md="12" lg="6">
                <Row>
                  <Col md="6">
                    <div className="card mb-3 bg-arielle-smile widget-chart text-black card-border">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg bg-white opacity-10" />
                        <i className="lnr-cog icon-gradient bg-arielle-smile" />
                      </div>
                      <div className="widget-numbers text-white">
                        {totalStocks} Units
                      </div>
                      <div className="widget-subheading">Total Inventory</div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                      <div className="icon-wrapper rounded">
                        <div className="icon-wrapper-bg bg-white opacity-10" />
                        <i className="lnr-screen icon-gradient bg-warm-flame" />
                      </div>
                      <div className="widget-numbers">{soldStocks} Units</div>
                      <div className="widget-subheading">Units Sold</div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                      <div className="icon-wrapper rounded">
                        <div className="icon-wrapper-bg bg-dark opacity-9" />
                        <i className="lnr-graduation-hat text-white" />
                      </div>
                      <div className="widget-numbers">{totalOrders}</div>
                      <div className="widget-subheading">Total Orders</div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card mb-3 bg-love-kiss widget-chart card-border">
                      <div className="widget-chart-content text-white">
                        <div className="icon-wrapper rounded-circle">
                          <div className="icon-wrapper-bg bg-white opacity-4" />
                          <i className="lnr-cog" />
                        </div>
                        <div className="widget-numbers">
                          {remainingStocks} Units
                        </div>
                        <div className="widget-subheading">Available Stock</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ Login }) => ({
  user: Login.user,
});

export default connect(mapStateToProps)(AnalyticsDashboard1);
