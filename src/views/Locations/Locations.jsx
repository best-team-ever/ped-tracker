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
      { Header: 'Type', accessor: 'location_type', maxWidth: 50, className: "center"},
      { Header: 'Name', accessor: 'name', style: { 'white-space': 'unset' }},
      { Header: 'Site id', accessor: 'site_id', style: { 'white-space': 'unset' }},
      { Header: 'Address', accessor: 'address', style: { 'white-space': 'unset' }},
      { Header: 'Country', accessor: 'country', style: { 'white-space': 'unset' }, className: "center"},
      { Header: 'Contact name', accessor: 'contact_name', style: { 'white-space': 'unset' }},
      { Header: 'Contact position', accessor: 'contact_position', style: { 'white-space': 'unset' }},
      { Header: 'Contact phone', accessor: 'contact_phone', style: { 'white-space': 'unset' }},
      { Header: 'Contact email', accessor: 'contact_email', style: { 'white-space': 'unset' }},
      { Header: 'Status', accessor: 'status', style: { 'white-space': 'unset' }, className: "center"},
      { Header: 'Action',
        Cell: (row)=>(
          <div className="action-right">
            <Link to={`/locations/${row.original.id}`} className="btn-simple btn-icon btn btn-warning">
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
