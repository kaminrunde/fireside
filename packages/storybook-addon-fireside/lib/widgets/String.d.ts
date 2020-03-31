/// <reference types="react" />
declare type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: {};
};
export default function String(props: Props): JSX.Element;
export {};
