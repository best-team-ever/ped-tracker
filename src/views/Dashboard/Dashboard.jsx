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
import './dashboard.css';


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
          </Row>
          <Row>
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
