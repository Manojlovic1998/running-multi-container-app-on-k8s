import React from "react";

const IndexForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onIndexSubmit}>
        <label htmlFor="index">Enter your index:</label>
        <input
          type="text"
          id="index"
          value={props.index}
          onChange={(event) => props.setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default IndexForm;
