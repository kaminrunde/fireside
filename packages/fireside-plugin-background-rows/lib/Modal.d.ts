import * as React from "react";
import { PluginGridRowAPI } from "@kaminrunde/fireside-utils";
import * as t from "./types";
type Props = PluginGridRowAPI<t.State> & {
    options: t.Options;
};
export default function Modal(props: Props): React.JSX.Element;
export {};
