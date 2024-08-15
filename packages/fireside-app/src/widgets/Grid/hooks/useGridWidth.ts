import * as React from "react";

export default function useGridWidth() {
  const [data, setGridWidth] = React.useState(500);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setGridWidth(rect.width);
    const listener = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setGridWidth(rect.width);
    };

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return { data, ref };
}
