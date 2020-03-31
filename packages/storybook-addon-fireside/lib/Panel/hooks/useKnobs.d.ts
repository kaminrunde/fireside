import * as t from '../../types';
declare type Output = {
    knobs: t.Knob[];
    update: Function;
    key: string;
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
};
export default function useKnobs(channel: t.Channel): Output;
export {};
