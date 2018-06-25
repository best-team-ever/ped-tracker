import React, { Component } from "react";
import ReactTable from "react-table";
import { fetchUsers } from "../../store/actions/userAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-table/react-table.css';
import './users.css';
import TableCard from "../../components/TableCard/TableCard.jsx";


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


  render() {
    const rthArray = [
      { Header: 'First name', accessor: 'first_name'},
      { Header: 'Last name', accessor: 'last_name'},
      { Header: 'Email', accessor: 'email'},
      { Header: 'P2PE Agreement', accessor: 'p2pe_agreement',
        Cell: ({value})=>(
          <div className="action-right">
              {value === 0
                ? <i className="fa fa-close"/>
                : <i className="fa fa-check"/>
              }
          </div>
        ),
        filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "true") {
                      return row[filter.id] === 1;
                    }
                    return row[filter.id] === 0;
                  },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            <option value="true">Validated</option>
            <option value="false">Not validated</option>
          </select>,
        filterable: true, maxWidth: 120
      },
      { Header: 'Role', accessor: 'role'},
      { Header: 'Location', accessor: 'location.name'},
      { Header: 'Action',
        Cell: (row)=>(
          <div className="action-right">
            <Link to={`/users/${row.original.id}`} className="btn-simple btn-icon btn btn-warning">
              <i className="fa fa-edit"></i>
            </Link>
          </div>
        ),
        filterable: false, maxWidth: 55
      },
    ];

    const rtdArray = this.getUsers().items;

    return (
      <div className="content">
        <TableCard
          elementToShow="users"
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
