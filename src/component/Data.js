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
        id: 0,
        task: "",
        desc: ""
      },
      loggedIn: localStorage["loggedIn"]
    };
    this.logout = this.logout.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(id1) {
    debugger;
    const n = this.state.product.length;
    let li = this.state.product;

    let r = 0;
    for (var i = 0; i < n; i++) {
      if (li[i].TaskID === id1) {
        r = i;
        break;
      }
    }
    li.splice(r, 1);
    if (n === 1) li = [];
    this.setState({ product: li });
  }
  getProducts = () => {
    debugger;
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(response => this.setState({ product: response.data }))
      .catch(err => console.log(err));
  };
  logout = event => {
    debugger;
    localStorage["loggedIn"] = "false";
    console.log("logging out");
    this.setState({ loggedIn: "false" });
  };

  addProduct = () => {
    debugger;
    const { prod } = this.state;
    console.log(JSON.stringify(prod));
    //`http://localhost:4000/products/add?name=${prod.name}&price=${prod.price}`

    fetch("http://localhost:4000/products/post/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prod)
    })
      .then(this.getProducts)
      .catch(err => console.log(err));
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
          <h1>Welcome to your check Lists {localStorage["emailId"]}</h1>
          <div key="4">
            <form className="form-inline">
              <div className="form-group">
                <label>Task : </label>
                <input
                  value={prod.task}
                  onChange={e =>
                    this.setState({
                      prod: { ...prod, task: e.target.value }
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description : </label>
                <input
                  value={prod.desc}
                  onChange={e =>
                    this.setState({
                      prod: { ...prod, desc: e.target.value }
                    })
                  }
                />
              </div>
              <button className=".btn .btn-primary" onClick={this.addProduct}>
                Submit !
              </button>
            </form>
          </div>
          <div key="3" className="table-responsive">
            <div key="101">
              {product.map(item => (
                <List obj={item} del={this.deleteItem} key={item.TaskID} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Data;
