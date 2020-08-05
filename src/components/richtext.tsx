import * as React from "react";
type Props = { children: string };

const convertTextNodeToReactElement = (node: HTMLElement) => {
  if (node.nodeName === "text") {
    return node.textContent;
  }
};
const convertXmlNodeToReactElement = (node: HTMLElement) => {
  switch (node.nodeName) {
    case "test":
      return convertTextNodeToReactElement(node);
    case "a":
      return (
        <a>{Array.from(node.childNodes).map(convertTextNodeToReactElement)}</a>
      );
    default:
      return;//TODO
  }
};

export const TextWithTags: React.FC<Props> = ({ children }) => {
  const xml = new DOMParser().parseFromString(children, "text/xml");

  return convertXmlNodeToReactElement(xml.documentElement);
};

const xml = new DOMParser().parseFromString(
  `
<div>hoge<a>poyo</a></div>
`,
  "text/xml"
);
