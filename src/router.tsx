import * as React from "react";
import { useState } from "react";
import "./router.scss";
type Props = {
  stories: {
    name: string;
    element: React.ReactElement | (() => React.ReactElement);
  }[];
};
export const Router: React.FC<Props> = ({ stories }) => {
  const [route, setRoute] = useState(0);

  return (
    <div>
      <div
        style={{
          padding: "10px 0 0 10px",
          width: "calc(20% - 10px)",
          height: "calc(100vh - 10px)",
          display: "inline-block",
          backgroundColor: "hotpink",
        }}
      >
        {stories.map((story, index) => (
          <div
            onClick={() => setRoute(index)}
            style={{
              padding: "2.5px 0",
              backgroundColor: index === route ? "pink" : null,
            }}
            key={index}
          >
            {story.name}
          </div>
        ))}
      </div>
      <Display key={route}>{stories[route].element}</Display>
    </div>
  );
};
type DisplayProps = {
  children: React.FC | React.ReactElement;
};
class Display extends React.Component<DisplayProps> {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <div className="display">
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>{this.state.error && this.state.error.toString()}</summary>
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return (
      <div
        style={{
          width: "80%",
          display: "inline-block",
          verticalAlign: "top",
        }}
      >
        {React.isValidElement(this.props.children)
          ? this.props.children
          : React.createElement(this.props.children)}
      </div>
    );
  }
}
