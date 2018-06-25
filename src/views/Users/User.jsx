import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Button from '../../components/CustomButton/CustomButton';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { handleUserChange, fetchUser, newUser} from "../../store/actions/userAction";
import { fetchLocations } from "../../store/actions/locationsAction";
import Events from "../Events/Events";

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined
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
                title={(this.state.new ? "New" : "Edit") + " user"}
                content={
                  <form>
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
                          label: "P2PE Agreement",
                          type: "select",
                          bsClass: "form-control",
                          options: [{value: "0", label: "Not validated"},{value: "1", label: "Validated"}],
                          value: this.props.user.p2pe_agreement,
                          id: 'p2pe_agreement',
                          onChange: this.handleUserChange
                        },
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
