import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import Button from '../../components/CustomButton/CustomButton';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { handleDeviceChange, fetchDevice, newDevice } from "../../store/actions/deviceAction";
import { fetchLocations } from "../../store/actions/locationsAction";
import Events from "../Events/Events";

class Device extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined,
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
  }

  handleDeviceChange = (event) => {
    this.props.dispatch(handleDeviceChange(event.target.id, event.target.value));
  }

  render() {
    const selectLocations = (this.props.locations.length > 0)
     ? this.props.locations.map(location => ({value: location.id, label: location.name}))
     : [];

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title={(this.state.new ? "New" : "Edit") + " Device"}
                content={
                  <form>
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
                          onChange: this.handleDeviceChange
                        },
                        {
                          label: "Brand",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Brand",
                          value: this.props.device.brand,
                          id: 'brand',
                          onChange: this.handleDeviceChange
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
                          onChange: this.handleDeviceChange
                        },
                        {
                          label: "TID",
                          type: "text",
                          bsClass: "form-control",
                          value: this.props.device.tid,
                          id: 'tid',
                          onChange: this.handleDeviceChange
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
                          onChange: this.handleDeviceChange
                        },
                        {
                          label: "Till label",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Till label",
                          value: this.props.device.till_label,
                          id: 'till_label',
                          onChange: this.handleDeviceChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          value: this.props.device.status,
                          id: 'status',
                          onChange: this.handleDeviceChange
                        },
                        {
                          label: "Security bag SN",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "security bag sn",
                          value: this.props.device.security_bag_sn,
                          id: 'security_bag_sn',
                          onChange: this.handleDeviceChange
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
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.items,
  device: state.device.item,
  loading: state.device.loading,
  error: state.device.error
});

export default connect(mapStateToProps)(Device);
