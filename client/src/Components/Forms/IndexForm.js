import React from "react";

const IndexForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onIndexSubmit}>
        <label for="index">Enter your index:</label>
        <input
          type="text"
          value={props.index}
          onChange={(event) => props.setIndex(event.target.value)}
        />
      </form>
    </div>
  );
};

export default IndexForm;
