import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl,
  Table
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

  handleStatusChange = (e) => {
    console.log("status of location: ", e.target.value);
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
                  (
                    this.state.new ?
                      // (
                      //   <form>
                      //     <div className="form-row">
                      //       <div className="form-group col-md-4">
                      //         <label htmlFor="type">Type</label>
                      //         <select className="form-control" id="type">
                      //           <option value="">select one type</option>
                      //           <option value="store">store</option>
                      //           <option value="supplier">supplier</option>
                      //         </select>
                      //       </div>
                      //       <div className="form-group col-md-6">
                      //         <label htmlFor="inputEmail4">Email</label>
                      //         <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                      //       </div>
                      //     </div>
                      //   </form>
                      //
                      // )
                      // :
                      // ("")
                      (
                        <form>
                          <div className="form-group col-md-12">
                            <div className="col-md-6">
                              <FormInputs
                                ncols={["col-md-8"]}
                                proprieties={[
                                  {
                                    label: "Name",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "name",
                                    defaultValue: ""
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-8"]}
                                proprieties={[
                                  {
                                    label: "Country",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "country",
                                    defaultValue: ""
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-12"]}
                                proprieties={[
                                  {
                                    label: "Address",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "address",
                                    defaultValue: ""
                                  }
                                ]}
                              />

                              <ControlLabel>Type</ControlLabel>
                              <FormControl
                                onChange={this.handleStatusChange.bind(this)}
                                // inputRef={ el => this.inputEl=el }
                                componentClass="select"
                                placeholder="select one type"
                              >
                                <option value="">select one type</option>
                                <option value="store">store</option>
                                <option value="supplier">supplier</option>
                              </FormControl>
                              <br/>
                              <ControlLabel>Location status</ControlLabel>
                              <FormControl
                                onChange={this.handleStatusChange.bind(this)}
                                // inputRef={ el => this.inputEl=el }
                                componentClass="select"
                                placeholder="select one type"
                              >
                                <option value="">select one status</option>
                                <option value="open">open</option>
                                <option value="closed">closed</option>
                              </FormControl>
                            </div>

                            <div className="col-md-6">
                              <FormInputs
                                ncols={["col-md-8"]}
                                proprieties={[
                                  {
                                    label: "Contact name",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Name",
                                    defaultValue: ""
                                  }
                                ]}
                              />
                              <FormInputs
                                ncols={["col-md-8"]}
                                proprieties={[
                                  {
                                    label: "Contact position",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "position",
                                    defaultValue: "France"
                                  }
                                ]}
                              />
                              <FormInputs
                                ncols={["col-md-12"]}
                                proprieties={[
                                  {
                                    label: "Contact phone",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "phone",
                                    defaultValue: ""
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-12"]}
                                proprieties={[
                                  {
                                    label: "Contact email",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "email",
                                    defaultValue: ""
                                  }
                                ]}
                              />
                            </div>

                            <Button bsStyle="info" pullRight fill type="submit">
                              Add
                            </Button>
                          </div>


                          <div className="clearfix" />

                        </form>
                      )
                      :
                      (
                        <div>
                          <form>
                            <div className="form-group col-md-12">
                              <div className="col-md-6">
                                <FormInputs
                                  ncols={["col-md-8"]}
                                  proprieties={[
                                    {
                                      label: "Name",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "name",
                                      defaultValue: ""
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-8"]}
                                  proprieties={[
                                    {
                                      label: "Country",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "country",
                                      defaultValue: ""
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-12"]}
                                  proprieties={[
                                    {
                                      label: "Address",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "address",
                                      defaultValue: ""
                                    }
                                  ]}
                                />

                                <ControlLabel>Type</ControlLabel>
                                <FormControl
                                  onChange={this.handleStatusChange.bind(this)}
                                  // inputRef={ el => this.inputEl=el }
                                  componentClass="select"
                                  placeholder="select one type"
                                >
                                  <option value="">select one type</option>
                                  <option value="store">store</option>
                                  <option value="supplier">supplier</option>
                                </FormControl>
                                <br/>
                                <ControlLabel>Location status</ControlLabel>
                                <FormControl
                                  onChange={this.handleStatusChange.bind(this)}
                                  // inputRef={ el => this.inputEl=el }
                                  componentClass="select"
                                  placeholder="select one type"
                                >
                                  <option value="">select one status</option>
                                  <option value="open">open</option>
                                  <option value="closed">closed</option>
                                </FormControl>
                              </div>

                              <div className="col-md-6">
                                <FormInputs
                                  ncols={["col-md-8"]}
                                  proprieties={[
                                    {
                                      label: "Contact name",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "Name",
                                      defaultValue: ""
                                    }
                                  ]}
                                />
                                <FormInputs
                                  ncols={["col-md-8"]}
                                  proprieties={[
                                    {
                                      label: "Contact position",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "position",
                                      defaultValue: "France"
                                    }
                                  ]}
                                />
                                <FormInputs
                                  ncols={["col-md-12"]}
                                  proprieties={[
                                    {
                                      label: "Contact phone",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "phone",
                                      defaultValue: ""
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-12"]}
                                  proprieties={[
                                    {
                                      label: "Contact email",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "email",
                                      defaultValue: ""
                                    }
                                  ]}
                                />
                              </div>

                              <Button bsStyle="info" pullRight fill type="submit">
                                Update
                              </Button>
                            </div>

                            <div className="clearfix" />

                          </form>

                          <Table responsive>
                            <thead>
                            <tr>
                              <th>#</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td>1</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                            </tr>
                            </tbody>
                          </Table>
                        </div>


                      )
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
