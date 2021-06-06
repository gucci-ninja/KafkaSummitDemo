import React, { Component } from "react";
import { Header } from "./Header";

class Patents extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h4>Hi, {this.props.account}</h4>
              <Header></Header>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
                {this.props.patents.map(t => (
                  <li key={t.id} className="list-group-item">
                    {t.description}
                    <button
                      className="float-right btn btn-danger btn-sm"
                      style={{ marginLeft: 10 }}
                      // onClick={() => dispatch({ type: "COMPLETE", payload: t })}
                    >
                      Complete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Patents;