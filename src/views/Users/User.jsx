import React, { Component } from "react";
import { Redirect } from 'react-router'
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Button from '../../components/CustomButton/CustomButton';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { handleUserChange, fetchUser, newUser, fetchUserUpdate} from "../../store/actions/userAction";
import { fetchLocations } from "../../store/actions/locationsAction";
import Events from "../Events/Events";

class User extends Component {
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
      this.props.dispatch(fetchUser(id));
    } else {
      this.props.dispatch(newUser());
    }
    this.props.dispatch(fetchLocations({fields: "id,name"}));
  }

  handleUserChange = (event) => {
    this.props.dispatch(handleUserChange(event.target.id, event.target.value));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(fetchUserUpdate(this.props.user))
    .then((result) => {
      if (result.payload.error) {
        this.props.handleClick("tc", result.payload.error.toString(), "error", 15);
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

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title={(this.state.new ? "New" : "Edit") + " user"}
                content={
                  <form onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          value: this.props.user.first_name,
                          id: 'first_name',
                          onChange: this.handleUserChange
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          value: this.props.user.last_name,
                          id: 'last_name',
                          onChange: this.handleUserChange
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          value: this.props.user.email,
                          id: 'email',
                          onChange: this.handleUserChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-6"]}
                      properties={[
                        {
                          label: "Language",
                          type: "select",
                          bsClass: "form-control",
                          options: [{value: "fr", label: "FR"},{value: "en", label: "EN"}],
                          value: this.props.user.language,
                          id: 'language',
                          onChange: this.handleUserChange
                        },
                        {
                          label: "Location",
                          type: "select",
                          bsClass: "form-control",
                          options: selectLocations,
                          value: this.props.user.location_id,
                          id: 'location_id',
                          onChange: this.handleUserChange
                        },
                        {
                          label: "Role",
                          type: "select",
                          bsClass: "form-control",
                          options: [{value: "cashier", label: "Cashier"},{value: "admin", label: "Administrator"}],
                          value: this.props.user.role,
                          id: 'role',
                          onChange: this.handleUserChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-6"]}
                      properties={[
                        {
                          label: "P2PE Agreement",
                          type: "select",
                          bsClass: "form-control",
                          options: [{value: "0", label: "Not validated"},{value: "1", label: "Validated"}],
                          value: this.props.user.p2pe_agreement,
                          id: 'p2pe_agreement',
                          onChange: this.handleUserChange
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>{this.props.match.params.id
              ? <Events user_id={this.props.match.params.id} category={`Events of user: ${this.props.user.first_name} ${this.props.user.last_name}`}/>
              : null}
            </Col>
          </Row>
          {redirectAfterSubmit && (
            <Redirect to={from || '/users'}/>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.items,
  loading: state.user.loading,
  error: state.user.error,
  user: state.user.item,
})

export default connect(mapStateToProps)(User);
