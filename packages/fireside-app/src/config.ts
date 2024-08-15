type Config = {
  defaultStory: string;
  storybookUrl: string;
  mediaSizes: {
    label: string;
    key: string;
    gap: number;
    icon: "MOBILE" | "TABLET" | "LAPTOP" | "DESKTOP" | "DESKTOP_L";
    breakpoint: number;
    initialyActive: boolean;
  }[];
  widgets: any[];
  plugins: {
    resolve: string;
    options: {
      key: string;
    };
  }[];
};

let config: Config = {
  storybookUrl: "",
  defaultStory: "",
  mediaSizes: [],
  widgets: [],
  plugins: [],
};
try {
  const userConfig: any = require("fireside-config");
  config = Object.assign({}, config, userConfig);
} catch (e) {}

export default config;
