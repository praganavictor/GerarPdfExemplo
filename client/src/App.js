import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./App.css";

class App extends Component {
  state = {
    name: "",
    receiptId: 0,
    price1: 0,
    itens: []
  };

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "participantes.pdf");
      });
  };

  addHandler = () => {
    const { name, receiptId, price1 } = this.state;
    const item = {
      name,
      receiptId,
      price1
    };
    this.setState({ itens: [...this.state.itens, item] });
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  render() {
    return (
      <div className="App">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={this.handleChange}
        />
        <input
          type="number"
          placeholder="Receipt ID"
          name="receiptId"
          onChange={this.handleChange}
        />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          onChange={this.handleChange}
        />
        <button onClick={this.addHandler}>Adicionar</button>
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
        <div>
          {this.state.itens.map(item => (
            <div key={item.receiptId}>
              <h1>name: {item.name}</h1>
              <p>Receipt ID: {item.receiptId}</p>
              <p>price1 ID: {item.price1}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
