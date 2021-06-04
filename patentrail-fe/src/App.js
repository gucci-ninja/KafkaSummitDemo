import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }
  
  componentWillMount() {
    this.getPatents();
  }

  async getPatents() {
    let web3 = new Web3('ws://localhost:7545');
    let accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to PatenTrail, {this.state.account}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;