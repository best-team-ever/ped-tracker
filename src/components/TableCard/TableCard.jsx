import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'components/CustomButton/CustomButton';

export class TableCard extends Component {

  render() {
    const addButton = (this.props.addButton) ? (
      <Link to={`/${this.props.elementToShow}/new`}>
        <Button bsStyle="primary" pullRight>{this.props.addButton}</Button>
      </Link>
    ) : null;
    const header = (<div>
      {(this.props.title) ? (<h4 className="title">{this.props.title}</h4>) : null}
      {(this.props.category) ? (<p className="category">{this.props.category}</p>) : null}
    </div>);

    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className="header">
          {addButton}
          {header}
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableCard;
