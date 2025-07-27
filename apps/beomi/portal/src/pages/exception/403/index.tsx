import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

export default function Exception403() {
	return (
		<Result
			status="403"
			title="403"
			subTitle="抱歉，您沒有權限訪問此頁面。"
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
