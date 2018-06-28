import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "../../assets/img/sidebar-4.jpg";
import logo from "../../assets/img/decathlon-appli.png";

import dashboardRoutes from "../../routes/dashboard.jsx";
import {connect} from "react-redux";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a
            href="/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="/"
            className="simple-text logo-normal"
          >
            PED-Tracker
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop, key) => {
              if(this.props.loginStore.userRole === "hotesse"){
                if (prop.invisible)
                  return null;
                else if (!prop.redirect ){
                  if (prop.path === "/dashboard" || prop.path === "/ped" || prop.path === "/events" || prop.path === "/help"){
                    return (
                      <li
                        className={
                          prop.upgrade
                            ? "active active-pro"
                            : this.activeRoute(prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
                  }
                }
                return null;
              }else {
                if(prop.invisible)
                  return null;
                else if (!prop.redirect)
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : this.activeRoute(prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginStore: state.loginStore
})

export default withRouter(connect(mapStateToProps)(Sidebar));
// export default Sidebar;
