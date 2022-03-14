import { Fragment } from "react";
import "./App.css";
import Fib from "./Components/Pages/Fib";
import { Link } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Link to="/">Home</Link>
      <Fib />
    </Fragment>
  );
}

export default App;
