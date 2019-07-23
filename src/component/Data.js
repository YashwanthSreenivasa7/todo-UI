import React, { Component } from "react";
import Table1 from "./Table1.js";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import App from "../App.js";
import Form from "./Form.js";
import Navigation from "./Navigation.js";
import List from "./List.js";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      prod: {
        tid: 0,
        tname: "",
        tdesc: "",
        uid:0,
        task_Date:"" 
      },
      loggedIn: localStorage["loggedIn"]
    };
    this.logout = this.logout.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.editResponse=this.editResponse.bind(this);
  }


  editItem(id,desc,name){
    debugger;
    const pack={
      "tname":name,
      "tdesc":desc,
      "tid":id
    };
    fetch(`http://localhost:8080/todo/tasks/${Number(localStorage["userId"])}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token":localStorage["Token"]
      },body: JSON.stringify(pack)
    })
    .then( response => {
      if (!response.ok) { throw response }
      return response.json() 
      })
      .then(this.getProducts)
      .catch(err =>this.setState({ loggedIn: "false" }));
  }


  deleteItem(id1) {
    debugger;
    console.log(`http://localhost:8080/todo/tasks/${Number(localStorage["userId"])}/${id1}`);
    fetch(`http://localhost:8080/todo/tasks/${Number(localStorage["userId"])}/${id1}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token":localStorage["Token"]
      }
    })
    .then( response => {
      if (!response.ok) { throw response }
      return response.json() 
      })
      .then(this.getProducts)
      .catch(err =>this.setState({ loggedIn: "false" }));
  }

  editResponse(res){
    debugger;
  }

  getProducts = () => {
    debugger;
    fetch(`http://localhost:8080/todo/tasks/${Number(localStorage["userId"])}`, {
      method: 'GET',
      headers: {
          "token":localStorage["Token"]
      }
  })
  .then( response => {
    if (!response.ok && response.tasks) { throw response }
    return response.json() 
    })
      .then(response => this.setState({ product: response.tasks}))
      .catch(err =>this.setState({ loggedIn: "false" }));
  };
  logout = event => {
    debugger;
    fetch(`http://localhost:8080/todo/Logout/${Number(localStorage["userId"])}`, {
      method: 'GET',
      headers: {
          "token":localStorage["Token"]
      }
  })
    localStorage["loggedIn"] = "false";
    console.log("logging out");
    this.setState({ loggedIn: "false" });
  };

  addProduct = () => {
    debugger;
    const { prod } = this.state;
    console.log(JSON.stringify(prod));
    const pack={
      "tname":prod.tname,
      "tdesc":prod.tdesc,
      "uid":localStorage["userId"]
    }
    fetch(`http://localhost:8080/todo/tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token":localStorage["Token"]
      },
      body: JSON.stringify(pack)
    })
    .then( response => {
      if (!response.ok) { throw response }
      return response.json() 
      })
      .then(this.getProducts)
      .catch(err =>this.setState({ loggedIn: "false" }));
  };
  componentDidMount() {
    this.getProducts();
  }

  //renderProduct = ({ product_id, name }) => <div key={product_id}>{name}</div>;
  render() {
    const { product, prod, loggedIn } = this.state;
    if (loggedIn === "false") {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    } else {
      return (
        <div key="1">
          <Navigation onLogOut={this.logout} />
          <h1>Welcome {localStorage["emailId"]}</h1>
          <br/>
          <div key="4">
            <form className="form-inline">
              <div className="form-group col-md-3 panel">
                <label>Task Name: </label>
                <input
                  value={prod.tname}
                  onChange={e =>
                    this.setState({
                      prod: { ...prod, tname: e.target.value }
                    })
                  }
                />
              </div>
              <div className="form-group col-md-3">
                <label>Task Description : </label>
                <input
                  value={prod.tdesc}
                  onChange={e =>
                    this.setState({
                      prod: { ...prod, tdesc: e.target.value }
                    })
                  }
                />
              </div>
              <button className="btn btn-primary " onClick={this.addProduct}>
                Add Task !
              </button>
            </form>
            <br/>
            <br/>
          </div>
          <div key="3" className="table-responsive">
            <div key="101">
              {product.map(item => (
                <List obj={item} del={this.deleteItem} edit={this.editItem} key={item.TaskID} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Data;
