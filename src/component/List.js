import React, { Component } from "react";
export class List extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = id => {
    debugger;
    this.props.del(id);
  };
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.obj.tname}</h5>
          <p className="card-text">
           Task description : {this.props.obj.tdesc}.
          </p>
          <p className="card-text">
           Created on : {this.props.obj.task_Date.slice(0,10)}.
          </p>
          <button
            onClick={this.handleClick.bind(this, this.props.obj.tid)}
            className="btn btn-primary"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default List;
