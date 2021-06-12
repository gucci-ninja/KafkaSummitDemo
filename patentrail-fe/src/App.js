import React, { Component } from 'react'
import Patents from './components/Patents'
import PatentForm from './components/PatentForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      patents: [],
      intervalId: 0
    }
  }
  
  componentDidMount() {
    this.setUpWeb3();
    const intervalId = setInterval(() => this.getPatents(), 2000);
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  async setUpWeb3() {
    const accounts = await window.ethereum.enable();
    this.setState({ account: accounts[0] })
  }

  getPatents() {
    fetch("/patents")
    .then((res) => res.json())
    .then((data) => this.setState({ patents: data }));
  }

  newPatent(description) {
    const patent = {
      'description': description,
      'sender': this.account
    }
    fetch("/patent", { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patent)
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div className="App">
        <Patents patents={this.state.patents} account={this.state.account}></Patents>
        <PatentForm newPatent={this.newPatent} account={this.state.account}></PatentForm>
      </div>
    );
  }
}

export default App;