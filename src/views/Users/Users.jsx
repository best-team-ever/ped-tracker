import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import 'react-table/react-table.css'

import TableCard from "components/TableCard/TableCard.jsx";


const rtdArray = [
    {id: "40dc09ad-c035-47cf-8587-8622c4319d86",
    first_name: "jeanphilippe",
    last_name: "bornier",
    email: "jeanphilippe.bornier@decathlon.com",
    p2pe_agreement: 1,
    language: "en",
    role: "hotesse",
    location: "GILTBROOK",
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {id: "700cb59b-91fd-42b3-aa41-3702f0b8611d",
    first_name:"yuanqin",
    last_name: "deng",
    email: "yuanqin.deng@decathlon.com",
    p2pe_agreement: 1,
    language: "en",
    role: "admin",
    location: "GILTBROOK",
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {id:"ae6233bb-90db-42bc-8f18-17a0d31c0100",
    first_name:"olivier",
    last_name: "masurel",
    email: "olivier.masurel@decathlon.com",
    p2pe_agreement: 0,
    language: "en",
    role: "hotesse",
    location_id: "GILTBROOK",
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {id:"66defb1c-241d-4337-a835-3d388c78e8bf",
    first_name:"frederic",
    last_name: "delimeux",
    email: "frederic.delimeux@decathlon.com",
    p2pe_agreement: 0,
    language: "en",
    role: "admin",
    location: "GILTBROOK",
    createdAt: new Date(),
    updatedAt: new Date()
    }
];


class Users extends Component {
  onClick = (event) => {
    console.log(event);
  }

  // const thArray = ["First name", "Last name", "Email", "P2PE Agreement", "Role", "Location"];
  render() {
    const rthArray = [
      { Header: 'ID', accessor: 'id', maxWidth: 100},
      { Header: 'First name', accessor: 'first_name'},
      { Header: 'Last name', accessor: 'last_name'},
      { Header: 'Email', accessor: 'email'},
      { Header: 'P2PE Agreement', accessor: 'p2pe_agreement'},
      { Header: 'Role', accessor: 'role'},
      { Header: 'Location', accessor: 'location_id'},
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


export default Users;
