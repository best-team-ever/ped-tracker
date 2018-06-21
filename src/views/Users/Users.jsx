import React, { Component } from "react";
import ReactTable from "react-table";
import { fetchUsers } from "../../store/actions/userAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-table/react-table.css';
import './users.css';
import TableCard from "components/TableCard/TableCard.jsx";


class Users extends Component {
  getUsers(){
    let { error, loading, users } = this.props;
    return {
      items: users,
      error: error,
      loading: loading
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    // console.log("les props : ",this.props);
  }

  // onClick = (event) => {
  //   console.log(event);
  // }

  render() {
    const rthArray = [
      { Header: 'First name', accessor: 'first_name'},
      { Header: 'Last name', accessor: 'last_name'},
      { Header: 'Email', accessor: 'email'},
      { Header: 'P2PE Agreement', accessor: 'p2pe_agreement',
        Cell: (row)=>(
          <div className="action-right">
            <Link to={`/users/${row.row.id}`} className="btn-simple btn-icon btn btn-warning" >
              {row.row.p2pe_agreement === 0
                ? <i className="fa fa-square-o" ></i>
                : <i className="fa fa-check-square-o" color="blue"></i>}
            </Link>
          </div>
        ),
        filterable: false, maxWidth: 100
      },
      { Header: 'Role', accessor: 'role'},
      { Header: 'Location', accessor: 'location_id'},
      { Header: 'Action',
        Cell: (row)=>(
          <div className="action-right">
            <Link to={`/users/${row.row.id}`} className="btn-simple btn-icon btn btn-warning">
              <i className="fa fa-edit"></i>
            </Link>
          </div>
        ),
        filterable: false, maxWidth: 80
      },
    ];

    const rtdArray = this.getUsers().items;

    return (
      <div className="content">
        <TableCard
          title="Users"
          category="list of users"
          ctTableFullWidth
          ctTableResponsive
          addButton="New user"
          content={
            <ReactTable
              noDataText="Empty list!"
              columns={rthArray}
              data={rtdArray}
              defaultPageSize={10}
              className="-striped -highlight"
              defaultSorted={[{ id: "last_name", desc: false}]}
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
    users: state.users.items,
    loading: state.users.loading,
    error: state.users.error
  });

export default connect(mapStateToProps)(Users);
