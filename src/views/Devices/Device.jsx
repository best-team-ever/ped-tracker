import React, { Component } from "react";
import { Redirect } from 'react-router'
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Button from '../../components/CustomButton/CustomButton';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { handleDeviceChange, fetchDevice, newDevice, fetchDeviceUpdate, fetchStatus } from "../../store/actions/deviceAction";
import { fetchLocations } from "../../store/actions/locationsAction";
import Events from "../Events/Events";

class Device extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined,
      redirectAfterSubmit: false
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== undefined) {
      this.props.dispatch(fetchDevice(id));
    } else {
      this.props.dispatch(newDevice());
    }
    this.props.dispatch(fetchLocations({fields: "id,name"}));
    this.props.dispatch(fetchStatus());
  }

  handleChange = (event) => {
    this.props.dispatch(handleDeviceChange(event.target.id, event.target.value));
  }

  handleSubmit = (event) => {
    const userId = localStorage.getItem("userId");
    event.preventDefault();
    this.props.dispatch(fetchDeviceUpdate(this.props.device, userId))
    .then((result) => {
      if (result.payload.error) {
        console.log("error", result.payload.error);
      } else {
        this.setState({ redirectAfterSubmit: true });
      }
    });
  }

  render() {
    const { from } = this.props.location.state || '/';
    const { redirectAfterSubmit } = this.state;

    const selectLocations = (this.props.locations.length > 0)
      ? this.props.locations.map(location => ({value: location.id, label: location.name}))
      : [];

    console.log(this.props.status);
    const selectStatus = Object.keys(this.props.status)
      .map(key => ({value: key, label: this.props.status[key]}));

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title={(this.state.new ? "New" : "Edit") + " Device"}
                content={
                  <form onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Serial number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "000-000-000",
                          disabled: !this.state.new,
                          value: this.props.device.serial_nr,
                          id: 'serial_nr',
                          onChange: this.handleChange
                        },
                        {
                          label: "Brand",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Brand",
                          value: this.props.device.brand,
                          id: 'brand',
                          onChange: this.handleChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Model",
                          type: "text",
                          bsClass: "form-control",
                          value: this.props.device.model,
                          id: 'model',
                          onChange: this.handleChange
                        },
                        {
                          label: "TID",
                          type: "text",
                          bsClass: "form-control",
                          value: this.props.device.tid,
                          id: 'tid',
                          onChange: this.handleChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Location",
                          type: "select",
                          bsClass: "form-control",
                          options: selectLocations,
                          value: this.props.device.location_id,
                          id: 'location_id',
                          onChange: this.handleChange
                        },
                        {
                          label: "Till label",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Till label",
                          value: this.props.device.till_label,
                          id: 'till_label',
                          onChange: this.handleChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Status",
                          type: "select",
                          bsClass: "form-control",
                          options: selectStatus,
                          value: this.props.device.status,
                          id: 'status',
                          onChange: this.handleChange
                        },
                        {
                          label: "Security bag SN",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "security bag sn",
                          value: this.props.device.security_bag_sn,
                          id: 'security_bag_sn',
                          onChange: this.handleChange
                        },
                      ]}
                    />

                    <Button bsStyle="info" pullRight fill type="submit">
                      Update
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>{this.props.match.params.id
              ? <Events device_id={this.props.match.params.id} category={`Events of device sn: ${this.props.device.serial_nr}`}/>
              : null}
            </Col>
          </Row>
          {redirectAfterSubmit && (
            <Redirect to={from || '/devices'}/>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.items,
  device: state.device.item,
  loading: state.device.loading,
  error: state.device.error,
  status: state.device.status
});

export default connect(mapStateToProps)(Device);
