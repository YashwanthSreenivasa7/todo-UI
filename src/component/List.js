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
        <h4 className="card-header text-left">Task : {this.props.obj.tname}</h4>
        <div className="card-body">
          <p className="card-text text-left">
           Task description : {this.props.obj.tdesc}.
          </p>
          <p className="card-subtitle text-left">
           Created on : {this.props.obj.task_Date.slice(0,10)}
          </p>
          <div class="container">
          <div class="row">
          <div class="col-md-6 ">
          <button
            className="btn btn-success btn-md center-block"
          >
            Edit
          </button>
          </div>
          <div class="col-md-6">
          <button
            onClick={this.handleClick.bind(this, this.props.obj.tid)}
            className="btn btn-danger btn-md center-block"
          >
            Delete
          </button>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default List;
