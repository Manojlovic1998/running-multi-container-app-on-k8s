import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import IndexForm from "./Forms/IndexForm";

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

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  };

  useEffect(() => {
    // On load
    // Fetch current values
    fetchValues();
    fetchIndexes();
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
        <p>
          {seenIndexes
            ? seenIndexes.map(({ number }) => number).join(", ")
            : ""}
        </p>
      </div>
      <div>
        <h4>Calculated Values:</h4>
        {renderValues(values)}
      </div>
    </Fragment>
  );
};

export default Fib;
