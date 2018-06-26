import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from '../../components/CustomButton/CustomButton';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { fetchLocation } from "../../store/actions/locationsAction";
import { handleFetchAddLocation } from "../../store/handlers/locationHandlers";

import Events from "../Events/Events";

class Location extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined,
      newNameLocation: "",
      newCountryLocation: "",
      newAddressLocation: "",
      newTypeLocation: "",
      newSiteIdLocation: "",
      newStatus: "",
      newContactName: "",
      newContactPosition: "",
      newContactPhone: "",
      newContactEmail: ""
    }
  }

  getLocation(){
    let { location, error, loading } = this.props;
    return {
      location: location,
      error: error,
      loading: loading
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    if (id !== undefined) {
      this.props.dispatch(fetchLocation(id));
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.load !== this.props.load){
      this.load(nextProps)
    }
  }

  componentDidUpdate(prevProps){
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId)
      this.props.dispatch(fetchLocation(this.props.match.params.id));
  }

  /******************Begin: Handle all new elements******************/
  handleNewNameLocationChange = (e) => {
    this.setState({
      newNameLocation: e.target.value
    })
  };

  handleNewSiteIdLocationChange = (e) => {
    this.setState({
      newSiteIdLocation: e.target.value
    })
  }

  handleNewCountryLocationChange = (e) => {
    this.setState({
      newCountryLocation: e.target.value
    })
  };

  handleNewAddressLocationChange = (e) => {
    this.setState({
      newAddressLocation: e.target.value
    })
  }

  handleNewTypeLocationChange = (e) => {
    this.setState({
      newTypeLocation: e.target.value
    })
  };

  handleNewStatusLocationChange = (e) => {
    this.setState({
      newStatus: e.target.value
    })
  };

  handleNewContactNameLocationChange = (e) => {
    this.setState({
      newContactName: e.target.value
    })
  };

  handleNewContactPositionLocationChange = (e) => {
    this.setState({
      newContactPosition: e.target.value
    })
  };

  handleNewContactPhoneLocationChange = (e) => {
    this.setState({
      newContactPhone: e.target.value
    })
  };

  handleNewContactEmailLocationChange = (e) => {
    this.setState({
      newContactEmail: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.fetchAddLocation({
    //   location_type: this.state.newTypeLocation,
    //   name: this.state.newNameLocation,
    //   site_id: parseInt(this.state.newSiteIdLocation),
    //   address: this.state.newAddressLocation,
    //   country: this.state.newCountryLocation,
    //   status: this.state.newStatus,
    //   contact_name: this.state.newContactName,
    //   contact_position: this.state.newContactPosition,
    //   contact_phone: this.state.newContactPhone,
    //   contact_email: this.state.newContactEmail
    // });
    this.props.addLocationFromState({
      location_type: this.state.newTypeLocation,
      name: this.state.newNameLocation,
      site_id: parseInt(this.state.newSiteIdLocation),
      address: this.state.newAddressLocation,
      country: this.state.newCountryLocation,
      status: this.state.newStatus,
      contact_name: this.state.newContactName,
      contact_position: this.state.newContactPosition,
      contact_phone: this.state.newContactPhone,
      contact_email: this.state.newContactEmail
    });

    this.props.history.push("/locations");
  }
  /******************Fin: Handle all new elements******************/

  render() {
    let location = this.getLocation().location;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title={(this.state.new ? "New" : "Edit") + " Location"}
                content={
                  (
                    this.state.new ?
                      (

                        <form onSubmit={this.handleSubmit.bind(this)}>
                          <div className="form-group col-md-12">
                            <div className="col-md-6">
                              <FormInputs
                                ncols={["col-md-8"]}
                                properties={[
                                  {
                                    label: "Name",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "name",
                                    defaultValue: "",
                                    onChange: this.handleNewNameLocationChange.bind(this)
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-8"]}
                                properties={[
                                  {
                                    label: "Site id",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "site_id",
                                    defaultValue: "",
                                    onChange: this.handleNewSiteIdLocationChange.bind(this)
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-8"]}
                                properties={[
                                  {
                                    label: "Country",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "country",
                                    defaultValue: "",
                                    onChange: this.handleNewCountryLocationChange.bind(this)
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-12"]}
                                properties={[
                                  {
                                    label: "Address",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "address",
                                    defaultValue: "",
                                    onChange: this.handleNewAddressLocationChange.bind(this)
                                  }
                                ]}
                              />

                              <ControlLabel>Type</ControlLabel>
                              <FormControl
                                onChange={this.handleNewTypeLocationChange.bind(this)}
                                componentClass="select"
                                placeholder="select one type"
                              >
                                <option value="">select one type</option>
                                <option value="store">store</option>
                                <option value="supplier">supplier</option>
                              </FormControl>

                              <ControlLabel>Location status</ControlLabel>
                              <FormControl
                                onChange={this.handleNewStatusLocationChange.bind(this)}
                                componentClass="select"
                                placeholder="select one type"
                              >
                                <option value="">select one status</option>
                                <option value="1">open</option>
                                <option value="0">closed</option>
                              </FormControl>
                            </div>

                            <div className="col-md-6">
                              <FormInputs
                                ncols={["col-md-8"]}
                                properties={[
                                  {
                                    label: "Contact name",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Name",
                                    defaultValue: "",
                                    onChange: this.handleNewContactNameLocationChange.bind(this)
                                  }
                                ]}
                              />
                              <FormInputs
                                ncols={["col-md-8"]}
                                properties={[
                                  {
                                    label: "Contact position",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "position",
                                    defaultValue: "",
                                    onChange: this.handleNewContactPositionLocationChange.bind(this)
                                  }
                                ]}
                              />
                              <FormInputs
                                ncols={["col-md-12"]}
                                properties={[
                                  {
                                    label: "Contact phone",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "phone",
                                    defaultValue: "",
                                    onChange: this.handleNewContactPhoneLocationChange.bind(this)
                                  }
                                ]}
                              />

                              <FormInputs
                                ncols={["col-md-12"]}
                                properties={[
                                  {
                                    label: "Contact email",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "email",
                                    defaultValue: "",
                                    onChange: this.handleNewContactEmailLocationChange.bind(this)
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
                                  properties={[
                                    {
                                      label: "Name",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "name",
                                      defaultValue: "",
                                      value: location.name
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-8"]}
                                  properties={[
                                    {
                                      label: "Site id",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "site_id",
                                      defaultValue: "",
                                      value: location.site_id,
                                      onChange: this.handleNewSiteIdLocationChange.bind(this)
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
                                      defaultValue: "",
                                      value: location.country
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-12"]}
                                  properties={[
                                    {
                                      label: "Address",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "address",
                                      defaultValue: "",
                                      value: location.address
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-12"]}
                                  properties={[
                                    {
                                      label: "Type",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "address",
                                      defaultValue: "",
                                      componentClass: "select",
                                      value: location.type
                                    }
                                  ]}
                                >
                                  {/*<option value="">select one type</option>*/}
                                  {/*<option value="store">store</option>*/}
                                  {/*<option value="supplier">supplier</option>*/}
                                </FormInputs>

                                <ControlLabel>Location status</ControlLabel>
                                <FormControl
                                  onChange={this.handleStatusChange.bind(this)}
                                  componentClass="select"
                                  placeholder="select one type"
                                >
                                  <option value="">{location.status}</option>
                                  <option value="open">open</option>
                                  <option value="closed">closed</option>
                                </FormControl>
                              </div>

                              <div className="col-md-6">
                                <FormInputs
                                  ncols={["col-md-8"]}
                                  properties={[
                                    {
                                      label: "Contact name",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "Name",
                                      defaultValue: "",
                                      value: location.contact_name
                                    }
                                  ]}
                                />
                                <FormInputs
                                  ncols={["col-md-8"]}
                                  properties={[
                                    {
                                      label: "Contact position",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "position",
                                      defaultValue: "France",
                                      value: location.contact_position
                                    }
                                  ]}
                                />
                                <FormInputs
                                  ncols={["col-md-12"]}
                                  properties={[
                                    {
                                      label: "Contact phone",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "phone",
                                      defaultValue: "",
                                      value: location.contact_phone
                                    }
                                  ]}
                                />

                                <FormInputs
                                  ncols={["col-md-12"]}
                                  properties={[
                                    {
                                      label: "Contact email",
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "email",
                                      defaultValue: "",
                                      value: location.contact_email
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
                        </div>
                      )
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>{(!this.state.new
              ? <Events location_id={this.props.match.params.id} category={`Events of location: ${location.name}`}/>
              : "")}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.items,
  loading: state.location.loading,
  error: state.location.error
});

const mapDispatchToProps = (dispatch) => {
  // let actions = bindActionCreators({ addLocation }, dispatch);
  return {
    // ...actions,
    dispatch,
    addLocationFromState: (newLocation) => handleFetchAddLocation(newLocation, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Location));
