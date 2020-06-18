import * as t from './types';
declare type Config = {
    resolveController: (name: string) => t.Controller | Promise<t.Controller>;
};
/**
 * Updates a component by defined controller
 * - versionUpdate hook is called
 * - preprocessProps hook is called
 * - createContext hook is called
 * - createStoryEvents hook is called
 * @param c Component
 * @param config Config
 */
export default function preprocessComponent(name: string, c: t.Component, config: Config): Promise<[t.Component, any[]]>;
export {};
