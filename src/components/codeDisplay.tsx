import * as React from "react";
type Props = {
  element: string;
  attributes: [string, string][];
  children: React.ReactElement | string;
};
export const DisplayElement: React.FC<Props> = ({
  element,
  attributes,
  children,
}) => {
  return (
    <div>
      <Code>
        {`<${element}${attributes.map(([k, v]) => ` ${k} = {${v}}`).join("")}>`}
      </Code>
      {children && <Code indent={4}>{children}</Code>}
      <Code>{`</${element}>`}</Code>
    </div>
  );
};

type CodeProps = { indent?: number };
const Code: React.FC<CodeProps> = ({ children, indent = 0 }) => {
  return (
    <pre>
      {" ".repeat(indent)}
      {children}
    </pre>
  );
};
