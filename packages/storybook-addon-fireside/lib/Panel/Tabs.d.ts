/// <reference types="react" />
import useTabs from './hooks/useTabs';
declare type Props = {
    tabs: ReturnType<typeof useTabs>;
};
export default function Tabs(props: Props): JSX.Element;
export {};
