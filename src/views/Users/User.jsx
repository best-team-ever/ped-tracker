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
import { fetchUser, newUser } from "../../store/actions/userAction";
import { fetchLocations } from "../../store/actions/locationsAction";
import Events from "../Events/Events";

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      new: props.match.params.id === undefined,
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

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    const selectLocations = (this.props.locations.length > 0)
     ? this.props.locations.map(location => ({value: location.id, label: location.name}))
     : [];
    console.log(selectLocations);

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
                          value: this.props.user.first_name
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          value: this.props.user.last_name
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          value: this.props.user.email
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-6"]}
                      properties={[
                        // {
                        //   label: "P2PE Agreement",
                        //   componentClass: "checkbox",
                        //   bsClass: "form-control",
                        //   value: this.props.user.p2pe_agreement
                        // },
                        {
                          label: "Language",
                          componentClass: "select",
                          bsClass: "form-control",
                          options: [{value: "FR", label: "FR"},{value: "EN", label: "EN"}],
                          value: this.props.user.language,
                          onChange: this.handleChange
                        },
                        // {
                        //   label: "Location",
                        //   componentClass: "select",
                        //   bsClass: "form-control",
                        //   options: selectLocations,
                        //   value: this.props.user.location_id
                        // },
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
            <Col>
              <Events user_id={this.props.match.params.id} category={`Events of user: ${this.props.user.first_name} ${this.props.user.last_name}`}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.item,
  loading: state.user.loading,
  error: state.user.error,
  locations: state.locations.items
})

export default connect(mapStateToProps)(User);
