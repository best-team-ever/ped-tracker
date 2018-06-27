import React, { Component } from "react";
import ReactTable from "react-table";
import { Grid, Row, Col, Alert, FormGroup, ControlLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-table/react-table.css'
import TableCard from "../../components/TableCard/TableCard.jsx";
import { Card } from "../../components/Card/Card.jsx";

import { fetchDevices } from "../../store/actions/deviceAction";

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchDevices());
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

  onFileSubmit = event => {
    event.preventDefault();
    this.fileUpload(this.state.file)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  }

  fileUpload(file){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("random_value", "42");
    return fetch("http://localhost:8000/upload-devices", {
      method: "POST",
      body: formData
    });
  }

  render() {
    const rthArray = [
      { Header: 'SerialNr', accessor: 'serial_nr', maxWidth: 100},
      { Header: 'Brand', accessor: 'brand'},
      { Header: 'Model', accessor: 'model'},
      { Header: 'TID', accessor: 'tid'},
      { Header: 'Location', accessor: 'location.name'},
      { Header: 'Till', accessor: 'till_label'},
      { Header: 'Status', accessor: 'status'},
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
        <Grid fluid>
          <Row>
            <Col>
              {this.alert(this.props.error)}
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <ControlLabel>Device File Upload</ControlLabel>
                <form onSubmit={this.onFileSubmit}>
                  <input type="file" onChange={this.onFileChange} />
                  <button type="submit">Upload</button>
                </form>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
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
