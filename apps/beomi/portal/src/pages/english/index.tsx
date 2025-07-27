import React from "react";
const ArticlePractice = React.lazy(
    // @ts-ignore
    () => import('english/ArticlePractice')
);

export default function EnglishArticleRemotePage() {
    console.log("[DEBUG] EnglishArticleRemotePage loaded");
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ArticlePractice />
        </React.Suspense>
    );
}
