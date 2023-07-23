/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import App from "./app/app";


render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById("root") as HTMLElement);
