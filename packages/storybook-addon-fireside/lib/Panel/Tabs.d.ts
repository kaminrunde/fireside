import * as React from 'react';
declare type Props = {
    tabs: {
        tabs: string[];
        activeTab: string;
        setActiveTab: (tab: string) => void;
    };
};
export default function Tabs(props: Props): React.JSX.Element;
export {};
