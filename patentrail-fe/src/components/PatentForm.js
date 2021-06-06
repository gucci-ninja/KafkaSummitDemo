import React, { Component } from "react";

class PatentFrom extends Component {

  state = { patent: '' };

  handleSubmit = (e) => {

    e.preventDefault();
    if(this.state.patent === '') return;
    this.props.newPatent(this.state.patent);
    this.setState({ patent: '' });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <br />
          <div className="input-group">
            
            <input
              type='text'
              className="form-control"
              value={this.state.patent}
              autoFocus={true}
              placeholder="Enter your patent"
              onChange={(e) => this.setState({patent: e.target.value})}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatentFrom;