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
export default function ListActions(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
