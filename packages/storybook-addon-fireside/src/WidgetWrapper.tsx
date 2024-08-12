import * as React from "react";
import * as t from "./types";

type Props = {
  component: React.JSX.ElementType;
  props: object;
  controller: t.Controller;
};

export default function WidgetWrapper(props: Props) {
  const [setupFinished, componentProps, key] = useComponentProps(props);
  if (!setupFinished) return null;
  return <props.component key={key} {...componentProps} />;
}

function useComponentProps(props: Props): [boolean, object, number] {
  const [finished, setFinished] = React.useState(false);
  const [finalProps, setFinalProps] = React.useState(props.props);
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    const getGridContext = () => {
      const context = { minRow: 0, maxRow: 0, byMediaSize: {} };
      const proxy = new Proxy(context.byMediaSize, {
        get: () => ({
          row: 0,
          col: 0,
          totalRows: 1,
          totalCols: 1,
          colStretch: 1,
          rowStretch: 1,
        }),
        has: () => true,
      });
      context.byMediaSize = proxy;
      return context;
    };
    (async () => {
      let newProps: any = { ...props.props };

      if (props.controller.preprocessProps) {
        newProps = await props.controller.preprocessProps(newProps);
      }
      if (props.controller.createContext) {
        newProps.context = await props.controller.createContext(newProps, {
          getGridContext,
        });
      }
      setFinalProps(newProps);
      setFinished(true);
      setKey((key) => key + 1);
    })();
  }, [props.controller, props.props]);

  return [finished, finalProps, key];
}
