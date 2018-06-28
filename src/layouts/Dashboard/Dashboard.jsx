import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { GoogleLogin } from 'react-google-login';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { style } from "../../variables/Variables.jsx";
import dashboardRoutes from "../../routes/dashboard.jsx";

import { connect } from "react-redux";
import { loginHandler, setMsgHandler } from "../../store/handlers/loginHandlers";
import '../../layouts/Dashboard/dashboard.css';
import Authorization from "../../views/Login/Authorization";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      signed: true,
      signedUserId: "",
      lgShow: false
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
      .then((result) =>
        // (result[0].p2pe_agreement === "1")
        //   ? this.props.login(result[0].id, result[0].first_name)
        //   : this.props.setMsg("You are not authorized", this.props.dispatch).then(() => this.props.history.push("/auth"))
        this.props.login(result[0].id, result[0].first_name, String(result[0].p2pe_agreement), result[0].location_id)
          .then(() => this.setState({ lgShow: true }))
      )
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
  };

  componentDidMount = () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  };

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
    let lgClose = () => this.setState({ lgShow: false });

    return (this.props.loginStore.signed ?
        (
          (this.props.loginStore.p2pe_agreement === "1")?
            (
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
            )
            :
            (
              <div className="backgroundPicture">
                <div className="text-center backgroundWhite" >
                  <img src="./images/logoGoogle.png" width="72" height="72" alt="sign in"/>
                  <h1 className="h3 mb-3 font-weight-normal">You are not authorized</h1>
                  <Authorization
                    signedUserId={this.props.loginStore.userId}
                    show={this.state.lgShow}
                    onHide={lgClose}
                  />
                </div>
              </div>
            )
        )

        : (
          <div className="backgroundPicture">
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
        )
    );
  }
}

const mapStateToProps = (state) => ({
  loginStore: state.loginStore,
  _notificationSystem: state._notificationSystem
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, firstName, p2pe_agreement, location_id) => loginHandler(dispatch, userId, firstName, p2pe_agreement, location_id),
    setMsg: (msg) => setMsgHandler(dispatch, msg)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
