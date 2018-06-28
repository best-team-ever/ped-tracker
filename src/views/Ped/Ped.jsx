import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, PanelGroup, Panel, FormControl, ControlLabel, Button, HelpBlock } from "react-bootstrap";
import { connect } from "react-redux";

import { handleDevicesChange, fetchLocationDevices, fetchDeviceUpdate, fetchStatus } from "../../store/actions/deviceAction";

class Ped extends Component {
  componentDidMount() {
    const userLocationId = localStorage.getItem("userLocationId");
    this.props.dispatch(fetchLocationDevices(userLocationId));
    this.props.dispatch(fetchStatus());
  }

  handleChange = (event) => {
    this.props.dispatch(handleDevicesChange(event.target.id, event.target.value));
  }

  handleSubmit = (event) => {
    const userId = localStorage.getItem("userId");
    event.preventDefault();
    this.props.dispatch(fetchDeviceUpdate(this.props.device, userId))
    .then((result) => {
      if (result.payload.error) {
        this.props.handleClick("tc", result.payload.error.toString(), "error", 15);
      } else {
        this.setState({ redirectAfterSubmit: true });
      }
    });
  }

  render() {
    const peds = this.props.devices.map((row, index) => {
      return (
        <Panel eventKey={index} key={index}>
          <Panel.Heading>
            <Panel.Title toggle>
              <FormGroup>
                <Row className="show-grid">
                  <Col xs={8}>
                    <ControlLabel>{row.serial_nr}</ControlLabel>
                    <HelpBlock>Caisse: {row.till_label}</HelpBlock>
                  </Col>
                  <Col xs={4} className="all-icons">
                    <i className={row.status==="active" ? "pe-7s-check" : "pe-7s-close-circle"}></i>
                    <HelpBlock>{row.status}</HelpBlock>
                  </Col>
                </Row>
              </FormGroup>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <form onSubmit={this.handleSubmit}>
              <Row className="show-grid">
                <Col xs={6}>
                  <ControlLabel>{row.brand}</ControlLabel>
                </Col>
                <Col xs={6}>
                  <ControlLabel>{row.model}</ControlLabel>
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
                      id={`items[${[index]}].till_label`}
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
                      id={`items[${[index]}].status`}
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
                <Col xs={6}>
                  <Button bsStyle="primary" type="submit">
                    Update
                  </Button>
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
