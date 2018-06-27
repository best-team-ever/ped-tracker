import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from '../../components/CustomButton/CustomButton';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import {
  handleFetchAddLocation,
  handleGetLocation,
  handleLocationStates,
  handleLocationStatus,
  handleFetchUpdateLocation,
  handleLocationTypes
} from "../../store/handlers/locationHandlers";

import Events from "../Events/Events";

class Location extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    handleGetLocation(this.props.match.params.id, this.props.dispatch);
    handleLocationTypes(this.props.dispatch);
    handleLocationStatus(this.props.dispatch);
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
      handleGetLocation(this.props.match.params.id, this.props.dispatch);
  }

  /******************Begin: Handle all new elements******************/

  handleChangeValue = (key, value) => {
    handleLocationStates(key, value, this.props.dispatch);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.state.new? (
      this.props.addLocationFromState(this.props.location).then( () => this.props.history.push("/locations"))
    ):(
      this.props.updateLocationFromState(this.props.location).then( () => this.props.history.push("/locations"))
    )
  }
  /******************Fin: Handle all new elements******************/

  render() {
    let location = this.getLocation().location;

    const selectLocationType = Object.keys(this.props.typeLocation)
      .map(key => ({value: key, label: this.props.typeLocation[key]}));

    const selectLocationStatus = Object.keys(this.props.statusLocation)
      .map(key => ({value: key, label: this.props.statusLocation[key]}));

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title={(this.state.new ? "New" : "Edit") + " Location"}
                content={
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group col-md-12">
                      <div className="col-md-6">
                        <FormInputs
                          ncols={["col-md-8"]}
                          properties={[
                            {
                              label: "Type",
                              type: "select",
                              bsClass: "form-control",
                              options: selectLocationType,
                              defaultValue: "select your type",
                              value: location.location_type,
                              id: 'location_type',
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
                            }
                          ]}
                        />

                        <FormInputs
                          ncols={["col-md-8"]}
                          properties={[
                            {
                              label: "Name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "name",
                              id: "name",
                              value: location.name,
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
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
                              id: "site_id",
                              value: location.site_id,
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
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
                              value: location.country,
                              id: "country",
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
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
                              value: location.address,
                              id: "address",
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
                            }
                          ]}
                        />

                        <FormInputs
                          ncols={["col-md-8"]}
                          properties={[
                            {
                              label: "Location status",
                              type: "select",
                              bsClass: "form-control",
                              options: selectLocationStatus,
                              defaultValue: "select your status",
                              value: location.status,
                              id: 'status',
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
                            }
                          ]}
                        />
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
                              value: location.contact_name,
                              id: "contact_name",
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
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
                              value: location.contact_position,
                              id: "contact_position",
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
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
                              value: location.contact_phone,
                              id: "contact_phone",
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
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
                              value: location.contact_email,
                              id: "contact_email",
                              onChange: ((e) => this.handleChangeValue(e.target.id, e.target.value))
                            }
                          ]}
                        />
                      </div>

                      <Button bsStyle="info" pullRight fill type="submit">
                        {(this.state.new ? "Add" : "Update") }
                      </Button>
                    </div>

                    <div className="clearfix" />
                  </form>
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
  location: state.location.item,
  loading: state.location.loading,
  error: state.location.error,
  typeLocation: state.location.typeLocation,
  statusLocation: state.location.statusLocation
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addLocationFromState: (newLocation) => handleFetchAddLocation(newLocation, dispatch),
    updateLocationFromState: (updatedLocation) => handleFetchUpdateLocation(updatedLocation, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Location));
