import React, { useState } from "react";
import { Button } from "antd";
import IrregularVerbTable from "./components/IrregularVerbTable";
import ArticleTestArticles from "./components/ArticlePractice";
import Vocab1200 from "./components/Vocabulary/Vocab1200";

const App: React.FC = () => {
    const [tab, setTab] = useState<"verb" | "article" | "vocab1200">("vocab1200");

    return (
        <div>
            <h1>English Learning</h1>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type={tab === "vocab1200" ? "primary" : "default"}
                    onClick={() => setTab("vocab1200")}
                    style={{ marginRight: 8 }}
                    size="large"
                >
                    1200 Vocabulary
                </Button>
                <Button
                    type={tab === "verb" ? "primary" : "default"}
                    onClick={() => setTab("verb")}
                    size="large"
                >
                    Irregular Verb
                </Button>
                {
                    <Button
                        type={tab === "article" ? "primary" : "default"}
                        onClick={() => setTab("article")}
                        size="large"
                    >
                        冠詞練習
                    </Button>
                }
            </div>

            {tab === "article" && <ArticleTestArticles />}
            {tab === "verb" && <IrregularVerbTable setAppTab={setTab} />}
            {tab === "vocab1200" && <Vocab1200 />}
        </div>
    );
};

export default App;