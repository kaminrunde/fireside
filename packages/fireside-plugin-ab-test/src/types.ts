export type State =
  | {
      components: {
        [ms: string]: {
          A: number[];
          B: number[];
        };
      };
      byId: {
        [id: string]: {
          [ms: string]: "A" | "B";
        };
      };
    }
  | undefined;

export type PluginOptions = {
  key: string;
  password?: string;
  maxComponents?: number;
};
