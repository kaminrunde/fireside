import String from "./String";
import Constant from "./Constant";
import Number from "./Number";
import Markdown from "./Markdown";
import Bool from "./Bool";
import StringList from "./StringList";
import ObjectList from "./ObjectList";
import CustomKnobPlaceholder from "./CustomKnobPlaceholder";
import Select from "./Select";
export default function getWidget(knob, customComponents) {
    if (knob.type === "custom-knob") {
        // @ts-ignore
        const result = customComponents[knob.options.__name];
        if (!result)
            return CustomKnobPlaceholder;
        return result;
    }
    return {
        string: String,
        constant: Constant,
        number: Number,
        markdown: Markdown,
        bool: Bool,
        stringList: StringList,
        objectList: ObjectList,
        select: Select,
    }[knob.type];
}
