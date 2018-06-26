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
import { handleFetchAddLocation, handleGetLocation, handleLocationStatus, handleFetchUpdateLocation } from "../../store/handlers/locationHandlers";

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
    handleGetLocation(this.props.match.params.id, this.props.dispatch)
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
    // this.setState({
    //   [key]: value
    // })
    handleLocationStatus(key, value, this.props.dispatch);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log("this.props :: here ", this.props);
    this.state.new? (
      this.props.addLocationFromState(this.props.location).then( () => this.props.history.push("/locations"))
    ):(
      this.props.updateLocationFromState(this.props.location).then( () => this.props.history.push("/locations"))
    )
    console.log("this.props :: ", this.props);
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
                              defaultValue: "",
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

                        <ControlLabel>Type</ControlLabel>
                        <FormControl
                          onChange={(e) => this.handleChangeValue(e.target.id, e.target.value)}
                          componentClass="select"
                          placeholder="select one type"
                          value={location.location_type}
                          id="location_type"
                        >
                          <option value="">select one type</option>
                          <option value="store">store</option>
                          <option value="supplier">supplier</option>
                        </FormControl>

                        <ControlLabel>Location status</ControlLabel>
                        <FormControl
                          onChange={(e) => this.handleChangeValue(e.target.id, e.target.value)}
                          componentClass="select"
                          placeholder="select one type"
                          value={location.status}
                          id="status"
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
            {/*<Col>{(!this.state.new*/}
            {/*? <Events location_id={this.props.match.params.id} category={`Events of location: ${location.name}`}/>*/}
            {/*: "")}*/}
            {/*</Col>*/}
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.item,
  loading: state.location.loading,
  error: state.location.error
});

const mapDispatchToProps = (dispatch) => {
  // let actions = bindActionCreators({ addLocation }, dispatch);
  return {
    // ...actions,
    dispatch,
    addLocationFromState: (newLocation) => handleFetchAddLocation(newLocation, dispatch),
    updateLocationFromState: (updatedLocation) => handleFetchUpdateLocation(updatedLocation, dispatch)

  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Location));
