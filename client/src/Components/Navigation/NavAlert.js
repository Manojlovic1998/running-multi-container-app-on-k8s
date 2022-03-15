import { useState } from "react";
import { Alert, Row, Button } from "react-bootstrap";
import "./NavAlert.css";

const NavAlert = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Row className={"d-none d-lg-flex w-100 m-0"}>
        <Alert
          className={"mb-0 pt-3 pb-3 alert bg-warning-alert"}
          variant="warning"
        >
          <p className="mb-0 text-center">
            This is a dummy Docker example project. Worker that does the
            calculation is limited by the simple algorithmic solution. Use of
            large numbers can cause a bottleneck.
          </p>
          <Button
            type="button"
            className="btn-close"
            aria-label="Close alert"
            onClick={() => setShow(false)}
          ></Button>
        </Alert>
      </Row>
    );
  }
  return "";
};

export default NavAlert;
