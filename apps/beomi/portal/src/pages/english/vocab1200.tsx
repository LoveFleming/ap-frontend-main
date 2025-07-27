import React from "react";
const Vocab1200 = React.lazy(
    // @ts-ignore
    () => import('english/Vocab1200')
);

export default function Vocab1200Remote() {

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vocab1200 />
        </React.Suspense>
    );
}