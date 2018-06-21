import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import Button from 'components/CustomButton/CustomButton';
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { fetchDevice } from "../../store/actions/deviceAction";

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
    }
  }

  render() {
    console.log(this.props);
    const device = this.props.device;

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
                          defaultValue: device.serial_nr
                        },
                        {
                          label: "Brand",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Brand",
                          defaultValue: device.brand
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
                          defaultValue: device.model
                        },
                        {
                          label: "TID",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "TID",
                          defaultValue: device.tid
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
                          defaultValue: "location"
                        },
                        {
                          label: "Till label",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Till label",
                          defaultValue: device.till_label
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
                          defaultValue: device.status
                        },
                        {
                          label: "Security bag SN",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "security bag sn",
                          defaultValue: device.security_bag_sn
                        },
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="empty until now..."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
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
