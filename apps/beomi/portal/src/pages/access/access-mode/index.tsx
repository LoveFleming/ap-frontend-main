import { CloudOutlined } from "@ant-design/icons";
import { Menu, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function AccessMode() {
	const { t } = useTranslation();

	return (
		<Result
			icon={<CloudOutlined />}
			status="success"
			title={t("access.accessMode.title")}
			subTitle={t("access.accessMode.description")}
		/>
	);
}
