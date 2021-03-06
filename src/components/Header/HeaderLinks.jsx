import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import { GoogleLogout } from 'react-google-login';
import { connect } from "react-redux";
import { logoutHandler } from "../../store/handlers/loginHandlers";
import './headerLinks.css';
import {withRouter} from "react-router-dom";

class HeaderLinks extends Component {

  signOut = () => {
    this.props.logout()
      .then(this.props.history.push("/"));
  }

  render() {
    // const notification = (
    //   <div>
    //     <i className="fa fa-globe" />
    //     <b className="caret" />
    //     <span className="notification">5</span>
    //     <p className="hidden-lg hidden-md">Notification</p>
    //   </div>
    // );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Ped tracker</p>
          </NavItem>
          {/* <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown> */}
          {/* <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem> */}
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            {this.props.loginStore.firstName}
          </NavItem>
          {/* <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */}
          <NavItem eventKey={3} href="#" >
            {/* <NavItem eventKey={3} href="#" onClick={this.signOut}> */}
            <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={this.signOut}
              className="nav navbar-default navbar-nav buttonBorder"
            />
          </NavItem>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginStore: state.loginStore
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => logoutHandler(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks));


// export default HeaderLinks;
