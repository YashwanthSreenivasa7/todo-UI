import React, { Component } from "react";

class Table1 extends Component {
  render() {
    return (
      <tr key={this.props.data.product_id}>
        <td>{this.props.data.product_id}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.price}</td>
      </tr>
    );
  }
}
export default Table1;
