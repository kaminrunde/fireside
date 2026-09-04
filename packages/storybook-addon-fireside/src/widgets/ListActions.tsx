import * as React from "react";
import styled from "styled-components";

export type ListAction = {
  label: string;
  onClick: () => void;
  /** when set, the entry asks this before it fires */
  confirm?: string;
  disabled?: boolean;
};

type Props = {
  addLabel: string;
  onAdd: () => void;
  /** everything but adding, moved behind the three dot menu */
  actions: ListAction[];
};

/**
 * the add button of a list plus a context menu holding the rarer actions.
 * Keeps the primary action a single full width button instead of a growing
 * stack of equally loud buttons
 */
export default function ListActions(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const close = () => {
    setOpen(false);
    setConfirming(null);
  };

  React.useEffect(() => {
    if (!open) return;
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [open]);

  return (
    <Wrapper ref={ref} className="ListActions">
      <div className="bar">
        <button className="add" onClick={props.onAdd}>
          {props.addLabel}
        </button>
        {props.actions.length > 0 && (
          <button
            className="toggle"
            title="More actions"
            onClick={() => (open ? close() : setOpen(true))}
          >
            &#8942;
          </button>
        )}
      </div>

      {open && (
        <div className="menu">
          {props.actions.map((action, i) =>
            confirming === i ? (
              <div className="confirm" key={action.label}>
                <span>{action.confirm}</span>
                <button
                  className="yes"
                  onClick={() => {
                    action.onClick();
                    close();
                  }}
                >
                  Y
                </button>
                <button className="no" onClick={() => setConfirming(null)}>
                  N
                </button>
              </div>
            ) : (
              <button
                key={action.label}
                className="entry"
                disabled={action.disabled}
                onClick={() => {
                  if (action.confirm) {
                    setConfirming(i);
                    return;
                  }
                  action.onClick();
                  close();
                }}
              >
                {action.label}
              </button>
            )
          )}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin-top: 5px;

  > .bar {
    display: flex;
    gap: 5px;

    > button {
      border: 1px solid lightgrey;
      border-radius: 3px;
      background: #8bc34a;
      padding: 8px;
      cursor: pointer;
      font-weight: bold;
      color: white;
    }

    > .add {
      flex: 1;
    }

    > .toggle {
      flex: 0 0 34px;
      font-size: 16px;
      line-height: 1;
    }
  }

  > .menu {
    position: absolute;
    right: 0;
    top: calc(100% + 3px);
    z-index: 10;
    min-width: 190px;
    background: white;
    border: 1px solid lightgrey;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    > .entry {
      display: block;
      width: 100%;
      border: none;
      background: none;
      padding: 10px 12px;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      color: #333;
      cursor: pointer;

      &:hover {
        background: #d3d3d34d;
      }

      &:disabled {
        color: lightgrey;
        cursor: default;
        background: none;
      }
    }

    > .confirm {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background: #ffe4c4;
      font-size: 13px;

      > span {
        flex: 1;
      }

      > button {
        margin-left: 10px;
        width: 20px;
        border: none;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }

      > .yes {
        background: gold;
      }

      > .no {
        background: orangered;
      }
    }
  }
`;
