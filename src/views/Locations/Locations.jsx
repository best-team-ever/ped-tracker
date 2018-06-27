import React, { Component } from "react";
import ReactTable from "react-table";
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchLocations } from "../../store/actions/locationsAction";

import 'react-table/react-table.css'
import TableCard from "../../components/TableCard/TableCard.jsx";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchLocations());
  }

  onFileSubmit = event => {
    event.preventDefault();
    this.fileUpload(this.state.file)
    .then(res => res.json())
    .then(res => {
      this.props.dispatch(fetchLocations());
      window.scrollTo(0, 0);
      this.props.handleClick("tc", res, "info", 5);
    });
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  }

  fileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("random_value", "42");
    return fetch(process.env.REACT_APP_URL_SERVER + "/api/upload-locations", {
      method: "POST",
      body: formData
    });
  }

  render() {
    const rthArray = [
      { Header: 'Type', accessor: 'location_type', maxWidth: 50, className: "center"},
      { Header: 'Name', accessor: 'name', style: { 'white-space': 'unset' }},
      { Header: 'Site id', accessor: 'site_id', style: { 'white-space': 'unset' }},
      { Header: 'Country', accessor: 'country', style: { 'white-space': 'unset' }, className: "center"},
      { Header: 'Contact name', accessor: 'contact_name', style: { 'white-space': 'unset' }},
      { Header: 'Contact position', accessor: 'contact_position', style: { 'white-space': 'unset' }},
      { Header: 'Contact phone', accessor: 'contact_phone', style: { 'white-space': 'unset' }},
      { Header: 'Contact email', accessor: 'contact_email', style: { 'white-space': 'unset' }},
      { Header: 'Status', accessor: 'status', style: { 'white-space': 'unset' }, className: "center",
        Cell: (row) => (
          (row.original.status === "1")? "Active" : "Inactive"
        )
      },
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

    const rtdArray = this.props.locations;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <form onSubmit={this.onFileSubmit}>
                  <Row>
                    <Col className="col-md-8">
                      <FormGroup controlId="upload">
                        <ControlLabel>Locations File Upload</ControlLabel>
                        <FormControl type="file" onChange={this.onFileChange} />
                        <HelpBlock>select a file to upload locations with format: <i>name,site_id,address,country,first_name,last_name,contact_position,contact_phone,contact_email</i></HelpBlock>
                      </FormGroup>
                    </Col>
                    <Col className="col-md-4">
                      <Button type="submit">Upload</Button>
                    </Col>
                  </Row>
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
  locations: state.locations.items,
  loading: state.locations.loading,
  error: state.locations.error
});

export default withRouter(connect(mapStateToProps)(Locations));
