export type Message = {
  type: "info" | "warning" | "error";
  title: string;
  content: string;
};
