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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null,
      signed: true
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
          ? this.props.setMsg("Not authorized")
          : this.props.login()
        })
      .catch((error) => this.props.setMsg("User not found", error))
  }

  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    // var _notificationSystem = this.refs.notificationSystem;
    // var color = Math.floor(Math.random() * 4 + 1);
    // var level;
    // switch (color) {
    //   case 1:
    //     level = "success";
    //     break;
    //   case 2:
    //     level = "warning";
    //     break;
    //   case 3:
    //     level = "error";
    //     break;
    //   case 4:
    //     level = "info";
    //     break;
    //   default:
    //     break;
    // }
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
    //       every web developer.
    //     </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
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
    console.log("hhh: ",this.props.message.msg);
    return (this.props.signedState.signed
      ?
      <div className="wrapper">
          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel" ref={this.mainPanel}>
            <Header {...this.props} />
            <Switch>
              {dashboardRoutes.map((prop, key) => {
                if (prop.name === "Notifications")
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
                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                return (
                  <Route path={prop.path} component={prop.component} key={key} />
                );
              })}
            </Switch>
            <Footer />
          </div>
        </div>
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
              <p className="mt-5 mb-3 text-muted">{this.props.message.msg}</p>
          </div>
          </div>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  signedState: state.login,
  message : state.msg
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => loginHandler(dispatch),
    setMsg: (msg) => setMsgHandler(dispatch, msg)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default Dashboard;
