import * as t from '../../types';
type Output = {
    knobs: t.Knob[];
    props: Record<string, any>;
    update: Function;
    key: string;
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
};
export default function useKnobs(channel: t.Channel): Output;
export {};
