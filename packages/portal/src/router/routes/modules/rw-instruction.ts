import { createElement, lazy } from "react";
import { AppstoreOutlined } from "@ant-design/icons";

const Exception403 = lazy(() =>
    import("@shared-ui/pages/exception/403").then(mod => ({ default: mod.default }))
);

const rwInstruction = {
    path: "/rw-instruction",
    Component: Exception403,
    handle: {
        order: 100, // change number for ordering, smaller = higher
        title: "RW-Instruction", // This is the menu text
        icon: createElement(AppstoreOutlined), // Pick any AntD icon
    },
};

export default [rwInstruction];
