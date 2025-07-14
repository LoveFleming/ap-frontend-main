import type { AppRouteRecordRaw } from "#src/router/types";
import { ContainerLayout, ParentLayout } from "#src/layout";

import { $t } from "#src/locales";

import { routeNest } from "#src/router/extra-info";
import {
	NodeExpandOutlined,
	SisternodeOutlined,
	SubnodeOutlined,
} from "@ant-design/icons";
import { createElement, lazy } from "react";

const Menu1And1 = lazy(() => import("#src/pages/route-nest/menu1/menu1-1"));
const Menu1And2 = lazy(() => import("#src/pages/route-nest/menu1/menu1-2"));
const Menu2 = lazy(() => import("#src/pages/route-nest/menu2"));


const routes: AppRouteRecordRaw[] = [];

export default routes;
