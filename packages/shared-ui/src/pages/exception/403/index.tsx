import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface Exception403Props {
    homePath?: string;
}

export default function Exception403({ homePath = "/" }: Exception403Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle={t("exception.403SubTitle")}
            extra={(
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="primary"
                    onClick={() => {
                        // debug log
                        console.log("navigate to homePath:", homePath, "navigate:", typeof navigate);
                        navigate(homePath);
                    }}
                >
                    {t("common.backHome")}
                </Button>
            )}
        />
    );
}

