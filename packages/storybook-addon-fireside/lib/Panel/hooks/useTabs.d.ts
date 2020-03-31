import * as t from '../../types';
declare type Output = {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    knobs: t.Knob[];
};
export default function useTabs(allKnobs: t.Knob[]): Output;
export {};
