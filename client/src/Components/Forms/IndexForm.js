import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./IndexForm.css";
const IndexForm = (props) => {
  return (
    <Col
      lg={4}
      md={5}
      sm={7}
      className={"mx-auto shadow-lg py-4 px-5 bg-white form-wrapper"}
    >
      <h1 className={"fs-5 mb-5 mt-3 fw-bolder form-heading"}>
        Fibonacci Sequence Calculator
      </h1>
      <Form onSubmit={props.onIndexSubmit}>
        <Form.Group className={"form-group-wrapper"}>
          <Form.Label htmlFor="index" className={"input-label"}>
            Enter your index:
          </Form.Label>
          <input
            type="number"
            id="index"
            value={props.index}
            onChange={(event) => props.setIndex(event.target.value)}
            className={"index-input form-control"}
            min={"0"}
          />
          <Form.Text className="form-text">
            Enter the index of the number in fib sequence that you are looking
            for
          </Form.Text>
        </Form.Group>
        <div className={"text-end text-lg-center"}>
          <Button className={"mt-5 fw-bolder py-2 px-4"} type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Col>
  );
};

export default IndexForm;
