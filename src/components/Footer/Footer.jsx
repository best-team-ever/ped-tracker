import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="http://www.decathlon.com">Company</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="http://www.decathlon.com">Decathlon</a>, made with
            love by The Coding School
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
