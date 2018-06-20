import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import 'react-table/react-table.css'

import TableCard from "components/TableCard/TableCard.jsx";

const rtdArray = [
  {id: "1", name: "Dakota Rice", salary: "$36,738", country: "Niger", city: "Oud-Turnhout"},
  {id: "2", name: "Minerva Hooper", salary: "$23,789", country: "Curaçao", city: "Sinaai-Waas"},
  {id: "3", name: "Sage Rodriguez", salary: "$56,142", country: "Netherlands", city: "Baileux"},
  {id: "4", name: "Philip Chaney", salary: "$38,735", country: "Korea, South", city: "Overland Park"},
  {id: "5", name: "Doris Greene", salary: "$63,542", country: "Malawi", city: "Feldkirchen in Kärnten"},
  {id: "6", name: "Mason Porter", salary: "$78,615", country: "Chile", city: "Gloucester"},
];

class Devices extends Component {

  onClick = (event) => {
    console.log(event);
  }

  render() {
    const rthArray = [
      { Header: 'ID', accessor: 'id', maxWidth: 100},
      { Header: 'Name', accessor: 'name'},
      { Header: 'Salary', accessor: 'salary'},
      { Header: 'Country', accessor: 'country'},
      { Header: 'City', accessor: 'city'},
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

export default Devices;
