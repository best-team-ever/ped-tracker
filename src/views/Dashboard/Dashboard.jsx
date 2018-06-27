import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchDevicesStatusHandler,
  fetchActiveDevicesHandler,
  fetchInActiveDevicesHandler } from "../../store/handlers/dashboardHandlers";

import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import {
  dataPie,
  legendPie
} from "../../variables/Variables.jsx";
import './dashboard.css';
import {withRouter} from "react-router-dom";


class Dashboard extends Component {

  componentDidMount() {
    this.props.fetchDevicesStatus();
    this.props.fetchActiveDevices();
    this.props.fetchInActiveDevices();
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }


  render() {
    console.log("this.props: ::::  ", this.props);

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-keypad text-success" />}
                statsText="Active devices"
                statsValue={this.props.actives}
                // {this.getStatus()[0].status === "Active"
                //   ? this.getStatus()[0].count
                //   : "0"
                // }
                statsIcon={<i className="fa fa-clock-o" />} //fa-refresh
                statsIconText="Last second"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-keypad red" />}
                statsText="Inactive devices"
                statsValue={this.props.inactives}
                statsIcon={<i className="fa fa fa-clock-o" />} //fa-calendar
                statsIconText="Last second"
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
          </Row>
          <Row>
            {/* <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col> */}
            <Col md={12}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Devices status"
                category="-"
                stats="Last second"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.props.dataPies} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.props.legendPies)}</div>
                }
              />
            </Col>
          </Row>

          {/* <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row> */}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  actives: state.deviceStatus.actives,
  inactives: state.deviceStatus.inactives,
  devicesStates: state.deviceStatus.devicesStates,
  dataPies: state.deviceStatus.dataPies,
  legendPies: state.deviceStatus.legendPies,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDevicesStatus: () => fetchDevicesStatusHandler(dispatch),
    fetchActiveDevices: () => fetchActiveDevicesHandler(dispatch),
    fetchInActiveDevices: () => fetchInActiveDevicesHandler(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
