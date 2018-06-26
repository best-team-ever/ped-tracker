import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row, Checkbox } from "react-bootstrap";

function FieldGroup({ label, ...props }) {
  const {type, ...fieldProps} = props;
  let formControl = null;

  switch(type) {
    case undefined:
      break;

    case "checkbox":
      formControl = (<Checkbox {...fieldProps}></Checkbox>);
      break;

    case "select":
      const {options, ...selectProps} = fieldProps;
      formControl = (
        <FormControl componentClass="select" {...selectProps}>
          {(options && options.length > 0)
          ? options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>))
          : ""}
        </FormControl>
      );
      break;

    default:
      formControl = <FormControl {...fieldProps} />;
  }

  return formControl
    ? (<FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {formControl}
    </FormGroup>)
    : "";
}

export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.properties[i]} />
        </div>
      );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;
