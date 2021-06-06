import React, { Component } from 'react'
import Web3 from 'web3';
import Patents from './components/Patents'
import PatentForm from './components/PatentForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      patents: [],
      loading: true,
    }
  }
  
  componentWillMount() {
    this.getPatents();
  }

  async getPatents() {
    // connect to blockchain via websockets
    const web3 = new Web3('ws://localhost:7545');
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })


  }

  render() {
    return (
      <div className="App">
        <Patents patents={this.state.patents} account={this.state.account}></Patents>
        <PatentForm account={this.state.account}></PatentForm>
      </div>
    );
  }
}

export default App;