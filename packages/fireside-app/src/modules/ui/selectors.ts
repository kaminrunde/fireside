import { State } from "./reducer";

export const isSidebarOpen = (state: State): boolean => state.sidebarOpen;

export const getModal = (state: State) => state.modal;
