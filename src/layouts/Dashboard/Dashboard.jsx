import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { GoogleLogin } from 'react-google-login';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { style } from "../../variables/Variables.jsx";
import dashboardRoutes from "../../routes/dashboard.jsx";

// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginHandler, setMsgHandler } from "../../store/handlers/loginHandlers";
import './dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      signed: false
    };
    this.mainPanel = React.createRef();
    this.clientId = process.env.REACT_APP_API_USER;
    this.urlServer = process.env.REACT_APP_URL_SERVER;
  }

  responseGoogle = (response) => {
    fetch(`${this.urlServer}/googleConnectBack`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': response.tokenObj.id_token
      }
    })
      .then((response) => response.json())
      .then((result) => {
        result.message === "Not allowed"
          ? this.props.setMsg("Not authorized")  // PREVOIR GoogleAuth.signOut()
          : this.props.login(result[0].id, result[0].first_name, result[0].location_id)
        })
      .catch((error) => this.props.setMsg("User not found", error)) // PREVOIR GoogleAuth.signOut()
  }

  handleNotificationClick = (position, message = "no message", level = "info", autoDismiss = 10) => {
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-info" />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: autoDismiss
    });
  }

  componentDidMount = () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      if (this.mainPanel.current) {
        this.mainPanel.current.scrollTop = 0;
      }
    }
  }

  render() {
    if (this.props.loginStore.signed) {
      return (
        <div className="wrapper">
          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel" ref={this.mainPanel}>
            <Header {...this.props} />
            <Switch>
              {dashboardRoutes.map((prop, key) => {
                if (prop.redirect) {
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                } else {
                  return (
                    <Route
                      path={prop.path}
                      key={key}
                      render={routeProps => (
                        <prop.component
                          {...routeProps}
                          handleClick={this.handleNotificationClick}
                        />
                      )}
                    />
                  );
                }
              })}
            </Switch>
            <Footer />
          </div>
        </div>
      );
    } else {
      return (
        <div className="backgroundPicture">
          <NotificationSystem ref="notificationSystem" style={style} />
          <div className="text-center backgroundWhite" >
            <img src="./images/logoGoogle.png" width="72" height="72" alt="sign in"/>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <GoogleLogin
              className="btn btn-primary"
              clientId={this.clientId}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              />
              <p className="mt-5 mb-3 text-muted">© 2018</p>
              <br/>
              <p className="mt-5 mb-3 text-muted">{this.props.loginStore.msg}</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loginStore: state.loginStore,
  _notificationSystem: state._notificationSystem
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, firstName, location_id) => loginHandler(dispatch, userId, firstName, location_id),
    setMsg: (msg) => setMsgHandler(dispatch, msg)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default Dashboard;
