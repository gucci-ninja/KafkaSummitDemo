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
              <Header></Header>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
                {this.props.patents.map(t => (
                  <li key={t.id} className="list-group-item">
                    {t.description}
                    { t.verified || t.id ?
                        <span class="float-right badge rounded-pill bg-success text-light">Verified</span>
                      : <span class="float-right badge rounded-pill bg-primary text-light">Block Added</span>
                    }
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