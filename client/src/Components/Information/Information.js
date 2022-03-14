import { Fragment } from "react";

const Information = () => {
  return (
    <Fragment>
      <div>
        <h4>Indices I have seen:</h4>
        <p>
          {seenIndexes
            ? seenIndexes.map(({ number }) => number).join(", ")
            : ""}
        </p>
      </div>
      <div>
        <h4>Calculated Values:</h4>
        {values
          ? Object.keys(values).map((key) => (
              <div key={key}>
                For index {key} I calculated {values[key]}
              </div>
            ))
          : ""}
      </div>
    </Fragment>
  );
};

export default Information;
