import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "./router";

ReactDOM.render(
  <Router
    stories={[
      { name: "A", element: <div>AAAAA</div> },
      { name: "B", element: <div>BBBBB</div> },
      { name: "B", element: <div>BBBBB</div> },
      { name: "B", element: <div>BBBBB</div> },
      { name: "B", element: <div>BBBBB</div> },
      { name: "B", element: <div>BBBBB</div> },
      { name: "B", element: <div>BBBBB</div> },
    ]}
  />,
  document.getElementById("root")
);
