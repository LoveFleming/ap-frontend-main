import { importShared } from './__federation_fn_import-DIdBnpG9.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CsM3lTE3.js';
import IrregularVerbTable from './__federation_expose_IrregularVerbTable-DHWIv2bz.js';
import ArticlePractice from './__federation_expose_ArticlePractice-Egk1E0ib.js';
import Vocab1200 from './__federation_expose_Vocab1200-BBrlVn_N.js';

const {useState} = await importShared('react');
const App = () => {
  const [tab, setTab] = useState("verb");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 24 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "English Micro Frontend" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("verb"), style: { marginRight: 8 }, children: "不規則動詞" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("article"), style: { marginRight: 8 }, children: "冠詞練習" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("vocab1200"), children: "國中1200單字" })
    ] }),
    tab === "verb" && /* @__PURE__ */ jsxRuntimeExports.jsx(IrregularVerbTable, {}),
    tab === "article" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArticlePractice, {}),
    tab === "vocab1200" && /* @__PURE__ */ jsxRuntimeExports.jsx(Vocab1200, {})
  ] });
};

export { App as default };
