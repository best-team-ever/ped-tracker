import React, { Component } from "react";
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import TableCard from "../../components/TableCard/TableCard.jsx";
import 'react-table/react-table.css'

import { fetchEvents } from "../../store/actions/eventAction";

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
      device_id: getQueryVariable("device_id"),
      location_id: getQueryVariable("location_id"),
      user_id: getQueryVariable("user_id"),
    }
  }

  componentDidMount() {
    let device_id = this.state.device_id;
    let location_id = this.state.location_id;
    let user_id = this.state.user_id;

    if (this.props.device_id) {
      device_id = this.props.device_id;
    }
    if (this.props.location_id) {
      location_id = this.props.location_id;
    }
    if (this.props.user_id) {
      user_id = this.props.user_id;
    }
    const where = {
      location_id: location_id,
      device_id: device_id,
      user_id: user_id
    };
    this.props.dispatch(fetchEvents(where));
  }

  render() {
    let thArray = [];
    if (!this.props.device_id && !this.state.device_id) {
      thArray.push({ Header: 'PED', accessor: 'device.serial_nr'});
    }
    if (!this.props.location_id && !this.state.location_id) {
      thArray.push({ Header: 'Location', accessor: 'location.name'});
    }
    if (!this.props.user_id && !this.state.user_id) {
      thArray.push({ Header: 'User', Cell: (row)=>(`${row.original.user.first_name} ${row.original.user.last_name}`)});
    }
    thArray = [...thArray,
      { Header: 'Log', accessor: 'message'},
      { Header: 'timestamp', accessor: 'createdAt'},
    ];

    const tdArray = this.props.events;
    const title = (this.props.title) ? this.props.title : null;
    const category = (this.props.category) ? this.props.category : null;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <TableCard
                elementToShow="events"
                title={title}
                category={category}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <ReactTable
                    noDataText="Empty list!"
                    columns={thArray}
                    data={tdArray}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    defaultSorted={[{ id: "createdAt", desc: true}]}
                    filterable
                    defaultFilterMethod={(filter, row) => row[filter.id].startsWith(filter.value)}
                  />
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.items,
  loading: state.events.loading,
  error: state.events.error,
});

export default connect(mapStateToProps)(Events);
