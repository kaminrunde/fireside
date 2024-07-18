import { Channel, Event } from "./types";

export type PersistentChannel = {
  getKnobs: () => any[];
  on: (event: Event, callback: (payload: any) => void) => void;
  emit: (event: Event, data: any) => void;
};

let persistentChannelInstance: PersistentChannel | null = null;

export function getPersistentChannel(channel: Channel): PersistentChannel {
  if (persistentChannelInstance) return persistentChannelInstance;

  let knobs: any[] = [];

  function initializeListeners() {
    channel.on("storyboard-bridge/set-knobs", (newKnobs: any[]) => {
      knobs = newKnobs;
    });
  }

  initializeListeners();

  persistentChannelInstance = {
    getKnobs: () => knobs,
    on: (event: Event, callback: (payload: any) => void) =>
      channel.on(event, callback),
    emit: (event: Event, data: any) => channel.emit(event, data),
  };

  return persistentChannelInstance;
}
