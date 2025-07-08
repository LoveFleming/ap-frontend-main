import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

export default function Exception404() {
	return (
		<Result
			status="404"
			title="404"
			subTitle="抱歉，您訪問的頁面不存在。"
			extra={
				<Button
					icon={<ArrowLeftOutlined />}
					type="primary"
					href={import.meta.env.VITE_BASE_HOME_PATH}
				>
					返回首頁
				</Button>
			}
		/>
	);
}
