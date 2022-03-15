import { useState } from "react";
import { Alert, Row, Button } from "react-bootstrap";
import "./NavAlert.css";

const NavAlert = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Row className={"d-none d-lg-flex"}>
        <Alert
          className={"mb-0 pt-3 pb-3 alert"}
          variant="warning"
          onClose={() => setShow(false)}
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
          ></Button>
        </Alert>
      </Row>
    );
  }
  return "";
};

export default NavAlert;
