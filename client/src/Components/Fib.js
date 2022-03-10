import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import IndexForm from "./Forms/IndexForm";

const fetchValues = async () => {
  const values = await axios.get("/api/values/current");
  return values;
};

const fetchIndexes = async () => {
  const seenIndexes = await axios.get("/api/values/all");
  return seenIndexes;
};

const renderValues = (keys) => {
  const entries = [];

  for (let key in keys) {
    entries.push(
      <div key={key}>
        For index {key} I calculated {keys[key]}
      </div>
    );
  }

  return entries;
};

const Fib = () => {
  const [values, setValues] = useState({});
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [index, setIndex] = useState("");

  useEffect(() => {
    // On load
    // Fetch current values
    const currentValues = fetchValues();
    setValues(currentValues);
    // Fetch all the values
    const allValues = fetchIndexes;
    setSeenIndexes(allValues);
  }, []);

  const onIndexSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: index,
    });

    setIndex("");
  };

  return (
    <Fragment>
      <IndexForm
        onIndexSubmit={onIndexSubmit}
        index={index}
        setIndex={setIndex}
      />
      <div>
        <h4>Indices I have seen:</h4>
        <p>{seenIndexes.map(({ number }) => number).join(", ")}</p>
      </div>
      <div>
        <h4>Calculated Values:</h4>
        {renderValues(values)}
      </div>
    </Fragment>
  );
};

export default Fib;
