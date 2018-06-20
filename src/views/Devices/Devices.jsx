import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import ReactTable from "react-table";
import 'react-table/react-table.css'

import Card from "components/Card/Card.jsx";

const rthArray = [
  { Header: 'ID', accessor: 'id', maxWidth: 100},
  { Header: 'Name', accessor: 'name',
     filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
  },
  { Header: 'Salary', accessor: 'salary'},
  { Header: 'Country', accessor: 'country'},
  { Header: 'City', accessor: 'city'},
];
const rtdArray = [
  {id: "1", name: "Dakota Rice", salary: "$36,738", country: "Niger", city: "Oud-Turnhout"},
  {id: "2", name: "Minerva Hooper", salary: "$23,789", country: "Curaçao", city: "Sinaai-Waas"},
  {id: "3", name: "Sage Rodriguez", salary: "$56,142", country: "Netherlands", city: "Baileux"},
  {id: "4", name: "Philip Chaney", salary: "$38,735", country: "Korea, South", city: "Overland Park"},
  {id: "5", name: "Doris Greene", salary: "$63,542", country: "Malawi", city: "Feldkirchen in Kärnten"},
  {id: "6", name: "Mason Porter", salary: "$78,615", country: "Chile", city: "Gloucester"},
];

class Devices extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Devices"
                category="with react-table component"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <ReactTable
                    noDataText="Not devices available!"
                    columns={rthArray}
                    data={rtdArray}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    defaultSorted={[{ id: "name", desc: true}]}
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                    getTdProps={(state, rowInfo, column, instance) => {
                      return {
                        onMouseEnter: e =>
                          console.log("Cell - onMouseEnter", {
                            state,
                            rowInfo,
                            column,
                            instance,
                            event: e
                          })
                      };
                    }}
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

export default Devices;
