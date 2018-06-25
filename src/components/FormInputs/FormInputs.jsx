import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row, Checkbox } from "react-bootstrap";

function FieldGroup({ label, ...props }) {
  let formControl = null;

  switch(props.componentClass) {
    case "checkbox" :
      const {componentClass, ...checkboxProps} = props;
      formControl = (<Checkbox {...checkboxProps}></Checkbox>);
      break;

    case "select" :
      const {options, ...selectProps} = props;
      formControl = (options && options.length > 0)
        ? (<FormControl {...selectProps} >{options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </FormControl>)
        : (<FormControl {...selectProps} />);
      break;

    default:
      formControl = <FormControl {...props} />;
  }

  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {formControl}
    </FormGroup>
  );
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
