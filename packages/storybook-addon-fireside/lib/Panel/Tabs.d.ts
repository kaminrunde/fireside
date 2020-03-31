/// <reference types="react" />
declare type Props = {
    tabs: {
        tabs: string[];
        activeTab: string;
        setActiveTab: (tab: string) => void;
    };
};
export default function Tabs(props: Props): JSX.Element;
export {};
