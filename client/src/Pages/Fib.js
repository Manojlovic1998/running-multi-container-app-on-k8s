import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import IndexForm from "../Components/Forms/IndexForm";
import Information from "../Components/Information/Information";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./Fib.module.css";

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
      <div className={`px-4 pt-5 ${classes.heroBg}`}>
        <IndexForm
          onIndexSubmit={onIndexSubmit}
          index={index}
          setIndex={setIndex}
        />
      </div>
      <Container>
        <Row>
          <Col lg={6} className={"mx-auto mt-5"}>
            <Information values={values} seenIndexes={seenIndexes} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Fib;
