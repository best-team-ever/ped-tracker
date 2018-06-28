import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, PanelGroup, Panel, FormControl, ControlLabel, Button, HelpBlock } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { handleDevicesChange, fetchLocationDevices, fetchDeviceUpdate, fetchStatus } from "../../store/actions/deviceAction";

class Ped extends Component {
  constructor(props){
    super(props);
    this.state = {
      userLocationId: localStorage.getItem("userLocationId")
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchLocationDevices(this.state.userLocationId));
    this.props.dispatch(fetchStatus());
  }

  handleChange = (event) => {
    const ids = event.target.id.split(".");
    this.props.dispatch(handleDevicesChange(ids[0], ids[1], event.target.value));
  }

  handleSubmit = (event) => {
    const userId = localStorage.getItem("userId");
    event.preventDefault();
    this.props.dispatch(fetchDeviceUpdate(this.props.devices[event.target.id], userId))
    .then((result) => {
      if (result.payload.error) {
        this.props.handleClick("tc", result.payload.error.toString(), "error", 15);
      } else {

        this.props.handleClick("tc", `PED ${result.payload.device.serial_nr} updated`, "info", 15);
      }
    });
  }

  render() {
    const peds = this.props.devices.map((row, index) => {
      return (
        <Panel eventKey={row.id} key={index}>
          <Panel.Heading>
            <Panel.Title toggle>
              <FormGroup>
                <Row className="show-grid">
                  <Col xs={6}>
                    <ControlLabel>{row.serial_nr}</ControlLabel>
                    <HelpBlock>Caisse: {row.till_label}</HelpBlock>
                  </Col>
                  <Col xs={4}>
                    <HelpBlock>{row.status}</HelpBlock>
                  </Col>
                  <Col xs={2} className="all-icons">
                    <i className={row.status==="active" ? "pe-7s-check" : "pe-7s-close-circle"}></i>
                  </Col>
                </Row>
              </FormGroup>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <form id={index} onSubmit={this.handleSubmit}>
              <Row className="show-grid">
                <Col xs={12}>
                  <p>Brand: <b>{row.brand}</b></p>
                  <p>Model: <b>{row.model}</b></p>
                  <p>Last inspection date: <b>{row.last_inspection_date}</b></p>
                  <p>Last update: <b>{row.updatedAt}</b></p>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>Till label</ControlLabel>
                    <FormControl
                      type="text"
                      bsClass="form-control"
                      placeholder="Till label"
                      value={row.till_label}
                      id={`${row.id}.till_label`}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>Status</ControlLabel>
                    <FormControl
                      componentClass="select"
                      bsClass="form-control"
                      value={row.status}
                      id={`${row.id}.status`}
                      onChange={this.handleChange}
                    >
                    {Object.keys(this.props.status).map(key => (
                      <option key={key} value={key}>{this.props.status[key]}</option>
                    ))}
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={4}>
                  <Button bsStyle="primary" type="submit">
                    Update
                  </Button>
                </Col>
                <Col xs={6}>
                </Col>
                <Col xs={2}>
                  <Link to={`/events?device_id=${row.id}`}>
                    <Button bsStyle="info" pullRight>History</Button>
                  </Link>
                </Col>
              </Row>
            </form>
          </Panel.Body>
        </Panel>
      );
    });

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <PanelGroup accordion id="ped-accordion">
                {peds}
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  devices: state.devices.items,
  loading: state.devices.loading,
  error: state.devices.error,
  status: state.device.status
});

export default connect(mapStateToProps)(Ped);
