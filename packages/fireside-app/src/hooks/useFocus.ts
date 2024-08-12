import * as React from "react";

type Output = [
  () => void,
  boolean,
  React.MutableRefObject<HTMLElement | null>,
  () => void
];

export default function useFocus(): Output {
  const [activeEl, setActiveEl] = React.useState<null | HTMLElement>(null);
  const ref = React.useRef<null | HTMLElement>(null);
  const handle = () => {
    if (activeEl || !ref.current) return;
    setActiveEl(ref.current);
  };

  React.useEffect(() => {
    if (!activeEl) return;
    const elIsInDropdown = ({ parentElement: el }: any) => {
      return el ? el === activeEl || elIsInDropdown(el) : false;
    };
    const listener = (e) => {
      if (!elIsInDropdown(e.target)) {
        window.removeEventListener("click", listener);
        setActiveEl(null);
      }
    };
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, [activeEl]);

  return [handle, !!activeEl, ref, () => setActiveEl(null)];
}
