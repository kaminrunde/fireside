import * as t from './types';
/**
 * Updates a component by defined controller
 * - versionUpdate hook is called
 * - preprocessProps hook is called
 * - createContext hook is called
 * - createStoryEvents hook is called
 * @param c Component
 * @param config Config
 */
export default function preprocessComponent(c: t.Component, gridContext: t.GridContext, config: t.Config): Promise<[t.Component, any[]]>;
