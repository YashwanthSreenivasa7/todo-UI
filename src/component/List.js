import React, { Component } from "react";
export class List extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true ,desc:this.props.obj.tdesc};

    // This binding is necessary to make `this` work in the callback
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleDelClick = this.handleDelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleDescChange(event) {
    this.setState({ desc: event.target.value });
  }

  handleEditClick=(id,desc,name)=>{
    debugger;
    this.props.edit(id,desc,name);
  }
  handleDelClick = id => {
    debugger;
    this.props.del(id);
  };
  render() {
   // this.state.desc=this.props.obj.tdesc;
    return (
      <div className="card">
        <h4 className="card-header text-left">Task : {this.props.obj.tname}</h4>
        <div className="card-body">
        <div className="form-group card-text text-left">
                    <label>
                      Description :
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User Name"
                        value={this.state.desc}
                        onChange={this.handleDescChange}
                      />
                    </label>
                  </div>
          <p className="card-subtitle text-left">
           Created on : {this.props.obj.task_Date.slice(0,10)}
          </p>
          <div class="container">
          <div class="row">
          <div class="col-md-6 ">
          <button
          onClick={this.handleEditClick.bind(this, this.props.obj.tid,this.state.desc,this.props.obj.tname)}
            className="btn btn-success btn-md center-block"
          >
            Edit
          </button>
          </div>
          <div class="col-md-6">
          <button
            onClick={this.handleDelClick.bind(this, this.props.obj.tid)}
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
