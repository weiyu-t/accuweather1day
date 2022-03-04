import React from "react";

const Errmsg = ({ error }) => {
  return (
    <div className="error_containter" show="true">
      <h3>City not found:(</h3>
      <p>Please check your spelling or come back later</p>
      <p>{error}</p>
    </div>
  );
};

export default Errmsg;
