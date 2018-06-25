import React, { Component } from "react";
import ReactTable from "react-table";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import TableCard from "components/TableCard/TableCard.jsx";
import 'react-table/react-table.css'

import { fetchEvents } from "../../store/actions/eventAction";

class Events extends Component {
  componentDidMount() {
    const {location_id, device_id, user_id} = this.props;
    this.props.dispatch(fetchEvents({
      location_id: location_id,
      device_id: device_id,
      user_id: user_id
    }));
  }

  alert = (error) => {
    if (error) {
      return (
        <Alert bsStyle="danger">
          <button type="button" aria-hidden="true" className="close">&#x2715;</button>
          <span><b>ERROR: </b>{error.toString()}</span>
        </Alert>
      );
    }
  }

  render() {
    let thArray = [];
    if (!this.props.device_id) {
      thArray.push({ Header: 'PED', accessor: 'device.serial_nr'});
    }
    if (!this.props.location_id) {
      thArray.push({ Header: 'Location', accessor: 'location.name'});
    }
    if (!this.props.user_id) {
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
              {this.alert(this.props.error)}
            </Col>
          </Row>
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
  error: state.events.error
});

export default connect(mapStateToProps)(Events);
