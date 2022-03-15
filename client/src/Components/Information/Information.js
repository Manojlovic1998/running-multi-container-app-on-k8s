import { Fragment } from "react";

const Information = (props) => {
  return (
    <Fragment>
      <div className={"mb-5"}>
        <h2 className={"fw-bolder fs-5"}>Indices I have seen:</h2>
        <p className={"mt-4"}>
          {props.seenIndexes
            ? props.seenIndexes.map(({ number }) => number).join(", ")
            : ""}
        </p>
      </div>
      <hr />
      <div className="mt-5 pb-5">
        <h2 className={"fw-bolder fs-5"}>Calculated Values:</h2>
        {props.values
          ? Object.keys(props.values).map((key) => (
              <div key={key}>
                <p className={"mt-4"}>
                  For index {key} I calculated {props.values[key]}
                </p>
              </div>
            ))
          : ""}
      </div>
    </Fragment>
  );
};

export default Information;
