import * as t from "./types";
type Config = {
    allIds: string[];
    gridAreas: Record<string, string>;
};
export default function formatGrid(grid: t.RawGrid, config: Config): string;
export {};
