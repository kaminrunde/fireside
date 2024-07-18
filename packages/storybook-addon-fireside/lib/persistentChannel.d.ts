import { Channel, Event } from "./types";
export type PersistentChannel = {
    getKnobs: () => any[];
    on: (event: Event, callback: (payload: any) => void) => void;
    emit: (event: Event, data: any) => void;
};
export declare function getPersistentChannel(channel: Channel): PersistentChannel;
