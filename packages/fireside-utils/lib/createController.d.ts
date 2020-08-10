import * as t from './types';
/**
 * Wrapps your controller with typescript autosuggestion + validation.
 */
export default function createController<ComponentConfig, Context>(controller: t.Controller<ComponentConfig, Context>): t.Controller<ComponentConfig, Context>;
