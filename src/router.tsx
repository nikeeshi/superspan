import * as React from "react";
import { useState } from "react";
type Props = {
  stories: { name: string; element: React.ReactElement }[];
};
export const Router: React.FC<Props> = ({ stories }) => {
  const [route, setRoute] = useState(0);

  return (
    <div>
      <div
        style={{
          padding: "10px 0 0 10px",
          width: "calc(20% - 10px)",
          height: "100vh",
          display: "inline-block",
          backgroundColor: "hotpink",
        }}
      >
        {stories.map((story, index) => (
          <div
            onClick={() => setRoute(index)}
            style={{
              marginBottom: "5px",
              backgroundColor: index === route ? "pink" : null,
            }}
          >
            {story.name}
          </div>
        ))}
      </div>
      <div
        style={{
          width: "80%",
          display: "inline-block",
          verticalAlign: "top",
          marginTop: "10px",
        }}
      >
        {stories[route].element}
      </div>
    </div>
  );
};
