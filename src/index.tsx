import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "./router";
import { XMLText } from "./components/richtext";
import { useState } from "react";
import { useList } from "./hooks/useList";
import { DisplayElement } from "./components/codeDisplay";

let stories = [
  {
    name: "Xml -> React",
    element: () => {
      const [xml, setXml] = useState("");
      const hrefs = useList<[string, string]>([]);
      return (
        <div>
          <div>children</div>
          <textarea
            onChange={(e) => {
              setXml(e.target.value);
            }}
          />
          <div>hrefs</div>
          {[
            ...hrefs.state.map((line, index) => (
              <div key={index}>
                <label>id</label>
                <input
                  value={line[0]}
                  onChange={(e) => {
                    if (e.target.value === "" && line[1] === "") {
                      hrefs.delete(index);
                    } else hrefs.setIth(index, [e.target.value, line[1]]);
                  }}
                />
                <label>href</label>
                <input
                  value={line[1]}
                  onChange={(e) => {
                    if (e.target.value === "" && line[0] === "") {
                      hrefs.delete(index);
                    } else hrefs.setIth(index, [line[0], e.target.value]);
                  }}
                />
                <button
                  onClick={() => {
                    hrefs.delete(index);
                  }}
                >
                  Delete
                </button>
              </div>
            )),
            <div key={hrefs.state.length}>
              <label>id</label>
              <input
                value=""
                onChange={(e) => {
                  hrefs.push([e.target.value, ""]);
                }}
              />
              <label>href</label>
              <input
                value=""
                onChange={(e) => {
                  hrefs.push(["", e.target.value]);
                }}
              />
            </div>,
          ]}
          <div>
            Code:
            <DisplayElement
              element={"XMLText"}
              children={xml ? "{`" + xml + "`}" : ""}
              attributes={
                hrefs.state.length === 0
                  ? []
                  : [
                      [
                        "registeredHRefs",
                        JSON.stringify(Object.fromEntries(hrefs.state)),
                      ],
                    ]
              }
            />
          </div>
          Result:
          <ErrorBoundary key={xml}>
            <XMLText registeredHRefs={Object.fromEntries(hrefs.state)}>
              {xml}
            </XMLText>
          </ErrorBoundary>
        </div>
      );
    },
  },
];

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>{this.state.error && this.state.error.toString()}</summary>
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

ReactDOM.render(<Router stories={stories} />, document.getElementById("root"));
