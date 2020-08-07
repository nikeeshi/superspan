import * as React from "react";

const eatText = (node: ChildNode) => {
  if (node.nodeName === "#text") {
    return node.textContent;
  }
};
const eatXml = (node: ChildNode, registeredHRefs: Record<string, string>) => {
  if (node.nodeName === "#text") return eatText(node);
  switch (node.nodeName) {
    case "wrap":
    case "a":
    case "em":
    case "strong":
    case "del":
    case "ins":
      const children = Array.from(node.childNodes).map((child) =>
        eatXml(child, registeredHRefs)
      );
      switch (node.nodeName) {
        case "wrap":
          return children;
        case "a": {
          const id = (node as Element).attributes.getNamedItem("id");
          if (id && registeredHRefs[id.value])
            return <a href={registeredHRefs[id.value]}>{children}</a>;
          else return <a>{children}</a>;
        }
        case "em":
          return <em>{children}</em>;
        case "strong":
          return <strong>{children}</strong>;
        case "del":
          return <del>{children}</del>;
        case "ins":
          return <ins>{children}</ins>;
      }
    case "html":
      throw new Error(`Parse error`);
    default:
      throw new Error(`Unknown tag type:${node.nodeName}`);
  }
};

type Props = { children: string; registeredHRefs?: Record<string, string> };
export const XMLText: React.FC<Props> = ({
  children,
  registeredHRefs = {},
}) => {
  const xml = new DOMParser().parseFromString(
    "<wrap>" + children + "</wrap>",
    "text/xml"
  );

  return <span>{eatXml(xml.documentElement, registeredHRefs)}</span>;
};
