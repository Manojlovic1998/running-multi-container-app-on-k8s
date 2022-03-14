import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const IndexForm = (props) => {
  return (
    <Col
      lg={4}
      md={5}
      sm={7}
      className={"mx-auto shadow-lg py-4 px-4 rounded-3 border bg-white"}
    >
      <h1 className={"fs-5 mb-4 mt-3"}>Fibonacci Sequence Calculator</h1>
      <Form onSubmit={props.onIndexSubmit}>
        <Form.Group>
          <Form.Label htmlFor="index">Enter your index:</Form.Label>
          <Form.Control
            type="text"
            id="index"
            value={props.index}
            onChange={(event) => props.setIndex(event.target.value)}
          />
          <Form.Text>
            Enter the index of the number in fib sequence that you are looking
            for
          </Form.Text>
        </Form.Group>
        <div className={"text-end text-lg-center"}>
          <Button className={"mt-3"}>Submit</Button>
        </div>
      </Form>
    </Col>
  );
};

export default IndexForm;
