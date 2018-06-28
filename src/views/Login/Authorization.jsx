import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUser, fetchUserUpdate, handleUserChange} from "../../store/actions/userAction";
import Button from '../../components/CustomButton/CustomButton';
import { logoutHandler } from "../../store/handlers/loginHandlers";
import { FormGroup, Radio, Modal, FormControl } from "react-bootstrap";
import { Agreement } from "./Agreement";

class Authorization extends Component{
  constructor(props){
    super(props);
    this.state = {
      signedUserId: this.props.signedUserId,
      statusTemporal: "0"
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchUser(this.state.signedUserId));
  }

  handleUserChange = (event) => {
    this.props.dispatch(handleUserChange(event.target.id, event.target.value));
    this.setState({
      statusTemporal: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(fetchUserUpdate(this.props.user))
      // .then(() => logoutHandler(this.props.dispatch).then(this.props.history.push("/")));
      .then(() => (this.props.history.push("/dashboard")));
  }


  render(){
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>P2PE Agreement</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="formControlsTextarea">
                <FormControl
                  componentClass="textarea"
                  placeholder="textarea"
                  readOnly={true}
                  value={Agreement}
                  rows={25}
                />
              </FormGroup>
              <FormGroup>
                <Radio
                  name="radioGroup"
                  inline
                  onChange={this.handleUserChange.bind(this)}
                  value="1"
                  id="p2pe_agreement"
                >
                  Agree
                </Radio>{' '}
                <Radio
                  name="radioGroup"
                  inline
                  onChange={this.handleUserChange.bind(this)}
                  value="0"
                  id="p2pe_agreement"
                >
                  Disagree
                </Radio>
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => logoutHandler(this.props.dispatch).then(this.props.history.push("/"))}>Close</Button>
            {
              (this.state.statusTemporal === "0")?
                (
                  <Button onClick={this.handleSubmit.bind(this)} type="submit" bsStyle="primary" disabled>Save changes, back to login</Button>
                ):(
                  <Button onClick={this.handleSubmit.bind(this)} type="submit" bsStyle="primary">Save changes, back to login</Button>
                )
            }
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.item
})

export default withRouter(connect(mapStateToProps)(Authorization));
