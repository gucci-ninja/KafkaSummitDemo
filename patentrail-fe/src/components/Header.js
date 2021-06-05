import React from "react";

export const Header = (props) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <h5>Welcome to the Patent Registry!</h5>
      </div>
      <div className="col-md-4">
        {props.children}
      </div>
    </div>
  );
}