/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module 'redux-ruleset' {
  type Rule<Action,RootState> = {
    id: string,
    target: string | string[] | '*',
    output: string | string[] | '*',
    consequence: (action:Action, args:{
      getState: () => RootState,
      dispatch: Dispatch
    }) => Function | null | {type:string} | void
    concurrency?: 'LAST' | 'FIRST' | 'ONCE' | 'SWITCH',
    delay?: number,
    addOnce?: boolean,
    addWhen?: Function,
    addUntil?: Function,
  };
  const module:any;
  const dispatchEvent:never;
  const addRule:<Action,RootState>(rule:Rule<Action,RootState>) => Rule;
  export default module;
  export {dispatchEvent, addRule};
}

declare module 'styled-components' {
  const module:any;
  export default module;
}

declare module 'react-grid-layout' {
  const module:any;
  export default module;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
