import { createElement, lazy } from "react";
import type { AppRouteRecordRaw } from "#src/router/types";

import { AppstoreOutlined, BookOutlined } from "@ant-design/icons";

import { ContainerLayout } from "#src/layout";
import { $t } from "#src/locales";
import { about } from "#src/router/extra-info";

import { CopyrightOutlined } from "@ant-design/icons";

const EnglishArticleRemotePage = lazy(() => import("#src/pages/english"));
const Vocab1200Remote = lazy(() => import("#src/pages/english/vocab1200"));


// Parent menu group: English (acts as a layout or group, not a page itself)

const routes: AppRouteRecordRaw[] = [
    {
        path: "/english",
        Component: ContainerLayout,
        handle: {
            order: 10,
            title: "Irregular verb",
            icon: createElement(CopyrightOutlined),
        },
        children: [
            {
                path: "irregularVerb",
                Component: EnglishArticleRemotePage,
                handle: {
                    order: 1,
                    title: "Irregular verb",
                    icon: createElement(BookOutlined),
                },
            },
            {
                path: "vocab1200",
                Component: Vocab1200Remote,
                handle: {
                    order: 2,
                    title: "vocab1200",
                    icon: createElement(BookOutlined),
                },
            },
            // You can add more children here in the future
        ],
    },
];

export default routes;
