import * as React from "react";

type Props = {
  options: {
    __name: string;
  };
};

export default function CustomKnobPlaceholder(props: Props) {
  if (!props.options || !props.options.__name)
    return <div>Some error happened</div>;
  return (
    <div>Could not find custom knob with name "{props.options.__name}"</div>
  );
}
