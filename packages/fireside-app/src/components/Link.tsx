import React from "react";
import store from "store";
import { push } from "redux-first-history";
import { Link as RawLink } from "@reach/router";

type Props = {
  to: string;
  className?: string;
  children: any;
};

export default function Link(props: Props) {
  return <RawLink {...props} onClick={() => store.dispatch(push(props.to))} />;
}
