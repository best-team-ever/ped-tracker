import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-table/react-table.css'
import TableCard from "components/TableCard/TableCard.jsx";
import { fetchDevices } from "../../store/actions/deviceAction";

class Devices extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDevices());
  }

  render() {
    const rthArray = [
      { Header: 'SerialNr', accessor: 'serial_nr', maxWidth: 100},
      { Header: 'Brand', accessor: 'brand'},
      { Header: 'Model', accessor: 'model'},
      { Header: 'TID', accessor: 'tid'},
      { Header: 'Till', accessor: 'till_label'},
      { Header: 'Status', accessor: 'status'},
      { Header: 'Security bag', accessor: 'security_bag_sn'},
      { Header: 'Action',
        Cell: (row)=>(
          <div className="action-right">
            <Link to={`/devices/${row.original.id}`} className="btn-simple btn-icon btn btn-warning">
              <i className="fa fa-edit"></i>
            </Link>
          </div>
        ),
        filterable: false,
        maxWidth: 100
      },
    ];

    const rtdArray = this.props.devices;

    return (
      <div className="content">
        <TableCard
          elementToShow="devices"
          title="Devices"
          category="list of devices"
          ctTableFullWidth
          ctTableResponsive
          addButton="New device"
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
  devices: state.devices.items,
  loading: state.devices.loading,
  error: state.devices.error
});

export default connect(mapStateToProps)(Devices);
