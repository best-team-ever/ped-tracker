import React, { Component } from "react";
import ReactTable from "react-table";
import { fetchDevices } from "../../store/actions/deviceAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-table/react-table.css'
import TableCard from "components/TableCard/TableCard.jsx";

// const rtdArray = [
//   {id: "1", name: "Dakota Rice", salary: "$36,738", country: "Niger", city: "Oud-Turnhout"},
//   {id: "2", name: "Minerva Hooper", salary: "$23,789", country: "Curaçao", city: "Sinaai-Waas"},
//   {id: "3", name: "Sage Rodriguez", salary: "$56,142", country: "Netherlands", city: "Baileux"},
//   {id: "4", name: "Philip Chaney", salary: "$38,735", country: "Korea, South", city: "Overland Park"},
//   {id: "5", name: "Doris Greene", salary: "$63,542", country: "Malawi", city: "Feldkirchen in Kärnten"},
//   {id: "6", name: "Mason Porter", salary: "$78,615", country: "Chile", city: "Gloucester"},
// ];

class Devices extends Component {
  getDevices(){
    let { error, loading, devices } = this.props;
    return {
      items: devices,
      error: error,
      loading: loading
    };
  }

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
            <Link to={`/devices/${row.row.id}`} className="btn-simple btn-icon btn btn-warning">
              <i className="fa fa-edit"></i>
            </Link>
          </div>
        ),
        filterable: false, maxWidth: 100
      },
    ];

    const rtdArray = this.getDevices().items;

    return (
      <div className="content">
        <TableCard
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
