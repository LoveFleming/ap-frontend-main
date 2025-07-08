import React, { useState } from "react";
import { Button } from "antd";
import IrregularVerbTable from "./components/IrregularVerbTable";
import ArticlePractice from "./components/ArticlePractice";
import Vocab1200 from "./components/Vocabulary/Vocab1200";

const App: React.FC = () => {
    const [tab, setTab] = useState<"verb" | "article" | "vocab1200">("vocab1200");

    return (
        <div>
            <h1>English Learning</h1>
            <div style={{ marginBottom: 16 }}>
                {/*
                <Button onClick={() => setTab("verb")} style={{ marginRight: 8 }}>
                    不規則動詞
                </Button>
                <Button onClick={() => setTab("article")} style={{ marginRight: 8 }}>
                    冠詞練習
                </Button>
                */}
                <Button color="primary" variant="solid" onClick={() => setTab("vocab1200")}>
                    國中1200單字
                </Button>
            </div>
            {/* 
            {tab === "verb" && <IrregularVerbTable />}
            {tab === "article" && <ArticlePractice />}
            */}
            {tab === "vocab1200" && <Vocab1200 />}
        </div>
    );
};

export default App;