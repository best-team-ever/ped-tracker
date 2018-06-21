import React, { Component } from "react";
import ReactTable from "react-table";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchLocations } from "../../store/actions/locationsAction";

import 'react-table/react-table.css'
import TableCard from "components/TableCard/TableCard.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class Locations extends Component {
  getLocations(){
    let { error, loading, locations } = this.props;
    console.log("locations: ", this.props.locations);
    return {
      locations: locations,
      error: error,
      loading: loading
    }
  }

  componentDidMount(){
    this.props.dispatch(fetchLocations());
  }

  render() {
    const rthArray = [
      { Header: 'Type', accessor: 'location_type', maxWidth: 100},
      { Header: 'Name', accessor: 'name'},
      { Header: 'Address', accessor: 'address'},
      { Header: 'Country', accessor: 'country'},
      { Header: 'Contact name', accessor: 'contact_name'},
      { Header: 'Contact position', accessor: 'contact_position'},
      { Header: 'Contact phone', accessor: 'contact_phone'},
      { Header: 'Contact phone', accessor: 'contact_phone'},
      { Header: 'Contact email', accessor: 'contact_email'},
      { Header: 'Status', accessor: 'status'},
      { Header: 'Action',
        Cell: (row)=>(
          <div className="action-right">
            <Link to={`/locations/${row.row.id}`} className="btn-simple btn-icon btn btn-warning">
              <i className="fa fa-edit"></i>
            </Link>
          </div>
        ),
        filterable: false, maxWidth: 100
      },
    ];

    const rtdArray = this.getLocations().locations;

    return (
      <div className="content">
        <TableCard
          elementToShow="locations"
          title="Locations"
          category="list of locations"
          ctTableFullWidth
          ctTableResponsive
          addButton="New location"
          content={
            <ReactTable
              noDataText="Empty list!"
              columns={rthArray}
              data={rtdArray}
              defaultPageSize={10}
              className="-striped -highlight"
              defaultSorted={[{ id: "name", desc: true}]}
              filterable
              defaultFilterMethod={(filter, row) => row[filter.id].startsWith(filter.value)}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.items,
  loading: state.locations.loading,
  error: state.locations.error
});

export default withRouter(connect(mapStateToProps)(Locations));
