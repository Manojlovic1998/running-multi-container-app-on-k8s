import { Link } from "react-router-dom";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import NavSvgLogo from "../../assets/svg/nav-logo.svg";
import NavAlert from "./NavAlert";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Container fluid className={"px-0 shadow-sm"}>
      <Navbar className={`w-100 py-3 ${styles.borderBottomNav}`} bg={"light"}>
        <Link
          to="/"
          className={"fw-bolder text-black fs-5 mx-auto text-decoration-none"}
        >
          <Row>
            <Col>
              <p className={`mb-0 ${styles.navLogo}`}>
                Fibonacci <br />
                Sequence
              </p>
            </Col>
            <Col className={"d-flex"}>
              <img src={NavSvgLogo} className={"my-auto"} />
            </Col>
          </Row>
        </Link>
      </Navbar>
      <NavAlert />
    </Container>
  );
};

export default Navigation;
