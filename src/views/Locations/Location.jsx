import React, { Component } from "react";
import {
  Form,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";
import Button from 'components/CustomButton/CustomButton';
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

class Location extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined
    }
  }

  handleChange = (e) => {
    console.log("type of location: ", e.target.value);
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={(this.state.new ? "New" : "Edit") + " Location"}
                content={
                  (this.state.new ?
                      (<form>
                        <FormGroup>
                          <ControlLabel>Type</ControlLabel>
                          <FormControl
                            ncols={["col-md-3", "col-md-3", "col-md-4"]}
                            onChange={this.handleChange.bind(this)}
                            // inputRef={ el => this.inputEl=el }
                            componentClass="select"
                            placeholder="select one type"
                          >
                            <option value="">select one type</option>
                            <option value="store">store</option>
                            <option value="supplier">supplier</option>
                          </FormControl>
                        </FormGroup>
                        <FormInputs
                          ncols={["col-md-3", "col-md-3", "col-md-4"]}
                          proprieties={[
                            {
                              label: "Type",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "",
                              disabled: !this.state.new
                            },
                            {
                              label: "Username",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Username",
                              defaultValue: "michael23"
                            },
                            {
                              label: "Email address",
                              type: "email",
                              bsClass: "form-control",
                              placeholder: "Email"
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          proprieties={[
                            {
                              label: "First name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "First name",
                              defaultValue: "Mike"
                            },
                            {
                              label: "Last name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Last name",
                              defaultValue: "Andrew"
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-12"]}
                          proprieties={[
                            {
                              label: "Adress",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Home Adress",
                              defaultValue:
                                "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-4", "col-md-4", "col-md-4"]}
                          proprieties={[
                            {
                              label: "City",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "City",
                              defaultValue: "Mike"
                            },
                            {
                              label: "Country",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Country",
                              defaultValue: "Andrew"
                            },
                            {
                              label: "Postal Code",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "ZIP Code"
                            }
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

                      </form>)
                      :
                      ("")
                  )
                }
              />
            </Col>
            <Col md={4}>
            </Col>
          </Row>
        </Grid>>
      </div>
    );
  }
}

export default Location;
