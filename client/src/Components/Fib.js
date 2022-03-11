import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import IndexForm from "./Forms/IndexForm";

const Fib = () => {
  const [values, setValues] = useState([]);
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
    fetchValues();
    fetchIndexes();
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

export default Fib;
