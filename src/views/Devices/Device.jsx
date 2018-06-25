import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import Button from 'components/CustomButton/CustomButton';
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { fetchDevice, newDevice } from "../../store/actions/deviceAction";
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
  }

  render() {
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
                      proprieties={[
                        {
                          label: "Serial number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "000-000-000",
                          disabled: !this.state.new,
                          value: this.props.device.serial_nr
                        },
                        {
                          label: "Brand",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Brand",
                          value: this.props.device.brand
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Model",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "000-000-000",
                          value: this.props.device.model
                        },
                        {
                          label: "TID",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "TID",
                          value: this.props.device.tid
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Location",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "location",
                          value: "location"
                        },
                        {
                          label: "Till label",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Till label",
                          value: this.props.device.till_label
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          value: this.props.device.status
                        },
                        {
                          label: "Security bag SN",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "security bag sn",
                          value: this.props.device.security_bag_sn
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
            <Col>
              <Events device_id={this.props.match.params.id} category={`Events of device sn: ${this.props.device.serial_nr}`}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  device: state.device.item,
  loading: state.device.loading,
  error: state.device.error
});

export default connect(mapStateToProps)(Device);
