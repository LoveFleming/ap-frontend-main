import { importShared } from './__federation_fn_import-DIdBnpG9.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CsM3lTE3.js';
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from './index-BxRxKft-.js';

var reactIs = {exports: {}};

var reactIs_production_min = {};

/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=Symbol.for("react.element"),c$1=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k$1=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k$1:case h:case l:case q:case p:case g:return a;default:return r}}case c$1:return r}}}reactIs_production_min.ContextConsumer=h;reactIs_production_min.ContextProvider=g;reactIs_production_min.Element=b;reactIs_production_min.ForwardRef=l;reactIs_production_min.Fragment=d;reactIs_production_min.Lazy=q;reactIs_production_min.Memo=p;reactIs_production_min.Portal=c$1;reactIs_production_min.Profiler=f;reactIs_production_min.StrictMode=e;reactIs_production_min.Suspense=m;
reactIs_production_min.SuspenseList=n;reactIs_production_min.isAsyncMode=function(){return  false};reactIs_production_min.isConcurrentMode=function(){return  false};reactIs_production_min.isContextConsumer=function(a){return v(a)===h};reactIs_production_min.isContextProvider=function(a){return v(a)===g};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min.isForwardRef=function(a){return v(a)===l};reactIs_production_min.isFragment=function(a){return v(a)===d};reactIs_production_min.isLazy=function(a){return v(a)===q};reactIs_production_min.isMemo=function(a){return v(a)===p};
reactIs_production_min.isPortal=function(a){return v(a)===c$1};reactIs_production_min.isProfiler=function(a){return v(a)===f};reactIs_production_min.isStrictMode=function(a){return v(a)===e};reactIs_production_min.isSuspense=function(a){return v(a)===m};reactIs_production_min.isSuspenseList=function(a){return v(a)===n};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?true:false};reactIs_production_min.typeOf=v;

{
  reactIs.exports = reactIs_production_min;
}

var reactIsExports = reactIs.exports;

const React$v = await importShared('react');
const {useState: useState$4} = React$v;

const getRandomQuestions = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
const maskWordInSentence = (sentence, word) => {
  if (!sentence || !word) return sentence;
  const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return sentence.replace(pattern, "____");
};
const Quiz1200 = ({ vocabList, onCancel }) => {
  const [step, setStep] = useState$4("setup");
  const [questionCount, setQuestionCount] = useState$4(10);
  const [questions, setQuestions] = useState$4([]);
  const [userAnswers, setUserAnswers] = useState$4({});
  const [results, setResults] = useState$4([]);
  const [statusFilter, setStatusFilter] = useState$4("全部");
  const [quizStatus, setQuizStatus] = useState$4(null);
  const [startIndex, setStartIndex] = useState$4(1);
  const [endIndex, setEndIndex] = useState$4(vocabList.length);
  const handleSpeak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };
  const getFilteredVocabList = () => {
    let filtered = vocabList;
    if (statusFilter !== "全部") {
      filtered = filtered.filter((item) => (item.status || "尚未作答") === statusFilter);
    }
    const start = Math.max(0, startIndex - 1);
    const end = Math.min(filtered.length, endIndex);
    return filtered.slice(start, end);
  };
  React$v.useEffect(() => {
    setStartIndex(1);
    setEndIndex(vocabList.length);
  }, [vocabList.length]);
  const startQuiz = () => {
    const filteredList = getFilteredVocabList();
    const qs = getRandomQuestions(filteredList, questionCount);
    setQuestions(qs);
    setUserAnswers({});
    setStep("quiz");
  };
  const handleInput = (idx, value) => {
    setUserAnswers((prev) => ({ ...prev, [idx]: value }));
  };
  const submitQuiz = () => {
    const res = questions.map((q, idx) => ({
      word: q.word,
      correct: (userAnswers[idx] || "").trim().toLowerCase() === q.word.trim().toLowerCase(),
      userAnswer: userAnswers[idx] || "",
      meaning: q.meaning
    }));
    const allCorrect = res.every((r) => r.correct);
    setQuizStatus(allCorrect ? "success" : "fail");
    try {
      const STORAGE_KEY = "Vocab1200";
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        let vocabArr = JSON.parse(stored);
        questions.forEach((q, idx) => {
          const i = vocabArr.findIndex((item) => item.word === q.word && item.meaning === q.meaning);
          if (i !== -1) {
            vocabArr[i].status = res[idx].correct ? "pass" : "fail";
          }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabArr));
      }
    } catch (e) {
    }
    setResults(res);
    setStep("result");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `quiz1200-bg${step === "quiz" ? " quiz1200-full-width" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                .quiz1200-bg {
                    font-family: "Helvetica Neue", "Arial", sans-serif;
                    background: linear-gradient(120deg, #e0e7ff 0%, #f5f5f5 100%);
                    min-height: 100vh;
                    margin: 0;
                    padding: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }
                .quiz1200-bg.quiz1200-full-width {
                    justify-content: stretch;
                }
                .quiz1200-card {
                    background-color: #fff;
                    border-radius: 18px;
                    box-shadow: 0 6px 24px rgba(59,130,246,0.10), 0 1.5px 4px rgba(0,0,0,0.04);
                    padding: 2.5rem 2rem 2rem 2rem;
                    max-width: 520px;
                    width: 100%;
                    border: 1.5px solid #e0e7ff;
                    position: relative;
                }
                .quiz1200-card.full-width {
                    max-width: 100%;
                }
                .quiz1200-title {
                    font-size: 2.1rem;
                    margin-bottom: 1.2rem;
                    color: #2563eb;
                    text-align: center;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-shadow: 0 2px 8px #e0e7ff;
                }
                .quiz1200-divider {
                    border: none;
                    border-top: 1.5px solid #e5e7eb;
                    margin: 1.2rem 0 1.5rem 0;
                }
                .quiz1200-section {
                    margin-bottom: 1.2rem;
                }
                .quiz1200-row {
                    display: flex;                   
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .quiz1200-label {
                    font-weight: 700;
                    color: #374151;
                    font-size: 1.08rem;
                }
                .quiz1200-value {
                    font-size: 1.13rem;
                    color: #1e293b;
                }
                .quiz1200-input,
                .quiz1200-select {
                    border: 1.5px solid #c7d2fe;
                    border-radius: 6px;
                    padding: 6px 10px;
                    font-size: 1.08rem;
                    outline: none;
                    transition: border 0.2s, box-shadow 0.2s;
                    box-shadow: 0 1px 2px rgba(59,130,246,0.04);
                    background: #f8fafc;
                    text-align: left !important;
                }
                .quiz1200-card input[type="number"] {
                    text-align: left !important;
                }
                .quiz1200-input:focus,
                .quiz1200-select:focus {
                    border: 1.5px solid #2563eb;
                    box-shadow: 0 0 0 2px #dbeafe;
                }
                .quiz1200-button-group {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }
                .quiz1200-btn {
                    padding: 0.85rem 2.2rem;
                    font-size: 1.18rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.18s;
                    font-weight: 700;
                    box-shadow: 0 2px 8px rgba(59,130,246,0.08);
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                }
                .quiz1200-btn.start {
                    background: linear-gradient(90deg, #3b82f6 60%, #2563eb 100%);
                    color: white;
                }
                .quiz1200-btn.start:disabled {
                    background: #a5b4fc;
                    cursor: not-allowed;
                }
                .quiz1200-btn.start:hover:not(:disabled) {
                    background: linear-gradient(90deg, #2563eb 60%, #1d4ed8 100%);
                    box-shadow: 0 4px 16px #3b82f633;
                }
                .quiz1200-btn.back {
                    background: linear-gradient(90deg, #ef4444 60%, #dc2626 100%);
                    color: white;
                }
                .quiz1200-btn.back:hover {
                    background: linear-gradient(90deg, #dc2626 60%, #b91c1c 100%);
                }
                .quiz1200-btn.green {
                    background: linear-gradient(90deg, #10b981 60%, #059669 100%);
                    color: white;
                }
                .quiz1200-btn.green:hover {
                    background: linear-gradient(90deg, #059669 60%, #047857 100%);
                }
                .quiz1200-btn.red {
                    background: linear-gradient(90deg, #ef4444 60%, #dc2626 100%);
                    color: white;
                }
                .quiz1200-btn.red:hover {
                    background: linear-gradient(90deg, #dc2626 60%, #b91c1c 100%);
                }
                .quiz1200-progress-bar-bg {
                    width: 100%;
                    height: 12px;
                    background: #e0e7ff;
                    border-radius: 6px;
                    margin: 0.7rem 0 1.2rem 0;
                    overflow: hidden;
                }
                .quiz1200-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #3b82f6 60%, #2563eb 100%);
                    border-radius: 6px;
                    transition: width 0.3s;
                }
                .quiz1200-example {
                    background: #f1f5f9;
                    border-radius: 6px;
                    padding: 0.7em 1em;
                    margin: 8px 0 10px 0;
                    color: #475569;
                    font-style: italic;
                    font-size: 1.01rem;
                }
                .quiz1200-score {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: #2563eb;
                    text-align: center;
                    margin-bottom: 1.2rem;
                    letter-spacing: 1px;
                }
                .quiz1200-result-list li {
                    display: flex;
                    align-items: center;
                    gap: 0.7em;
                    margin-bottom: 10px;
                    font-size: 1.08rem;
                }
                .quiz1200-result-word {
                    font-weight: bold;
                    font-size: 1.13rem;
                }
                .quiz1200-result-correct {
                    color: #16a34a;
                }
                .quiz1200-result-wrong {
                    color: #dc2626;
                }
                @media (max-width: 600px) {
                    .quiz1200-card {
                        padding: 1.2rem 0.5rem;
                        max-width: 98vw;
                    }
                    .quiz1200-title {
                        font-size: 1.3rem;
                    }
                }
            ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `quiz1200-card${step === "quiz" ? " full-width" : ""}`, children: [
      step === "setup" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-title", children: "單字測驗" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-label", children: "題號範圍：" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "quiz1200-input",
                style: { width: 60 },
                type: "number",
                min: 1,
                max: vocabList.length,
                value: startIndex,
                onChange: (e) => {
                  const val = Math.max(1, Math.min(vocabList.length, parseInt(e.target.value) || 1));
                  setStartIndex(val);
                  if (val > endIndex) setEndIndex(val);
                }
              }
            ),
            "～",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "quiz1200-input",
                style: { width: 60 },
                type: "number",
                min: startIndex,
                max: vocabList.length,
                value: endIndex,
                onChange: (e) => {
                  const val = Math.max(startIndex, Math.min(vocabList.length, parseInt(e.target.value) || vocabList.length));
                  setEndIndex(val);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-value", children: [
            "／ 共 ",
            vocabList.length,
            " 題"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-label", children: "狀態篩選：" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-value", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "quiz1200-select",
              style: { minWidth: 90 },
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "全部", children: "全部" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "尚未作答", children: "尚未作答" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pass", children: "pass" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fail", children: "fail" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-value", children: [
            "可用題數：",
            getFilteredVocabList().length
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-label", children: "考試題數：" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "quiz1200-input",
                style: { width: 80 },
                type: "number",
                min: 1,
                max: getFilteredVocabList().length,
                value: questionCount,
                onChange: (e) => {
                  const val = Math.max(1, Math.min(getFilteredVocabList().length, parseInt(e.target.value) || 1));
                  setQuestionCount(val);
                }
              }
            ),
            "／ 可用題數：",
            getFilteredVocabList().length
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-button-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "quiz1200-btn start",
              onClick: startQuiz,
              disabled: getFilteredVocabList().length === 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "rocket", children: "🚀" }),
                " 開始考試"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "quiz1200-btn back",
              onClick: onCancel,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "back", children: "⬅️" }),
                " 返回"
              ]
            }
          )
        ] })
      ] }),
      step === "quiz" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-title", style: { fontSize: "1.3rem", marginBottom: 0 }, children: [
          "作答中（",
          questions.length,
          " 題）"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-progress-bar-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "quiz1200-progress-bar",
            style: {
              width: `${Math.round(
                Object.keys(userAnswers).length / questions.length * 100
              )}%`
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              submitQuiz();
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Array.from({ length: Math.ceil(questions.length / 3) }).map((_, rowIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-row", style: { marginBottom: 24 }, children: questions.slice(rowIdx * 3, rowIdx * 3 + 3).map((q, idxInRow) => {
                const idx = rowIdx * 3 + idxInRow;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0, maxWidth: "32%" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 700, color: "#2563eb" }, children: [
                      "Q",
                      idx + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { marginLeft: 8 }, children: q.meaning }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#64748b", marginLeft: 6, fontSize: "0.98em" }, children: [
                      "（",
                      q.pos,
                      "）"
                    ] })
                  ] }),
                  q.example1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-example", style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                    "例句：",
                    maskWordInSentence(q.example1, q.word),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        title: "朗讀例句",
                        style: {
                          marginLeft: 8,
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "1.1em",
                          color: "#2563eb",
                          padding: 0
                        },
                        onClick: () => handleSpeak(q.example1),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "speak", children: "🔊" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "quiz1200-input",
                      type: "text",
                      placeholder: "請輸入英文單字",
                      value: userAnswers[idx] || "",
                      onChange: (e) => handleInput(idx, e.target.value),
                      style: { width: "90%", marginTop: 4 }
                    }
                  ) })
                ] }, idx);
              }) }, rowIdx)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-button-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    className: "quiz1200-btn green",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "check", children: "✅" }),
                      " 送出答案"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "quiz1200-btn red",
                    onClick: onCancel,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "stop", children: "🛑" }),
                      " 放棄"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      step === "result" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-title", style: { fontSize: "1.3rem", marginBottom: 0 }, children: "成績" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginBottom: "0.8rem", color: "#374151", fontWeight: 600 }, children: results.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          r.meaning,
          idx < results.length - 1 ? "、" : ""
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz1200-score", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "star", children: "🌟" }),
          results.filter((r) => r.correct).length,
          " / ",
          results.length,
          " 題"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "quiz1200-result-list", children: results.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `quiz1200-result-word ${r.correct ? "quiz1200-result-correct" : "quiz1200-result-wrong"}`,
              children: [
                r.meaning,
                " ",
                r.word
              ]
            }
          ),
          "：你的答案「",
          r.userAnswer,
          "」",
          r.correct ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 4 }, role: "img", "aria-label": "correct", children: "✅" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 4 }, role: "img", "aria-label": "wrong", children: "❌" }),
            "，正確答案：",
            r.word
          ] })
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz1200-button-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "quiz1200-btn start",
            onClick: onCancel,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "back", children: "⬅️" }),
              " 返回單字表"
            ]
          }
        ) })
      ] })
    ] })
  ] });
};

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$f = Array.isArray;

var isArray_1 = isArray$f;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$9 = freeGlobal || freeSelf || Function('return this')();

var _root = root$9;

var root$8 = _root;

/** Built-in value references. */
var Symbol$7 = root$8.Symbol;

var _Symbol = Symbol$7;

var Symbol$6 = _Symbol;

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$c.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$6 ? Symbol$6.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$b = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$b.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$5 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$5 ? Symbol$5.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$9(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$9;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$9(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$9;

var baseGetTag$8 = _baseGetTag,
    isObjectLike$8 = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$6(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$8(value) && baseGetTag$8(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol$6;

var isArray$e = isArray_1,
    isSymbol$5 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$3(value, object) {
  if (isArray$e(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$5(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey$3;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$7(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$7;

const isObject$8 = /*@__PURE__*/getDefaultExportFromCjs(isObject_1);

var baseGetTag$7 = _baseGetTag,
    isObject$6 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$6(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$7(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$2;

const isFunction$3 = /*@__PURE__*/getDefaultExportFromCjs(isFunction_1);

var root$7 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$7['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var isFunction$1 = isFunction_1,
    isMasked = _isMasked,
    isObject$5 = isObject_1,
    toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$a = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$5(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$7;

var getNative$6 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$6(Object, 'create');

var _nativeCreate = nativeCreate$4;

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$3(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$3;

var eq$2 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$2(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;

var _ListCache = ListCache$4;

var getNative$5 = _getNative,
    root$6 = _root;

/* Built-in method references that are verified to be native. */
var Map$4 = getNative$5(root$6, 'Map');

var _Map = Map$4;

var Hash = _Hash,
    ListCache$3 = _ListCache,
    Map$3 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$3 || ListCache$3),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$3(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$3.prototype.clear = mapCacheClear;
MapCache$3.prototype['delete'] = mapCacheDelete;
MapCache$3.prototype.get = mapCacheGet;
MapCache$3.prototype.has = mapCacheHas;
MapCache$3.prototype.set = mapCacheSet;

var _MapCache = MapCache$3;

var MapCache$2 = _MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT$2 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$2(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$2.Cache || MapCache$2);
  return memoized;
}

// Expose `MapCache`.
memoize$2.Cache = MapCache$2;

var memoize_1 = memoize$2;

const memoize$3 = /*@__PURE__*/getDefaultExportFromCjs(memoize_1);

var memoize$1 = memoize_1;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped$1(func) {
  var result = memoize$1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

var memoizeCapped = _memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath$1;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap$3(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$3;

var Symbol$4 = _Symbol,
    arrayMap$2 = _arrayMap,
    isArray$d = isArray_1,
    isSymbol$4 = isSymbol_1;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$4 ? Symbol$4.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$d(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap$2(value, baseToString$1) + '';
  }
  if (isSymbol$4(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

var _baseToString = baseToString$1;

var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$3(value) {
  return value == null ? '' : baseToString(value);
}

var toString_1 = toString$3;

var isArray$c = isArray_1,
    isKey$2 = _isKey,
    stringToPath = _stringToPath,
    toString$2 = toString_1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$2(value, object) {
  if (isArray$c(value)) {
    return value;
  }
  return isKey$2(value, object) ? [value] : stringToPath(toString$2(value));
}

var _castPath = castPath$2;

var isSymbol$3 = isSymbol_1;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$4(value) {
  if (typeof value == 'string' || isSymbol$3(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

var _toKey = toKey$4;

var castPath$1 = _castPath,
    toKey$3 = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$3(object, path) {
  path = castPath$1(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey$3(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet$3;

var baseGet$2 = _baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet$2(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$1;

const get$2 = /*@__PURE__*/getDefaultExportFromCjs(get_1);

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */

function isNil(value) {
  return value == null;
}

var isNil_1 = isNil;

const isNil$1 = /*@__PURE__*/getDefaultExportFromCjs(isNil_1);

var baseGetTag$6 = _baseGetTag,
    isArray$b = isArray_1,
    isObjectLike$7 = isObjectLike_1;

/** `Object#toString` result references. */
var stringTag$2 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray$b(value) && isObjectLike$7(value) && baseGetTag$6(value) == stringTag$2);
}

var isString_1 = isString;

const isString$1 = /*@__PURE__*/getDefaultExportFromCjs(isString_1);

var baseGetTag$5 = _baseGetTag,
    isObjectLike$6 = isObjectLike_1;

/** `Object#toString` result references. */
var numberTag$2 = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber$2(value) {
  return typeof value == 'number' ||
    (isObjectLike$6(value) && baseGetTag$5(value) == numberTag$2);
}

var isNumber_1 = isNumber$2;

const isNumber$3 = /*@__PURE__*/getDefaultExportFromCjs(isNumber_1);

var isNumber$1 = isNumber_1;

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is based on
 * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
 * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
 * `undefined` and other non-number values.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * _.isNaN(NaN);
 * // => true
 *
 * _.isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * _.isNaN(undefined);
 * // => false
 */
function isNaN$1(value) {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some
  // ActiveX objects in IE.
  return isNumber$1(value) && value != +value;
}

var _isNaN = isNaN$1;

const isNan = /*@__PURE__*/getDefaultExportFromCjs(_isNaN);

var mathSign = function mathSign(value) {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }
  return -1;
};
var isPercent = function isPercent(value) {
  return isString$1(value) && value.indexOf('%') === value.length - 1;
};
var isNumber = function isNumber(value) {
  return isNumber$3(value) && !isNan(value);
};
var isNumOrStr = function isNumOrStr(value) {
  return isNumber(value) || isString$1(value);
};
var idCounter = 0;
var uniqueId = function uniqueId(prefix) {
  var id = ++idCounter;
  return "".concat(prefix || '').concat(id);
};

/**
 * Get percent value of a total value
 * @param {number|string} percent A percent
 * @param {number} totalValue     Total value
 * @param {number} defaultValue   The value returned when percent is undefined or invalid
 * @param {boolean} validate      If set to be true, the result will be validated
 * @return {number} value
 */
var getPercentValue = function getPercentValue(percent, totalValue) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var validate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!isNumber(percent) && !isString$1(percent)) {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    var index = percent.indexOf('%');
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if (isNan(value)) {
    value = defaultValue;
  }
  if (validate && value > totalValue) {
    value = totalValue;
  }
  return value;
};
var getAnyElementOfObject = function getAnyElementOfObject(obj) {
  if (!obj) {
    return null;
  }
  var keys = Object.keys(obj);
  if (keys && keys.length) {
    return obj[keys[0]];
  }
  return null;
};
var hasDuplicate = function hasDuplicate(ary) {
  if (!Array.isArray(ary)) {
    return false;
  }
  var len = ary.length;
  var cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = true;
    } else {
      return true;
    }
  }
  return false;
};

/* @todo consider to rename this function into `getInterpolator` */
var interpolateNumber$2 = function interpolateNumber(numberA, numberB) {
  if (isNumber(numberA) && isNumber(numberB)) {
    return function (t) {
      return numberA + t * (numberB - numberA);
    };
  }
  return function () {
    return numberB;
  };
};
function findEntryInArray(ary, specifiedKey, specifiedValue) {
  if (!ary || !ary.length) {
    return null;
  }
  return ary.find(function (entry) {
    return entry && (typeof specifiedKey === 'function' ? specifiedKey(entry) : get$2(entry, specifiedKey)) === specifiedValue;
  });
}

function shallowEqual(a, b) {
  /* eslint-disable no-restricted-syntax */
  for (var key in a) {
    if ({}.hasOwnProperty.call(a, key) && (!{}.hasOwnProperty.call(b, key) || a[key] !== b[key])) {
      return false;
    }
  }
  for (var _key in b) {
    if ({}.hasOwnProperty.call(b, _key) && !{}.hasOwnProperty.call(a, _key)) {
      return false;
    }
  }
  return true;
}

function _typeof$C(o) { "@babel/helpers - typeof"; return _typeof$C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$C(o); }
const {isValidElement: isValidElement$6} = await importShared('react');

/**
 * Determines how values are stacked:
 *
 * - `none` is the default, it adds values on top of each other. No smarts. Negative values will overlap.
 * - `expand` make it so that the values always add up to 1 - so the chart will look like a rectangle.
 * - `wiggle` and `silhouette` tries to keep the chart centered.
 * - `sign` stacks positive values above zero and negative values below zero. Similar to `none` but handles negatives.
 * - `positive` ignores all negative values, and then behaves like \`none\`.
 *
 * Also see https://d3js.org/d3-shape/stack#stack-offsets
 * (note that the `diverging` offset in d3 is named `sign` in recharts)
 */

//
// Event Handler Types -- Copied from @types/react/index.d.ts and adapted for Props.
//

var SVGContainerPropKeys = ['viewBox', 'children'];
var SVGElementPropKeys = ['aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-checked', 'aria-colcount', 'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation', 'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext', 'className', 'color', 'height', 'id', 'lang', 'max', 'media', 'method', 'min', 'name', 'style',
/*
 * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
 * that can use it and it conflicts with the recharts prop 'type'
 * https://github.com/recharts/recharts/pull/3327
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
 */
// 'type',
'target', 'width', 'role', 'tabIndex', 'accentHeight', 'accumulate', 'additive', 'alignmentBaseline', 'allowReorder', 'alphabetic', 'amplitude', 'arabicForm', 'ascent', 'attributeName', 'attributeType', 'autoReverse', 'azimuth', 'baseFrequency', 'baselineShift', 'baseProfile', 'bbox', 'begin', 'bias', 'by', 'calcMode', 'capHeight', 'clip', 'clipPath', 'clipPathUnits', 'clipRule', 'colorInterpolation', 'colorInterpolationFilters', 'colorProfile', 'colorRendering', 'contentScriptType', 'contentStyleType', 'cursor', 'cx', 'cy', 'd', 'decelerate', 'descent', 'diffuseConstant', 'direction', 'display', 'divisor', 'dominantBaseline', 'dur', 'dx', 'dy', 'edgeMode', 'elevation', 'enableBackground', 'end', 'exponent', 'externalResourcesRequired', 'fill', 'fillOpacity', 'fillRule', 'filter', 'filterRes', 'filterUnits', 'floodColor', 'floodOpacity', 'focusable', 'fontFamily', 'fontSize', 'fontSizeAdjust', 'fontStretch', 'fontStyle', 'fontVariant', 'fontWeight', 'format', 'from', 'fx', 'fy', 'g1', 'g2', 'glyphName', 'glyphOrientationHorizontal', 'glyphOrientationVertical', 'glyphRef', 'gradientTransform', 'gradientUnits', 'hanging', 'horizAdvX', 'horizOriginX', 'href', 'ideographic', 'imageRendering', 'in2', 'in', 'intercept', 'k1', 'k2', 'k3', 'k4', 'k', 'kernelMatrix', 'kernelUnitLength', 'kerning', 'keyPoints', 'keySplines', 'keyTimes', 'lengthAdjust', 'letterSpacing', 'lightingColor', 'limitingConeAngle', 'local', 'markerEnd', 'markerHeight', 'markerMid', 'markerStart', 'markerUnits', 'markerWidth', 'mask', 'maskContentUnits', 'maskUnits', 'mathematical', 'mode', 'numOctaves', 'offset', 'opacity', 'operator', 'order', 'orient', 'orientation', 'origin', 'overflow', 'overlinePosition', 'overlineThickness', 'paintOrder', 'panose1', 'pathLength', 'patternContentUnits', 'patternTransform', 'patternUnits', 'pointerEvents', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'preserveAlpha', 'preserveAspectRatio', 'primitiveUnits', 'r', 'radius', 'refX', 'refY', 'renderingIntent', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'result', 'rotate', 'rx', 'ry', 'seed', 'shapeRendering', 'slope', 'spacing', 'specularConstant', 'specularExponent', 'speed', 'spreadMethod', 'startOffset', 'stdDeviation', 'stemh', 'stemv', 'stitchTiles', 'stopColor', 'stopOpacity', 'strikethroughPosition', 'strikethroughThickness', 'string', 'stroke', 'strokeDasharray', 'strokeDashoffset', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth', 'surfaceScale', 'systemLanguage', 'tableValues', 'targetX', 'targetY', 'textAnchor', 'textDecoration', 'textLength', 'textRendering', 'to', 'transform', 'u1', 'u2', 'underlinePosition', 'underlineThickness', 'unicode', 'unicodeBidi', 'unicodeRange', 'unitsPerEm', 'vAlphabetic', 'values', 'vectorEffect', 'version', 'vertAdvY', 'vertOriginX', 'vertOriginY', 'vHanging', 'vIdeographic', 'viewTarget', 'visibility', 'vMathematical', 'widths', 'wordSpacing', 'writingMode', 'x1', 'x2', 'x', 'xChannelSelector', 'xHeight', 'xlinkActuate', 'xlinkArcrole', 'xlinkHref', 'xlinkRole', 'xlinkShow', 'xlinkTitle', 'xlinkType', 'xmlBase', 'xmlLang', 'xmlns', 'xmlnsXlink', 'xmlSpace', 'y1', 'y2', 'y', 'yChannelSelector', 'z', 'zoomAndPan', 'ref', 'key', 'angle'];
var PolyElementKeys = ['points', 'pathLength'];

/** svg element types that have specific attribute filtration requirements */

/** map of svg element types to unique svg attributes that belong to that element */
var FilteredElementKeyMap = {
  svg: SVGContainerPropKeys,
  polygon: PolyElementKeys,
  polyline: PolyElementKeys
};
var EventKeys = ['dangerouslySetInnerHTML', 'onCopy', 'onCopyCapture', 'onCut', 'onCutCapture', 'onPaste', 'onPasteCapture', 'onCompositionEnd', 'onCompositionEndCapture', 'onCompositionStart', 'onCompositionStartCapture', 'onCompositionUpdate', 'onCompositionUpdateCapture', 'onFocus', 'onFocusCapture', 'onBlur', 'onBlurCapture', 'onChange', 'onChangeCapture', 'onBeforeInput', 'onBeforeInputCapture', 'onInput', 'onInputCapture', 'onReset', 'onResetCapture', 'onSubmit', 'onSubmitCapture', 'onInvalid', 'onInvalidCapture', 'onLoad', 'onLoadCapture', 'onError', 'onErrorCapture', 'onKeyDown', 'onKeyDownCapture', 'onKeyPress', 'onKeyPressCapture', 'onKeyUp', 'onKeyUpCapture', 'onAbort', 'onAbortCapture', 'onCanPlay', 'onCanPlayCapture', 'onCanPlayThrough', 'onCanPlayThroughCapture', 'onDurationChange', 'onDurationChangeCapture', 'onEmptied', 'onEmptiedCapture', 'onEncrypted', 'onEncryptedCapture', 'onEnded', 'onEndedCapture', 'onLoadedData', 'onLoadedDataCapture', 'onLoadedMetadata', 'onLoadedMetadataCapture', 'onLoadStart', 'onLoadStartCapture', 'onPause', 'onPauseCapture', 'onPlay', 'onPlayCapture', 'onPlaying', 'onPlayingCapture', 'onProgress', 'onProgressCapture', 'onRateChange', 'onRateChangeCapture', 'onSeeked', 'onSeekedCapture', 'onSeeking', 'onSeekingCapture', 'onStalled', 'onStalledCapture', 'onSuspend', 'onSuspendCapture', 'onTimeUpdate', 'onTimeUpdateCapture', 'onVolumeChange', 'onVolumeChangeCapture', 'onWaiting', 'onWaitingCapture', 'onAuxClick', 'onAuxClickCapture', 'onClick', 'onClickCapture', 'onContextMenu', 'onContextMenuCapture', 'onDoubleClick', 'onDoubleClickCapture', 'onDrag', 'onDragCapture', 'onDragEnd', 'onDragEndCapture', 'onDragEnter', 'onDragEnterCapture', 'onDragExit', 'onDragExitCapture', 'onDragLeave', 'onDragLeaveCapture', 'onDragOver', 'onDragOverCapture', 'onDragStart', 'onDragStartCapture', 'onDrop', 'onDropCapture', 'onMouseDown', 'onMouseDownCapture', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseMoveCapture', 'onMouseOut', 'onMouseOutCapture', 'onMouseOver', 'onMouseOverCapture', 'onMouseUp', 'onMouseUpCapture', 'onSelect', 'onSelectCapture', 'onTouchCancel', 'onTouchCancelCapture', 'onTouchEnd', 'onTouchEndCapture', 'onTouchMove', 'onTouchMoveCapture', 'onTouchStart', 'onTouchStartCapture', 'onPointerDown', 'onPointerDownCapture', 'onPointerMove', 'onPointerMoveCapture', 'onPointerUp', 'onPointerUpCapture', 'onPointerCancel', 'onPointerCancelCapture', 'onPointerEnter', 'onPointerEnterCapture', 'onPointerLeave', 'onPointerLeaveCapture', 'onPointerOver', 'onPointerOverCapture', 'onPointerOut', 'onPointerOutCapture', 'onGotPointerCapture', 'onGotPointerCaptureCapture', 'onLostPointerCapture', 'onLostPointerCaptureCapture', 'onScroll', 'onScrollCapture', 'onWheel', 'onWheelCapture', 'onAnimationStart', 'onAnimationStartCapture', 'onAnimationEnd', 'onAnimationEndCapture', 'onAnimationIteration', 'onAnimationIterationCapture', 'onTransitionEnd', 'onTransitionEndCapture'];

/** The type of easing function to use for animations */

/** Specifies the duration of animation, the unit of this option is ms. */

/** the offset of a chart, which define the blank space all around */

/**
 * The domain of axis.
 * This is the definition
 *
 * Numeric domain is always defined by an array of exactly two values, for the min and the max of the axis.
 * Categorical domain is defined as array of all possible values.
 *
 * Can be specified in many ways:
 * - array of numbers
 * - with special strings like 'dataMin' and 'dataMax'
 * - with special string math like 'dataMin - 100'
 * - with keyword 'auto'
 * - or a function
 * - array of functions
 * - or a combination of the above
 */

/**
 * NumberDomain is an evaluated {@link AxisDomain}.
 * Unlike {@link AxisDomain}, it has no variety - it's a tuple of two number.
 * This is after all the keywords and functions were evaluated and what is left is [min, max].
 *
 * Know that the min, max values are not guaranteed to be nice numbers - values like -Infinity or NaN are possible.
 *
 * There are also `category` axes that have different things than numbers in their domain.
 */

/** The props definition of base axis */

/** Defines how ticks are placed and whether / how tick collisions are handled.
 * 'preserveStart' keeps the left tick on collision and ensures that the first tick is always shown.
 * 'preserveEnd' keeps the right tick on collision and ensures that the last tick is always shown.
 * 'preserveStartEnd' keeps the left tick on collision and ensures that the first and last ticks are always shown.
 * 'equidistantPreserveStart' selects a number N such that every nTh tick will be shown without collision.
 */

var adaptEventHandlers = function adaptEventHandlers(props, newHandler) {
  if (!props || typeof props === 'function' || typeof props === 'boolean') {
    return null;
  }
  var inputProps = props;
  if ( /*#__PURE__*/isValidElement$6(props)) {
    inputProps = props.props;
  }
  if (!isObject$8(inputProps)) {
    return null;
  }
  var out = {};
  Object.keys(inputProps).forEach(function (key) {
    if (EventKeys.includes(key)) {
      out[key] = newHandler || function (e) {
        return inputProps[key](inputProps, e);
      };
    }
  });
  return out;
};
var getEventHandlerOfChild = function getEventHandlerOfChild(originalHandler, data, index) {
  return function (e) {
    originalHandler(data, index, e);
    return null;
  };
};
var adaptEventsOfChild = function adaptEventsOfChild(props, data, index) {
  if (!isObject$8(props) || _typeof$C(props) !== 'object') {
    return null;
  }
  var out = null;
  Object.keys(props).forEach(function (key) {
    var item = props[key];
    if (EventKeys.includes(key) && typeof item === 'function') {
      if (!out) out = {};
      out[key] = getEventHandlerOfChild(item, data, index);
    }
  });
  return out;
};

var _excluded$e = ["children"],
  _excluded2$4 = ["children"];
function _objectWithoutProperties$e(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$e(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$e(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
const {Children: Children$2,isValidElement: isValidElement$5} = await importShared('react');
var REACT_BROWSER_EVENT_MAP = {
  click: 'onClick',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mouseover: 'onMouseOver',
  mousemove: 'onMouseMove',
  mouseout: 'onMouseOut',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  touchcancel: 'onTouchCancel',
  touchend: 'onTouchEnd',
  touchmove: 'onTouchMove',
  touchstart: 'onTouchStart',
  contextmenu: 'onContextMenu',
  dblclick: 'onDoubleClick'
};

/**
 * Get the display name of a component
 * @param  {Object} Comp Specified Component
 * @return {String}      Display name of Component
 */
var getDisplayName = function getDisplayName(Comp) {
  if (typeof Comp === 'string') {
    return Comp;
  }
  if (!Comp) {
    return '';
  }
  return Comp.displayName || Comp.name || 'Component';
};

// `toArray` gets called multiple times during the render
// so we can memoize last invocation (since reference to `children` is the same)
var lastChildren = null;
var lastResult = null;
var toArray = function toArray(children) {
  if (children === lastChildren && Array.isArray(lastResult)) {
    return lastResult;
  }
  var result = [];
  Children$2.forEach(children, function (child) {
    if (isNil$1(child)) return;
    if (reactIsExports.isFragment(child)) {
      result = result.concat(toArray(child.props.children));
    } else {
      // @ts-expect-error this could still be Iterable<ReactNode> and TS does not like that
      result.push(child);
    }
  });
  lastResult = result;
  lastChildren = children;
  return result;
};

/*
 * Find and return all matched children by type.
 * `type` must be a React.ComponentType
 */
function findAllByType(children, type) {
  var result = [];
  var types = [];
  if (Array.isArray(type)) {
    types = type.map(function (t) {
      return getDisplayName(t);
    });
  } else {
    types = [getDisplayName(type)];
  }
  toArray(children).forEach(function (child) {
    var childType = get$2(child, 'type.displayName') || get$2(child, 'type.name');
    if (types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });
  return result;
}

/*
 * Return the first matched child by type, return null otherwise.
 * `type` must be a React.ComponentType
 */
function findChildByType(children, type) {
  var result = findAllByType(children, type);
  return result && result[0];
}

/**
 * validate the width and height props of a chart element
 * @param  {Object} el A chart element
 * @return {Boolean}   true If the props width and height are number, and greater than 0
 */
var validateWidthHeight = function validateWidthHeight(el) {
  if (!el || !el.props) {
    return false;
  }
  var _el$props = el.props,
    width = _el$props.width,
    height = _el$props.height;
  if (!isNumber(width) || width <= 0 || !isNumber(height) || height <= 0) {
    return false;
  }
  return true;
};
var SVG_TAGS = ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColormatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-url', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'lineGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];
var isSvgElement = function isSvgElement(child) {
  return child && child.type && isString$1(child.type) && SVG_TAGS.indexOf(child.type) >= 0;
};

/**
 * Checks if the property is valid to spread onto an SVG element or onto a specific component
 * @param {unknown} property property value currently being compared
 * @param {string} key property key currently being compared
 * @param {boolean} includeEvents if events are included in spreadable props
 * @param {boolean} svgElementType checks against map of SVG element types to attributes
 * @returns {boolean} is prop valid
 */
var isValidSpreadableProp = function isValidSpreadableProp(property, key, includeEvents, svgElementType) {
  var _FilteredElementKeyMa;
  /**
   * If the svg element type is explicitly included, check against the filtered element key map
   * to determine if there are attributes that should only exist on that element type.
   * @todo Add an internal cjs version of https://github.com/wooorm/svg-element-attributes for full coverage.
   */
  var matchingElementTypeKeys = (_FilteredElementKeyMa = FilteredElementKeyMap === null || FilteredElementKeyMap === void 0 ? void 0 : FilteredElementKeyMap[svgElementType]) !== null && _FilteredElementKeyMa !== void 0 ? _FilteredElementKeyMa : [];
  return key.startsWith('data-') || !isFunction$3(property) && (svgElementType && matchingElementTypeKeys.includes(key) || SVGElementPropKeys.includes(key)) || includeEvents && EventKeys.includes(key);
};
var filterProps = function filterProps(props, includeEvents, svgElementType) {
  if (!props || typeof props === 'function' || typeof props === 'boolean') {
    return null;
  }
  var inputProps = props;
  if ( /*#__PURE__*/isValidElement$5(props)) {
    inputProps = props.props;
  }
  if (!isObject$8(inputProps)) {
    return null;
  }
  var out = {};

  /**
   * Props are blindly spread onto SVG elements. This loop filters out properties that we don't want to spread.
   * Items filtered out are as follows:
   *   - functions in properties that are SVG attributes (functions are included when includeEvents is true)
   *   - props that are SVG attributes but don't matched the passed svgElementType
   *   - any prop that is not in SVGElementPropKeys (or in EventKeys if includeEvents is true)
   */
  Object.keys(inputProps).forEach(function (key) {
    var _inputProps;
    if (isValidSpreadableProp((_inputProps = inputProps) === null || _inputProps === void 0 ? void 0 : _inputProps[key], key, includeEvents, svgElementType)) {
      out[key] = inputProps[key];
    }
  });
  return out;
};

/**
 * Wether props of children changed
 * @param  {Object} nextChildren The latest children
 * @param  {Object} prevChildren The prev children
 * @return {Boolean}             equal or not
 */
var isChildrenEqual = function isChildrenEqual(nextChildren, prevChildren) {
  if (nextChildren === prevChildren) {
    return true;
  }
  var count = Children$2.count(nextChildren);
  if (count !== Children$2.count(prevChildren)) {
    return false;
  }
  if (count === 0) {
    return true;
  }
  if (count === 1) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return isSingleChildEqual(Array.isArray(nextChildren) ? nextChildren[0] : nextChildren, Array.isArray(prevChildren) ? prevChildren[0] : prevChildren);
  }
  for (var i = 0; i < count; i++) {
    var nextChild = nextChildren[i];
    var prevChild = prevChildren[i];
    if (Array.isArray(nextChild) || Array.isArray(prevChild)) {
      if (!isChildrenEqual(nextChild, prevChild)) {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
    } else if (!isSingleChildEqual(nextChild, prevChild)) {
      return false;
    }
  }
  return true;
};
var isSingleChildEqual = function isSingleChildEqual(nextChild, prevChild) {
  if (isNil$1(nextChild) && isNil$1(prevChild)) {
    return true;
  }
  if (!isNil$1(nextChild) && !isNil$1(prevChild)) {
    var _ref = nextChild.props || {},
      nextChildren = _ref.children,
      nextProps = _objectWithoutProperties$e(_ref, _excluded$e);
    var _ref2 = prevChild.props || {},
      prevChildren = _ref2.children,
      prevProps = _objectWithoutProperties$e(_ref2, _excluded2$4);
    if (nextChildren && prevChildren) {
      return shallowEqual(nextProps, prevProps) && isChildrenEqual(nextChildren, prevChildren);
    }
    if (!nextChildren && !prevChildren) {
      return shallowEqual(nextProps, prevProps);
    }
    return false;
  }
  return false;
};
var renderByOrder = function renderByOrder(children, renderMap) {
  var elements = [];
  var record = {};
  toArray(children).forEach(function (child, index) {
    if (isSvgElement(child)) {
      elements.push(child);
    } else if (child) {
      var displayName = getDisplayName(child.type);
      var _ref3 = renderMap[displayName] || {},
        handler = _ref3.handler,
        once = _ref3.once;
      if (handler && (!once || !record[displayName])) {
        var results = handler(child, displayName, index);
        elements.push(results);
        record[displayName] = true;
      }
    }
  });
  return elements;
};
var getReactEventByType = function getReactEventByType(e) {
  var type = e && e.type;
  if (type && REACT_BROWSER_EVENT_MAP[type]) {
    return REACT_BROWSER_EVENT_MAP[type];
  }
  return null;
};
var parseChildIndex = function parseChildIndex(child, children) {
  return toArray(children).indexOf(child);
};

var _excluded$d = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function _extends$n() { _extends$n = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }
function _objectWithoutProperties$d(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$d(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$d(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
/**
 * @fileOverview Surface
 */
const React$u = await importShared('react');
function Surface(props) {
  var children = props.children,
    width = props.width,
    height = props.height,
    viewBox = props.viewBox,
    className = props.className,
    style = props.style,
    title = props.title,
    desc = props.desc,
    others = _objectWithoutProperties$d(props, _excluded$d);
  var svgView = viewBox || {
    width: width,
    height: height,
    x: 0,
    y: 0
  };
  var layerClass = clsx('recharts-surface', className);
  return /*#__PURE__*/React$u.createElement("svg", _extends$n({}, filterProps(others, true, 'svg'), {
    className: layerClass,
    width: width,
    height: height,
    style: style,
    viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height)
  }), /*#__PURE__*/React$u.createElement("title", null, title), /*#__PURE__*/React$u.createElement("desc", null, desc), children);
}

var _excluded$c = ["children", "className"];
function _extends$m() { _extends$m = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }
function _objectWithoutProperties$c(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$c(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$c(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
const React$t = await importShared('react');
var Layer = /*#__PURE__*/React$t.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    others = _objectWithoutProperties$c(props, _excluded$c);
  var layerClass = clsx('recharts-layer', className);
  return /*#__PURE__*/React$t.createElement("g", _extends$m({
    className: layerClass
  }, filterProps(others, true), {
    ref: ref
  }), children);
});

var warn = function warn2(condition, format) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
};

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */

function baseSlice$1(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var _baseSlice = baseSlice$1;

var baseSlice = _baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

var _castSlice = castSlice$1;

/** Used to compose unicode character classes. */

var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$1 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$1 + rsVarRange$1 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$2(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode$2;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray$1(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */

var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray$1;

var asciiToArray = _asciiToArray,
    hasUnicode$1 = _hasUnicode,
    unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
  return hasUnicode$1(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

var _stringToArray = stringToArray$1;

var castSlice = _castSlice,
    hasUnicode = _hasUnicode,
    stringToArray = _stringToArray,
    toString$1 = toString_1;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst$1(methodName) {
  return function(string) {
    string = toString$1(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

var _createCaseFirst = createCaseFirst$1;

var createCaseFirst = _createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

var upperFirst_1 = upperFirst;

const upperFirst$1 = /*@__PURE__*/getDefaultExportFromCjs(upperFirst_1);

function constant$3(x) {
  return function constant() {
    return x;
  };
}

const cos = Math.cos;
const sin = Math.sin;
const sqrt$1 = Math.sqrt;
const pi$1 = Math.PI;
const tau$1 = 2 * pi$1;

const pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}

class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x, y) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x, y) {
    this._append`L${this._x1 = +x},${this._y1 = +y}`;
  }
  quadraticCurveTo(x1, y1, x, y) {
    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    }

    // Otherwise, draw an arc!
    else {
      let x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }

      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x0},${y0}`;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
  }
  rect(x, y, w, h) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
}

function withPath(shape) {
  let digits = 3;

  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new Path(digits);
}

function array(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function shapeLine(x$1, y$1) {
  var defined = constant$3(true),
      context = null,
      curve = curveLinear,
      output = null,
      path = withPath(line);

  x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant$3(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant$3(y$1);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$3(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$3(+_), line) : y$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$3(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function shapeArea(x0, y0, y1) {
  var x1 = null,
      defined = constant$3(true),
      context = null,
      curve = curveLinear,
      output = null,
      path = withPath(area);

  x0 = typeof x0 === "function" ? x0 : (x0 === undefined) ? x : constant$3(+x0);
  y0 = typeof y0 === "function" ? y0 : (y0 === undefined) ? constant$3(0) : constant$3(+y0);
  y1 = typeof y1 === "function" ? y1 : (y1 === undefined) ? y : constant$3(+y1);

  function area(data) {
    var i,
        j,
        k,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return shapeLine().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$3(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$3(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$3(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$3(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$3(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$3(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$3(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

class Bump {
  constructor(context, x) {
    this._context = context;
    this._x = x;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x, y);
        else this._context.moveTo(x, y);
        break;
      }
      case 1: this._point = 2; // falls through
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
        break;
      }
    }
    this._x0 = x, this._y0 = y;
  }
}

function bumpX(context) {
  return new Bump(context, true);
}

function bumpY(context) {
  return new Bump(context, false);
}

const symbolCircle = {
  draw(context, size) {
    const r = sqrt$1(size / pi$1);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$1);
  }
};

const symbolCross = {
  draw(context, size) {
    const r = sqrt$1(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

const tan30 = sqrt$1(1 / 3);
const tan30_2 = tan30 * 2;

const symbolDiamond = {
  draw(context, size) {
    const y = sqrt$1(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

const symbolSquare = {
  draw(context, size) {
    const w = sqrt$1(size);
    const x = -w / 2;
    context.rect(x, x, w, w);
  }
};

const ka = 0.89081309152928522810;
const kr = sin(pi$1 / 10) / sin(7 * pi$1 / 10);
const kx = sin(tau$1 / 10) * kr;
const ky = -cos(tau$1 / 10) * kr;

const symbolStar = {
  draw(context, size) {
    const r = sqrt$1(size * ka);
    const x = kx * r;
    const y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (let i = 1; i < 5; ++i) {
      const a = tau$1 * i / 5;
      const c = cos(a);
      const s = sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

const sqrt3 = sqrt$1(3);

const symbolTriangle = {
  draw(context, size) {
    const y = -sqrt$1(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

const c = -0.5;
const s = sqrt$1(3) / 2;
const k = 1 / sqrt$1(12);
const a = (k / 2 + 1) * 3;

const symbolWye = {
  draw(context, size) {
    const r = sqrt$1(size / a);
    const x0 = r / 2, y0 = r * k;
    const x1 = x0, y1 = r * k + r;
    const x2 = -x1, y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

function Symbol$3(type, size) {
  let context = null,
      path = withPath(symbol);

  type = typeof type === "function" ? type : constant$3(type || symbolCircle);
  size = typeof size === "function" ? size : constant$3(size === undefined ? 64 : +size);

  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$3(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$3(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop$2() {}

function point$2(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point$2(this, this._x1, this._y1); // falls through
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // falls through
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasisOpen(context) {
  return new BasisOpen(context);
}

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function curveLinearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$1(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$1(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$1(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$1(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function curveNatural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function curveStep(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function stackOffsetNone(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function stackOrderNone(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

function shapeStack() {
  var keys = constant$3([]),
      order = stackOrderNone,
      offset = stackOffsetNone,
      value = stackValue;

  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
        i, n = sz.length, j = -1,
        oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = array(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$3(Array.from(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$3(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? stackOrderNone : typeof _ === "function" ? _ : constant$3(Array.from(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? stackOffsetNone : _, stack) : offset;
  };

  return stack;
}

function stackOffsetExpand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  stackOffsetNone(series, order);
}

function stackOffsetSilhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  stackOffsetNone(series, order);
}

function stackOffsetWiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  stackOffsetNone(series, order);
}

function _typeof$B(o) { "@babel/helpers - typeof"; return _typeof$B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$B(o); }
var _excluded$b = ["type", "size", "sizeType"];
function _extends$l() { _extends$l = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }
function ownKeys$w(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$w(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$w(Object(t), true).forEach(function (r) { _defineProperty$A(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$w(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$A(obj, key, value) { key = _toPropertyKey$A(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$A(t) { var i = _toPrimitive$A(t, "string"); return "symbol" == _typeof$B(i) ? i : i + ""; }
function _toPrimitive$A(t, r) { if ("object" != _typeof$B(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$B(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$b(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$b(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$b(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
/**
 * @fileOverview Curve
 */
const React$s = await importShared('react');
var symbolFactories = {
  symbolCircle: symbolCircle,
  symbolCross: symbolCross,
  symbolDiamond: symbolDiamond,
  symbolSquare: symbolSquare,
  symbolStar: symbolStar,
  symbolTriangle: symbolTriangle,
  symbolWye: symbolWye
};
var RADIAN$2 = Math.PI / 180;
var getSymbolFactory = function getSymbolFactory(type) {
  var name = "symbol".concat(upperFirst$1(type));
  return symbolFactories[name] || symbolCircle;
};
var calculateAreaSize = function calculateAreaSize(size, sizeType, type) {
  if (sizeType === 'area') {
    return size;
  }
  switch (type) {
    case 'cross':
      return 5 * size * size / 9;
    case 'diamond':
      return 0.5 * size * size / Math.sqrt(3);
    case 'square':
      return size * size;
    case 'star':
      {
        var angle = 18 * RADIAN$2;
        return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.pow(Math.tan(angle), 2));
      }
    case 'triangle':
      return Math.sqrt(3) * size * size / 4;
    case 'wye':
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;
    default:
      return Math.PI * size * size / 4;
  }
};
var registerSymbol = function registerSymbol(key, factory) {
  symbolFactories["symbol".concat(upperFirst$1(key))] = factory;
};
var Symbols = function Symbols(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'circle' : _ref$type,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 64 : _ref$size,
    _ref$sizeType = _ref.sizeType,
    sizeType = _ref$sizeType === void 0 ? 'area' : _ref$sizeType,
    rest = _objectWithoutProperties$b(_ref, _excluded$b);
  var props = _objectSpread$w(_objectSpread$w({}, rest), {}, {
    type: type,
    size: size,
    sizeType: sizeType
  });

  /**
   * Calculate the path of curve
   * @return {String} path
   */
  var getPath = function getPath() {
    var symbolFactory = getSymbolFactory(type);
    var symbol = Symbol$3().type(symbolFactory).size(calculateAreaSize(size, sizeType, type));
    return symbol();
  };
  var className = props.className,
    cx = props.cx,
    cy = props.cy;
  var filteredProps = filterProps(props, true);
  if (cx === +cx && cy === +cy && size === +size) {
    return /*#__PURE__*/React$s.createElement("path", _extends$l({}, filteredProps, {
      className: clsx('recharts-symbols', className),
      transform: "translate(".concat(cx, ", ").concat(cy, ")"),
      d: getPath()
    }));
  }
  return null;
};
Symbols.registerSymbol = registerSymbol;

function _typeof$A(o) { "@babel/helpers - typeof"; return _typeof$A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$A(o); }
function _extends$k() { _extends$k = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }
function ownKeys$v(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$v(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$v(Object(t), true).forEach(function (r) { _defineProperty$z(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$v(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$g(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$z(descriptor.key), descriptor); } }
function _createClass$g(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$g(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$c(t, o, e) { return o = _getPrototypeOf$d(o), _possibleConstructorReturn$d(t, _isNativeReflectConstruct$d() ? Reflect.construct(o, e || [], _getPrototypeOf$d(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$d(self, call) { if (call && (_typeof$A(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$d(self); }
function _assertThisInitialized$d(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$d() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$d = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$d(o) { _getPrototypeOf$d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$d(o); }
function _inherits$d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$d(subClass, superClass); }
function _setPrototypeOf$d(o, p) { _setPrototypeOf$d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$d(o, p); }
function _defineProperty$z(obj, key, value) { key = _toPropertyKey$z(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$z(t) { var i = _toPrimitive$z(t, "string"); return "symbol" == _typeof$A(i) ? i : i + ""; }
function _toPrimitive$z(t, r) { if ("object" != _typeof$A(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$A(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
/**
 * @fileOverview Default Legend Content
 */
const React$r = await importShared('react');
const {PureComponent: PureComponent$8} = React$r;
var SIZE = 32;
var DefaultLegendContent = /*#__PURE__*/function (_PureComponent) {
  function DefaultLegendContent() {
    _classCallCheck$g(this, DefaultLegendContent);
    return _callSuper$c(this, DefaultLegendContent, arguments);
  }
  _inherits$d(DefaultLegendContent, _PureComponent);
  return _createClass$g(DefaultLegendContent, [{
    key: "renderIcon",
    value:
    /**
     * Render the path of icon
     * @param {Object} data Data of each legend item
     * @return {String} Path element
     */
    function renderIcon(data) {
      var inactiveColor = this.props.inactiveColor;
      var halfSize = SIZE / 2;
      var sixthSize = SIZE / 6;
      var thirdSize = SIZE / 3;
      var color = data.inactive ? inactiveColor : data.color;
      if (data.type === 'plainline') {
        return /*#__PURE__*/React$r.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: color,
          strokeDasharray: data.payload.strokeDasharray,
          x1: 0,
          y1: halfSize,
          x2: SIZE,
          y2: halfSize,
          className: "recharts-legend-icon"
        });
      }
      if (data.type === 'line') {
        return /*#__PURE__*/React$r.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: color,
          d: "M0,".concat(halfSize, "h").concat(thirdSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(2 * thirdSize, ",").concat(halfSize, "\n            H").concat(SIZE, "M").concat(2 * thirdSize, ",").concat(halfSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(thirdSize, ",").concat(halfSize),
          className: "recharts-legend-icon"
        });
      }
      if (data.type === 'rect') {
        return /*#__PURE__*/React$r.createElement("path", {
          stroke: "none",
          fill: color,
          d: "M0,".concat(SIZE / 8, "h").concat(SIZE, "v").concat(SIZE * 3 / 4, "h").concat(-32, "z"),
          className: "recharts-legend-icon"
        });
      }
      if ( /*#__PURE__*/React$r.isValidElement(data.legendIcon)) {
        var iconProps = _objectSpread$v({}, data);
        delete iconProps.legendIcon;
        return /*#__PURE__*/React$r.cloneElement(data.legendIcon, iconProps);
      }
      return /*#__PURE__*/React$r.createElement(Symbols, {
        fill: color,
        cx: halfSize,
        cy: halfSize,
        size: SIZE,
        sizeType: "diameter",
        type: data.type
      });
    }

    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this = this;
      var _this$props = this.props,
        payload = _this$props.payload,
        iconSize = _this$props.iconSize,
        layout = _this$props.layout,
        formatter = _this$props.formatter,
        inactiveColor = _this$props.inactiveColor;
      var viewBox = {
        x: 0,
        y: 0,
        width: SIZE,
        height: SIZE
      };
      var itemStyle = {
        display: layout === 'horizontal' ? 'inline-block' : 'block',
        marginRight: 10
      };
      var svgStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: 4
      };
      return payload.map(function (entry, i) {
        var finalFormatter = entry.formatter || formatter;
        var className = clsx(_defineProperty$z(_defineProperty$z({
          'recharts-legend-item': true
        }, "legend-item-".concat(i), true), "inactive", entry.inactive));
        if (entry.type === 'none') {
          return null;
        }

        // Do not render entry.value as functions. Always require static string properties.
        var entryValue = !isFunction$3(entry.value) ? entry.value : null;
        warn(!isFunction$3(entry.value), "The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name=\"Name of my Data\"/>" // eslint-disable-line max-len
        );
        var color = entry.inactive ? inactiveColor : entry.color;
        return /*#__PURE__*/React$r.createElement("li", _extends$k({
          className: className,
          style: itemStyle
          // eslint-disable-next-line react/no-array-index-key
          ,
          key: "legend-item-".concat(i)
        }, adaptEventsOfChild(_this.props, entry, i)), /*#__PURE__*/React$r.createElement(Surface, {
          width: iconSize,
          height: iconSize,
          viewBox: viewBox,
          style: svgStyle
        }, _this.renderIcon(entry)), /*#__PURE__*/React$r.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: color
          }
        }, finalFormatter ? finalFormatter(entryValue, entry, i) : entryValue));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        payload = _this$props2.payload,
        layout = _this$props2.layout,
        align = _this$props2.align;
      if (!payload || !payload.length) {
        return null;
      }
      var finalStyle = {
        padding: 0,
        margin: 0,
        textAlign: layout === 'horizontal' ? align : 'left'
      };
      return /*#__PURE__*/React$r.createElement("ul", {
        className: "recharts-default-legend",
        style: finalStyle
      }, this.renderItems());
    }
  }]);
}(PureComponent$8);
_defineProperty$z(DefaultLegendContent, "displayName", 'Legend');
_defineProperty$z(DefaultLegendContent, "defaultProps", {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  inactiveColor: '#ccc'
});

var ListCache$2 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$2;
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

var ListCache$1 = _ListCache,
    Map$2 = _Map,
    MapCache$1 = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE$1 - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$2.prototype.clear = stackClear;
Stack$2.prototype['delete'] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;

var _Stack = Stack$2;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

var _setCacheAdd = setCacheAdd$1;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */

function setCacheHas$1(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas$1;

var MapCache = _MapCache,
    setCacheAdd = _setCacheAdd,
    setCacheHas = _setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache$2(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache$2.prototype.add = SetCache$2.prototype.push = setCacheAdd;
SetCache$2.prototype.has = setCacheHas;

var _SetCache = SetCache$2;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function arraySome$2(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome$2;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function cacheHas$2(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas$2;

var SetCache$1 = _SetCache,
    arraySome$1 = _arraySome,
    cacheHas$1 = _cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache$1 : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome$1(other, function(othValue, othIndex) {
            if (!cacheHas$1(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays$2;

var root$5 = _root;

/** Built-in value references. */
var Uint8Array$1 = root$5.Uint8Array;

var _Uint8Array = Uint8Array$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */

function mapToArray$1(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray$1;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */

function setToArray$3(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray$3;

var Symbol$2 = _Symbol,
    Uint8Array = _Uint8Array,
    eq$1 = eq_1,
    equalArrays$1 = _equalArrays,
    mapToArray = _mapToArray,
    setToArray$2 = _setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$2:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$1:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$2:
    case dateTag$1:
    case numberTag$1:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq$1(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$1:
    case stringTag$1:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$2:
      var convert = mapToArray;

    case setTag$2:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray$2);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$2(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$2;

var arrayPush$1 = _arrayPush,
    isArray$a = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$a(object) ? result : arrayPush$1(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$1;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter$1;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray$1() {
  return [];
}

var stubArray_1 = stubArray$1;

var arrayFilter = _arrayFilter,
    stubArray = stubArray_1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$1 = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols$1;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

var baseGetTag$4 = _baseGetTag,
    isObjectLike$5 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$5(value) && baseGetTag$4(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$4 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$3 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$4(value) && hasOwnProperty$6.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments$3;

var isBuffer$2 = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

isBuffer$2.exports;

(function (module, exports) {
	var root = _root,
	    stubFalse = stubFalse_1;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer; 
} (isBuffer$2, isBuffer$2.exports));

var isBufferExports = isBuffer$2.exports;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$2 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$3(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$2 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$3;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$3(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength$3;

var baseGetTag$3 = _baseGetTag,
    isLength$2 = isLength_1,
    isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag] =
typedArrayTags[objectTag$3] = typedArrayTags[regexpTag] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$3(value) &&
    isLength$2(value.length) && !!typedArrayTags[baseGetTag$3(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$2(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$2;

var _nodeUtil = {exports: {}};

_nodeUtil.exports;

(function (module, exports) {
	var freeGlobal = _freeGlobal;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil; 
} (_nodeUtil, _nodeUtil.exports));

var _nodeUtilExports = _nodeUtil.exports;

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary$1 = _baseUnary,
    nodeUtil = _nodeUtilExports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$3 = nodeIsTypedArray ? baseUnary$1(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$3;

var baseTimes = _baseTimes,
    isArguments$2 = isArguments_1,
    isArray$9 = isArray_1,
    isBuffer$1 = isBufferExports,
    isIndex$2 = _isIndex,
    isTypedArray$2 = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$9(value),
      isArg = !isArr && isArguments$2(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$2(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$2(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$1;

/** Used for built-in method references. */

var objectProto$4 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$1(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

  return value === proto;
}

var _isPrototype = isPrototype$1;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$2;

var overArg$1 = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg$1(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$3.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var isFunction = isFunction_1,
    isLength$1 = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$4(value) {
  return value != null && isLength$1(value.length) && !isFunction(value);
}

var isArrayLike_1 = isArrayLike$4;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$3 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$4(object) {
  return isArrayLike$3(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var keys_1 = keys$4;

var baseGetAllKeys = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys$3 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys(object, keys$3, getSymbols);
}

var _getAllKeys = getAllKeys$1;

var getAllKeys = _getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$2.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects$1;

var getNative$4 = _getNative,
    root$4 = _root;

/* Built-in method references that are verified to be native. */
var DataView$2 = getNative$4(root$4, 'DataView');

var _DataView = DataView$2;

var getNative$3 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$3(root$3, 'Promise');

var _Promise = Promise$2;

var getNative$2 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Set$3 = getNative$2(root$2, 'Set');

var _Set = Set$3;

var getNative$1 = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$2 = getNative$1(root$1, 'WeakMap');

var _WeakMap = WeakMap$2;

var DataView$1 = _DataView,
    Map$1 = _Map,
    Promise$1 = _Promise,
    Set$2 = _Set,
    WeakMap$1 = _WeakMap,
    baseGetTag$2 = _baseGetTag,
    toSource = _toSource;

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView$1),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set$2),
    weakMapCtorString = toSource(WeakMap$1);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$2 = baseGetTag$2;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView$1 && getTag$2(new DataView$1(new ArrayBuffer(1))) != dataViewTag) ||
    (Map$1 && getTag$2(new Map$1) != mapTag) ||
    (Promise$1 && getTag$2(Promise$1.resolve()) != promiseTag) ||
    (Set$2 && getTag$2(new Set$2) != setTag) ||
    (WeakMap$1 && getTag$2(new WeakMap$1) != weakMapTag)) {
  getTag$2 = function(value) {
    var result = baseGetTag$2(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

var _getTag = getTag$2;

var Stack$1 = _Stack,
    equalArrays = _equalArrays,
    equalByTag = _equalByTag,
    equalObjects = _equalObjects,
    getTag$1 = _getTag,
    isArray$8 = isArray_1,
    isBuffer = isBufferExports,
    isTypedArray$1 = isTypedArray_1;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$8(object),
      othIsArr = isArray$8(other),
      objTag = objIsArr ? arrayTag : getTag$1(object),
      othTag = othIsArr ? arrayTag : getTag$1(other);

  objTag = objTag == argsTag ? objectTag$1 : objTag;
  othTag = othTag == argsTag ? objectTag$1 : othTag;

  var objIsObj = objTag == objectTag$1,
      othIsObj = othTag == objectTag$1,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$1);
    return (objIsArr || isTypedArray$1(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$2.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack$1);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$1);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep$1;

var baseIsEqualDeep = _baseIsEqualDeep,
    isObjectLike$2 = isObjectLike_1;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual$3(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike$2(value) && !isObjectLike$2(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$3, stack);
}

var _baseIsEqual = baseIsEqual$3;

var Stack = _Stack,
    baseIsEqual$2 = _baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch$1(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual$2(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch$1;

var isObject$4 = isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable$2(value) {
  return value === value && !isObject$4(value);
}

var _isStrictComparable = isStrictComparable$2;

var isStrictComparable$1 = _isStrictComparable,
    keys$2 = keys_1;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData$1(object) {
  var result = keys$2(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable$1(value)];
  }
  return result;
}

var _getMatchData = getMatchData$1;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function matchesStrictComparable$2(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable$2;

var baseIsMatch = _baseIsMatch,
    getMatchData = _getMatchData,
    matchesStrictComparable$1 = _matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches$1;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */

function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn$1;

var castPath = _castPath,
    isArguments$1 = isArguments_1,
    isArray$7 = isArray_1,
    isIndex$1 = _isIndex,
    isLength = isLength_1,
    toKey$2 = _toKey;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath$1(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey$2(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex$1(key, length) &&
    (isArray$7(object) || isArguments$1(object));
}

var _hasPath = hasPath$1;

var baseHasIn = _baseHasIn,
    hasPath = _hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

var hasIn_1 = hasIn$1;

var baseIsEqual$1 = _baseIsEqual,
    get = get_1,
    hasIn = hasIn_1,
    isKey$1 = _isKey,
    isStrictComparable = _isStrictComparable,
    matchesStrictComparable = _matchesStrictComparable,
    toKey$1 = _toKey;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$1(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey$1(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

var _baseMatchesProperty = baseMatchesProperty$1;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$b(value) {
  return value;
}

var identity_1 = identity$b;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function baseProperty$1(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty$1;

var baseGet$1 = _baseGet;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep$1(path) {
  return function(object) {
    return baseGet$1(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep$1;

var baseProperty = _baseProperty,
    basePropertyDeep = _basePropertyDeep,
    isKey = _isKey,
    toKey = _toKey;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property$1(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

var property_1 = property$1;

var baseMatches = _baseMatches,
    baseMatchesProperty = _baseMatchesProperty,
    identity$a = identity_1,
    isArray$6 = isArray_1,
    property = property_1;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee$8(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity$a;
  }
  if (typeof value == 'object') {
    return isArray$6(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

var _baseIteratee = baseIteratee$8;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function baseFindIndex$1(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex$1;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */

function baseIsNaN$1(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN$1;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function strictIndexOf$1(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf$1;

var baseFindIndex = _baseFindIndex,
    baseIsNaN = _baseIsNaN,
    strictIndexOf = _strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf$1(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf$1;

var baseIndexOf = _baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes$1(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes$1;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludesWith$1(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

var _arrayIncludesWith = arrayIncludesWith$1;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */

function noop$1() {
  // No operation performed.
}

var noop_1 = noop$1;

var Set$1 = _Set,
    noop = noop_1,
    setToArray$1 = _setToArray;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet$1 = !(Set$1 && (1 / setToArray$1(new Set$1([,-0]))[1]) == INFINITY$1) ? noop : function(values) {
  return new Set$1(values);
};

var _createSet = createSet$1;

var SetCache = _SetCache,
    arrayIncludes = _arrayIncludes,
    arrayIncludesWith = _arrayIncludesWith,
    cacheHas = _cacheHas,
    createSet = _createSet,
    setToArray = _setToArray;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq$1(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

var _baseUniq = baseUniq$1;

var baseIteratee$7 = _baseIteratee,
    baseUniq = _baseUniq;

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee$7(iteratee)) : [];
}

var uniqBy_1 = uniqBy;

const uniqBy$1 = /*@__PURE__*/getDefaultExportFromCjs(uniqBy_1);

/**
 * This is configuration option that decides how to filter for unique values only:
 *
 * - `false` means "no filter"
 * - `true` means "use recharts default filter"
 * - function means "use return of this function as the default key"
 */

function getUniqPayload(payload, option, defaultUniqBy) {
  if (option === true) {
    return uniqBy$1(payload, defaultUniqBy);
  }
  if (isFunction$3(option)) {
    return uniqBy$1(payload, option);
  }
  return payload;
}

function _typeof$z(o) { "@babel/helpers - typeof"; return _typeof$z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$z(o); }
var _excluded$a = ["ref"];
function ownKeys$u(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$u(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$u(Object(t), true).forEach(function (r) { _defineProperty$y(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$u(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$f(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$y(descriptor.key), descriptor); } }
function _createClass$f(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$f(Constructor.prototype, protoProps); if (staticProps) _defineProperties$f(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$b(t, o, e) { return o = _getPrototypeOf$c(o), _possibleConstructorReturn$c(t, _isNativeReflectConstruct$c() ? Reflect.construct(o, e || [], _getPrototypeOf$c(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$c(self, call) { if (call && (_typeof$z(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$c(self); }
function _assertThisInitialized$c(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$c() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$c = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$c(o) { _getPrototypeOf$c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$c(o); }
function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$c(subClass, superClass); }
function _setPrototypeOf$c(o, p) { _setPrototypeOf$c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$c(o, p); }
function _defineProperty$y(obj, key, value) { key = _toPropertyKey$y(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$y(t) { var i = _toPrimitive$y(t, "string"); return "symbol" == _typeof$z(i) ? i : i + ""; }
function _toPrimitive$y(t, r) { if ("object" != _typeof$z(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$z(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _objectWithoutProperties$a(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$a(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$a(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
/**
 * @fileOverview Legend
 */
const React$q = await importShared('react');
const {PureComponent: PureComponent$7} = React$q;
function defaultUniqBy$1(entry) {
  return entry.value;
}
function renderContent$1(content, props) {
  if ( /*#__PURE__*/React$q.isValidElement(content)) {
    return /*#__PURE__*/React$q.cloneElement(content, props);
  }
  if (typeof content === 'function') {
    return /*#__PURE__*/React$q.createElement(content, props);
  }
  props.ref;
    var otherProps = _objectWithoutProperties$a(props, _excluded$a);
  return /*#__PURE__*/React$q.createElement(DefaultLegendContent, otherProps);
}
var EPS$1 = 1;
var Legend = /*#__PURE__*/function (_PureComponent) {
  function Legend() {
    var _this;
    _classCallCheck$f(this, Legend);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$b(this, Legend, [].concat(args));
    _defineProperty$y(_this, "lastBoundingBox", {
      width: -1,
      height: -1
    });
    return _this;
  }
  _inherits$c(Legend, _PureComponent);
  return _createClass$f(Legend, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function getBBox() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var box = this.wrapperNode.getBoundingClientRect();
        box.height = this.wrapperNode.offsetHeight;
        box.width = this.wrapperNode.offsetWidth;
        return box;
      }
      return null;
    }
  }, {
    key: "updateBBox",
    value: function updateBBox() {
      var onBBoxUpdate = this.props.onBBoxUpdate;
      var box = this.getBBox();
      if (box) {
        if (Math.abs(box.width - this.lastBoundingBox.width) > EPS$1 || Math.abs(box.height - this.lastBoundingBox.height) > EPS$1) {
          this.lastBoundingBox.width = box.width;
          this.lastBoundingBox.height = box.height;
          if (onBBoxUpdate) {
            onBBoxUpdate(box);
          }
        }
      } else if (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) {
        this.lastBoundingBox.width = -1;
        this.lastBoundingBox.height = -1;
        if (onBBoxUpdate) {
          onBBoxUpdate(null);
        }
      }
    }
  }, {
    key: "getBBoxSnapshot",
    value: function getBBoxSnapshot() {
      if (this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0) {
        return _objectSpread$u({}, this.lastBoundingBox);
      }
      return {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function getDefaultPosition(style) {
      var _this$props = this.props,
        layout = _this$props.layout,
        align = _this$props.align,
        verticalAlign = _this$props.verticalAlign,
        margin = _this$props.margin,
        chartWidth = _this$props.chartWidth,
        chartHeight = _this$props.chartHeight;
      var hPos, vPos;
      if (!style || (style.left === undefined || style.left === null) && (style.right === undefined || style.right === null)) {
        if (align === 'center' && layout === 'vertical') {
          var box = this.getBBoxSnapshot();
          hPos = {
            left: ((chartWidth || 0) - box.width) / 2
          };
        } else {
          hPos = align === 'right' ? {
            right: margin && margin.right || 0
          } : {
            left: margin && margin.left || 0
          };
        }
      }
      if (!style || (style.top === undefined || style.top === null) && (style.bottom === undefined || style.bottom === null)) {
        if (verticalAlign === 'middle') {
          var _box = this.getBBoxSnapshot();
          vPos = {
            top: ((chartHeight || 0) - _box.height) / 2
          };
        } else {
          vPos = verticalAlign === 'bottom' ? {
            bottom: margin && margin.bottom || 0
          } : {
            top: margin && margin.top || 0
          };
        }
      }
      return _objectSpread$u(_objectSpread$u({}, hPos), vPos);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        content = _this$props2.content,
        width = _this$props2.width,
        height = _this$props2.height,
        wrapperStyle = _this$props2.wrapperStyle,
        payloadUniqBy = _this$props2.payloadUniqBy,
        payload = _this$props2.payload;
      var outerStyle = _objectSpread$u(_objectSpread$u({
        position: 'absolute',
        width: width || 'auto',
        height: height || 'auto'
      }, this.getDefaultPosition(wrapperStyle)), wrapperStyle);
      return /*#__PURE__*/React$q.createElement("div", {
        className: "recharts-legend-wrapper",
        style: outerStyle,
        ref: function ref(node) {
          _this2.wrapperNode = node;
        }
      }, renderContent$1(content, _objectSpread$u(_objectSpread$u({}, this.props), {}, {
        payload: getUniqPayload(payload, payloadUniqBy, defaultUniqBy$1)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function getWithHeight(item, chartWidth) {
      var _this$defaultProps$it = _objectSpread$u(_objectSpread$u({}, this.defaultProps), item.props),
        layout = _this$defaultProps$it.layout;
      if (layout === 'vertical' && isNumber(item.props.height)) {
        return {
          height: item.props.height
        };
      }
      if (layout === 'horizontal') {
        return {
          width: item.props.width || chartWidth
        };
      }
      return null;
    }
  }]);
}(PureComponent$7);
_defineProperty$y(Legend, "displayName", 'Legend');
_defineProperty$y(Legend, "defaultProps", {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom'
});

var Symbol$1 = _Symbol,
    isArguments = isArguments_1,
    isArray$5 = isArray_1;

/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable$1(value) {
  return isArray$5(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable$1;

var arrayPush = _arrayPush,
    isFlattenable = _isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten$2(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten$2(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten$2;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor$1;

var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$1 = createBaseFor();

var _baseFor = baseFor$1;

var baseFor = _baseFor,
    keys$1 = keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn$2(object, iteratee) {
  return object && baseFor(object, iteratee, keys$1);
}

var _baseForOwn = baseForOwn$2;

var isArrayLike$2 = isArrayLike_1;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$2(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach$1;

var baseForOwn$1 = _baseForOwn,
    createBaseEach = _createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach$3 = createBaseEach(baseForOwn$1);

var _baseEach = baseEach$3;

var baseEach$2 = _baseEach,
    isArrayLike$1 = isArrayLike_1;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap$2(collection, iteratee) {
  var index = -1,
      result = isArrayLike$1(collection) ? Array(collection.length) : [];

  baseEach$2(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap$2;

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */

function baseSortBy$1(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

var _baseSortBy = baseSortBy$1;

var isSymbol$2 = isSymbol_1;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending$1(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol$2(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol$2(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

var _compareAscending = compareAscending$1;

var compareAscending = _compareAscending;

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple$1(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

var _compareMultiple = compareMultiple$1;

var arrayMap$1 = _arrayMap,
    baseGet = _baseGet,
    baseIteratee$6 = _baseIteratee,
    baseMap$1 = _baseMap,
    baseSortBy = _baseSortBy,
    baseUnary = _baseUnary,
    compareMultiple = _compareMultiple,
    identity$9 = identity_1,
    isArray$4 = isArray_1;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy$1(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap$1(iteratees, function(iteratee) {
      if (isArray$4(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity$9];
  }

  var index = -1;
  iteratees = arrayMap$1(iteratees, baseUnary(baseIteratee$6));

  var result = baseMap$1(collection, function(value, key, collection) {
    var criteria = arrayMap$1(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

var _baseOrderBy = baseOrderBy$1;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$2 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax$2(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$2(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$2(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$2;

var getNative = _getNative;

var defineProperty$2 = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty$x = defineProperty$2;

var constant$1 = constant_1,
    defineProperty$1 = _defineProperty$x,
    identity$8 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty$1 ? identity$8 : function(func, string) {
  return defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant$1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var identity$7 = identity_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity$7), func + '');
}

var _baseRest = baseRest$1;

var eq = eq_1,
    isArrayLike = isArrayLike_1,
    isIndex = _isIndex,
    isObject$3 = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$4(value, index, object) {
  if (!isObject$3(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$4;

var baseFlatten$1 = _baseFlatten,
    baseOrderBy = _baseOrderBy,
    baseRest = _baseRest,
    isIterateeCall$3 = _isIterateeCall;

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall$3(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall$3(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten$1(iteratees, 1), []);
});

var sortBy_1 = sortBy;

const sortBy$1 = /*@__PURE__*/getDefaultExportFromCjs(sortBy_1);

function _typeof$y(o) { "@babel/helpers - typeof"; return _typeof$y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$y(o); }
function _extends$j() { _extends$j = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }
function _slicedToArray$c(arr, i) { return _arrayWithHoles$d(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$k(arr, i) || _nonIterableRest$d(); }
function _nonIterableRest$d() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$k(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$k(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$k(o, minLen); }
function _arrayLikeToArray$k(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$c(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$d(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$t(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$t(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$t(Object(t), true).forEach(function (r) { _defineProperty$w(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$t(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$w(obj, key, value) { key = _toPropertyKey$x(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$x(t) { var i = _toPrimitive$x(t, "string"); return "symbol" == _typeof$y(i) ? i : i + ""; }
function _toPrimitive$x(t, r) { if ("object" != _typeof$y(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$y(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview Default Tooltip Content
 */

const React$p = await importShared('react');
function defaultFormatter(value) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(' ~ ') : value;
}
var DefaultTooltipContent = function DefaultTooltipContent(props) {
  var _props$separator = props.separator,
    separator = _props$separator === void 0 ? ' : ' : _props$separator,
    _props$contentStyle = props.contentStyle,
    contentStyle = _props$contentStyle === void 0 ? {} : _props$contentStyle,
    _props$itemStyle = props.itemStyle,
    itemStyle = _props$itemStyle === void 0 ? {} : _props$itemStyle,
    _props$labelStyle = props.labelStyle,
    labelStyle = _props$labelStyle === void 0 ? {} : _props$labelStyle,
    payload = props.payload,
    formatter = props.formatter,
    itemSorter = props.itemSorter,
    wrapperClassName = props.wrapperClassName,
    labelClassName = props.labelClassName,
    label = props.label,
    labelFormatter = props.labelFormatter,
    _props$accessibilityL = props.accessibilityLayer,
    accessibilityLayer = _props$accessibilityL === void 0 ? false : _props$accessibilityL;
  var renderContent = function renderContent() {
    if (payload && payload.length) {
      var listStyle = {
        padding: 0,
        margin: 0
      };
      var items = (itemSorter ? sortBy$1(payload, itemSorter) : payload).map(function (entry, i) {
        if (entry.type === 'none') {
          return null;
        }
        var finalItemStyle = _objectSpread$t({
          display: 'block',
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || '#000'
        }, itemStyle);
        var finalFormatter = entry.formatter || formatter || defaultFormatter;
        var value = entry.value,
          name = entry.name;
        var finalValue = value;
        var finalName = name;
        if (finalFormatter && finalValue != null && finalName != null) {
          var formatted = finalFormatter(value, name, entry, i, payload);
          if (Array.isArray(formatted)) {
            var _formatted = _slicedToArray$c(formatted, 2);
            finalValue = _formatted[0];
            finalName = _formatted[1];
          } else {
            finalValue = formatted;
          }
        }
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          React$p.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(i),
            style: finalItemStyle
          }, isNumOrStr(finalName) ? /*#__PURE__*/React$p.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, finalName) : null, isNumOrStr(finalName) ? /*#__PURE__*/React$p.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, separator) : null, /*#__PURE__*/React$p.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, finalValue), /*#__PURE__*/React$p.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, entry.unit || ''))
        );
      });
      return /*#__PURE__*/React$p.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: listStyle
      }, items);
    }
    return null;
  };
  var finalStyle = _objectSpread$t({
    margin: 0,
    padding: 10,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    whiteSpace: 'nowrap'
  }, contentStyle);
  var finalLabelStyle = _objectSpread$t({
    margin: 0
  }, labelStyle);
  var hasLabel = !isNil$1(label);
  var finalLabel = hasLabel ? label : '';
  var wrapperCN = clsx('recharts-default-tooltip', wrapperClassName);
  var labelCN = clsx('recharts-tooltip-label', labelClassName);
  if (hasLabel && labelFormatter && payload !== undefined && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  var accessibilityAttributes = accessibilityLayer ? {
    role: 'status',
    'aria-live': 'assertive'
  } : {};
  return /*#__PURE__*/React$p.createElement("div", _extends$j({
    className: wrapperCN,
    style: finalStyle
  }, accessibilityAttributes), /*#__PURE__*/React$p.createElement("p", {
    className: labelCN,
    style: finalLabelStyle
  }, /*#__PURE__*/React$p.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent());
};

function _typeof$x(o) { "@babel/helpers - typeof"; return _typeof$x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$x(o); }
function _defineProperty$v(obj, key, value) { key = _toPropertyKey$w(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$w(t) { var i = _toPrimitive$w(t, "string"); return "symbol" == _typeof$x(i) ? i : i + ""; }
function _toPrimitive$w(t, r) { if ("object" != _typeof$x(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$x(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CSS_CLASS_PREFIX = 'recharts-tooltip-wrapper';
var TOOLTIP_HIDDEN = {
  visibility: 'hidden'
};
function getTooltipCSSClassName(_ref) {
  var coordinate = _ref.coordinate,
    translateX = _ref.translateX,
    translateY = _ref.translateY;
  return clsx(CSS_CLASS_PREFIX, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, "".concat(CSS_CLASS_PREFIX, "-right"), isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x), "".concat(CSS_CLASS_PREFIX, "-left"), isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x), "".concat(CSS_CLASS_PREFIX, "-bottom"), isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y), "".concat(CSS_CLASS_PREFIX, "-top"), isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y));
}
function getTooltipTranslateXY(_ref2) {
  var allowEscapeViewBox = _ref2.allowEscapeViewBox,
    coordinate = _ref2.coordinate,
    key = _ref2.key,
    offsetTopLeft = _ref2.offsetTopLeft,
    position = _ref2.position,
    reverseDirection = _ref2.reverseDirection,
    tooltipDimension = _ref2.tooltipDimension,
    viewBox = _ref2.viewBox,
    viewBoxDimension = _ref2.viewBoxDimension;
  if (position && isNumber(position[key])) {
    return position[key];
  }
  var negative = coordinate[key] - tooltipDimension - offsetTopLeft;
  var positive = coordinate[key] + offsetTopLeft;
  if (allowEscapeViewBox[key]) {
    return reverseDirection[key] ? negative : positive;
  }
  if (reverseDirection[key]) {
    var _tooltipBoundary = negative;
    var _viewBoxBoundary = viewBox[key];
    if (_tooltipBoundary < _viewBoxBoundary) {
      return Math.max(positive, viewBox[key]);
    }
    return Math.max(negative, viewBox[key]);
  }
  var tooltipBoundary = positive + tooltipDimension;
  var viewBoxBoundary = viewBox[key] + viewBoxDimension;
  if (tooltipBoundary > viewBoxBoundary) {
    return Math.max(negative, viewBox[key]);
  }
  return Math.max(positive, viewBox[key]);
}
function getTransformStyle(_ref3) {
  var translateX = _ref3.translateX,
    translateY = _ref3.translateY,
    useTranslate3d = _ref3.useTranslate3d;
  return {
    transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)")
  };
}
function getTooltipTranslate(_ref4) {
  var allowEscapeViewBox = _ref4.allowEscapeViewBox,
    coordinate = _ref4.coordinate,
    offsetTopLeft = _ref4.offsetTopLeft,
    position = _ref4.position,
    reverseDirection = _ref4.reverseDirection,
    tooltipBox = _ref4.tooltipBox,
    useTranslate3d = _ref4.useTranslate3d,
    viewBox = _ref4.viewBox;
  var cssProperties, translateX, translateY;
  if (tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
    translateX = getTooltipTranslateXY({
      allowEscapeViewBox: allowEscapeViewBox,
      coordinate: coordinate,
      key: 'x',
      offsetTopLeft: offsetTopLeft,
      position: position,
      reverseDirection: reverseDirection,
      tooltipDimension: tooltipBox.width,
      viewBox: viewBox,
      viewBoxDimension: viewBox.width
    });
    translateY = getTooltipTranslateXY({
      allowEscapeViewBox: allowEscapeViewBox,
      coordinate: coordinate,
      key: 'y',
      offsetTopLeft: offsetTopLeft,
      position: position,
      reverseDirection: reverseDirection,
      tooltipDimension: tooltipBox.height,
      viewBox: viewBox,
      viewBoxDimension: viewBox.height
    });
    cssProperties = getTransformStyle({
      translateX: translateX,
      translateY: translateY,
      useTranslate3d: useTranslate3d
    });
  } else {
    cssProperties = TOOLTIP_HIDDEN;
  }
  return {
    cssProperties: cssProperties,
    cssClasses: getTooltipCSSClassName({
      translateX: translateX,
      translateY: translateY,
      coordinate: coordinate
    })
  };
}

function _typeof$w(o) { "@babel/helpers - typeof"; return _typeof$w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$w(o); }
function ownKeys$s(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$s(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$s(Object(t), true).forEach(function (r) { _defineProperty$u(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$s(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$e(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$v(descriptor.key), descriptor); } }
function _createClass$e(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$e(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$a(t, o, e) { return o = _getPrototypeOf$b(o), _possibleConstructorReturn$b(t, _isNativeReflectConstruct$b() ? Reflect.construct(o, e || [], _getPrototypeOf$b(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$b(self, call) { if (call && (_typeof$w(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$b(self); }
function _assertThisInitialized$b(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$b() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$b = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$b(o) { _getPrototypeOf$b = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$b(o); }
function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$b(subClass, superClass); }
function _setPrototypeOf$b(o, p) { _setPrototypeOf$b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$b(o, p); }
function _defineProperty$u(obj, key, value) { key = _toPropertyKey$v(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$v(t) { var i = _toPrimitive$v(t, "string"); return "symbol" == _typeof$w(i) ? i : i + ""; }
function _toPrimitive$v(t, r) { if ("object" != _typeof$w(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$w(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
const React$o = await importShared('react');
const {PureComponent: PureComponent$6} = React$o;
var EPSILON = 1;
var TooltipBoundingBox = /*#__PURE__*/function (_PureComponent) {
  function TooltipBoundingBox() {
    var _this;
    _classCallCheck$e(this, TooltipBoundingBox);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$a(this, TooltipBoundingBox, [].concat(args));
    _defineProperty$u(_this, "state", {
      dismissed: false,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    });
    _defineProperty$u(_this, "handleKeyDown", function (event) {
      if (event.key === 'Escape') {
        var _this$props$coordinat, _this$props$coordinat2, _this$props$coordinat3, _this$props$coordinat4;
        _this.setState({
          dismissed: true,
          dismissedAtCoordinate: {
            x: (_this$props$coordinat = (_this$props$coordinat2 = _this.props.coordinate) === null || _this$props$coordinat2 === void 0 ? void 0 : _this$props$coordinat2.x) !== null && _this$props$coordinat !== void 0 ? _this$props$coordinat : 0,
            y: (_this$props$coordinat3 = (_this$props$coordinat4 = _this.props.coordinate) === null || _this$props$coordinat4 === void 0 ? void 0 : _this$props$coordinat4.y) !== null && _this$props$coordinat3 !== void 0 ? _this$props$coordinat3 : 0
          }
        });
      }
    });
    return _this;
  }
  _inherits$b(TooltipBoundingBox, _PureComponent);
  return _createClass$e(TooltipBoundingBox, [{
    key: "updateBBox",
    value: function updateBBox() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var box = this.wrapperNode.getBoundingClientRect();
        if (Math.abs(box.width - this.state.lastBoundingBox.width) > EPSILON || Math.abs(box.height - this.state.lastBoundingBox.height) > EPSILON) {
          this.setState({
            lastBoundingBox: {
              width: box.width,
              height: box.height
            }
          });
        }
      } else if (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) {
        this.setState({
          lastBoundingBox: {
            width: -1,
            height: -1
          }
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
      this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props$coordinat5, _this$props$coordinat6;
      if (this.props.active) {
        this.updateBBox();
      }
      if (!this.state.dismissed) {
        return;
      }
      if (((_this$props$coordinat5 = this.props.coordinate) === null || _this$props$coordinat5 === void 0 ? void 0 : _this$props$coordinat5.x) !== this.state.dismissedAtCoordinate.x || ((_this$props$coordinat6 = this.props.coordinate) === null || _this$props$coordinat6 === void 0 ? void 0 : _this$props$coordinat6.y) !== this.state.dismissedAtCoordinate.y) {
        this.state.dismissed = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        active = _this$props.active,
        allowEscapeViewBox = _this$props.allowEscapeViewBox,
        animationDuration = _this$props.animationDuration,
        animationEasing = _this$props.animationEasing,
        children = _this$props.children,
        coordinate = _this$props.coordinate,
        hasPayload = _this$props.hasPayload,
        isAnimationActive = _this$props.isAnimationActive,
        offset = _this$props.offset,
        position = _this$props.position,
        reverseDirection = _this$props.reverseDirection,
        useTranslate3d = _this$props.useTranslate3d,
        viewBox = _this$props.viewBox,
        wrapperStyle = _this$props.wrapperStyle;
      var _getTooltipTranslate = getTooltipTranslate({
          allowEscapeViewBox: allowEscapeViewBox,
          coordinate: coordinate,
          offsetTopLeft: offset,
          position: position,
          reverseDirection: reverseDirection,
          tooltipBox: this.state.lastBoundingBox,
          useTranslate3d: useTranslate3d,
          viewBox: viewBox
        }),
        cssClasses = _getTooltipTranslate.cssClasses,
        cssProperties = _getTooltipTranslate.cssProperties;
      var outerStyle = _objectSpread$s(_objectSpread$s({
        transition: isAnimationActive && active ? "transform ".concat(animationDuration, "ms ").concat(animationEasing) : undefined
      }, cssProperties), {}, {
        pointerEvents: 'none',
        visibility: !this.state.dismissed && active && hasPayload ? 'visible' : 'hidden',
        position: 'absolute',
        top: 0,
        left: 0
      }, wrapperStyle);
      return (
        /*#__PURE__*/
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        React$o.createElement("div", {
          tabIndex: -1,
          className: cssClasses,
          style: outerStyle,
          ref: function ref(node) {
            _this2.wrapperNode = node;
          }
        }, children)
      );
    }
  }]);
}(PureComponent$6);

var parseIsSsrByDefault = function parseIsSsrByDefault() {
  return !(typeof window !== 'undefined' && window.document && window.document.createElement && window.setTimeout);
};
var Global = {
  isSsr: parseIsSsrByDefault()};

function _typeof$v(o) { "@babel/helpers - typeof"; return _typeof$v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$v(o); }
function ownKeys$r(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$r(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$r(Object(t), true).forEach(function (r) { _defineProperty$t(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$r(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$d(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$u(descriptor.key), descriptor); } }
function _createClass$d(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$d(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$9(t, o, e) { return o = _getPrototypeOf$a(o), _possibleConstructorReturn$a(t, _isNativeReflectConstruct$a() ? Reflect.construct(o, e || [], _getPrototypeOf$a(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$a(self, call) { if (call && (_typeof$v(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$a(self); }
function _assertThisInitialized$a(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$a() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$a = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$a(o) { _getPrototypeOf$a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$a(o); }
function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$a(subClass, superClass); }
function _setPrototypeOf$a(o, p) { _setPrototypeOf$a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$a(o, p); }
function _defineProperty$t(obj, key, value) { key = _toPropertyKey$u(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$u(t) { var i = _toPrimitive$u(t, "string"); return "symbol" == _typeof$v(i) ? i : i + ""; }
function _toPrimitive$u(t, r) { if ("object" != _typeof$v(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$v(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
/**
 * @fileOverview Tooltip
 */
const React$n = await importShared('react');
const {PureComponent: PureComponent$5} = React$n;
function defaultUniqBy(entry) {
  return entry.dataKey;
}
function renderContent(content, props) {
  if ( /*#__PURE__*/React$n.isValidElement(content)) {
    return /*#__PURE__*/React$n.cloneElement(content, props);
  }
  if (typeof content === 'function') {
    return /*#__PURE__*/React$n.createElement(content, props);
  }
  return /*#__PURE__*/React$n.createElement(DefaultTooltipContent, props);
}
var Tooltip = /*#__PURE__*/function (_PureComponent) {
  function Tooltip() {
    _classCallCheck$d(this, Tooltip);
    return _callSuper$9(this, Tooltip, arguments);
  }
  _inherits$a(Tooltip, _PureComponent);
  return _createClass$d(Tooltip, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        active = _this$props.active,
        allowEscapeViewBox = _this$props.allowEscapeViewBox,
        animationDuration = _this$props.animationDuration,
        animationEasing = _this$props.animationEasing,
        content = _this$props.content,
        coordinate = _this$props.coordinate,
        filterNull = _this$props.filterNull,
        isAnimationActive = _this$props.isAnimationActive,
        offset = _this$props.offset,
        payload = _this$props.payload,
        payloadUniqBy = _this$props.payloadUniqBy,
        position = _this$props.position,
        reverseDirection = _this$props.reverseDirection,
        useTranslate3d = _this$props.useTranslate3d,
        viewBox = _this$props.viewBox,
        wrapperStyle = _this$props.wrapperStyle;
      var finalPayload = payload !== null && payload !== void 0 ? payload : [];
      if (filterNull && finalPayload.length) {
        finalPayload = getUniqPayload(payload.filter(function (entry) {
          return entry.value != null && (entry.hide !== true || _this.props.includeHidden);
        }), payloadUniqBy, defaultUniqBy);
      }
      var hasPayload = finalPayload.length > 0;
      return /*#__PURE__*/React$n.createElement(TooltipBoundingBox, {
        allowEscapeViewBox: allowEscapeViewBox,
        animationDuration: animationDuration,
        animationEasing: animationEasing,
        isAnimationActive: isAnimationActive,
        active: active,
        coordinate: coordinate,
        hasPayload: hasPayload,
        offset: offset,
        position: position,
        reverseDirection: reverseDirection,
        useTranslate3d: useTranslate3d,
        viewBox: viewBox,
        wrapperStyle: wrapperStyle
      }, renderContent(content, _objectSpread$r(_objectSpread$r({}, this.props), {}, {
        payload: finalPayload
      })));
    }
  }]);
}(PureComponent$5);
_defineProperty$t(Tooltip, "displayName", 'Tooltip');
_defineProperty$t(Tooltip, "defaultProps", {
  accessibilityLayer: false,
  allowEscapeViewBox: {
    x: false,
    y: false
  },
  animationDuration: 400,
  animationEasing: 'ease',
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: true,
  cursorStyle: {},
  filterNull: true,
  isAnimationActive: !Global.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: false,
    y: false
  },
  separator: ' : ',
  trigger: 'hover',
  useTranslate3d: false,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});

var root = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root.Date.now();
};

var now_1 = now$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var baseTrim = _baseTrim,
    isObject$2 = isObject_1,
    isSymbol$1 = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$2(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$2;

var isObject$1 = isObject_1,
    now = now_1,
    toNumber$1 = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber$1(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce$1;

var debounce = debounce_1,
    isObject = isObject_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

const throttle$1 = /*@__PURE__*/getDefaultExportFromCjs(throttle_1);

function _typeof$u(o) { "@babel/helpers - typeof"; return _typeof$u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$u(o); }
function ownKeys$q(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$q(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$q(Object(t), true).forEach(function (r) { _defineProperty$s(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$q(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$s(obj, key, value) { key = _toPropertyKey$t(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$t(t) { var i = _toPrimitive$t(t, "string"); return "symbol" == _typeof$u(i) ? i : i + ""; }
function _toPrimitive$t(t, r) { if ("object" != _typeof$u(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$u(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray$b(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$j(arr, i) || _nonIterableRest$c(); }
function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$j(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$j(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$j(o, minLen); }
function _arrayLikeToArray$j(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$b(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }
const React$m = await importShared('react');
const {forwardRef: forwardRef$1,cloneElement: cloneElement$6,useState: useState$3,useImperativeHandle,useRef: useRef$2,useEffect: useEffect$3,useMemo: useMemo$1,useCallback} = React$m;
var ResponsiveContainer = /*#__PURE__*/forwardRef$1(function (_ref, ref) {
  var aspect = _ref.aspect,
    _ref$initialDimension = _ref.initialDimension,
    initialDimension = _ref$initialDimension === void 0 ? {
      width: -1,
      height: -1
    } : _ref$initialDimension,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '100%' : _ref$height,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 0 : _ref$minWidth,
    minHeight = _ref.minHeight,
    maxHeight = _ref.maxHeight,
    children = _ref.children,
    _ref$debounce = _ref.debounce,
    debounce = _ref$debounce === void 0 ? 0 : _ref$debounce,
    id = _ref.id,
    className = _ref.className,
    onResize = _ref.onResize,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  var containerRef = useRef$2(null);
  var onResizeRef = useRef$2();
  onResizeRef.current = onResize;
  useImperativeHandle(ref, function () {
    return Object.defineProperty(containerRef.current, 'current', {
      get: function get() {
        // eslint-disable-next-line no-console
        console.warn('The usage of ref.current.current is deprecated and will no longer be supported.');
        return containerRef.current;
      },
      configurable: true
    });
  });
  var _useState = useState$3({
      containerWidth: initialDimension.width,
      containerHeight: initialDimension.height
    }),
    _useState2 = _slicedToArray$b(_useState, 2),
    sizes = _useState2[0],
    setSizes = _useState2[1];
  var setContainerSize = useCallback(function (newWidth, newHeight) {
    setSizes(function (prevState) {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  useEffect$3(function () {
    var callback = function callback(entries) {
      var _onResizeRef$current;
      var _entries$0$contentRec = entries[0].contentRect,
        containerWidth = _entries$0$contentRec.width,
        containerHeight = _entries$0$contentRec.height;
      setContainerSize(containerWidth, containerHeight);
      (_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth, containerHeight);
    };
    if (debounce > 0) {
      callback = throttle$1(callback, debounce, {
        trailing: true,
        leading: false
      });
    }
    var observer = new ResizeObserver(callback);
    var _containerRef$current = containerRef.current.getBoundingClientRect(),
      containerWidth = _containerRef$current.width,
      containerHeight = _containerRef$current.height;
    setContainerSize(containerWidth, containerHeight);
    observer.observe(containerRef.current);
    return function () {
      observer.disconnect();
    };
  }, [setContainerSize, debounce]);
  var chartContent = useMemo$1(function () {
    var containerWidth = sizes.containerWidth,
      containerHeight = sizes.containerHeight;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    warn(isPercent(width) || isPercent(height), "The width(%s) and height(%s) are both fixed numbers,\n       maybe you don't need to use a ResponsiveContainer.", width, height);
    warn(!aspect || aspect > 0, 'The aspect(%s) must be greater than zero.', aspect);
    var calculatedWidth = isPercent(width) ? containerWidth : width;
    var calculatedHeight = isPercent(height) ? containerHeight : height;
    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      if (calculatedWidth) {
        // Will default to using width for aspect ratio
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        // But we should also take height into consideration
        calculatedWidth = calculatedHeight * aspect;
      }

      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && calculatedHeight > maxHeight) {
        calculatedHeight = maxHeight;
      }
    }
    warn(calculatedWidth > 0 || calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
    var isCharts = !Array.isArray(children) && getDisplayName(children.type).endsWith('Chart');
    return React$m.Children.map(children, function (child) {
      if ( /*#__PURE__*/React$m.isValidElement(child)) {
        return /*#__PURE__*/cloneElement$6(child, _objectSpread$q({
          width: calculatedWidth,
          height: calculatedHeight
        }, isCharts ? {
          style: _objectSpread$q({
            height: '100%',
            width: '100%',
            maxHeight: calculatedHeight,
            maxWidth: calculatedWidth
          }, child.props.style)
        } : {}));
      }
      return child;
    });
  }, [aspect, children, height, maxHeight, minHeight, minWidth, sizes, width]);
  return /*#__PURE__*/React$m.createElement("div", {
    id: id ? "".concat(id) : undefined,
    className: clsx('recharts-responsive-container', className),
    style: _objectSpread$q(_objectSpread$q({}, style), {}, {
      width: width,
      height: height,
      minWidth: minWidth,
      minHeight: minHeight,
      maxHeight: maxHeight
    }),
    ref: containerRef
  }, chartContent);
});

/**
 * @fileOverview Cross
 */

var Cell = function Cell(_props) {
  return null;
};
Cell.displayName = 'Cell';

function _typeof$t(o) { "@babel/helpers - typeof"; return _typeof$t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$t(o); }
function ownKeys$p(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$p(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$p(Object(t), true).forEach(function (r) { _defineProperty$r(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$p(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$r(obj, key, value) { key = _toPropertyKey$s(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$s(t) { var i = _toPrimitive$s(t, "string"); return "symbol" == _typeof$t(i) ? i : i + ""; }
function _toPrimitive$s(t, r) { if ("object" != _typeof$t(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$t(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var stringCache = {
  widthCache: {},
  cacheCount: 0
};
var MAX_CACHE_NUM = 2000;
var SPAN_STYLE = {
  position: 'absolute',
  top: '-20000px',
  left: 0,
  padding: 0,
  margin: 0,
  border: 'none',
  whiteSpace: 'pre'
};
var MEASUREMENT_SPAN_ID = 'recharts_measurement_span';
function removeInvalidKeys(obj) {
  var copyObj = _objectSpread$p({}, obj);
  Object.keys(copyObj).forEach(function (key) {
    if (!copyObj[key]) {
      delete copyObj[key];
    }
  });
  return copyObj;
}
var getStringSize = function getStringSize(text) {
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (text === undefined || text === null || Global.isSsr) {
    return {
      width: 0,
      height: 0
    };
  }
  var copyStyle = removeInvalidKeys(style);
  var cacheKey = JSON.stringify({
    text: text,
    copyStyle: copyStyle
  });
  if (stringCache.widthCache[cacheKey]) {
    return stringCache.widthCache[cacheKey];
  }
  try {
    var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (!measurementSpan) {
      measurementSpan = document.createElement('span');
      measurementSpan.setAttribute('id', MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute('aria-hidden', 'true');
      document.body.appendChild(measurementSpan);
    }
    // Need to use CSS Object Model (CSSOM) to be able to comply with Content Security Policy (CSP)
    // https://en.wikipedia.org/wiki/Content_Security_Policy
    var measurementSpanStyle = _objectSpread$p(_objectSpread$p({}, SPAN_STYLE), copyStyle);
    Object.assign(measurementSpan.style, measurementSpanStyle);
    measurementSpan.textContent = "".concat(text);
    var rect = measurementSpan.getBoundingClientRect();
    var result = {
      width: rect.width,
      height: rect.height
    };
    stringCache.widthCache[cacheKey] = result;
    if (++stringCache.cacheCount > MAX_CACHE_NUM) {
      stringCache.cacheCount = 0;
      stringCache.widthCache = {};
    }
    return result;
  } catch (e) {
    return {
      width: 0,
      height: 0
    };
  }
};
var getOffset = function getOffset(rect) {
  return {
    top: rect.top + window.scrollY - document.documentElement.clientTop,
    left: rect.left + window.scrollX - document.documentElement.clientLeft
  };
};

function _typeof$s(o) { "@babel/helpers - typeof"; return _typeof$s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$s(o); }
function _slicedToArray$a(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$i(arr, i) || _nonIterableRest$b(); }
function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$i(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$i(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$i(o, minLen); }
function _arrayLikeToArray$i(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$c(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$r(descriptor.key), descriptor); } }
function _createClass$c(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$c(Constructor.prototype, protoProps); if (staticProps) _defineProperties$c(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$r(t) { var i = _toPrimitive$r(t, "string"); return "symbol" == _typeof$s(i) ? i : i + ""; }
function _toPrimitive$r(t, r) { if ("object" != _typeof$s(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$s(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  "in": 96,
  Q: 96 / (2.54 * 40),
  px: 1
};
var FIXED_CSS_LENGTH_UNITS = Object.keys(CONVERSION_RATES);
var STR_NAN = 'NaN';
function convertToPx(value, unit) {
  return value * CONVERSION_RATES[unit];
}
var DecimalCSS = /*#__PURE__*/function () {
  function DecimalCSS(num, unit) {
    _classCallCheck$c(this, DecimalCSS);
    this.num = num;
    this.unit = unit;
    this.num = num;
    this.unit = unit;
    if (Number.isNaN(num)) {
      this.unit = '';
    }
    if (unit !== '' && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
      this.num = NaN;
      this.unit = '';
    }
    if (FIXED_CSS_LENGTH_UNITS.includes(unit)) {
      this.num = convertToPx(num, unit);
      this.unit = 'px';
    }
  }
  return _createClass$c(DecimalCSS, [{
    key: "add",
    value: function add(other) {
      if (this.unit !== other.unit) {
        return new DecimalCSS(NaN, '');
      }
      return new DecimalCSS(this.num + other.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function subtract(other) {
      if (this.unit !== other.unit) {
        return new DecimalCSS(NaN, '');
      }
      return new DecimalCSS(this.num - other.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function multiply(other) {
      if (this.unit !== '' && other.unit !== '' && this.unit !== other.unit) {
        return new DecimalCSS(NaN, '');
      }
      return new DecimalCSS(this.num * other.num, this.unit || other.unit);
    }
  }, {
    key: "divide",
    value: function divide(other) {
      if (this.unit !== '' && other.unit !== '' && this.unit !== other.unit) {
        return new DecimalCSS(NaN, '');
      }
      return new DecimalCSS(this.num / other.num, this.unit || other.unit);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function isNaN() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function parse(str) {
      var _NUM_SPLIT_REGEX$exec;
      var _ref = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [],
        _ref2 = _slicedToArray$a(_ref, 3),
        numStr = _ref2[1],
        unit = _ref2[2];
      return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : '');
    }
  }]);
}();
function calculateArithmetic(expr) {
  if (expr.includes(STR_NAN)) {
    return STR_NAN;
  }
  var newExpr = expr;
  while (newExpr.includes('*') || newExpr.includes('/')) {
    var _MULTIPLY_OR_DIVIDE_R;
    var _ref3 = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [],
      _ref4 = _slicedToArray$a(_ref3, 4),
      leftOperand = _ref4[1],
      operator = _ref4[2],
      rightOperand = _ref4[3];
    var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : '');
    var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : '');
    var result = operator === '*' ? lTs.multiply(rTs) : lTs.divide(rTs);
    if (result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
  }
  while (newExpr.includes('+') || /.-\d+(?:\.\d+)?/.test(newExpr)) {
    var _ADD_OR_SUBTRACT_REGE;
    var _ref5 = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [],
      _ref6 = _slicedToArray$a(_ref5, 4),
      _leftOperand = _ref6[1],
      _operator = _ref6[2],
      _rightOperand = _ref6[3];
    var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : '');
    var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : '');
    var _result = _operator === '+' ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
    if (_result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
  }
  return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
  var newExpr = expr;
  while (newExpr.includes('(')) {
    var _PARENTHESES_REGEX$ex = PARENTHESES_REGEX.exec(newExpr),
      _PARENTHESES_REGEX$ex2 = _slicedToArray$a(_PARENTHESES_REGEX$ex, 2),
      parentheticalExpression = _PARENTHESES_REGEX$ex2[1];
    newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
  }
  return newExpr;
}
function evaluateExpression(expression) {
  var newExpr = expression.replace(/\s+/g, '');
  newExpr = calculateParentheses(newExpr);
  newExpr = calculateArithmetic(newExpr);
  return newExpr;
}
function safeEvaluateExpression(expression) {
  try {
    return evaluateExpression(expression);
  } catch (e) {
    /* istanbul ignore next */
    return STR_NAN;
  }
}
function reduceCSSCalc(expression) {
  var result = safeEvaluateExpression(expression.slice(5, -1));
  if (result === STR_NAN) {
    // notify the user
    return '';
  }
  return result;
}

var _excluded$9 = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  _excluded2$3 = ["dx", "dy", "angle", "className", "breakAll"];
function _extends$i() { _extends$i = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }
function _objectWithoutProperties$9(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$9(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$9(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _slicedToArray$9(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$h(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$h(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen); }
function _arrayLikeToArray$h(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
const React$l = await importShared('react');
const {useMemo} = React$l;
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = function calculateWordWidths(_ref) {
  var children = _ref.children,
    breakAll = _ref.breakAll,
    style = _ref.style;
  try {
    var words = [];
    if (!isNil$1(children)) {
      if (breakAll) {
        words = children.toString().split('');
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    var wordsWithComputedWidth = words.map(function (word) {
      return {
        word: word,
        width: getStringSize(word, style).width
      };
    });
    var spaceWidth = breakAll ? 0 : getStringSize("\xA0", style).width;
    return {
      wordsWithComputedWidth: wordsWithComputedWidth,
      spaceWidth: spaceWidth
    };
  } catch (e) {
    return null;
  }
};
var calculateWordsByLines = function calculateWordsByLines(_ref2, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) {
  var maxLines = _ref2.maxLines,
    children = _ref2.children,
    style = _ref2.style,
    breakAll = _ref2.breakAll;
  var shouldLimitLines = isNumber(maxLines);
  var text = children;
  var calculate = function calculate() {
    var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return words.reduce(function (result, _ref3) {
      var word = _ref3.word,
        width = _ref3.width;
      var currentLine = result[result.length - 1];
      if (currentLine && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
        // Word can be added to an existing line
        currentLine.words.push(word);
        currentLine.width += width + spaceWidth;
      } else {
        // Add first word to line or word is too long to scaleToFit on existing line
        var newLine = {
          words: [word],
          width: width
        };
        result.push(newLine);
      }
      return result;
    }, []);
  };
  var originalResult = calculate(initialWordsWithComputedWith);
  var findLongestLine = function findLongestLine(words) {
    return words.reduce(function (a, b) {
      return a.width > b.width ? a : b;
    });
  };
  if (!shouldLimitLines) {
    return originalResult;
  }
  var suffix = '…';
  var checkOverflow = function checkOverflow(index) {
    var tempText = text.slice(0, index);
    var words = calculateWordWidths({
      breakAll: breakAll,
      style: style,
      children: tempText + suffix
    }).wordsWithComputedWidth;
    var result = calculate(words);
    var doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
    return [doesOverflow, result];
  };
  var start = 0;
  var end = text.length - 1;
  var iterations = 0;
  var trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    var middle = Math.floor((start + end) / 2);
    var prev = middle - 1;
    var _checkOverflow = checkOverflow(prev),
      _checkOverflow2 = _slicedToArray$9(_checkOverflow, 2),
      doesPrevOverflow = _checkOverflow2[0],
      result = _checkOverflow2[1];
    var _checkOverflow3 = checkOverflow(middle),
      _checkOverflow4 = _slicedToArray$9(_checkOverflow3, 1),
      doesMiddleOverflow = _checkOverflow4[0];
    if (!doesPrevOverflow && !doesMiddleOverflow) {
      start = middle + 1;
    }
    if (doesPrevOverflow && doesMiddleOverflow) {
      end = middle - 1;
    }
    if (!doesPrevOverflow && doesMiddleOverflow) {
      trimmedResult = result;
      break;
    }
    iterations++;
  }

  // Fallback to originalResult (result without trimming) if we cannot find the
  // where to trim.  This should not happen :tm:
  return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = function getWordsWithoutCalculate(children) {
  var words = !isNil$1(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words: words
  }];
};
var getWordsByLines = function getWordsByLines(_ref4) {
  var width = _ref4.width,
    scaleToFit = _ref4.scaleToFit,
    children = _ref4.children,
    style = _ref4.style,
    breakAll = _ref4.breakAll,
    maxLines = _ref4.maxLines;
  // Only perform calculations if using features that require them (multiline, scaleToFit)
  if ((width || scaleToFit) && !Global.isSsr) {
    var wordsWithComputedWidth, spaceWidth;
    var wordWidths = calculateWordWidths({
      breakAll: breakAll,
      children: children,
      style: style
    });
    if (wordWidths) {
      var wcw = wordWidths.wordsWithComputedWidth,
        sw = wordWidths.spaceWidth;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll: breakAll,
      children: children,
      maxLines: maxLines,
      style: style
    }, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
  }
  return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = '#808080';
var Text = function Text(_ref5) {
  var _ref5$x = _ref5.x,
    propsX = _ref5$x === void 0 ? 0 : _ref5$x,
    _ref5$y = _ref5.y,
    propsY = _ref5$y === void 0 ? 0 : _ref5$y,
    _ref5$lineHeight = _ref5.lineHeight,
    lineHeight = _ref5$lineHeight === void 0 ? '1em' : _ref5$lineHeight,
    _ref5$capHeight = _ref5.capHeight,
    capHeight = _ref5$capHeight === void 0 ? '0.71em' : _ref5$capHeight,
    _ref5$scaleToFit = _ref5.scaleToFit,
    scaleToFit = _ref5$scaleToFit === void 0 ? false : _ref5$scaleToFit,
    _ref5$textAnchor = _ref5.textAnchor,
    textAnchor = _ref5$textAnchor === void 0 ? 'start' : _ref5$textAnchor,
    _ref5$verticalAnchor = _ref5.verticalAnchor,
    verticalAnchor = _ref5$verticalAnchor === void 0 ? 'end' : _ref5$verticalAnchor,
    _ref5$fill = _ref5.fill,
    fill = _ref5$fill === void 0 ? DEFAULT_FILL : _ref5$fill,
    props = _objectWithoutProperties$9(_ref5, _excluded$9);
  var wordsByLines = useMemo(function () {
    return getWordsByLines({
      breakAll: props.breakAll,
      children: props.children,
      maxLines: props.maxLines,
      scaleToFit: scaleToFit,
      style: props.style,
      width: props.width
    });
  }, [props.breakAll, props.children, props.maxLines, scaleToFit, props.style, props.width]);
  var dx = props.dx,
    dy = props.dy,
    angle = props.angle,
    className = props.className,
    breakAll = props.breakAll,
    textProps = _objectWithoutProperties$9(props, _excluded2$3);
  if (!isNumOrStr(propsX) || !isNumOrStr(propsY)) {
    return null;
  }
  var x = propsX + (isNumber(dx) ? dx : 0);
  var y = propsY + (isNumber(dy) ? dy : 0);
  var startDy;
  switch (verticalAnchor) {
    case 'start':
      startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
      break;
    case 'middle':
      startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
      break;
    default:
      startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
      break;
  }
  var transforms = [];
  if (scaleToFit) {
    var lineWidth = wordsByLines[0].width;
    var width = props.width;
    transforms.push("scale(".concat((isNumber(width) ? width / lineWidth : 1) / lineWidth, ")"));
  }
  if (angle) {
    transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
  }
  if (transforms.length) {
    textProps.transform = transforms.join(' ');
  }
  return /*#__PURE__*/React$l.createElement("text", _extends$i({}, filterProps(textProps, true), {
    x: x,
    y: y,
    className: clsx('recharts-text', className),
    textAnchor: textAnchor,
    fill: fill.includes('url') ? DEFAULT_FILL : fill
  }), wordsByLines.map(function (line, index) {
    var words = line.words.join(breakAll ? '' : ' ');
    return (
      /*#__PURE__*/
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      React$l.createElement("tspan", {
        x: x,
        dy: index === 0 ? startDy : lineHeight,
        key: "".concat(words, "-").concat(index)
      }, words)
    );
  }));
};

function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x) => ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending || f === descending ? f : zero$1;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero$1() {
  return 0;
}

function number$2(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;

class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

function compareDefined(compare = ascending) {
  if (compare === ascending) return ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function ascendingDefined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}

const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

function max$2(values, valueof) {
  let max;
  {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

function min$2(values, valueof) {
  let min;
  {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = Infinity, compare) {
  k = Math.floor(k);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array.length - 1, right));

  if (!(left <= k && k <= right)) return array;

  compare = compare === undefined ? ascendingDefined : compareDefined(compare);

  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);
    else ++j, swap(array, j, right);

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}

function quantile$1(values, p, valueof) {
  values = Float64Array.from(numbers(values));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return min$2(values);
  if (p >= 1) return max$2(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = max$2(quickselect(values, i0).subarray(0, i0 + 1)),
      value1 = min$2(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function quantileSorted(values, p, valueof = number$2) {
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function range$3(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range$3(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb$1, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

const constant = x => () => x;

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
}

const rgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date$1(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber$1(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber$1(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? interpolateNumber$1
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date$1
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber$1)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function piecewise(interpolate$1, values) {
  if (values === undefined) values = interpolate$1, interpolate$1 = interpolate;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate$1(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}

function constants(x) {
  return function() {
    return x;
  };
}

function number$1(x) {
  return +x;
}

var unit = [0, 1];

function identity$6(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy$1(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer$2() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity$6,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$6) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber$1)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$6, rescale()) : clamp !== identity$6;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer$2()(identity$6, identity$6);
}

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

const formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity$5(x) {
  return x;
}

var map$3 = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale$1(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$5 : formatGroup(map$3.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$5 : formatNumerals(map$3.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale$1;
var format;
var formatPrefix;

defaultLocale$1({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous();

  scale.copy = function() {
    return copy$1(scale, linear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function identity$4(domain) {
  var unknown;

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), scale) : domain.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return identity$4(domain).unknown(unknown);
  };

  domain = arguments.length ? Array.from(domain, number$1) : [0, 1];

  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : x => Math.pow(base, x);
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), x => Math.log(x) / base);
}

function reflect(f) {
  return (x, k) => -f(-x, k);
}

function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = count => {
    const d = domain();
    let u = d[0];
    let v = d[d.length - 1];
    const r = v < u;

    if (r) ([u, v] = [v, u]);

    let i = logs(u);
    let j = logs(v);
    let k;
    let t;
    const n = count == null ? 10 : +count;
    let z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k = 1; k < base; ++k) {
          t = i < 0 ? k / pows(-i) : k * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i <= j; ++i) {
        for (k = base - 1; k >= 1; --k) {
          t = i > 0 ? k / pows(-i) : k * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks(u, v, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };

  scale.tickFormat = (count, specifier) => {
    if (count == null) count = 10;
    if (specifier == null) specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
      specifier = format(specifier);
    }
    if (count === Infinity) return specifier;
    const k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return d => {
      let i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = () => {
    return domain(nice(domain(), {
      floor: x => pows(Math.floor(logs(x))),
      ceil: x => pows(Math.ceil(logs(x)))
    }));
  };

  return scale;
}

function log() {
  const scale = loggish(transformer$2()).domain([1, 10]);
  scale.copy = () => copy$1(scale, log()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}

function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return linearish(scale);
}

function symlog() {
  var scale = symlogish(transformer$2());

  scale.copy = function() {
    return copy$1(scale, symlog()).constant(scale.constant());
  };

  return initRange.apply(scale, arguments);
}

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(identity$6, identity$6),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity$6, identity$6)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow() {
  var scale = powish(transformer$2());

  scale.copy = function() {
    return copy$1(scale, pow()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}

function square(x) {
  return Math.sign(x) * x * x;
}

function unsquare(x) {
  return Math.sign(x) * Math.sqrt(Math.abs(x));
}

function radial() {
  var squared = continuous(),
      range = [0, 1],
      round = false,
      unknown;

  function scale(x) {
    var y = unsquare(squared(x));
    return isNaN(y) ? unknown : round ? Math.round(y) : y;
  }

  scale.invert = function(y) {
    return squared.invert(square(y));
  };

  scale.domain = function(_) {
    return arguments.length ? (squared.domain(_), scale) : squared.domain();
  };

  scale.range = function(_) {
    return arguments.length ? (squared.range((range = Array.from(_, number$1)).map(square)), scale) : range.slice();
  };

  scale.rangeRound = function(_) {
    return scale.range(_).round(true);
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, scale) : round;
  };

  scale.clamp = function(_) {
    return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return radial(squared.domain(), range)
        .round(round)
        .clamp(squared.clamp())
        .unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = quantileSorted(domain, i / n);
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(linearish(scale), arguments);
}

function threshold() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

const t0 = new Date, t1 = new Date;

function timeInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = (date) => {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = (date) => {
    const d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = (date, step) => {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = (start, stop, step) => {
    const range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    let previous;
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, 1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? (d) => field(d) % step === 0
              : (d) => interval.count(0, d) % step === 0);
    };
  }

  return interval;
}

const millisecond = timeInterval(() => {
  // noop
}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start, end) => {
    return (end - start) / k;
  });
};

millisecond.range;

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

const second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});

second.range;

const timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getMinutes();
});

timeMinute.range;

const utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});

utcMinute.range;

const timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getHours();
});

timeHour.range;

const utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getUTCHours();
});

utcHour.range;

const timeDay = timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

timeDay.range;

const utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});

utcDay.range;

const unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});

unixDay.range;

function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);

timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;

function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}

const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);

utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;

const timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});

timeMonth.range;

const utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});

utcMonth.range;

const timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date) => {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

timeYear.range;

const utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

utcYear.range;

function ticker(year, month, week, day, hour, minute) {

  const tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function ticks(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }

  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [ticks, tickInterval];
}

const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale;
var timeFormat;
var utcFormat;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  locale.parse;
  utcFormat = locale.utcFormat;
  locale.utcParse;
  return locale;
}

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  var scale = continuous(),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };

  scale.ticks = function(interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };

  scale.copy = function() {
    return copy$1(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  };

  return scale;
}

function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

function transformer$1() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = identity$6,
      clamp = false,
      unknown;

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }

  scale.range = range(interpolate);

  scale.rangeRound = range(interpolateRound);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = linearish(transformer$1()(identity$6));

  scale.copy = function() {
    return copy(scale, sequential());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialLog() {
  var scale = loggish(transformer$1()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = symlogish(transformer$1());

  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialPow() {
  var scale = powish(transformer$1());

  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

function sequentialQuantile() {
  var domain = [],
      interpolator = identity$6;

  function scale(x) {
    if (x != null && !isNaN(x = +x)) return interpolator((bisectRight(domain, x, 1) - 1) / (domain.length - 1));
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return scale;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.range = function() {
    return domain.map((d, i) => interpolator(i / (domain.length - 1)));
  };

  scale.quantiles = function(n) {
    return Array.from({length: n + 1}, (_, i) => quantile$1(domain, i / n));
  };

  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return initInterpolator.apply(scale, arguments);
}

function transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      s = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = identity$6,
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }

  scale.range = range(interpolate);

  scale.rangeRound = range(interpolateRound);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
    return scale;
  };
}

function diverging() {
  var scale = linearish(transformer()(identity$6));

  scale.copy = function() {
    return copy(scale, diverging());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingLog() {
  var scale = loggish(transformer()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return copy(scale, divergingLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSymlog() {
  var scale = symlogish(transformer());

  scale.copy = function() {
    return copy(scale, divergingSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingPow() {
  var scale = powish(transformer());

  scale.copy = function() {
    return copy(scale, divergingPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

const d3Scales = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  scaleBand: band,
  scaleDiverging: diverging,
  scaleDivergingLog: divergingLog,
  scaleDivergingPow: divergingPow,
  scaleDivergingSqrt: divergingSqrt,
  scaleDivergingSymlog: divergingSymlog,
  scaleIdentity: identity$4,
  scaleImplicit: implicit,
  scaleLinear: linear,
  scaleLog: log,
  scaleOrdinal: ordinal,
  scalePoint: point,
  scalePow: pow,
  scaleQuantile: quantile,
  scaleQuantize: quantize,
  scaleRadial: radial,
  scaleSequential: sequential,
  scaleSequentialLog: sequentialLog,
  scaleSequentialPow: sequentialPow,
  scaleSequentialQuantile: sequentialQuantile,
  scaleSequentialSqrt: sequentialSqrt,
  scaleSequentialSymlog: sequentialSymlog,
  scaleSqrt: sqrt,
  scaleSymlog: symlog,
  scaleThreshold: threshold,
  scaleTime: time,
  scaleUtc: utcTime,
  tickFormat
}, Symbol.toStringTag, { value: 'Module' }));

var isSymbol = isSymbol_1;

/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum$4(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined
          ? (current === current && !isSymbol(current))
          : comparator(current, computed)
        )) {
      var computed = current,
          result = value;
    }
  }
  return result;
}

var _baseExtremum = baseExtremum$4;

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */

function baseGt$2(value, other) {
  return value > other;
}

var _baseGt = baseGt$2;

var baseExtremum$3 = _baseExtremum,
    baseGt$1 = _baseGt,
    identity$3 = identity_1;

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(array) {
  return (array && array.length)
    ? baseExtremum$3(array, identity$3, baseGt$1)
    : undefined;
}

var max_1 = max;

const max$1 = /*@__PURE__*/getDefaultExportFromCjs(max_1);

/**
 * The base implementation of `_.lt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 */

function baseLt$2(value, other) {
  return value < other;
}

var _baseLt = baseLt$2;

var baseExtremum$2 = _baseExtremum,
    baseLt$1 = _baseLt,
    identity$2 = identity_1;

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => undefined
 */
function min(array) {
  return (array && array.length)
    ? baseExtremum$2(array, identity$2, baseLt$1)
    : undefined;
}

var min_1 = min;

const min$1 = /*@__PURE__*/getDefaultExportFromCjs(min_1);

var arrayMap = _arrayMap,
    baseIteratee$5 = _baseIteratee,
    baseMap = _baseMap,
    isArray$3 = isArray_1;

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map$2(collection, iteratee) {
  var func = isArray$3(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee$5(iteratee));
}

var map_1 = map$2;

var baseFlatten = _baseFlatten,
    map$1 = map_1;

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * _.flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
  return baseFlatten(map$1(collection, iteratee), 1);
}

var flatMap_1 = flatMap;

const flatMap$1 = /*@__PURE__*/getDefaultExportFromCjs(flatMap_1);

var baseIsEqual = _baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

const isEqual$1 = /*@__PURE__*/getDefaultExportFromCjs(isEqual_1);

/*
 *  decimal.js-light v2.5.1
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js-light
 *  Copyright (c) 2020 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Expat Licence
 */


// ------------------------------------  EDITABLE DEFAULTS  ------------------------------------- //


// The limit on the value of `precision`, and on the value of the first argument to
// `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
var MAX_DIGITS = 1e9,                        // 0 to 1e9


  // The initial configuration properties of the Decimal constructor.
  defaults = {

    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed during run-time using `Decimal.config`.

    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,                         // 1 to MAX_DIGITS

    // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
    // `toFixed`, `toPrecision` and `toSignificantDigits`.
    //
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    //
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,                           // 0 to 8

    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,                          // 0 to -MAX_E

    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos:  21,                         // 0 to MAX_E

    // The natural logarithm of 10.
    // 115 digits
    LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286'
  },


// ------------------------------------ END OF EDITABLE DEFAULTS -------------------------------- //


  Decimal,
  external = true,

  decimalError = '[DecimalError] ',
  invalidArgument = decimalError + 'Invalid argument: ',
  exponentOutOfRange = decimalError + 'Exponent out of range: ',

  mathfloor = Math.floor,
  mathpow = Math.pow,

  isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

  ONE,
  BASE = 1e7,
  LOG_BASE = 7,
  MAX_SAFE_INTEGER = 9007199254740991,
  MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE),    // 1286742750677284

  // Decimal.prototype object
  P = {};


// Decimal prototype methods


/*
 *  absoluteValue                       abs
 *  comparedTo                          cmp
 *  decimalPlaces                       dp
 *  dividedBy                           div
 *  dividedToIntegerBy                  idiv
 *  equals                              eq
 *  exponent
 *  greaterThan                         gt
 *  greaterThanOrEqualTo                gte
 *  isInteger                           isint
 *  isNegative                          isneg
 *  isPositive                          ispos
 *  isZero
 *  lessThan                            lt
 *  lessThanOrEqualTo                   lte
 *  logarithm                           log
 *  minus                               sub
 *  modulo                              mod
 *  naturalExponential                  exp
 *  naturalLogarithm                    ln
 *  negated                             neg
 *  plus                                add
 *  precision                           sd
 *  squareRoot                          sqrt
 *  times                               mul
 *  toDecimalPlaces                     todp
 *  toExponential
 *  toFixed
 *  toInteger                           toint
 *  toNumber
 *  toPower                             pow
 *  toPrecision
 *  toSignificantDigits                 tosd
 *  toString
 *  valueOf                             val
 */


/*
 * Return a new Decimal whose value is the absolute value of this Decimal.
 *
 */
P.absoluteValue = P.abs = function () {
  var x = new this.constructor(this);
  if (x.s) x.s = 1;
  return x;
};


/*
 * Return
 *   1    if the value of this Decimal is greater than the value of `y`,
 *  -1    if the value of this Decimal is less than the value of `y`,
 *   0    if they have the same value
 *
 */
P.comparedTo = P.cmp = function (y) {
  var i, j, xdL, ydL,
    x = this;

  y = new x.constructor(y);

  // Signs differ?
  if (x.s !== y.s) return x.s || -y.s;

  // Compare exponents.
  if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;

  xdL = x.d.length;
  ydL = y.d.length;

  // Compare digit by digit.
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
  }

  // Compare lengths.
  return xdL === ydL ? 0 : xdL > ydL ^ x.s < 0 ? 1 : -1;
};


/*
 * Return the number of decimal places of the value of this Decimal.
 *
 */
P.decimalPlaces = P.dp = function () {
  var x = this,
    w = x.d.length - 1,
    dp = (w - x.e) * LOG_BASE;

  // Subtract the number of trailing zeros of the last word.
  w = x.d[w];
  if (w) for (; w % 10 == 0; w /= 10) dp--;

  return dp < 0 ? 0 : dp;
};


/*
 * Return a new Decimal whose value is the value of this Decimal divided by `y`, truncated to
 * `precision` significant digits.
 *
 */
P.dividedBy = P.div = function (y) {
  return divide(this, new this.constructor(y));
};


/*
 * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
 * by the value of `y`, truncated to `precision` significant digits.
 *
 */
P.dividedToIntegerBy = P.idiv = function (y) {
  var x = this,
    Ctor = x.constructor;
  return round(divide(x, new Ctor(y), 0, 1), Ctor.precision);
};


/*
 * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
 *
 */
P.equals = P.eq = function (y) {
  return !this.cmp(y);
};


/*
 * Return the (base 10) exponent value of this Decimal (this.e is the base 10000000 exponent).
 *
 */
P.exponent = function () {
  return getBase10Exponent(this);
};


/*
 * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
 * false.
 *
 */
P.greaterThan = P.gt = function (y) {
  return this.cmp(y) > 0;
};


/*
 * Return true if the value of this Decimal is greater than or equal to the value of `y`,
 * otherwise return false.
 *
 */
P.greaterThanOrEqualTo = P.gte = function (y) {
  return this.cmp(y) >= 0;
};


/*
 * Return true if the value of this Decimal is an integer, otherwise return false.
 *
 */
P.isInteger = P.isint = function () {
  return this.e > this.d.length - 2;
};


/*
 * Return true if the value of this Decimal is negative, otherwise return false.
 *
 */
P.isNegative = P.isneg = function () {
  return this.s < 0;
};


/*
 * Return true if the value of this Decimal is positive, otherwise return false.
 *
 */
P.isPositive = P.ispos = function () {
  return this.s > 0;
};


/*
 * Return true if the value of this Decimal is 0, otherwise return false.
 *
 */
P.isZero = function () {
  return this.s === 0;
};


/*
 * Return true if the value of this Decimal is less than `y`, otherwise return false.
 *
 */
P.lessThan = P.lt = function (y) {
  return this.cmp(y) < 0;
};


/*
 * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
 *
 */
P.lessThanOrEqualTo = P.lte = function (y) {
  return this.cmp(y) < 1;
};


/*
 * Return the logarithm of the value of this Decimal to the specified base, truncated to
 * `precision` significant digits.
 *
 * If no base is specified, return log[10](x).
 *
 * log[base](x) = ln(x) / ln(base)
 *
 * The maximum error of the result is 1 ulp (unit in the last place).
 *
 * [base] {number|string|Decimal} The base of the logarithm.
 *
 */
P.logarithm = P.log = function (base) {
  var r,
    x = this,
    Ctor = x.constructor,
    pr = Ctor.precision,
    wpr = pr + 5;

  // Default base is 10.
  if (base === void 0) {
    base = new Ctor(10);
  } else {
    base = new Ctor(base);

    // log[-b](x) = NaN
    // log[0](x)  = NaN
    // log[1](x)  = NaN
    if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + 'NaN');
  }

  // log[b](-x) = NaN
  // log[b](0) = -Infinity
  if (x.s < 1) throw Error(decimalError + (x.s ? 'NaN' : '-Infinity'));

  // log[b](1) = 0
  if (x.eq(ONE)) return new Ctor(0);

  external = false;
  r = divide(ln(x, wpr), ln(base, wpr), wpr);
  external = true;

  return round(r, pr);
};


/*
 * Return a new Decimal whose value is the value of this Decimal minus `y`, truncated to
 * `precision` significant digits.
 *
 */
P.minus = P.sub = function (y) {
  var x = this;
  y = new x.constructor(y);
  return x.s == y.s ? subtract(x, y) : add(x, (y.s = -y.s, y));
};


/*
 * Return a new Decimal whose value is the value of this Decimal modulo `y`, truncated to
 * `precision` significant digits.
 *
 */
P.modulo = P.mod = function (y) {
  var q,
    x = this,
    Ctor = x.constructor,
    pr = Ctor.precision;

  y = new Ctor(y);

  // x % 0 = NaN
  if (!y.s) throw Error(decimalError + 'NaN');

  // Return x if x is 0.
  if (!x.s) return round(new Ctor(x), pr);

  // Prevent rounding of intermediate calculations.
  external = false;
  q = divide(x, y, 0, 1).times(y);
  external = true;

  return x.minus(q);
};


/*
 * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
 * i.e. the base e raised to the power the value of this Decimal, truncated to `precision`
 * significant digits.
 *
 */
P.naturalExponential = P.exp = function () {
  return exp(this);
};


/*
 * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
 * truncated to `precision` significant digits.
 *
 */
P.naturalLogarithm = P.ln = function () {
  return ln(this);
};


/*
 * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
 * -1.
 *
 */
P.negated = P.neg = function () {
  var x = new this.constructor(this);
  x.s = -x.s || 0;
  return x;
};


/*
 * Return a new Decimal whose value is the value of this Decimal plus `y`, truncated to
 * `precision` significant digits.
 *
 */
P.plus = P.add = function (y) {
  var x = this;
  y = new x.constructor(y);
  return x.s == y.s ? add(x, y) : subtract(x, (y.s = -y.s, y));
};


/*
 * Return the number of significant digits of the value of this Decimal.
 *
 * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
 *
 */
P.precision = P.sd = function (z) {
  var e, sd, w,
    x = this;

  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

  e = getBase10Exponent(x) + 1;
  w = x.d.length - 1;
  sd = w * LOG_BASE + 1;
  w = x.d[w];

  // If non-zero...
  if (w) {

    // Subtract the number of trailing zeros of the last word.
    for (; w % 10 == 0; w /= 10) sd--;

    // Add the number of digits of the first word.
    for (w = x.d[0]; w >= 10; w /= 10) sd++;
  }

  return z && e > sd ? e : sd;
};


/*
 * Return a new Decimal whose value is the square root of this Decimal, truncated to `precision`
 * significant digits.
 *
 */
P.squareRoot = P.sqrt = function () {
  var e, n, pr, r, s, t, wpr,
    x = this,
    Ctor = x.constructor;

  // Negative or zero?
  if (x.s < 1) {
    if (!x.s) return new Ctor(0);

    // sqrt(-x) = NaN
    throw Error(decimalError + 'NaN');
  }

  e = getBase10Exponent(x);
  external = false;

  // Initial estimate.
  s = Math.sqrt(+x);

  // Math.sqrt underflow/overflow?
  // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(x.d);
    if ((n.length + e) % 2 == 0) n += '0';
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

    if (s == 1 / 0) {
      n = '5e' + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf('e') + 1) + e;
    }

    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }

  pr = Ctor.precision;
  s = wpr = pr + 3;

  // Newton-Raphson iteration.
  for (;;) {
    t = r;
    r = t.plus(divide(x, t, wpr + 2)).times(0.5);

    if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
      n = n.slice(wpr - 3, wpr + 1);

      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
      // 4999, i.e. approaching a rounding boundary, continue the iteration.
      if (s == wpr && n == '4999') {

        // On the first iteration only, check to see if rounding up gives the exact result as the
        // nines may infinitely repeat.
        round(t, pr + 1, 0);

        if (t.times(t).eq(x)) {
          r = t;
          break;
        }
      } else if (n != '9999') {
        break;
      }

      wpr += 4;
    }
  }

  external = true;

  return round(r, pr);
};


/*
 * Return a new Decimal whose value is the value of this Decimal times `y`, truncated to
 * `precision` significant digits.
 *
 */
P.times = P.mul = function (y) {
  var carry, e, i, k, r, rL, t, xdL, ydL,
    x = this,
    Ctor = x.constructor,
    xd = x.d,
    yd = (y = new Ctor(y)).d;

  // Return 0 if either is 0.
  if (!x.s || !y.s) return new Ctor(0);

  y.s *= x.s;
  e = x.e + y.e;
  xdL = xd.length;
  ydL = yd.length;

  // Ensure xd points to the longer array.
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }

  // Initialise the result array with zeros.
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--;) r.push(0);

  // Multiply!
  for (i = ydL; --i >= 0;) {
    carry = 0;
    for (k = xdL + i; k > i;) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }

    r[k] = (r[k] + carry) % BASE | 0;
  }

  // Remove trailing zeros.
  for (; !r[--rL];) r.pop();

  if (carry) ++e;
  else r.shift();

  y.d = r;
  y.e = e;

  return external ? round(y, Ctor.precision) : y;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
 * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
 *
 * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toDecimalPlaces = P.todp = function (dp, rm) {
  var x = this,
    Ctor = x.constructor;

  x = new Ctor(x);
  if (dp === void 0) return x;

  checkInt32(dp, 0, MAX_DIGITS);

  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);

  return round(x, dp + getBase10Exponent(x) + 1, rm);
};


/*
 * Return a string representing the value of this Decimal in exponential notation rounded to
 * `dp` fixed decimal places using rounding mode `rounding`.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toExponential = function (dp, rm) {
  var str,
    x = this,
    Ctor = x.constructor;

  if (dp === void 0) {
    str = toString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    x = round(new Ctor(x), dp + 1, rm);
    str = toString(x, true, dp + 1);
  }

  return str;
};


/*
 * Return a string representing the value of this Decimal in normal (fixed-point) notation to
 * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
 * omitted.
 *
 * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 * (-0).toFixed(3) is '0.000'.
 * (-0.5).toFixed(0) is '-0'.
 *
 */
P.toFixed = function (dp, rm) {
  var str, y,
    x = this,
    Ctor = x.constructor;

  if (dp === void 0) return toString(x);

  checkInt32(dp, 0, MAX_DIGITS);

  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);

  y = round(new Ctor(x), dp + getBase10Exponent(x) + 1, rm);
  str = toString(y.abs(), false, dp + getBase10Exponent(y) + 1);

  // To determine whether to add the minus sign look at the value before it was rounded,
  // i.e. look at `x` rather than `y`.
  return x.isneg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
 * rounding mode `rounding`.
 *
 */
P.toInteger = P.toint = function () {
  var x = this,
    Ctor = x.constructor;
  return round(new Ctor(x), getBase10Exponent(x) + 1, Ctor.rounding);
};


/*
 * Return the value of this Decimal converted to a number primitive.
 *
 */
P.toNumber = function () {
  return +this;
};


/*
 * Return a new Decimal whose value is the value of this Decimal raised to the power `y`,
 * truncated to `precision` significant digits.
 *
 * For non-integer or very large exponents pow(x, y) is calculated using
 *
 *   x^y = exp(y*ln(x))
 *
 * The maximum error is 1 ulp (unit in last place).
 *
 * y {number|string|Decimal} The power to which to raise this Decimal.
 *
 */
P.toPower = P.pow = function (y) {
  var e, k, pr, r, sign, yIsInt,
    x = this,
    Ctor = x.constructor,
    guard = 12,
    yn = +(y = new Ctor(y));

  // pow(x, 0) = 1
  if (!y.s) return new Ctor(ONE);

  x = new Ctor(x);

  // pow(0, y > 0) = 0
  // pow(0, y < 0) = Infinity
  if (!x.s) {
    if (y.s < 1) throw Error(decimalError + 'Infinity');
    return x;
  }

  // pow(1, y) = 1
  if (x.eq(ONE)) return x;

  pr = Ctor.precision;

  // pow(x, 1) = x
  if (y.eq(ONE)) return round(x, pr);

  e = y.e;
  k = y.d.length - 1;
  yIsInt = e >= k;
  sign = x.s;

  if (!yIsInt) {

    // pow(x < 0, y non-integer) = NaN
    if (sign < 0) throw Error(decimalError + 'NaN');

  // If y is a small integer use the 'exponentiation by squaring' algorithm.
  } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = new Ctor(ONE);

    // Max k of 9007199254740991 takes 53 loop iterations.
    // Maximum digits array length; leaves [28, 34] guard digits.
    e = Math.ceil(pr / LOG_BASE + 4);

    external = false;

    for (;;) {
      if (k % 2) {
        r = r.times(x);
        truncate(r.d, e);
      }

      k = mathfloor(k / 2);
      if (k === 0) break;

      x = x.times(x);
      truncate(x.d, e);
    }

    external = true;

    return y.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
  }

  // Result is negative if x is negative and the last digit of integer y is odd.
  sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;

  x.s = 1;
  external = false;
  r = y.times(ln(x, pr + guard));
  external = true;
  r = exp(r);
  r.s = sign;

  return r;
};


/*
 * Return a string representing the value of this Decimal rounded to `sd` significant digits
 * using rounding mode `rounding`.
 *
 * Return exponential notation if `sd` is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toPrecision = function (sd, rm) {
  var e, str,
    x = this,
    Ctor = x.constructor;

  if (sd === void 0) {
    e = getBase10Exponent(x);
    str = toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    x = round(new Ctor(x), sd, rm);
    e = getBase10Exponent(x);
    str = toString(x, sd <= e || e <= Ctor.toExpNeg, sd);
  }

  return str;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
 * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
 * omitted.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toSignificantDigits = P.tosd = function (sd, rm) {
  var x = this,
    Ctor = x.constructor;

  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }

  return round(new Ctor(x), sd, rm);
};


/*
 * Return a string representing the value of this Decimal.
 *
 * Return exponential notation if this Decimal has a positive exponent equal to or greater than
 * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
 *
 */
P.toString = P.valueOf = P.val = P.toJSON = P[Symbol.for('nodejs.util.inspect.custom')] = function () {
  var x = this,
    e = getBase10Exponent(x),
    Ctor = x.constructor;

  return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
};


// Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


/*
 *  add                 P.minus, P.plus
 *  checkInt32          P.todp, P.toExponential, P.toFixed, P.toPrecision, P.tosd
 *  digitsToString      P.log, P.sqrt, P.pow, toString, exp, ln
 *  divide              P.div, P.idiv, P.log, P.mod, P.sqrt, exp, ln
 *  exp                 P.exp, P.pow
 *  getBase10Exponent   P.exponent, P.sd, P.toint, P.sqrt, P.todp, P.toFixed, P.toPrecision,
 *                      P.toString, divide, round, toString, exp, ln
 *  getLn10             P.log, ln
 *  getZeroString       digitsToString, toString
 *  ln                  P.log, P.ln, P.pow, exp
 *  parseDecimal        Decimal
 *  round               P.abs, P.idiv, P.log, P.minus, P.mod, P.neg, P.plus, P.toint, P.sqrt,
 *                      P.times, P.todp, P.toExponential, P.toFixed, P.pow, P.toPrecision, P.tosd,
 *                      divide, getLn10, exp, ln
 *  subtract            P.minus, P.plus
 *  toString            P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf
 *  truncate            P.pow
 *
 *  Throws:             P.log, P.mod, P.sd, P.sqrt, P.pow,  checkInt32, divide, round,
 *                      getLn10, exp, ln, parseDecimal, Decimal, config
 */


function add(x, y) {
  var carry, d, e, i, k, len, xd, yd,
    Ctor = x.constructor,
    pr = Ctor.precision;

  // If either is zero...
  if (!x.s || !y.s) {

    // Return x if y is zero.
    // Return y if y is non-zero.
    if (!y.s) y = new Ctor(x);
    return external ? round(y, pr) : y;
  }

  xd = x.d;
  yd = y.d;

  // x and y are finite, non-zero numbers with the same sign.

  k = x.e;
  e = y.e;
  xd = xd.slice();
  i = k - e;

  // If base 1e7 exponents differ...
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }

    // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;

    if (i > len) {
      i = len;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
    d.reverse();
    for (; i--;) d.push(0);
    d.reverse();
  }

  len = xd.length;
  i = yd.length;

  // If yd is longer than xd, swap xd and yd so xd points to the longer array.
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }

  // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
  for (carry = 0; i;) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }

  if (carry) {
    xd.unshift(carry);
    ++e;
  }

  // Remove trailing zeros.
  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
  for (len = xd.length; xd[--len] == 0;) xd.pop();

  y.d = xd;
  y.e = e;

  return external ? round(y, pr) : y;
}


function checkInt32(i, min, max) {
  if (i !== ~~i || i < min || i > max) {
    throw Error(invalidArgument + i);
  }
}


function digitsToString(d) {
  var i, k, ws,
    indexOfLastWord = d.length - 1,
    str = '',
    w = d[0];

  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
      str += ws;
    }

    w = d[i];
    ws = w + '';
    k = LOG_BASE - ws.length;
    if (k) str += getZeroString(k);
  } else if (w === 0) {
    return '0';
  }

  // Remove trailing zeros of last w.
  for (; w % 10 === 0;) w /= 10;

  return str + w;
}


var divide = (function () {

  // Assumes non-zero x and k, and hence non-zero result.
  function multiplyInteger(x, k) {
    var temp,
      carry = 0,
      i = x.length;

    for (x = x.slice(); i--;) {
      temp = x[i] * k + carry;
      x[i] = temp % BASE | 0;
      carry = temp / BASE | 0;
    }

    if (carry) x.unshift(carry);

    return x;
  }

  function compare(a, b, aL, bL) {
    var i, r;

    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }

    return r;
  }

  function subtract(a, b, aL) {
    var i = 0;

    // Subtract b from a.
    for (; aL--;) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * BASE + a[aL] - b[aL];
    }

    // Remove leading zeros.
    for (; !a[0] && a.length > 1;) a.shift();
  }

  return function (x, y, pr, dp) {
    var cmp, e, i, k, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz,
      Ctor = x.constructor,
      sign = x.s == y.s ? 1 : -1,
      xd = x.d,
      yd = y.d;

    // Either 0?
    if (!x.s) return new Ctor(x);
    if (!y.s) throw Error(decimalError + 'Division by zero');

    e = x.e - y.e;
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign);
    qd = q.d = [];

    // Result exponent may be one less than e.
    for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
    if (yd[i] > (xd[i] || 0)) --e;

    if (pr == null) {
      sd = pr = Ctor.precision;
    } else if (dp) {
      sd = pr + (getBase10Exponent(x) - getBase10Exponent(y)) + 1;
    } else {
      sd = pr;
    }

    if (sd < 0) return new Ctor(0);

    // Convert precision in number of base 10 digits to base 1e7 digits.
    sd = sd / LOG_BASE + 2 | 0;
    i = 0;

    // divisor < 1e7
    if (yL == 1) {
      k = 0;
      yd = yd[0];
      sd++;

      // k is the carry.
      for (; (i < xL || k) && sd--; i++) {
        t = k * BASE + (xd[i] || 0);
        qd[i] = t / yd | 0;
        k = t % yd | 0;
      }

    // divisor >= 1e7
    } else {

      // Normalise xd and yd so highest order digit of yd is >= BASE/2
      k = BASE / (yd[0] + 1) | 0;

      if (k > 1) {
        yd = multiplyInteger(yd, k);
        xd = multiplyInteger(xd, k);
        yL = yd.length;
        xL = xd.length;
      }

      xi = yL;
      rem = xd.slice(0, yL);
      remL = rem.length;

      // Add zeros to make remainder as long as divisor.
      for (; remL < yL;) rem[remL++] = 0;

      yz = yd.slice();
      yz.unshift(0);
      yd0 = yd[0];

      if (yd[1] >= BASE / 2) ++yd0;

      do {
        k = 0;

        // Compare divisor and remainder.
        cmp = compare(yd, rem, yL, remL);

        // If divisor < remainder.
        if (cmp < 0) {

          // Calculate trial digit, k.
          rem0 = rem[0];
          if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);

          // k will be how many times the divisor goes into the current remainder.
          k = rem0 / yd0 | 0;

          //  Algorithm:
          //  1. product = divisor * trial digit (k)
          //  2. if product > remainder: product -= divisor, k--
          //  3. remainder -= product
          //  4. if product was < remainder at 2:
          //    5. compare new remainder and divisor
          //    6. If remainder > divisor: remainder -= divisor, k++

          if (k > 1) {
            if (k >= BASE) k = BASE - 1;

            // product = divisor * trial digit.
            prod = multiplyInteger(yd, k);
            prodL = prod.length;
            remL = rem.length;

            // Compare product and remainder.
            cmp = compare(prod, rem, prodL, remL);

            // product > remainder.
            if (cmp == 1) {
              k--;

              // Subtract divisor from product.
              subtract(prod, yL < prodL ? yz : yd, prodL);
            }
          } else {

            // cmp is -1.
            // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
            // to avoid it. If k is 1 there is a need to compare yd and rem again below.
            if (k == 0) cmp = k = 1;
            prod = yd.slice();
          }

          prodL = prod.length;
          if (prodL < remL) prod.unshift(0);

          // Subtract product from remainder.
          subtract(rem, prod, remL);

          // If product was < previous remainder.
          if (cmp == -1) {
            remL = rem.length;

            // Compare divisor and new remainder.
            cmp = compare(yd, rem, yL, remL);

            // If divisor < new remainder, subtract divisor from remainder.
            if (cmp < 1) {
              k++;

              // Subtract divisor from remainder.
              subtract(rem, yL < remL ? yz : yd, remL);
            }
          }

          remL = rem.length;
        } else if (cmp === 0) {
          k++;
          rem = [0];
        }    // if cmp === 1, k will be 0

        // Add the next digit, k, to the result array.
        qd[i++] = k;

        // Update the remainder.
        if (cmp && rem[0]) {
          rem[remL++] = xd[xi] || 0;
        } else {
          rem = [xd[xi]];
          remL = 1;
        }

      } while ((xi++ < xL || rem[0] !== void 0) && sd--);
    }

    // Leading zero?
    if (!qd[0]) qd.shift();

    q.e = e;

    return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
  };
})();


/*
 * Return a new Decimal whose value is the natural exponential of `x` truncated to `sd`
 * significant digits.
 *
 * Taylor/Maclaurin series.
 *
 * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
 *
 * Argument reduction:
 *   Repeat x = x / 32, k += 5, until |x| < 0.1
 *   exp(x) = exp(x / 2^k)^(2^k)
 *
 * Previously, the argument was initially reduced by
 * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
 * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
 * found to be slower than just dividing repeatedly by 32 as above.
 *
 * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
 *
 *  exp(x) is non-terminating for any finite, non-zero x.
 *
 */
function exp(x, sd) {
  var denominator, guard, pow, sum, t, wpr,
    i = 0,
    k = 0,
    Ctor = x.constructor,
    pr = Ctor.precision;

  if (getBase10Exponent(x) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x));

  // exp(0) = 1
  if (!x.s) return new Ctor(ONE);

  {
    external = false;
    wpr = pr;
  }

  t = new Ctor(0.03125);

  while (x.abs().gte(0.1)) {
    x = x.times(t);    // x = x / 2^5
    k += 5;
  }

  // Estimate the precision increase necessary to ensure the first 4 rounding digits are correct.
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow = sum = new Ctor(ONE);
  Ctor.precision = wpr;

  for (;;) {
    pow = round(pow.times(x), wpr);
    denominator = denominator.times(++i);
    t = sum.plus(divide(pow, denominator, wpr));

    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      while (k--) sum = round(sum.times(sum), wpr);
      Ctor.precision = pr;
      return sd == null ? (external = true, round(sum, pr)) : sum;
    }

    sum = t;
  }
}


// Calculate the base 10 exponent from the base 1e7 exponent.
function getBase10Exponent(x) {
  var e = x.e * LOG_BASE,
    w = x.d[0];

  // Add the number of digits of the first word of the digits array.
  for (; w >= 10; w /= 10) e++;
  return e;
}


function getLn10(Ctor, sd, pr) {

  if (sd > Ctor.LN10.sd()) {


    // Reset global state in case the exception is caught.
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(decimalError + 'LN10 precision limit exceeded');
  }

  return round(new Ctor(Ctor.LN10), sd);
}


function getZeroString(k) {
  var zs = '';
  for (; k--;) zs += '0';
  return zs;
}


/*
 * Return a new Decimal whose value is the natural logarithm of `x` truncated to `sd` significant
 * digits.
 *
 *  ln(n) is non-terminating (n != 1)
 *
 */
function ln(y, sd) {
  var c, c0, denominator, e, numerator, sum, t, wpr, x2,
    n = 1,
    guard = 10,
    x = y,
    xd = x.d,
    Ctor = x.constructor,
    pr = Ctor.precision;

  // ln(-x) = NaN
  // ln(0) = -Infinity
  if (x.s < 1) throw Error(decimalError + (x.s ? 'NaN' : '-Infinity'));

  // ln(1) = 0
  if (x.eq(ONE)) return new Ctor(0);

  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }

  if (x.eq(10)) {
    if (sd == null) external = true;
    return getLn10(Ctor, wpr);
  }

  wpr += guard;
  Ctor.precision = wpr;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  e = getBase10Exponent(x);

  if (Math.abs(e) < 1.5e15) {

    // Argument reduction.
    // The series converges faster the closer the argument is to 1, so using
    // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
    // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
    // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
    // later be divided by this number, then separate out the power of 10 using
    // ln(a*10^b) = ln(a) + b*ln(10).

    // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
    //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
    // max n is 6 (gives 0.7 - 1.3)
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }

    e = getBase10Exponent(x);

    if (c0 > 1) {
      x = new Ctor('0.' + c);
      e++;
    } else {
      x = new Ctor(c0 + '.' + c.slice(1));
    }
  } else {

    // The argument reduction method above may result in overflow if the argument y is a massive
    // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
    // function using ln(x*10^e) = ln(x) + e*ln(10).
    t = getLn10(Ctor, wpr + 2, pr).times(e + '');
    x = ln(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);

    Ctor.precision = pr;
    return sd == null ? (external = true, round(x, pr)) : x;
  }

  // x is reduced to a value near 1.

  // Taylor series.
  // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
  // where x = (y - 1)/(y + 1)    (|x| < 1)
  sum = numerator = x = divide(x.minus(ONE), x.plus(ONE), wpr);
  x2 = round(x.times(x), wpr);
  denominator = 3;

  for (;;) {
    numerator = round(numerator.times(x2), wpr);
    t = sum.plus(divide(numerator, new Ctor(denominator), wpr));

    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      sum = sum.times(2);

      // Reverse the argument reduction.
      if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
      sum = divide(sum, new Ctor(n), wpr);

      Ctor.precision = pr;
      return sd == null ? (external = true, round(sum, pr)) : sum;
    }

    sum = t;
    denominator += 2;
  }
}


/*
 * Parse the value of a new Decimal `x` from string `str`.
 */
function parseDecimal(x, str) {
  var e, i, len;

  // Decimal point?
  if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

  // Exponential form?
  if ((i = str.search(/e/i)) > 0) {

    // Determine exponent.
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {

    // Integer.
    e = str.length;
  }

  // Determine leading zeros.
  for (i = 0; str.charCodeAt(i) === 48;) ++i;

  // Determine trailing zeros.
  for (len = str.length; str.charCodeAt(len - 1) === 48;) --len;
  str = str.slice(i, len);

  if (str) {
    len -= i;
    e = e - i - 1;
    x.e = mathfloor(e / LOG_BASE);
    x.d = [];

    // Transform base

    // e is the base 10 exponent.
    // i is where to slice str to get the first word of the digits array.
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;

    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }

    for (; i--;) str += '0';
    x.d.push(+str);

    if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
  } else {

    // Zero.
    x.s = 0;
    x.e = 0;
    x.d = [0];
  }

  return x;
}


/*
 * Round `x` to `sd` significant digits, using rounding mode `rm` if present (truncate otherwise).
 */
 function round(x, sd, rm) {
  var i, j, k, n, rd, doRound, w, xdi,
    xd = x.d;

  // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
  // w: the word of xd which contains the rounding digit, a base 1e7 number.
  // xdi: the index of w within xd.
  // n: the number of digits of w.
  // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
  // they had leading zeros)
  // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

  // Get the length of the first word of the digits array xd.
  for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
  i = sd - n;

  // Is the rounding digit in the first word of xd?
  if (i < 0) {
    i += LOG_BASE;
    j = sd;
    w = xd[xdi = 0];
  } else {
    xdi = Math.ceil((i + 1) / LOG_BASE);
    k = xd.length;
    if (xdi >= k) return x;
    w = k = xd[xdi];

    // Get the number of digits of w.
    for (n = 1; k >= 10; k /= 10) n++;

    // Get the index of rd within w.
    i %= LOG_BASE;

    // Get the index of rd within w, adjusted for leading zeros.
    // The number of leading zeros of w is given by LOG_BASE - n.
    j = i - LOG_BASE + n;
  }

  if (rm !== void 0) {
    k = mathpow(10, n - j - 1);

    // Get the rounding digit at index j of w.
    rd = w / k % 10 | 0;

    // Are there any non-zero digits after the rounding digit?
    doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;

    // The expression `w % mathpow(10, n - j - 1)` returns all the digits of w to the right of the
    // digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression will give
    // 714.

    doRound = rm < 4
      ? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
      : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 &&

        // Check whether the digit to the left of the rounding digit is odd.
        ((i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
          rm == (x.s < 0 ? 8 : 7));
  }

  if (sd < 1 || !xd[0]) {
    if (doRound) {
      k = getBase10Exponent(x);
      xd.length = 1;

      // Convert sd to decimal places.
      sd = sd - k - 1;

      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
      x.e = mathfloor(-sd / LOG_BASE) || 0;
    } else {
      xd.length = 1;

      // Zero.
      xd[0] = x.e = x.s = 0;
    }

    return x;
  }

  // Remove excess digits.
  if (i == 0) {
    xd.length = xdi;
    k = 1;
    xdi--;
  } else {
    xd.length = xdi + 1;
    k = mathpow(10, LOG_BASE - i);

    // E.g. 56700 becomes 56000 if 7 is the rounding digit.
    // j > 0 means i > number of leading zeros of w.
    xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k : 0;
  }

  if (doRound) {
    for (;;) {

      // Is the digit to be rounded up in the first word of xd?
      if (xdi == 0) {
        if ((xd[0] += k) == BASE) {
          xd[0] = 1;
          ++x.e;
        }

        break;
      } else {
        xd[xdi] += k;
        if (xd[xdi] != BASE) break;
        xd[xdi--] = 0;
        k = 1;
      }
    }
  }

  // Remove trailing zeros.
  for (i = xd.length; xd[--i] === 0;) xd.pop();

  if (external && (x.e > MAX_E || x.e < -MAX_E)) {
    throw Error(exponentOutOfRange + getBase10Exponent(x));
  }

  return x;
}


function subtract(x, y) {
  var d, e, i, j, k, len, xd, xe, xLTy, yd,
    Ctor = x.constructor,
    pr = Ctor.precision;

  // Return y negated if x is zero.
  // Return x if y is zero and x is non-zero.
  if (!x.s || !y.s) {
    if (y.s) y.s = -y.s;
    else y = new Ctor(x);
    return external ? round(y, pr) : y;
  }

  xd = x.d;
  yd = y.d;

  // x and y are non-zero numbers with the same sign.

  e = y.e;
  xe = x.e;
  xd = xd.slice();
  k = xe - e;

  // If exponents differ...
  if (k) {
    xLTy = k < 0;

    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }

    // Numbers with massively different exponents would result in a very high number of zeros
    // needing to be prepended, but this can be avoided while still ensuring correct rounding by
    // limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

    if (k > i) {
      k = i;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents.
    d.reverse();
    for (i = k; i--;) d.push(0);
    d.reverse();

  // Base 1e7 exponents equal.
  } else {

    // Check digits to determine which is the bigger number.

    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;

    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }

    k = 0;
  }

  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }

  len = xd.length;

  // Append zeros to xd if shorter.
  // Don't add zeros to yd if shorter as subtraction only needs to start at yd length.
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

  // Subtract yd from xd.
  for (i = yd.length; i > k;) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }

    xd[i] -= yd[i];
  }

  // Remove trailing zeros.
  for (; xd[--len] === 0;) xd.pop();

  // Remove leading zeros and adjust exponent accordingly.
  for (; xd[0] === 0; xd.shift()) --e;

  // Zero?
  if (!xd[0]) return new Ctor(0);

  y.d = xd;
  y.e = e;

  //return external && xd.length >= pr / LOG_BASE ? round(y, pr) : y;
  return external ? round(y, pr) : y;
}


function toString(x, isExp, sd) {
  var k,
    e = getBase10Exponent(x),
    str = digitsToString(x.d),
    len = str.length;

  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + '.' + str.slice(1);
    }

    str = str + (e < 0 ? 'e' : 'e+') + e;
  } else if (e < 0) {
    str = '0.' + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0) str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
  } else {
    if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len) str += '.';
      str += getZeroString(k);
    }
  }

  return x.s < 0 ? '-' + str : str;
}


// Does not strip trailing zeros.
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}


// Decimal methods


/*
 *  clone
 *  config/set
 */


/*
 * Create and return a Decimal constructor with the same configuration properties as this Decimal
 * constructor.
 *
 */
function clone(obj) {
  var i, p, ps;

  /*
   * The Decimal constructor and exported function.
   * Return a new Decimal instance.
   *
   * value {number|string|Decimal} A numeric value.
   *
   */
  function Decimal(value) {
    var x = this;

    // Decimal called without new.
    if (!(x instanceof Decimal)) return new Decimal(value);

    // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
    // which points to Object.
    x.constructor = Decimal;

    // Duplicate.
    if (value instanceof Decimal) {
      x.s = value.s;
      x.e = value.e;
      x.d = (value = value.d) ? value.slice() : value;
      return;
    }

    if (typeof value === 'number') {

      // Reject Infinity/NaN.
      if (value * 0 !== 0) {
        throw Error(invalidArgument + value);
      }

      if (value > 0) {
        x.s = 1;
      } else if (value < 0) {
        value = -value;
        x.s = -1;
      } else {
        x.s = 0;
        x.e = 0;
        x.d = [0];
        return;
      }

      // Fast path for small integers.
      if (value === ~~value && value < 1e7) {
        x.e = 0;
        x.d = [value];
        return;
      }

      return parseDecimal(x, value.toString());
    } else if (typeof value !== 'string') {
      throw Error(invalidArgument + value);
    }

    // Minus sign?
    if (value.charCodeAt(0) === 45) {
      value = value.slice(1);
      x.s = -1;
    } else {
      x.s = 1;
    }

    if (isDecimal.test(value)) parseDecimal(x, value);
    else throw Error(invalidArgument + value);
  }

  Decimal.prototype = P;

  Decimal.ROUND_UP = 0;
  Decimal.ROUND_DOWN = 1;
  Decimal.ROUND_CEIL = 2;
  Decimal.ROUND_FLOOR = 3;
  Decimal.ROUND_HALF_UP = 4;
  Decimal.ROUND_HALF_DOWN = 5;
  Decimal.ROUND_HALF_EVEN = 6;
  Decimal.ROUND_HALF_CEIL = 7;
  Decimal.ROUND_HALF_FLOOR = 8;

  Decimal.clone = clone;
  Decimal.config = Decimal.set = config;

  if (obj === void 0) obj = {};
  if (obj) {
    ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'];
    for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
  }

  Decimal.config(obj);

  return Decimal;
}


/*
 * Configure global settings for a Decimal constructor.
 *
 * `obj` is an object with one or more of the following properties,
 *
 *   precision  {number}
 *   rounding   {number}
 *   toExpNeg   {number}
 *   toExpPos   {number}
 *
 * E.g. Decimal.config({ precision: 20, rounding: 4 })
 *
 */
function config(obj) {
  if (!obj || typeof obj !== 'object') {
    throw Error(decimalError + 'Object expected');
  }
  var i, p, v,
    ps = [
      'precision', 1, MAX_DIGITS,
      'rounding', 0, 8,
      'toExpNeg', -1 / 0, 0,
      'toExpPos', 0, 1 / 0
    ];

  for (i = 0; i < ps.length; i += 3) {
    if ((v = obj[p = ps[i]]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ': ' + v);
    }
  }

  if ((v = obj[p = 'LN10']) !== void 0) {
      if (v == Math.LN10) this[p] = new this(v);
      else throw Error(invalidArgument + p + ': ' + v);
  }

  return this;
}


// Create and configure initial Decimal constructor.
var Decimal = clone(defaults);

// Internal constant.
ONE = new Decimal(1);

const Decimal$1 = Decimal;

function _toConsumableArray$a(arr) { return _arrayWithoutHoles$a(arr) || _iterableToArray$b(arr) || _unsupportedIterableToArray$g(arr) || _nonIterableSpread$a(); }

function _nonIterableSpread$a() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$g(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$g(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen); }

function _iterableToArray$b(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles$a(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$g(arr); }

function _arrayLikeToArray$g(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var identity$1 = function identity(i) {
  return i;
};

var PLACE_HOLDER = {
  };

var isPlaceHolder = function isPlaceHolder(val) {
  return val === PLACE_HOLDER;
};

var curry0 = function curry0(fn) {
  return function _curried() {
    if (arguments.length === 0 || arguments.length === 1 && isPlaceHolder(arguments.length <= 0 ? undefined : arguments[0])) {
      return _curried;
    }

    return fn.apply(void 0, arguments);
  };
};

var curryN = function curryN(n, fn) {
  if (n === 1) {
    return fn;
  }

  return curry0(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var argsLength = args.filter(function (arg) {
      return arg !== PLACE_HOLDER;
    }).length;

    if (argsLength >= n) {
      return fn.apply(void 0, args);
    }

    return curryN(n - argsLength, curry0(function () {
      for (var _len2 = arguments.length, restArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        restArgs[_key2] = arguments[_key2];
      }

      var newArgs = args.map(function (arg) {
        return isPlaceHolder(arg) ? restArgs.shift() : arg;
      });
      return fn.apply(void 0, _toConsumableArray$a(newArgs).concat(restArgs));
    }));
  });
};

var curry = function curry(fn) {
  return curryN(fn.length, fn);
};
var range$2 = function range(begin, end) {
  var arr = [];

  for (var i = begin; i < end; ++i) {
    arr[i - begin] = i;
  }

  return arr;
};
var map = curry(function (fn, arr) {
  if (Array.isArray(arr)) {
    return arr.map(fn);
  }

  return Object.keys(arr).map(function (key) {
    return arr[key];
  }).map(fn);
});
var compose = function compose() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (!args.length) {
    return identity$1;
  }

  var fns = args.reverse(); // first function can receive multiply arguments

  var firstFn = fns[0];
  var tailsFn = fns.slice(1);
  return function () {
    return tailsFn.reduce(function (res, fn) {
      return fn(res);
    }, firstFn.apply(void 0, arguments));
  };
};
var reverse = function reverse(arr) {
  if (Array.isArray(arr)) {
    return arr.reverse();
  } // can be string


  return arr.split('').reverse.join('');
};
var memoize = function memoize(fn) {
  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (lastArgs && args.every(function (val, i) {
      return val === lastArgs[i];
    })) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = fn.apply(void 0, args);
    return lastResult;
  };
};

/**
 * @fileOverview 一些公用的运算方法
 * @author xile611
 * @date 2015-09-17
 */
/**
 * 获取数值的位数
 * 其中绝对值属于区间[0.1, 1)， 得到的值为0
 * 绝对值属于区间[0.01, 0.1)，得到的位数为 -1
 * 绝对值属于区间[0.001, 0.01)，得到的位数为 -2
 *
 * @param  {Number} value 数值
 * @return {Integer} 位数
 */

function getDigitCount(value) {
  var result;

  if (value === 0) {
    result = 1;
  } else {
    result = Math.floor(new Decimal$1(value).abs().log(10).toNumber()) + 1;
  }

  return result;
}
/**
 * 按照固定的步长获取[start, end)这个区间的数据
 * 并且需要处理js计算精度的问题
 *
 * @param  {Decimal} start 起点
 * @param  {Decimal} end   终点，不包含该值
 * @param  {Decimal} step  步长
 * @return {Array}         若干数值
 */


function rangeStep(start, end, step) {
  var num = new Decimal$1(start);
  var i = 0;
  var result = []; // magic number to prevent infinite loop

  while (num.lt(end) && i < 100000) {
    result.push(num.toNumber());
    num = num.add(step);
    i++;
  }

  return result;
}
/**
 * 对数值进行线性插值
 *
 * @param  {Number} a  定义域的极点
 * @param  {Number} b  定义域的极点
 * @param  {Number} t  [0, 1]内的某个值
 * @return {Number}    定义域内的某个值
 */


var interpolateNumber = curry(function (a, b, t) {
  var newA = +a;
  var newB = +b;
  return newA + t * (newB - newA);
});
/**
 * 线性插值的逆运算
 *
 * @param  {Number} a 定义域的极点
 * @param  {Number} b 定义域的极点
 * @param  {Number} x 可以认为是插值后的一个输出值
 * @return {Number}   当x在 a ~ b这个范围内时，返回值属于[0, 1]
 */

var uninterpolateNumber = curry(function (a, b, x) {
  var diff = b - +a;
  diff = diff || Infinity;
  return (x - a) / diff;
});
/**
 * 线性插值的逆运算，并且有截断的操作
 *
 * @param  {Number} a 定义域的极点
 * @param  {Number} b 定义域的极点
 * @param  {Number} x 可以认为是插值后的一个输出值
 * @return {Number}   当x在 a ~ b这个区间内时，返回值属于[0, 1]，
 * 当x不在 a ~ b这个区间时，会截断到 a ~ b 这个区间
 */

var uninterpolateTruncation = curry(function (a, b, x) {
  var diff = b - +a;
  diff = diff || Infinity;
  return Math.max(0, Math.min(1, (x - a) / diff));
});
const Arithmetic = {
  rangeStep: rangeStep,
  getDigitCount: getDigitCount,
  interpolateNumber: interpolateNumber,
  uninterpolateNumber: uninterpolateNumber,
  uninterpolateTruncation: uninterpolateTruncation
};

function _toConsumableArray$9(arr) { return _arrayWithoutHoles$9(arr) || _iterableToArray$a(arr) || _unsupportedIterableToArray$f(arr) || _nonIterableSpread$9(); }

function _nonIterableSpread$9() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray$a(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles$9(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$f(arr); }

function _slicedToArray$8(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$9(); }

function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$f(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$f(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen); }

function _arrayLikeToArray$f(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$8(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Calculate a interval of a minimum value and a maximum value
 *
 * @param  {Number} min       The minimum value
 * @param  {Number} max       The maximum value
 * @return {Array} An interval
 */

function getValidInterval(_ref) {
  var _ref2 = _slicedToArray$8(_ref, 2),
      min = _ref2[0],
      max = _ref2[1];

  var validMin = min,
      validMax = max; // exchange

  if (min > max) {
    validMin = max;
    validMax = min;
  }

  return [validMin, validMax];
}
/**
 * Calculate the step which is easy to understand between ticks, like 10, 20, 25
 *
 * @param  {Decimal} roughStep        The rough step calculated by deviding the
 * difference by the tickCount
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Integer} correctionFactor A correction factor
 * @return {Decimal} The step which is easy to understand between two ticks
 */


function getFormatStep(roughStep, allowDecimals, correctionFactor) {
  if (roughStep.lte(0)) {
    return new Decimal$1(0);
  }

  var digitCount = Arithmetic.getDigitCount(roughStep.toNumber()); // The ratio between the rough step and the smallest number which has a bigger
  // order of magnitudes than the rough step

  var digitCountValue = new Decimal$1(10).pow(digitCount);
  var stepRatio = roughStep.div(digitCountValue); // When an integer and a float multiplied, the accuracy of result may be wrong

  var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
  var amendStepRatio = new Decimal$1(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? formatStep : new Decimal$1(Math.ceil(formatStep));
}
/**
 * calculate the ticks when the minimum value equals to the maximum value
 *
 * @param  {Number}  value         The minimum valuue which is also the maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}                 ticks
 */


function getTickOfSingleValue(value, tickCount, allowDecimals) {
  var step = 1; // calculate the middle value of ticks

  var middle = new Decimal$1(value);

  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);

    if (absVal < 1) {
      // The step should be a float number when the difference is smaller than 1
      step = new Decimal$1(10).pow(Arithmetic.getDigitCount(value) - 1);
      middle = new Decimal$1(Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      // Return the maximum integer which is smaller than 'value' when 'value' is greater than 1
      middle = new Decimal$1(Math.floor(value));
    }
  } else if (value === 0) {
    middle = new Decimal$1(Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new Decimal$1(Math.floor(value));
  }

  var middleIndex = Math.floor((tickCount - 1) / 2);
  var fn = compose(map(function (n) {
    return middle.add(new Decimal$1(n - middleIndex).mul(step)).toNumber();
  }), range$2);
  return fn(0, tickCount);
}
/**
 * Calculate the step
 *
 * @param  {Number}  min              The minimum value of an interval
 * @param  {Number}  max              The maximum value of an interval
 * @param  {Integer} tickCount        The count of ticks
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Number}  correctionFactor A correction factor
 * @return {Object}  The step, minimum value of ticks, maximum value of ticks
 */


function calculateStep(min, max, tickCount, allowDecimals) {
  var correctionFactor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  // dirty hack (for recharts' test)
  if (!Number.isFinite((max - min) / (tickCount - 1))) {
    return {
      step: new Decimal$1(0),
      tickMin: new Decimal$1(0),
      tickMax: new Decimal$1(0)
    };
  } // The step which is easy to understand between two ticks


  var step = getFormatStep(new Decimal$1(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor); // A medial value of ticks

  var middle; // When 0 is inside the interval, 0 should be a tick

  if (min <= 0 && max >= 0) {
    middle = new Decimal$1(0);
  } else {
    // calculate the middle value
    middle = new Decimal$1(min).add(max).div(2); // minus modulo value

    middle = middle.sub(new Decimal$1(middle).mod(step));
  }

  var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
  var upCount = Math.ceil(new Decimal$1(max).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;

  if (scaleCount > tickCount) {
    // When more ticks need to cover the interval, step should be bigger.
    return calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1);
  }

  if (scaleCount < tickCount) {
    // When less ticks can cover the interval, we should add some additional ticks
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }

  return {
    step: step,
    tickMin: middle.sub(new Decimal$1(belowCount).mul(step)),
    tickMax: middle.add(new Decimal$1(upCount).mul(step))
  };
}
/**
 * Calculate the ticks of an interval, the count of ticks will be guraranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */


function getNiceTickValuesFn(_ref3) {
  var _ref4 = _slicedToArray$8(_ref3, 2),
      min = _ref4[0],
      max = _ref4[1];

  var tickCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  var allowDecimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // More than two ticks should be return
  var count = Math.max(tickCount, 2);

  var _getValidInterval = getValidInterval([min, max]),
      _getValidInterval2 = _slicedToArray$8(_getValidInterval, 2),
      cormin = _getValidInterval2[0],
      cormax = _getValidInterval2[1];

  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin].concat(_toConsumableArray$9(range$2(0, tickCount - 1).map(function () {
      return Infinity;
    }))) : [].concat(_toConsumableArray$9(range$2(0, tickCount - 1).map(function () {
      return -Infinity;
    })), [cormax]);

    return min > max ? reverse(_values) : _values;
  }

  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  } // Get the step between two ticks


  var _calculateStep = calculateStep(cormin, cormax, count, allowDecimals),
      step = _calculateStep.step,
      tickMin = _calculateStep.tickMin,
      tickMax = _calculateStep.tickMax;

  var values = Arithmetic.rangeStep(tickMin, tickMax.add(new Decimal$1(0.1).mul(step)), step);
  return min > max ? reverse(values) : values;
}
/**
 * Calculate the ticks of an interval, the count of ticks won't be guraranteed,
 * but the domain will be guaranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */


function getTickValuesFixedDomainFn(_ref7, tickCount) {
  var _ref8 = _slicedToArray$8(_ref7, 2),
      min = _ref8[0],
      max = _ref8[1];

  var allowDecimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  // More than two ticks should be return
  var _getValidInterval5 = getValidInterval([min, max]),
      _getValidInterval6 = _slicedToArray$8(_getValidInterval5, 2),
      cormin = _getValidInterval6[0],
      cormax = _getValidInterval6[1];

  if (cormin === -Infinity || cormax === Infinity) {
    return [min, max];
  }

  if (cormin === cormax) {
    return [cormin];
  }

  var count = Math.max(tickCount, 2);
  var step = getFormatStep(new Decimal$1(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
  var values = [].concat(_toConsumableArray$9(Arithmetic.rangeStep(new Decimal$1(cormin), new Decimal$1(cormax).sub(new Decimal$1(0.99).mul(step)), step)), [cormax]);
  return min > max ? reverse(values) : values;
}

var getNiceTickValues = memoize(getNiceTickValuesFn);
var getTickValuesFixedDomain = memoize(getTickValuesFixedDomainFn);

var prefix = "Invariant failed";
function invariant(condition, message) {
  {
    throw new Error(prefix);
  }
}

var _excluded$8 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function _typeof$r(o) {
  "@babel/helpers - typeof";
  return _typeof$r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$r(o);
}
function _extends$h() {
  _extends$h = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$h.apply(this, arguments);
}
function _slicedToArray$7(arr, i) {
  return _arrayWithHoles$8(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$e(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen);
}
function _arrayLikeToArray$e(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$7(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$8(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$8(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$8(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck$b(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$b(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$q(descriptor.key), descriptor);
  }
}
function _createClass$b(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$b(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$8(t, o, e) {
  return o = _getPrototypeOf$9(o), _possibleConstructorReturn$9(t, _isNativeReflectConstruct$9() ? Reflect.construct(o, e || [], _getPrototypeOf$9(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$9(self, call) {
  if (call && (_typeof$r(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$9(self);
}
function _assertThisInitialized$9(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$9() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$9 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$9(o) {
  _getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$9(o);
}
function _inherits$9(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$9(subClass, superClass);
}
function _setPrototypeOf$9(o, p) {
  _setPrototypeOf$9 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$9(o, p);
}
function _defineProperty$q(obj, key, value) {
  key = _toPropertyKey$q(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$q(t) {
  var i = _toPrimitive$q(t, "string");
  return "symbol" == _typeof$r(i) ? i : i + "";
}
function _toPrimitive$q(t, r) {
  if ("object" != _typeof$r(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$r(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
const React$k = await importShared('react');
var ErrorBar = /* @__PURE__ */ function(_React$Component) {
  function ErrorBar2() {
    _classCallCheck$b(this, ErrorBar2);
    return _callSuper$8(this, ErrorBar2, arguments);
  }
  _inherits$9(ErrorBar2, _React$Component);
  return _createClass$b(ErrorBar2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, offset = _this$props.offset, layout = _this$props.layout, width = _this$props.width, dataKey = _this$props.dataKey, data = _this$props.data, dataPointFormatter = _this$props.dataPointFormatter, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, others = _objectWithoutProperties$8(_this$props, _excluded$8);
      var svgProps = filterProps(others, false);
      !!(this.props.direction === "x" && xAxis.type !== "number") ? invariant() : void 0;
      var errorBars = data.map(function(entry) {
        var _dataPointFormatter = dataPointFormatter(entry, dataKey), x = _dataPointFormatter.x, y = _dataPointFormatter.y, value = _dataPointFormatter.value, errorVal = _dataPointFormatter.errorVal;
        if (!errorVal) {
          return null;
        }
        var lineCoordinates = [];
        var lowBound, highBound;
        if (Array.isArray(errorVal)) {
          var _errorVal = _slicedToArray$7(errorVal, 2);
          lowBound = _errorVal[0];
          highBound = _errorVal[1];
        } else {
          lowBound = highBound = errorVal;
        }
        if (layout === "vertical") {
          var scale = xAxis.scale;
          var yMid = y + offset;
          var yMin = yMid + width;
          var yMax = yMid - width;
          var xMin = scale(value - lowBound);
          var xMax = scale(value + highBound);
          lineCoordinates.push({
            x1: xMax,
            y1: yMin,
            x2: xMax,
            y2: yMax
          });
          lineCoordinates.push({
            x1: xMin,
            y1: yMid,
            x2: xMax,
            y2: yMid
          });
          lineCoordinates.push({
            x1: xMin,
            y1: yMin,
            x2: xMin,
            y2: yMax
          });
        } else if (layout === "horizontal") {
          var _scale = yAxis.scale;
          var xMid = x + offset;
          var _xMin = xMid - width;
          var _xMax = xMid + width;
          var _yMin = _scale(value - lowBound);
          var _yMax = _scale(value + highBound);
          lineCoordinates.push({
            x1: _xMin,
            y1: _yMax,
            x2: _xMax,
            y2: _yMax
          });
          lineCoordinates.push({
            x1: xMid,
            y1: _yMin,
            x2: xMid,
            y2: _yMax
          });
          lineCoordinates.push({
            x1: _xMin,
            y1: _yMin,
            x2: _xMax,
            y2: _yMin
          });
        }
        return /* @__PURE__ */ React$k.createElement(Layer, _extends$h({
          className: "recharts-errorBar",
          key: "bar-".concat(lineCoordinates.map(function(c) {
            return "".concat(c.x1, "-").concat(c.x2, "-").concat(c.y1, "-").concat(c.y2);
          }))
        }, svgProps), lineCoordinates.map(function(coordinates) {
          return /* @__PURE__ */ React$k.createElement("line", _extends$h({}, coordinates, {
            key: "line-".concat(coordinates.x1, "-").concat(coordinates.x2, "-").concat(coordinates.y1, "-").concat(coordinates.y2)
          }));
        }));
      });
      return /* @__PURE__ */ React$k.createElement(Layer, {
        className: "recharts-errorBars"
      }, errorBars);
    }
  }]);
}(React$k.Component);
_defineProperty$q(ErrorBar, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
_defineProperty$q(ErrorBar, "displayName", "ErrorBar");

function _typeof$q(o) { "@babel/helpers - typeof"; return _typeof$q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$q(o); }
function ownKeys$o(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$o(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$o(Object(t), true).forEach(function (r) { _defineProperty$p(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$o(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$p(obj, key, value) { key = _toPropertyKey$p(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$p(t) { var i = _toPrimitive$p(t, "string"); return "symbol" == _typeof$q(i) ? i : i + ""; }
function _toPrimitive$p(t, r) { if ("object" != _typeof$q(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$q(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getLegendProps = function getLegendProps(_ref) {
  var children = _ref.children,
    formattedGraphicalItems = _ref.formattedGraphicalItems,
    legendWidth = _ref.legendWidth,
    legendContent = _ref.legendContent;
  var legendItem = findChildByType(children, Legend);
  if (!legendItem) {
    return null;
  }
  var legendDefaultProps = Legend.defaultProps;
  var legendProps = legendDefaultProps !== undefined ? _objectSpread$o(_objectSpread$o({}, legendDefaultProps), legendItem.props) : {};
  var legendData;
  if (legendItem.props && legendItem.props.payload) {
    legendData = legendItem.props && legendItem.props.payload;
  } else if (legendContent === 'children') {
    legendData = (formattedGraphicalItems || []).reduce(function (result, _ref2) {
      var item = _ref2.item,
        props = _ref2.props;
      var data = props.sectors || props.data || [];
      return result.concat(data.map(function (entry) {
        return {
          type: legendItem.props.iconType || item.props.legendType,
          value: entry.name,
          color: entry.fill,
          payload: entry
        };
      }));
    }, []);
  } else {
    legendData = (formattedGraphicalItems || []).map(function (_ref3) {
      var item = _ref3.item;
      var itemDefaultProps = item.type.defaultProps;
      var itemProps = itemDefaultProps !== undefined ? _objectSpread$o(_objectSpread$o({}, itemDefaultProps), item.props) : {};
      var dataKey = itemProps.dataKey,
        name = itemProps.name,
        legendType = itemProps.legendType,
        hide = itemProps.hide;
      return {
        inactive: hide,
        dataKey: dataKey,
        type: legendProps.iconType || legendType || 'square',
        color: getMainColorOfGraphicItem(item),
        value: name || dataKey,
        // @ts-expect-error property strokeDasharray is required in Payload but optional in props
        payload: itemProps
      };
    });
  }
  return _objectSpread$o(_objectSpread$o(_objectSpread$o({}, legendProps), Legend.getWithHeight(legendItem, legendWidth)), {}, {
    payload: legendData,
    item: legendItem
  });
};

function _typeof$p(o) { "@babel/helpers - typeof"; return _typeof$p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$p(o); }
function _toConsumableArray$8(arr) { return _arrayWithoutHoles$8(arr) || _iterableToArray$9(arr) || _unsupportedIterableToArray$d(arr) || _nonIterableSpread$8(); }
function _nonIterableSpread$8() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }
function _iterableToArray$9(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$8(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$d(arr); }
function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$n(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$n(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$n(Object(t), true).forEach(function (r) { _defineProperty$o(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$n(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$o(obj, key, value) { key = _toPropertyKey$o(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$o(t) { var i = _toPrimitive$o(t, "string"); return "symbol" == _typeof$p(i) ? i : i + ""; }
function _toPrimitive$o(t, r) { if ("object" != _typeof$p(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$p(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getValueByDataKey(obj, dataKey, defaultValue) {
  if (isNil$1(obj) || isNil$1(dataKey)) {
    return defaultValue;
  }
  if (isNumOrStr(dataKey)) {
    return get$2(obj, dataKey, defaultValue);
  }
  if (isFunction$3(dataKey)) {
    return dataKey(obj);
  }
  return defaultValue;
}
/**
 * Get domain of data by key.
 * @param  {Array}   data      The data displayed in the chart
 * @param  {String}  key       The unique key of a group of data
 * @param  {String}  type      The type of axis
 * @param  {Boolean} filterNil Whether or not filter nil values
 * @return {Array} Domain of data
 */
function getDomainOfDataByKey(data, key, type, filterNil) {
  var flattenData = flatMap$1(data, function (entry) {
    return getValueByDataKey(entry, key);
  });
  if (type === 'number') {
    // @ts-expect-error parseFloat type only accepts strings
    var domain = flattenData.filter(function (entry) {
      return isNumber(entry) || parseFloat(entry);
    });
    return domain.length ? [min$1(domain), max$1(domain)] : [Infinity, -Infinity];
  }
  var validateData = filterNil ? flattenData.filter(function (entry) {
    return !isNil$1(entry);
  }) : flattenData;

  // Supports x-axis of Date type
  return validateData.map(function (entry) {
    return isNumOrStr(entry) || entry instanceof Date ? entry : '';
  });
}
var calculateActiveTickIndex = function calculateActiveTickIndex(coordinate) {
  var _ticks$length;
  var ticks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var unsortedTicks = arguments.length > 2 ? arguments[2] : undefined;
  var axis = arguments.length > 3 ? arguments[3] : undefined;
  var index = -1;
  var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;

  // if there are 1 or less ticks ticks then the active tick is at index 0
  if (len <= 1) {
    return 0;
  }
  if (axis && axis.axisType === 'angleAxis' && Math.abs(Math.abs(axis.range[1] - axis.range[0]) - 360) <= 1e-6) {
    var range = axis.range;
    // ticks are distributed in a circle
    for (var i = 0; i < len; i++) {
      var before = i > 0 ? unsortedTicks[i - 1].coordinate : unsortedTicks[len - 1].coordinate;
      var cur = unsortedTicks[i].coordinate;
      var after = i >= len - 1 ? unsortedTicks[0].coordinate : unsortedTicks[i + 1].coordinate;
      var sameDirectionCoord = void 0;
      if (mathSign(cur - before) !== mathSign(after - cur)) {
        var diffInterval = [];
        if (mathSign(after - cur) === mathSign(range[1] - range[0])) {
          sameDirectionCoord = after;
          var curInRange = cur + range[1] - range[0];
          diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
          diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          var afterInRange = after + range[1] - range[0];
          diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
          diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
        }
        var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
        if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
          index = unsortedTicks[i].index;
          break;
        }
      } else {
        var minValue = Math.min(before, after);
        var maxValue = Math.max(before, after);
        if (coordinate > (minValue + cur) / 2 && coordinate <= (maxValue + cur) / 2) {
          index = unsortedTicks[i].index;
          break;
        }
      }
    }
  } else {
    // ticks are distributed in a single direction
    for (var _i = 0; _i < len; _i++) {
      if (_i === 0 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i > 0 && _i < len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i === len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2) {
        index = ticks[_i].index;
        break;
      }
    }
  }
  return index;
};

/**
 * Get the main color of each graphic item
 * @param  {ReactElement} item A graphic item
 * @return {String}            Color
 */
var getMainColorOfGraphicItem = function getMainColorOfGraphicItem(item) {
  var _item$type;
  var _ref = item,
    displayName = _ref.type.displayName; // TODO: check if displayName is valid.
  var defaultedProps = (_item$type = item.type) !== null && _item$type !== void 0 && _item$type.defaultProps ? _objectSpread$n(_objectSpread$n({}, item.type.defaultProps), item.props) : item.props;
  var stroke = defaultedProps.stroke,
    fill = defaultedProps.fill;
  var result;
  switch (displayName) {
    case 'Line':
      result = stroke;
      break;
    case 'Area':
    case 'Radar':
      result = stroke && stroke !== 'none' ? stroke : fill;
      break;
    default:
      result = fill;
      break;
  }
  return result;
};
/**
 * Calculate the size of all groups for stacked bar graph
 * @param  {Object} stackGroups The items grouped by axisId and stackId
 * @return {Object} The size of all groups
 */
var getBarSizeList = function getBarSizeList(_ref2) {
  var globalSize = _ref2.barSize,
    totalSize = _ref2.totalSize,
    _ref2$stackGroups = _ref2.stackGroups,
    stackGroups = _ref2$stackGroups === void 0 ? {} : _ref2$stackGroups;
  if (!stackGroups) {
    return {};
  }
  var result = {};
  var numericAxisIds = Object.keys(stackGroups);
  for (var i = 0, len = numericAxisIds.length; i < len; i++) {
    var sgs = stackGroups[numericAxisIds[i]].stackGroups;
    var stackIds = Object.keys(sgs);
    for (var j = 0, sLen = stackIds.length; j < sLen; j++) {
      var _sgs$stackIds$j = sgs[stackIds[j]],
        items = _sgs$stackIds$j.items,
        cateAxisId = _sgs$stackIds$j.cateAxisId;
      var barItems = items.filter(function (item) {
        return getDisplayName(item.type).indexOf('Bar') >= 0;
      });
      if (barItems && barItems.length) {
        var barItemDefaultProps = barItems[0].type.defaultProps;
        var barItemProps = barItemDefaultProps !== undefined ? _objectSpread$n(_objectSpread$n({}, barItemDefaultProps), barItems[0].props) : barItems[0].props;
        var selfSize = barItemProps.barSize;
        var cateId = barItemProps[cateAxisId];
        if (!result[cateId]) {
          result[cateId] = [];
        }
        var barSize = isNil$1(selfSize) ? globalSize : selfSize;
        result[cateId].push({
          item: barItems[0],
          stackList: barItems.slice(1),
          barSize: isNil$1(barSize) ? undefined : getPercentValue(barSize, totalSize, 0)
        });
      }
    }
  }
  return result;
};
/**
 * Calculate the size of each bar and offset between start of band and the bar
 *
 * @param  {number} bandSize is the size of area where bars can render
 * @param  {number | string} barGap is the gap size, as a percentage of `bandSize`.
 *                                  Can be defined as number or percent string
 * @param  {number | string} barCategoryGap is the gap size, as a percentage of `bandSize`.
 *                                  Can be defined as number or percent string
 * @param  {Array<object>} sizeList Sizes of all groups
 * @param  {number} maxBarSize The maximum size of each bar
 * @return {Array<object>} The size and offset of each bar
 */
var getBarPosition = function getBarPosition(_ref3) {
  var barGap = _ref3.barGap,
    barCategoryGap = _ref3.barCategoryGap,
    bandSize = _ref3.bandSize,
    _ref3$sizeList = _ref3.sizeList,
    sizeList = _ref3$sizeList === void 0 ? [] : _ref3$sizeList,
    maxBarSize = _ref3.maxBarSize;
  var len = sizeList.length;
  if (len < 1) return null;
  var realBarGap = getPercentValue(barGap, bandSize, 0, true);
  var result;
  var initialValue = [];

  // whether or not is barSize setted by user
  if (sizeList[0].barSize === +sizeList[0].barSize) {
    var useFull = false;
    var fullBarSize = bandSize / len;
    // @ts-expect-error the type check above does not check for type number explicitly
    var sum = sizeList.reduce(function (res, entry) {
      return res + entry.barSize || 0;
    }, 0);
    sum += (len - 1) * realBarGap;
    if (sum >= bandSize) {
      sum -= (len - 1) * realBarGap;
      realBarGap = 0;
    }
    if (sum >= bandSize && fullBarSize > 0) {
      useFull = true;
      fullBarSize *= 0.9;
      sum = len * fullBarSize;
    }
    var offset = (bandSize - sum) / 2 >> 0;
    var prev = {
      offset: offset - realBarGap,
      size: 0
    };
    result = sizeList.reduce(function (res, entry) {
      var newPosition = {
        item: entry.item,
        position: {
          offset: prev.offset + prev.size + realBarGap,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: useFull ? fullBarSize : entry.barSize
        }
      };
      var newRes = [].concat(_toConsumableArray$8(res), [newPosition]);
      prev = newRes[newRes.length - 1].position;
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach(function (item) {
          newRes.push({
            item: item,
            position: prev
          });
        });
      }
      return newRes;
    }, initialValue);
  } else {
    var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize >>= 0;
    }
    var size = maxBarSize === +maxBarSize ? Math.min(originalSize, maxBarSize) : originalSize;
    result = sizeList.reduce(function (res, entry, i) {
      var newRes = [].concat(_toConsumableArray$8(res), [{
        item: entry.item,
        position: {
          offset: _offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
          size: size
        }
      }]);
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach(function (item) {
          newRes.push({
            item: item,
            position: newRes[newRes.length - 1].position
          });
        });
      }
      return newRes;
    }, initialValue);
  }
  return result;
};
var appendOffsetOfLegend = function appendOffsetOfLegend(offset, _unused, props, legendBox) {
  var children = props.children,
    width = props.width,
    margin = props.margin;
  var legendWidth = width - (margin.left || 0) - (margin.right || 0);
  var legendProps = getLegendProps({
    children: children,
    legendWidth: legendWidth
  });
  if (legendProps) {
    var _ref4 = legendBox || {},
      boxWidth = _ref4.width,
      boxHeight = _ref4.height;
    var align = legendProps.align,
      verticalAlign = legendProps.verticalAlign,
      layout = legendProps.layout;
    if ((layout === 'vertical' || layout === 'horizontal' && verticalAlign === 'middle') && align !== 'center' && isNumber(offset[align])) {
      return _objectSpread$n(_objectSpread$n({}, offset), {}, _defineProperty$o({}, align, offset[align] + (boxWidth || 0)));
    }
    if ((layout === 'horizontal' || layout === 'vertical' && align === 'center') && verticalAlign !== 'middle' && isNumber(offset[verticalAlign])) {
      return _objectSpread$n(_objectSpread$n({}, offset), {}, _defineProperty$o({}, verticalAlign, offset[verticalAlign] + (boxHeight || 0)));
    }
  }
  return offset;
};
var isErrorBarRelevantForAxis = function isErrorBarRelevantForAxis(layout, axisType, direction) {
  if (isNil$1(axisType)) {
    return true;
  }
  if (layout === 'horizontal') {
    return axisType === 'yAxis';
  }
  if (layout === 'vertical') {
    return axisType === 'xAxis';
  }
  if (direction === 'x') {
    return axisType === 'xAxis';
  }
  if (direction === 'y') {
    return axisType === 'yAxis';
  }
  return true;
};
var getDomainOfErrorBars = function getDomainOfErrorBars(data, item, dataKey, layout, axisType) {
  var children = item.props.children;
  var errorBars = findAllByType(children, ErrorBar).filter(function (errorBarChild) {
    return isErrorBarRelevantForAxis(layout, axisType, errorBarChild.props.direction);
  });
  if (errorBars && errorBars.length) {
    var keys = errorBars.map(function (errorBarChild) {
      return errorBarChild.props.dataKey;
    });
    return data.reduce(function (result, entry) {
      var entryValue = getValueByDataKey(entry, dataKey);
      if (isNil$1(entryValue)) return result;
      var mainValue = Array.isArray(entryValue) ? [min$1(entryValue), max$1(entryValue)] : [entryValue, entryValue];
      var errorDomain = keys.reduce(function (prevErrorArr, k) {
        var errorValue = getValueByDataKey(entry, k, 0);
        var lowerValue = mainValue[0] - Math.abs(Array.isArray(errorValue) ? errorValue[0] : errorValue);
        var upperValue = mainValue[1] + Math.abs(Array.isArray(errorValue) ? errorValue[1] : errorValue);
        return [Math.min(lowerValue, prevErrorArr[0]), Math.max(upperValue, prevErrorArr[1])];
      }, [Infinity, -Infinity]);
      return [Math.min(errorDomain[0], result[0]), Math.max(errorDomain[1], result[1])];
    }, [Infinity, -Infinity]);
  }
  return null;
};
var parseErrorBarsOfAxis = function parseErrorBarsOfAxis(data, items, dataKey, axisType, layout) {
  var domains = items.map(function (item) {
    return getDomainOfErrorBars(data, item, dataKey, layout, axisType);
  }).filter(function (entry) {
    return !isNil$1(entry);
  });
  if (domains && domains.length) {
    return domains.reduce(function (result, entry) {
      return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
    }, [Infinity, -Infinity]);
  }
  return null;
};

/**
 * Get domain of data by the configuration of item element
 * @param  {Array}   data      The data displayed in the chart
 * @param  {Array}   items     The instances of item
 * @param  {String}  type      The type of axis, number - Number Axis, category - Category Axis
 * @param  {LayoutType} layout The type of layout
 * @param  {Boolean} filterNil Whether or not filter nil values
 * @return {Array}        Domain
 */
var getDomainOfItemsWithSameAxis = function getDomainOfItemsWithSameAxis(data, items, type, layout, filterNil) {
  var domains = items.map(function (item) {
    var dataKey = item.props.dataKey;
    if (type === 'number' && dataKey) {
      return getDomainOfErrorBars(data, item, dataKey, layout) || getDomainOfDataByKey(data, dataKey, type, filterNil);
    }
    return getDomainOfDataByKey(data, dataKey, type, filterNil);
  });
  if (type === 'number') {
    // Calculate the domain of number axis
    return domains.reduce(
    // @ts-expect-error if (type === number) means that the domain is numerical type
    // - but this link is missing in the type definition
    function (result, entry) {
      return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
    }, [Infinity, -Infinity]);
  }
  var tag = {};
  // Get the union set of category axis
  return domains.reduce(function (result, entry) {
    for (var i = 0, len = entry.length; i < len; i++) {
      // @ts-expect-error Date cannot index an object
      if (!tag[entry[i]]) {
        // @ts-expect-error Date cannot index an object
        tag[entry[i]] = true;

        // @ts-expect-error Date cannot index an object
        result.push(entry[i]);
      }
    }
    return result;
  }, []);
};
var isCategoricalAxis = function isCategoricalAxis(layout, axisType) {
  return layout === 'horizontal' && axisType === 'xAxis' || layout === 'vertical' && axisType === 'yAxis' || layout === 'centric' && axisType === 'angleAxis' || layout === 'radial' && axisType === 'radiusAxis';
};

/**
 * Get the ticks of an axis
 * @param  {Object}  axis The configuration of an axis
 * @param {Boolean} isGrid Whether or not are the ticks in grid
 * @param {Boolean} isAll Return the ticks of all the points or not
 * @return {Array}  Ticks
 */
var getTicksOfAxis = function getTicksOfAxis(axis, isGrid, isAll) {
  if (!axis) return null;
  var scale = axis.scale;
  var duplicateDomain = axis.duplicateDomain,
    type = axis.type,
    range = axis.range;
  var offsetForBand = axis.realScaleType === 'scaleBand' ? scale.bandwidth() / 2 : 2;
  var offset = (isGrid || isAll) && type === 'category' && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axis.axisType === 'angleAxis' && (range === null || range === void 0 ? void 0 : range.length) >= 2 ? mathSign(range[0] - range[1]) * 2 * offset : offset;

  // The ticks set by user should only affect the ticks adjacent to axis line
  if (isGrid && (axis.ticks || axis.niceTicks)) {
    var result = (axis.ticks || axis.niceTicks).map(function (entry) {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scale(scaleContent) + offset,
        value: entry,
        offset: offset
      };
    });
    return result.filter(function (row) {
      return !isNan(row.coordinate);
    });
  }

  // When axis is a categorial axis, but the type of axis is number or the scale of axis is not "auto"
  if (axis.isCategorical && axis.categoricalDomain) {
    return axis.categoricalDomain.map(function (entry, index) {
      return {
        coordinate: scale(entry) + offset,
        value: entry,
        index: index,
        offset: offset
      };
    });
  }
  if (scale.ticks && !isAll) {
    return scale.ticks(axis.tickCount).map(function (entry) {
      return {
        coordinate: scale(entry) + offset,
        value: entry,
        offset: offset
      };
    });
  }

  // When axis has duplicated text, serial numbers are used to generate scale
  return scale.domain().map(function (entry, index) {
    return {
      coordinate: scale(entry) + offset,
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index: index,
      offset: offset
    };
  });
};

/**
 * combine the handlers
 * @param  {Function} defaultHandler Internal private handler
 * @param  {Function} childHandler Handler function specified in child component
 * @return {Function}                The combined handler
 */

var handlerWeakMap = new WeakMap();
var combineEventHandlers = function combineEventHandlers(defaultHandler, childHandler) {
  if (typeof childHandler !== 'function') {
    return defaultHandler;
  }
  if (!handlerWeakMap.has(defaultHandler)) {
    handlerWeakMap.set(defaultHandler, new WeakMap());
  }
  var childWeakMap = handlerWeakMap.get(defaultHandler);
  if (childWeakMap.has(childHandler)) {
    return childWeakMap.get(childHandler);
  }
  var combineHandler = function combineHandler() {
    defaultHandler.apply(void 0, arguments);
    childHandler.apply(void 0, arguments);
  };
  childWeakMap.set(childHandler, combineHandler);
  return combineHandler;
};

/**
 * Parse the scale function of axis
 * @param  {Object}   axis          The option of axis
 * @param  {String}   chartType     The displayName of chart
 * @param  {Boolean}  hasBar        if it has a bar
 * @return {object}               The scale function and resolved name
 */
var parseScale = function parseScale(axis, chartType, hasBar) {
  var scale = axis.scale,
    type = axis.type,
    layout = axis.layout,
    axisType = axis.axisType;
  if (scale === 'auto') {
    if (layout === 'radial' && axisType === 'radiusAxis') {
      return {
        scale: band(),
        realScaleType: 'band'
      };
    }
    if (layout === 'radial' && axisType === 'angleAxis') {
      return {
        scale: linear(),
        realScaleType: 'linear'
      };
    }
    if (type === 'category' && chartType && (chartType.indexOf('LineChart') >= 0 || chartType.indexOf('AreaChart') >= 0 || chartType.indexOf('ComposedChart') >= 0 && true)) {
      return {
        scale: point(),
        realScaleType: 'point'
      };
    }
    if (type === 'category') {
      return {
        scale: band(),
        realScaleType: 'band'
      };
    }
    return {
      scale: linear(),
      realScaleType: 'linear'
    };
  }
  if (isString$1(scale)) {
    var name = "scale".concat(upperFirst$1(scale));
    return {
      scale: (d3Scales[name] || point)(),
      realScaleType: d3Scales[name] ? name : 'point'
    };
  }
  return isFunction$3(scale) ? {
    scale: scale
  } : {
    scale: point(),
    realScaleType: 'point'
  };
};
var EPS = 1e-4;
var checkDomainOfScale = function checkDomainOfScale(scale) {
  var domain = scale.domain();
  if (!domain || domain.length <= 2) {
    return;
  }
  var len = domain.length;
  var range = scale.range();
  var minValue = Math.min(range[0], range[1]) - EPS;
  var maxValue = Math.max(range[0], range[1]) + EPS;
  var first = scale(domain[0]);
  var last = scale(domain[len - 1]);
  if (first < minValue || first > maxValue || last < minValue || last > maxValue) {
    scale.domain([domain[0], domain[len - 1]]);
  }
};

/**
 * Stacks all positive numbers above zero and all negative numbers below zero.
 *
 * If all values in the series are positive then this behaves the same as 'none' stacker.
 *
 * @param {Array} series from d3-shape Stack
 * @return {Array} series with applied offset
 */
var offsetSign = function offsetSign(series) {
  var n = series.length;
  if (n <= 0) {
    return;
  }
  for (var j = 0, m = series[0].length; j < m; ++j) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < n; ++i) {
      var value = isNan(series[i][j][1]) ? series[i][j][0] : series[i][j][1];

      /* eslint-disable prefer-destructuring, no-param-reassign */
      if (value >= 0) {
        series[i][j][0] = positive;
        series[i][j][1] = positive + value;
        positive = series[i][j][1];
      } else {
        series[i][j][0] = negative;
        series[i][j][1] = negative + value;
        negative = series[i][j][1];
      }
      /* eslint-enable prefer-destructuring, no-param-reassign */
    }
  }
};

/**
 * Replaces all negative values with zero when stacking data.
 *
 * If all values in the series are positive then this behaves the same as 'none' stacker.
 *
 * @param {Array} series from d3-shape Stack
 * @return {Array} series with applied offset
 */
var offsetPositive = function offsetPositive(series) {
  var n = series.length;
  if (n <= 0) {
    return;
  }
  for (var j = 0, m = series[0].length; j < m; ++j) {
    var positive = 0;
    for (var i = 0; i < n; ++i) {
      var value = isNan(series[i][j][1]) ? series[i][j][0] : series[i][j][1];

      /* eslint-disable prefer-destructuring, no-param-reassign */
      if (value >= 0) {
        series[i][j][0] = positive;
        series[i][j][1] = positive + value;
        positive = series[i][j][1];
      } else {
        series[i][j][0] = 0;
        series[i][j][1] = 0;
      }
      /* eslint-enable prefer-destructuring, no-param-reassign */
    }
  }
};

/**
 * Function type to compute offset for stacked data.
 *
 * d3-shape has something fishy going on with its types.
 * In @definitelytyped/d3-shape, this function (the offset accessor) is typed as Series<> => void.
 * However! When I actually open the storybook I can see that the offset accessor actually receives Array<Series<>>.
 * The same I can see in the source code itself:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/66042
 * That one unfortunately has no types but we can tell it passes three-dimensional array.
 *
 * Which leads me to believe that definitelytyped is wrong on this one.
 * There's open discussion on this topic without much attention:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/66042
 */

var STACK_OFFSET_MAP = {
  sign: offsetSign,
  // @ts-expect-error definitelytyped types are incorrect
  expand: stackOffsetExpand,
  // @ts-expect-error definitelytyped types are incorrect
  none: stackOffsetNone,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: stackOffsetSilhouette,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: stackOffsetWiggle,
  positive: offsetPositive
};
var getStackedData = function getStackedData(data, stackItems, offsetType) {
  var dataKeys = stackItems.map(function (item) {
    return item.props.dataKey;
  });
  var offsetAccessor = STACK_OFFSET_MAP[offsetType];
  var stack = shapeStack()
  // @ts-expect-error stack.keys type wants an array of strings, but we provide array of DataKeys
  .keys(dataKeys).value(function (d, key) {
    return +getValueByDataKey(d, key, 0);
  }).order(stackOrderNone)
  // @ts-expect-error definitelytyped types are incorrect
  .offset(offsetAccessor);
  return stack(data);
};
var getStackGroupsByAxisId = function getStackGroupsByAxisId(data, _items, numericAxisId, cateAxisId, offsetType, reverseStackOrder) {
  if (!data) {
    return null;
  }

  // reversing items to affect render order (for layering)
  var items = reverseStackOrder ? _items.reverse() : _items;
  var parentStackGroupsInitialValue = {};
  var stackGroups = items.reduce(function (result, item) {
    var _item$type2;
    var defaultedProps = (_item$type2 = item.type) !== null && _item$type2 !== void 0 && _item$type2.defaultProps ? _objectSpread$n(_objectSpread$n({}, item.type.defaultProps), item.props) : item.props;
    var stackId = defaultedProps.stackId,
      hide = defaultedProps.hide;
    if (hide) {
      return result;
    }
    var axisId = defaultedProps[numericAxisId];
    var parentGroup = result[axisId] || {
      hasStack: false,
      stackGroups: {}
    };
    if (isNumOrStr(stackId)) {
      var childGroup = parentGroup.stackGroups[stackId] || {
        numericAxisId: numericAxisId,
        cateAxisId: cateAxisId,
        items: []
      };
      childGroup.items.push(item);
      parentGroup.hasStack = true;
      parentGroup.stackGroups[stackId] = childGroup;
    } else {
      parentGroup.stackGroups[uniqueId('_stackId_')] = {
        numericAxisId: numericAxisId,
        cateAxisId: cateAxisId,
        items: [item]
      };
    }
    return _objectSpread$n(_objectSpread$n({}, result), {}, _defineProperty$o({}, axisId, parentGroup));
  }, parentStackGroupsInitialValue);
  var axisStackGroupsInitialValue = {};
  return Object.keys(stackGroups).reduce(function (result, axisId) {
    var group = stackGroups[axisId];
    if (group.hasStack) {
      var stackGroupsInitialValue = {};
      group.stackGroups = Object.keys(group.stackGroups).reduce(function (res, stackId) {
        var g = group.stackGroups[stackId];
        return _objectSpread$n(_objectSpread$n({}, res), {}, _defineProperty$o({}, stackId, {
          numericAxisId: numericAxisId,
          cateAxisId: cateAxisId,
          items: g.items,
          stackedData: getStackedData(data, g.items, offsetType)
        }));
      }, stackGroupsInitialValue);
    }
    return _objectSpread$n(_objectSpread$n({}, result), {}, _defineProperty$o({}, axisId, group));
  }, axisStackGroupsInitialValue);
};

/**
 * Configure the scale function of axis
 * @param {Object} scale The scale function
 * @param {Object} opts  The configuration of axis
 * @return {Object}      null
 */
var getTicksOfScale = function getTicksOfScale(scale, opts) {
  var realScaleType = opts.realScaleType,
    type = opts.type,
    tickCount = opts.tickCount,
    originalDomain = opts.originalDomain,
    allowDecimals = opts.allowDecimals;
  var scaleType = realScaleType || opts.scale;
  if (scaleType !== 'auto' && scaleType !== 'linear') {
    return null;
  }
  if (tickCount && type === 'number' && originalDomain && (originalDomain[0] === 'auto' || originalDomain[1] === 'auto')) {
    // Calculate the ticks by the number of grid when the axis is a number axis
    var domain = scale.domain();
    if (!domain.length) {
      return null;
    }
    var tickValues = getNiceTickValues(domain, tickCount, allowDecimals);
    scale.domain([min$1(tickValues), max$1(tickValues)]);
    return {
      niceTicks: tickValues
    };
  }
  if (tickCount && type === 'number') {
    var _domain = scale.domain();
    var _tickValues = getTickValuesFixedDomain(_domain, tickCount, allowDecimals);
    return {
      niceTicks: _tickValues
    };
  }
  return null;
};
var getStackedDataOfItem = function getStackedDataOfItem(item, stackGroups) {
  var _item$type3;
  var defaultedProps = (_item$type3 = item.type) !== null && _item$type3 !== void 0 && _item$type3.defaultProps ? _objectSpread$n(_objectSpread$n({}, item.type.defaultProps), item.props) : item.props;
  var stackId = defaultedProps.stackId;
  if (isNumOrStr(stackId)) {
    var group = stackGroups[stackId];
    if (group) {
      var itemIndex = group.items.indexOf(item);
      return itemIndex >= 0 ? group.stackedData[itemIndex] : null;
    }
  }
  return null;
};
var getDomainOfSingle = function getDomainOfSingle(data) {
  return data.reduce(function (result, entry) {
    return [min$1(entry.concat([result[0]]).filter(isNumber)), max$1(entry.concat([result[1]]).filter(isNumber))];
  }, [Infinity, -Infinity]);
};
var getDomainOfStackGroups = function getDomainOfStackGroups(stackGroups, startIndex, endIndex) {
  return Object.keys(stackGroups).reduce(function (result, stackId) {
    var group = stackGroups[stackId];
    var stackedData = group.stackedData;
    var domain = stackedData.reduce(function (res, entry) {
      var s = getDomainOfSingle(entry.slice(startIndex, endIndex + 1));
      return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
    }, [Infinity, -Infinity]);
    return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
  }, [Infinity, -Infinity]).map(function (result) {
    return result === Infinity || result === -Infinity ? 0 : result;
  });
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var parseSpecifiedDomain = function parseSpecifiedDomain(specifiedDomain, dataDomain, allowDataOverflow) {
  if (isFunction$3(specifiedDomain)) {
    return specifiedDomain(dataDomain, allowDataOverflow);
  }
  if (!Array.isArray(specifiedDomain)) {
    return dataDomain;
  }
  var domain = [];

  /* eslint-disable prefer-destructuring */
  if (isNumber(specifiedDomain[0])) {
    domain[0] = allowDataOverflow ? specifiedDomain[0] : Math.min(specifiedDomain[0], dataDomain[0]);
  } else if (MIN_VALUE_REG.test(specifiedDomain[0])) {
    var value = +MIN_VALUE_REG.exec(specifiedDomain[0])[1];
    domain[0] = dataDomain[0] - value;
  } else if (isFunction$3(specifiedDomain[0])) {
    domain[0] = specifiedDomain[0](dataDomain[0]);
  } else {
    domain[0] = dataDomain[0];
  }
  if (isNumber(specifiedDomain[1])) {
    domain[1] = allowDataOverflow ? specifiedDomain[1] : Math.max(specifiedDomain[1], dataDomain[1]);
  } else if (MAX_VALUE_REG.test(specifiedDomain[1])) {
    var _value = +MAX_VALUE_REG.exec(specifiedDomain[1])[1];
    domain[1] = dataDomain[1] + _value;
  } else if (isFunction$3(specifiedDomain[1])) {
    domain[1] = specifiedDomain[1](dataDomain[1]);
  } else {
    domain[1] = dataDomain[1];
  }
  /* eslint-enable prefer-destructuring */

  return domain;
};

/**
 * Calculate the size between two category
 * @param  {Object} axis  The options of axis
 * @param  {Array}  ticks The ticks of axis
 * @param  {Boolean} isBar if items in axis are bars
 * @return {Number} Size
 */
var getBandSizeOfAxis = function getBandSizeOfAxis(axis, ticks, isBar) {
  // @ts-expect-error we need to rethink scale type
  if (axis && axis.scale && axis.scale.bandwidth) {
    // @ts-expect-error we need to rethink scale type
    var bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks && ticks.length >= 2) {
    var orderedTicks = sortBy$1(ticks, function (o) {
      return o.coordinate;
    });
    var bandSize = Infinity;
    for (var i = 1, len = orderedTicks.length; i < len; i++) {
      var cur = orderedTicks[i];
      var prev = orderedTicks[i - 1];
      bandSize = Math.min((cur.coordinate || 0) - (prev.coordinate || 0), bandSize);
    }
    return bandSize === Infinity ? 0 : bandSize;
  }
  return isBar ? undefined : 0;
};
/**
 * parse the domain of a category axis when a domain is specified
 * @param   {Array}        specifiedDomain  The domain specified by users
 * @param   {Array}        calculatedDomain The domain calculated by dateKey
 * @param   {ReactElement} axisChild        The axis ReactElement
 * @returns {Array}        domains
 */
var parseDomainOfCategoryAxis = function parseDomainOfCategoryAxis(specifiedDomain, calculatedDomain, axisChild) {
  if (!specifiedDomain || !specifiedDomain.length) {
    return calculatedDomain;
  }
  if (isEqual$1(specifiedDomain, get$2(axisChild, 'type.defaultProps.domain'))) {
    return calculatedDomain;
  }
  return specifiedDomain;
};
var getTooltipItem = function getTooltipItem(graphicalItem, payload) {
  var defaultedProps = graphicalItem.type.defaultProps ? _objectSpread$n(_objectSpread$n({}, graphicalItem.type.defaultProps), graphicalItem.props) : graphicalItem.props;
  var dataKey = defaultedProps.dataKey,
    name = defaultedProps.name,
    unit = defaultedProps.unit,
    formatter = defaultedProps.formatter,
    tooltipType = defaultedProps.tooltipType,
    chartType = defaultedProps.chartType,
    hide = defaultedProps.hide;
  return _objectSpread$n(_objectSpread$n({}, filterProps(graphicalItem, false)), {}, {
    dataKey: dataKey,
    unit: unit,
    formatter: formatter,
    name: name || dataKey,
    color: getMainColorOfGraphicItem(graphicalItem),
    value: getValueByDataKey(payload, dataKey),
    type: tooltipType,
    payload: payload,
    chartType: chartType,
    hide: hide
  });
};

function _typeof$o(o) { "@babel/helpers - typeof"; return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$o(o); }
function ownKeys$m(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$m(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$m(Object(t), true).forEach(function (r) { _defineProperty$n(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$m(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$n(obj, key, value) { key = _toPropertyKey$n(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$n(t) { var i = _toPrimitive$n(t, "string"); return "symbol" == _typeof$o(i) ? i : i + ""; }
function _toPrimitive$n(t, r) { if ("object" != _typeof$o(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$o(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray$6(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }
function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
const {isValidElement: isValidElement$4} = await importShared('react');
var RADIAN$1 = Math.PI / 180;
var radianToDegree = function radianToDegree(angleInRadian) {
  return angleInRadian * 180 / Math.PI;
};
var polarToCartesian = function polarToCartesian(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(-RADIAN$1 * angle) * radius,
    y: cy + Math.sin(-RADIAN$1 * angle) * radius
  };
};
var getMaxRadius = function getMaxRadius(width, height) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};

/**
 * Calculate the scale function, position, width, height of axes
 * @param  {Object} props     Latest props
 * @param  {Object} axisMap   The configuration of axes
 * @param  {Object} offset    The offset of main part in the svg element
 * @param  {Object} axisType  The type of axes, radius-axis or angle-axis
 * @param  {String} chartName The name of chart
 * @return {Object} Configuration
 */
var formatAxisMap = function formatAxisMap(props, axisMap, offset, axisType, chartName) {
  var width = props.width,
    height = props.height;
  var startAngle = props.startAngle,
    endAngle = props.endAngle;
  var cx = getPercentValue(props.cx, width, width / 2);
  var cy = getPercentValue(props.cy, height, height / 2);
  var maxRadius = getMaxRadius(width, height, offset);
  var innerRadius = getPercentValue(props.innerRadius, maxRadius, 0);
  var outerRadius = getPercentValue(props.outerRadius, maxRadius, maxRadius * 0.8);
  var ids = Object.keys(axisMap);
  return ids.reduce(function (result, id) {
    var axis = axisMap[id];
    var domain = axis.domain,
      reversed = axis.reversed;
    var range;
    if (isNil$1(axis.range)) {
      if (axisType === 'angleAxis') {
        range = [startAngle, endAngle];
      } else if (axisType === 'radiusAxis') {
        range = [innerRadius, outerRadius];
      }
      if (reversed) {
        range = [range[1], range[0]];
      }
    } else {
      range = axis.range;
      var _range = range;
      var _range2 = _slicedToArray$6(_range, 2);
      startAngle = _range2[0];
      endAngle = _range2[1];
    }
    var _parseScale = parseScale(axis, chartName),
      realScaleType = _parseScale.realScaleType,
      scale = _parseScale.scale;
    scale.domain(domain).range(range);
    checkDomainOfScale(scale);
    var ticks = getTicksOfScale(scale, _objectSpread$m(_objectSpread$m({}, axis), {}, {
      realScaleType: realScaleType
    }));
    var finalAxis = _objectSpread$m(_objectSpread$m(_objectSpread$m({}, axis), ticks), {}, {
      range: range,
      radius: outerRadius,
      realScaleType: realScaleType,
      scale: scale,
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    });
    return _objectSpread$m(_objectSpread$m({}, result), {}, _defineProperty$n({}, id, finalAxis));
  }, {});
};
var distanceBetweenPoints = function distanceBetweenPoints(point, anotherPoint) {
  var x1 = point.x,
    y1 = point.y;
  var x2 = anotherPoint.x,
    y2 = anotherPoint.y;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
var getAngleOfPoint = function getAngleOfPoint(_ref, _ref2) {
  var x = _ref.x,
    y = _ref.y;
  var cx = _ref2.cx,
    cy = _ref2.cy;
  var radius = distanceBetweenPoints({
    x: x,
    y: y
  }, {
    x: cx,
    y: cy
  });
  if (radius <= 0) {
    return {
      radius: radius
    };
  }
  var cos = (x - cx) / radius;
  var angleInRadian = Math.acos(cos);
  if (y > cy) {
    angleInRadian = 2 * Math.PI - angleInRadian;
  }
  return {
    radius: radius,
    angle: radianToDegree(angleInRadian),
    angleInRadian: angleInRadian
  };
};
var formatAngleOfSector = function formatAngleOfSector(_ref3) {
  var startAngle = _ref3.startAngle,
    endAngle = _ref3.endAngle;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min = Math.min(startCnt, endCnt);
  return {
    startAngle: startAngle - min * 360,
    endAngle: endAngle - min * 360
  };
};
var reverseFormatAngleOfSetor = function reverseFormatAngleOfSetor(angle, _ref4) {
  var startAngle = _ref4.startAngle,
    endAngle = _ref4.endAngle;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min = Math.min(startCnt, endCnt);
  return angle + min * 360;
};
var inRangeOfSector = function inRangeOfSector(_ref5, sector) {
  var x = _ref5.x,
    y = _ref5.y;
  var _getAngleOfPoint = getAngleOfPoint({
      x: x,
      y: y
    }, sector),
    radius = _getAngleOfPoint.radius,
    angle = _getAngleOfPoint.angle;
  var innerRadius = sector.innerRadius,
    outerRadius = sector.outerRadius;
  if (radius < innerRadius || radius > outerRadius) {
    return false;
  }
  if (radius === 0) {
    return true;
  }
  var _formatAngleOfSector = formatAngleOfSector(sector),
    startAngle = _formatAngleOfSector.startAngle,
    endAngle = _formatAngleOfSector.endAngle;
  var formatAngle = angle;
  var inRange;
  if (startAngle <= endAngle) {
    while (formatAngle > endAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < startAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= startAngle && formatAngle <= endAngle;
  } else {
    while (formatAngle > startAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < endAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= endAngle && formatAngle <= startAngle;
  }
  if (inRange) {
    return _objectSpread$m(_objectSpread$m({}, sector), {}, {
      radius: radius,
      angle: reverseFormatAngleOfSetor(formatAngle, sector)
    });
  }
  return null;
};
var getTickClassName = function getTickClassName(tick) {
  return ! /*#__PURE__*/isValidElement$4(tick) && !isFunction$3(tick) && typeof tick !== 'boolean' ? tick.className : '';
};

function _typeof$n(o) { "@babel/helpers - typeof"; return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$n(o); }
var _excluded$7 = ["offset"];
function _toConsumableArray$7(arr) { return _arrayWithoutHoles$7(arr) || _iterableToArray$8(arr) || _unsupportedIterableToArray$b(arr) || _nonIterableSpread$7(); }
function _nonIterableSpread$7() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }
function _iterableToArray$8(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$7(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$b(arr); }
function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties$7(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$7(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$7(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function ownKeys$l(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$l(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$l(Object(t), true).forEach(function (r) { _defineProperty$m(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$l(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$m(obj, key, value) { key = _toPropertyKey$m(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$m(t) { var i = _toPrimitive$m(t, "string"); return "symbol" == _typeof$n(i) ? i : i + ""; }
function _toPrimitive$m(t, r) { if ("object" != _typeof$n(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$n(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends$g() { _extends$g = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }
const React$j = await importShared('react');
const {cloneElement: cloneElement$5,isValidElement: isValidElement$3,createElement: createElement$1} = React$j;
var getLabel = function getLabel(props) {
  var value = props.value,
    formatter = props.formatter;
  var label = isNil$1(props.children) ? value : props.children;
  if (isFunction$3(formatter)) {
    return formatter(label);
  }
  return label;
};
var getDeltaAngle$1 = function getDeltaAngle(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
var renderRadialLabel = function renderRadialLabel(labelProps, label, attrs) {
  var position = labelProps.position,
    viewBox = labelProps.viewBox,
    offset = labelProps.offset,
    className = labelProps.className;
  var _ref = viewBox,
    cx = _ref.cx,
    cy = _ref.cy,
    innerRadius = _ref.innerRadius,
    outerRadius = _ref.outerRadius,
    startAngle = _ref.startAngle,
    endAngle = _ref.endAngle,
    clockWise = _ref.clockWise;
  var radius = (innerRadius + outerRadius) / 2;
  var deltaAngle = getDeltaAngle$1(startAngle, endAngle);
  var sign = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;
  if (position === 'insideStart') {
    labelAngle = startAngle + sign * offset;
    direction = clockWise;
  } else if (position === 'insideEnd') {
    labelAngle = endAngle - sign * offset;
    direction = !clockWise;
  } else if (position === 'end') {
    labelAngle = endAngle + sign * offset;
    direction = clockWise;
  }
  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
  var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
  var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
  var id = isNil$1(labelProps.id) ? uniqueId('recharts-radial-line-') : labelProps.id;
  return /*#__PURE__*/React$j.createElement("text", _extends$g({}, attrs, {
    dominantBaseline: "central",
    className: clsx('recharts-radial-bar-label', className)
  }), /*#__PURE__*/React$j.createElement("defs", null, /*#__PURE__*/React$j.createElement("path", {
    id: id,
    d: path
  })), /*#__PURE__*/React$j.createElement("textPath", {
    xlinkHref: "#".concat(id)
  }, label));
};
var getAttrsOfPolarLabel = function getAttrsOfPolarLabel(props) {
  var viewBox = props.viewBox,
    offset = props.offset,
    position = props.position;
  var _ref2 = viewBox,
    cx = _ref2.cx,
    cy = _ref2.cy,
    innerRadius = _ref2.innerRadius,
    outerRadius = _ref2.outerRadius,
    startAngle = _ref2.startAngle,
    endAngle = _ref2.endAngle;
  var midAngle = (startAngle + endAngle) / 2;
  if (position === 'outside') {
    var _polarToCartesian = polarToCartesian(cx, cy, outerRadius + offset, midAngle),
      _x = _polarToCartesian.x,
      _y = _polarToCartesian.y;
    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? 'start' : 'end',
      verticalAnchor: 'middle'
    };
  }
  if (position === 'center') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'middle'
    };
  }
  if (position === 'centerTop') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'start'
    };
  }
  if (position === 'centerBottom') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'end'
    };
  }
  var r = (innerRadius + outerRadius) / 2;
  var _polarToCartesian2 = polarToCartesian(cx, cy, r, midAngle),
    x = _polarToCartesian2.x,
    y = _polarToCartesian2.y;
  return {
    x: x,
    y: y,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  };
};
var getAttrsOfCartesianLabel = function getAttrsOfCartesianLabel(props) {
  var viewBox = props.viewBox,
    parentViewBox = props.parentViewBox,
    offset = props.offset,
    position = props.position;
  var _ref3 = viewBox,
    x = _ref3.x,
    y = _ref3.y,
    width = _ref3.width,
    height = _ref3.height;

  // Define vertical offsets and position inverts based on the value being positive or negative
  var verticalSign = height >= 0 ? 1 : -1;
  var verticalOffset = verticalSign * offset;
  var verticalEnd = verticalSign > 0 ? 'end' : 'start';
  var verticalStart = verticalSign > 0 ? 'start' : 'end';

  // Define horizontal offsets and position inverts based on the value being positive or negative
  var horizontalSign = width >= 0 ? 1 : -1;
  var horizontalOffset = horizontalSign * offset;
  var horizontalEnd = horizontalSign > 0 ? 'end' : 'start';
  var horizontalStart = horizontalSign > 0 ? 'start' : 'end';
  if (position === 'top') {
    var attrs = {
      x: x + width / 2,
      y: y - verticalSign * offset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd
    };
    return _objectSpread$l(_objectSpread$l({}, attrs), parentViewBox ? {
      height: Math.max(y - parentViewBox.y, 0),
      width: width
    } : {});
  }
  if (position === 'bottom') {
    var _attrs = {
      x: x + width / 2,
      y: y + height + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart
    };
    return _objectSpread$l(_objectSpread$l({}, _attrs), parentViewBox ? {
      height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
      width: width
    } : {});
  }
  if (position === 'left') {
    var _attrs2 = {
      x: x - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle'
    };
    return _objectSpread$l(_objectSpread$l({}, _attrs2), parentViewBox ? {
      width: Math.max(_attrs2.x - parentViewBox.x, 0),
      height: height
    } : {});
  }
  if (position === 'right') {
    var _attrs3 = {
      x: x + width + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle'
    };
    return _objectSpread$l(_objectSpread$l({}, _attrs3), parentViewBox ? {
      width: Math.max(parentViewBox.x + parentViewBox.width - _attrs3.x, 0),
      height: height
    } : {});
  }
  var sizeAttrs = parentViewBox ? {
    width: width,
    height: height
  } : {};
  if (position === 'insideLeft') {
    return _objectSpread$l({
      x: x + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle'
    }, sizeAttrs);
  }
  if (position === 'insideRight') {
    return _objectSpread$l({
      x: x + width - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle'
    }, sizeAttrs);
  }
  if (position === 'insideTop') {
    return _objectSpread$l({
      x: x + width / 2,
      y: y + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === 'insideBottom') {
    return _objectSpread$l({
      x: x + width / 2,
      y: y + height - verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === 'insideTopLeft') {
    return _objectSpread$l({
      x: x + horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === 'insideTopRight') {
    return _objectSpread$l({
      x: x + width - horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === 'insideBottomLeft') {
    return _objectSpread$l({
      x: x + horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === 'insideBottomRight') {
    return _objectSpread$l({
      x: x + width - horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (isObject$8(position) && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) {
    return _objectSpread$l({
      x: x + getPercentValue(position.x, width),
      y: y + getPercentValue(position.y, height),
      textAnchor: 'end',
      verticalAnchor: 'end'
    }, sizeAttrs);
  }
  return _objectSpread$l({
    x: x + width / 2,
    y: y + height / 2,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  }, sizeAttrs);
};
var isPolar = function isPolar(viewBox) {
  return 'cx' in viewBox && isNumber(viewBox.cx);
};
function Label(_ref4) {
  var _ref4$offset = _ref4.offset,
    offset = _ref4$offset === void 0 ? 5 : _ref4$offset,
    restProps = _objectWithoutProperties$7(_ref4, _excluded$7);
  var props = _objectSpread$l({
    offset: offset
  }, restProps);
  var viewBox = props.viewBox,
    position = props.position,
    value = props.value,
    children = props.children,
    content = props.content,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    textBreakAll = props.textBreakAll;
  if (!viewBox || isNil$1(value) && isNil$1(children) && ! /*#__PURE__*/isValidElement$3(content) && !isFunction$3(content)) {
    return null;
  }
  if ( /*#__PURE__*/isValidElement$3(content)) {
    return /*#__PURE__*/cloneElement$5(content, props);
  }
  var label;
  if (isFunction$3(content)) {
    label = /*#__PURE__*/createElement$1(content, props);
    if ( /*#__PURE__*/isValidElement$3(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  var isPolarLabel = isPolar(viewBox);
  var attrs = filterProps(props, true);
  if (isPolarLabel && (position === 'insideStart' || position === 'insideEnd' || position === 'end')) {
    return renderRadialLabel(props, label, attrs);
  }
  var positionAttrs = isPolarLabel ? getAttrsOfPolarLabel(props) : getAttrsOfCartesianLabel(props);
  return /*#__PURE__*/React$j.createElement(Text, _extends$g({
    className: clsx('recharts-label', className)
  }, attrs, positionAttrs, {
    breakAll: textBreakAll
  }), label);
}
Label.displayName = 'Label';
var parseViewBox = function parseViewBox(props) {
  var cx = props.cx,
    cy = props.cy,
    angle = props.angle,
    startAngle = props.startAngle,
    endAngle = props.endAngle,
    r = props.r,
    radius = props.radius,
    innerRadius = props.innerRadius,
    outerRadius = props.outerRadius,
    x = props.x,
    y = props.y,
    top = props.top,
    left = props.left,
    width = props.width,
    height = props.height,
    clockWise = props.clockWise,
    labelViewBox = props.labelViewBox;
  if (labelViewBox) {
    return labelViewBox;
  }
  if (isNumber(width) && isNumber(height)) {
    if (isNumber(x) && isNumber(y)) {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }
    if (isNumber(top) && isNumber(left)) {
      return {
        x: top,
        y: left,
        width: width,
        height: height
      };
    }
  }
  if (isNumber(x) && isNumber(y)) {
    return {
      x: x,
      y: y,
      width: 0,
      height: 0
    };
  }
  if (isNumber(cx) && isNumber(cy)) {
    return {
      cx: cx,
      cy: cy,
      startAngle: startAngle || angle || 0,
      endAngle: endAngle || angle || 0,
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || radius || r || 0,
      clockWise: clockWise
    };
  }
  if (props.viewBox) {
    return props.viewBox;
  }
  return {};
};
var parseLabel = function parseLabel(label, viewBox) {
  if (!label) {
    return null;
  }
  if (label === true) {
    return /*#__PURE__*/React$j.createElement(Label, {
      key: "label-implicit",
      viewBox: viewBox
    });
  }
  if (isNumOrStr(label)) {
    return /*#__PURE__*/React$j.createElement(Label, {
      key: "label-implicit",
      viewBox: viewBox,
      value: label
    });
  }
  if ( /*#__PURE__*/isValidElement$3(label)) {
    if (label.type === Label) {
      return /*#__PURE__*/cloneElement$5(label, {
        key: 'label-implicit',
        viewBox: viewBox
      });
    }
    return /*#__PURE__*/React$j.createElement(Label, {
      key: "label-implicit",
      content: label,
      viewBox: viewBox
    });
  }
  if (isFunction$3(label)) {
    return /*#__PURE__*/React$j.createElement(Label, {
      key: "label-implicit",
      content: label,
      viewBox: viewBox
    });
  }
  if (isObject$8(label)) {
    return /*#__PURE__*/React$j.createElement(Label, _extends$g({
      viewBox: viewBox
    }, label, {
      key: "label-implicit"
    }));
  }
  return null;
};
var renderCallByParent$1 = function renderCallByParent(parentProps, viewBox) {
  var checkPropsLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) {
    return null;
  }
  var children = parentProps.children;
  var parentViewBox = parseViewBox(parentProps);
  var explicitChildren = findAllByType(children, Label).map(function (child, index) {
    return /*#__PURE__*/cloneElement$5(child, {
      viewBox: viewBox || parentViewBox,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(index)
    });
  });
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  var implicitLabel = parseLabel(parentProps.label, viewBox || parentViewBox);
  return [implicitLabel].concat(_toConsumableArray$7(explicitChildren));
};
Label.parseViewBox = parseViewBox;
Label.renderCallByParent = renderCallByParent$1;

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */

function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var last_1 = last;

const last$1 = /*@__PURE__*/getDefaultExportFromCjs(last_1);

function _typeof$m(o) { "@babel/helpers - typeof"; return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$m(o); }
var _excluded$6 = ["valueAccessor"],
  _excluded2$2 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function _toConsumableArray$6(arr) { return _arrayWithoutHoles$6(arr) || _iterableToArray$7(arr) || _unsupportedIterableToArray$a(arr) || _nonIterableSpread$6(); }
function _nonIterableSpread$6() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _iterableToArray$7(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$6(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$a(arr); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends$f() { _extends$f = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }
function ownKeys$k(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$k(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$k(Object(t), true).forEach(function (r) { _defineProperty$l(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$k(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$l(obj, key, value) { key = _toPropertyKey$l(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$l(t) { var i = _toPrimitive$l(t, "string"); return "symbol" == _typeof$m(i) ? i : i + ""; }
function _toPrimitive$l(t, r) { if ("object" != _typeof$m(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$m(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$6(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$6(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$6(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
const React$i = await importShared('react');
const {cloneElement: cloneElement$4} = React$i;
var defaultAccessor = function defaultAccessor(entry) {
  return Array.isArray(entry.value) ? last$1(entry.value) : entry.value;
};
function LabelList(_ref) {
  var _ref$valueAccessor = _ref.valueAccessor,
    valueAccessor = _ref$valueAccessor === void 0 ? defaultAccessor : _ref$valueAccessor,
    restProps = _objectWithoutProperties$6(_ref, _excluded$6);
  var data = restProps.data,
    dataKey = restProps.dataKey,
    clockWise = restProps.clockWise,
    id = restProps.id,
    textBreakAll = restProps.textBreakAll,
    others = _objectWithoutProperties$6(restProps, _excluded2$2);
  if (!data || !data.length) {
    return null;
  }
  return /*#__PURE__*/React$i.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map(function (entry, index) {
    var value = isNil$1(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry && entry.payload, dataKey);
    var idProps = isNil$1(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return /*#__PURE__*/React$i.createElement(Label, _extends$f({}, filterProps(entry, true), others, idProps, {
      parentViewBox: entry.parentViewBox,
      value: value,
      textBreakAll: textBreakAll,
      viewBox: Label.parseViewBox(isNil$1(clockWise) ? entry : _objectSpread$k(_objectSpread$k({}, entry), {}, {
        clockWise: clockWise
      })),
      key: "label-".concat(index) // eslint-disable-line react/no-array-index-key
      ,
      index: index
    }));
  }));
}
LabelList.displayName = 'LabelList';
function parseLabelList(label, data) {
  if (!label) {
    return null;
  }
  if (label === true) {
    return /*#__PURE__*/React$i.createElement(LabelList, {
      key: "labelList-implicit",
      data: data
    });
  }
  if ( /*#__PURE__*/React$i.isValidElement(label) || isFunction$3(label)) {
    return /*#__PURE__*/React$i.createElement(LabelList, {
      key: "labelList-implicit",
      data: data,
      content: label
    });
  }
  if (isObject$8(label)) {
    return /*#__PURE__*/React$i.createElement(LabelList, _extends$f({
      data: data
    }, label, {
      key: "labelList-implicit"
    }));
  }
  return null;
}
function renderCallByParent(parentProps, data) {
  var checkPropsLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) {
    return null;
  }
  var children = parentProps.children;
  var explicitChildren = findAllByType(children, LabelList).map(function (child, index) {
    return /*#__PURE__*/cloneElement$4(child, {
      data: data,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(index)
    });
  });
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  var implicitLabelList = parseLabelList(parentProps.label, data);
  return [implicitLabelList].concat(_toConsumableArray$6(explicitChildren));
}
LabelList.renderCallByParent = renderCallByParent;

function _typeof$l(o) { "@babel/helpers - typeof"; return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$l(o); }
function _extends$e() { _extends$e = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }
function ownKeys$j(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$j(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$j(Object(t), true).forEach(function (r) { _defineProperty$k(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$j(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$k(obj, key, value) { key = _toPropertyKey$k(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$k(t) { var i = _toPrimitive$k(t, "string"); return "symbol" == _typeof$l(i) ? i : i + ""; }
function _toPrimitive$k(t, r) { if ("object" != _typeof$l(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$l(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview Sector
 */
const React$h = await importShared('react');
var getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
  return sign * deltaAngle;
};
var getTangentCircle = function getTangentCircle(_ref) {
  var cx = _ref.cx,
    cy = _ref.cy,
    radius = _ref.radius,
    angle = _ref.angle,
    sign = _ref.sign,
    isExternal = _ref.isExternal,
    cornerRadius = _ref.cornerRadius,
    cornerIsExternal = _ref.cornerIsExternal;
  var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
  var theta = Math.asin(cornerRadius / centerRadius) / RADIAN$1;
  var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
  var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
  // The coordinate of point which is tangent to the circle
  var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
  // The coordinate of point which is tangent to the radius line
  var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
  var lineTangency = polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN$1), lineTangencyAngle);
  return {
    center: center,
    circleTangency: circleTangency,
    lineTangency: lineTangency,
    theta: theta
  };
};
var getSectorPath = function getSectorPath(_ref2) {
  var cx = _ref2.cx,
    cy = _ref2.cy,
    innerRadius = _ref2.innerRadius,
    outerRadius = _ref2.outerRadius,
    startAngle = _ref2.startAngle,
    endAngle = _ref2.endAngle;
  var angle = getDeltaAngle(startAngle, endAngle);

  // When the angle of sector equals to 360, star point and end point coincide
  var tempEndAngle = startAngle + angle;
  var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
  var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
  var path = "M ".concat(outerStartPoint.x, ",").concat(outerStartPoint.y, "\n    A ").concat(outerRadius, ",").concat(outerRadius, ",0,\n    ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle > tempEndAngle), ",\n    ").concat(outerEndPoint.x, ",").concat(outerEndPoint.y, "\n  ");
  if (innerRadius > 0) {
    var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
    var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
    path += "L ".concat(innerEndPoint.x, ",").concat(innerEndPoint.y, "\n            A ").concat(innerRadius, ",").concat(innerRadius, ",0,\n            ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle <= tempEndAngle), ",\n            ").concat(innerStartPoint.x, ",").concat(innerStartPoint.y, " Z");
  } else {
    path += "L ".concat(cx, ",").concat(cy, " Z");
  }
  return path;
};
var getSectorWithCorner = function getSectorWithCorner(_ref3) {
  var cx = _ref3.cx,
    cy = _ref3.cy,
    innerRadius = _ref3.innerRadius,
    outerRadius = _ref3.outerRadius,
    cornerRadius = _ref3.cornerRadius,
    forceCornerRadius = _ref3.forceCornerRadius,
    cornerIsExternal = _ref3.cornerIsExternal,
    startAngle = _ref3.startAngle,
    endAngle = _ref3.endAngle;
  var sign = mathSign(endAngle - startAngle);
  var _getTangentCircle = getTangentCircle({
      cx: cx,
      cy: cy,
      radius: outerRadius,
      angle: startAngle,
      sign: sign,
      cornerRadius: cornerRadius,
      cornerIsExternal: cornerIsExternal
    }),
    soct = _getTangentCircle.circleTangency,
    solt = _getTangentCircle.lineTangency,
    sot = _getTangentCircle.theta;
  var _getTangentCircle2 = getTangentCircle({
      cx: cx,
      cy: cy,
      radius: outerRadius,
      angle: endAngle,
      sign: -sign,
      cornerRadius: cornerRadius,
      cornerIsExternal: cornerIsExternal
    }),
    eoct = _getTangentCircle2.circleTangency,
    eolt = _getTangentCircle2.lineTangency,
    eot = _getTangentCircle2.theta;
  var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return "M ".concat(solt.x, ",").concat(solt.y, "\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(cornerRadius * 2, ",0\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(-cornerRadius * 2, ",0\n      ");
    }
    return getSectorPath({
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    });
  }
  var path = "M ".concat(solt.x, ",").concat(solt.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(soct.x, ",").concat(soct.y, "\n    A").concat(outerRadius, ",").concat(outerRadius, ",0,").concat(+(outerArcAngle > 180), ",").concat(+(sign < 0), ",").concat(eoct.x, ",").concat(eoct.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(eolt.x, ",").concat(eolt.y, "\n  ");
  if (innerRadius > 0) {
    var _getTangentCircle3 = getTangentCircle({
        cx: cx,
        cy: cy,
        radius: innerRadius,
        angle: startAngle,
        sign: sign,
        isExternal: true,
        cornerRadius: cornerRadius,
        cornerIsExternal: cornerIsExternal
      }),
      sict = _getTangentCircle3.circleTangency,
      silt = _getTangentCircle3.lineTangency,
      sit = _getTangentCircle3.theta;
    var _getTangentCircle4 = getTangentCircle({
        cx: cx,
        cy: cy,
        radius: innerRadius,
        angle: endAngle,
        sign: -sign,
        isExternal: true,
        cornerRadius: cornerRadius,
        cornerIsExternal: cornerIsExternal
      }),
      eict = _getTangentCircle4.circleTangency,
      eilt = _getTangentCircle4.lineTangency,
      eit = _getTangentCircle4.theta;
    var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
    if (innerArcAngle < 0 && cornerRadius === 0) {
      return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
    }
    path += "L".concat(eilt.x, ",").concat(eilt.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(eict.x, ",").concat(eict.y, "\n      A").concat(innerRadius, ",").concat(innerRadius, ",0,").concat(+(innerArcAngle > 180), ",").concat(+(sign > 0), ",").concat(sict.x, ",").concat(sict.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(silt.x, ",").concat(silt.y, "Z");
  } else {
    path += "L".concat(cx, ",").concat(cy, "Z");
  }
  return path;
};
var defaultProps$2 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: false,
  cornerIsExternal: false
};
var Sector = function Sector(sectorProps) {
  var props = _objectSpread$j(_objectSpread$j({}, defaultProps$2), sectorProps);
  var cx = props.cx,
    cy = props.cy,
    innerRadius = props.innerRadius,
    outerRadius = props.outerRadius,
    cornerRadius = props.cornerRadius,
    forceCornerRadius = props.forceCornerRadius,
    cornerIsExternal = props.cornerIsExternal,
    startAngle = props.startAngle,
    endAngle = props.endAngle,
    className = props.className;
  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }
  var layerClass = clsx('recharts-sector', className);
  var deltaRadius = outerRadius - innerRadius;
  var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
  var path;
  if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
    path = getSectorWithCorner({
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius: forceCornerRadius,
      cornerIsExternal: cornerIsExternal,
      startAngle: startAngle,
      endAngle: endAngle
    });
  } else {
    path = getSectorPath({
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    });
  }
  return /*#__PURE__*/React$h.createElement("path", _extends$e({}, filterProps(props, true), {
    className: layerClass,
    d: path,
    role: "img"
  }));
};

function _typeof$k(o) { "@babel/helpers - typeof"; return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$k(o); }
function _extends$d() { _extends$d = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }
function ownKeys$i(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$i(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$i(Object(t), true).forEach(function (r) { _defineProperty$j(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$i(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$j(obj, key, value) { key = _toPropertyKey$j(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$j(t) { var i = _toPrimitive$j(t, "string"); return "symbol" == _typeof$k(i) ? i : i + ""; }
function _toPrimitive$j(t, r) { if ("object" != _typeof$k(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$k(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview Curve
 */
const React$g = await importShared('react');
var CURVE_FACTORIES = {
  curveBasisClosed: curveBasisClosed,
  curveBasisOpen: curveBasisOpen,
  curveBasis: curveBasis,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveLinearClosed: curveLinearClosed,
  curveLinear: curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural: curveNatural,
  curveStep: curveStep,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore
};
var defined = function defined(p) {
  return p.x === +p.x && p.y === +p.y;
};
var getX = function getX(p) {
  return p.x;
};
var getY = function getY(p) {
  return p.y;
};
var getCurveFactory = function getCurveFactory(type, layout) {
  if (isFunction$3(type)) {
    return type;
  }
  var name = "curve".concat(upperFirst$1(type));
  if ((name === 'curveMonotone' || name === 'curveBump') && layout) {
    return CURVE_FACTORIES["".concat(name).concat(layout === 'vertical' ? 'Y' : 'X')];
  }
  return CURVE_FACTORIES[name] || curveLinear;
};
/**
 * Calculate the path of curve. Returns null if points is an empty array.
 * @return path or null
 */
var getPath$1 = function getPath(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'linear' : _ref$type,
    _ref$points = _ref.points,
    points = _ref$points === void 0 ? [] : _ref$points,
    baseLine = _ref.baseLine,
    layout = _ref.layout,
    _ref$connectNulls = _ref.connectNulls,
    connectNulls = _ref$connectNulls === void 0 ? false : _ref$connectNulls;
  var curveFactory = getCurveFactory(type, layout);
  var formatPoints = connectNulls ? points.filter(function (entry) {
    return defined(entry);
  }) : points;
  var lineFunction;
  if (Array.isArray(baseLine)) {
    var formatBaseLine = connectNulls ? baseLine.filter(function (base) {
      return defined(base);
    }) : baseLine;
    var areaPoints = formatPoints.map(function (entry, index) {
      return _objectSpread$i(_objectSpread$i({}, entry), {}, {
        base: formatBaseLine[index]
      });
    });
    if (layout === 'vertical') {
      lineFunction = shapeArea().y(getY).x1(getX).x0(function (d) {
        return d.base.x;
      });
    } else {
      lineFunction = shapeArea().x(getX).y1(getY).y0(function (d) {
        return d.base.y;
      });
    }
    lineFunction.defined(defined).curve(curveFactory);
    return lineFunction(areaPoints);
  }
  if (layout === 'vertical' && isNumber(baseLine)) {
    lineFunction = shapeArea().y(getY).x1(getX).x0(baseLine);
  } else if (isNumber(baseLine)) {
    lineFunction = shapeArea().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = shapeLine().x(getX).y(getY);
  }
  lineFunction.defined(defined).curve(curveFactory);
  return lineFunction(formatPoints);
};
var Curve = function Curve(props) {
  var className = props.className,
    points = props.points,
    path = props.path,
    pathRef = props.pathRef;
  if ((!points || !points.length) && !path) {
    return null;
  }
  var realPath = points && points.length ? getPath$1(props) : path;
  return /*#__PURE__*/React$g.createElement("path", _extends$d({}, filterProps(props, false), adaptEventHandlers(props), {
    className: clsx('recharts-curve', className),
    d: realPath,
    ref: pathRef
  }));
};

var propTypes = {exports: {}};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

{
  propTypes.exports = factoryWithThrowingShims();
}

var propTypesExports = propTypes.exports;
const PropTypes = /*@__PURE__*/getDefaultExportFromCjs(propTypesExports);

var getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
 * Combine two comparators into a single comparators.
 */
function combineComparators(comparatorA, comparatorB) {
    return function isEqual(a, b, state) {
        return comparatorA(a, b, state) && comparatorB(a, b, state);
    };
}
/**
 * Wrap the provided `areItemsEqual` method to manage the circular state, allowing
 * for circular references to be safely included in the comparison without creating
 * stack overflows.
 */
function createIsCircular(areItemsEqual) {
    return function isCircular(a, b, state) {
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return areItemsEqual(a, b, state);
        }
        var cache = state.cache;
        var cachedA = cache.get(a);
        var cachedB = cache.get(b);
        if (cachedA && cachedB) {
            return cachedA === b && cachedB === a;
        }
        cache.set(a, b);
        cache.set(b, a);
        var result = areItemsEqual(a, b, state);
        cache.delete(a);
        cache.delete(b);
        return result;
    };
}
/**
 * Get the properties to strictly examine, which include both own properties that are
 * not enumerable and symbol properties.
 */
function getStrictProperties(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
/**
 * Whether the object contains the property passed as an own property.
 */
var hasOwn = Object.hasOwn ||
    (function (object, property) {
        return hasOwnProperty$1.call(object, property);
    });
/**
 * Whether the values passed are strictly equal or both NaN.
 */
function sameValueZeroEqual(a, b) {
    return a === b || (!a && !b && a !== a && b !== b);
}

var PREACT_VNODE = '__v';
var PREACT_OWNER = '__o';
var REACT_OWNER = '_owner';
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, keys = Object.keys;
/**
 * Whether the arrays are equal in value.
 */
function areArraysEqual(a, b, state) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (!state.equals(a[index], b[index], index, index, a, b, state)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the dates passed are equal in value.
 */
function areDatesEqual(a, b) {
    return sameValueZeroEqual(a.getTime(), b.getTime());
}
/**
 * Whether the errors passed are equal in value.
 */
function areErrorsEqual(a, b) {
    return (a.name === b.name &&
        a.message === b.message &&
        a.cause === b.cause &&
        a.stack === b.stack);
}
/**
 * Whether the functions passed are equal in value.
 */
function areFunctionsEqual(a, b) {
    return a === b;
}
/**
 * Whether the `Map`s are equal in value.
 */
function areMapsEqual(a, b, state) {
    var size = a.size;
    if (size !== b.size) {
        return false;
    }
    if (!size) {
        return true;
    }
    var matchedIndices = new Array(size);
    var aIterable = a.entries();
    var aResult;
    var bResult;
    var index = 0;
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        var bIterable = b.entries();
        var hasMatch = false;
        var matchIndex = 0;
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            if (matchedIndices[matchIndex]) {
                matchIndex++;
                continue;
            }
            var aEntry = aResult.value;
            var bEntry = bResult.value;
            if (state.equals(aEntry[0], bEntry[0], index, matchIndex, a, b, state) &&
                state.equals(aEntry[1], bEntry[1], aEntry[0], bEntry[0], a, b, state)) {
                hasMatch = matchedIndices[matchIndex] = true;
                break;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
        index++;
    }
    return true;
}
/**
 * Whether the numbers are equal in value.
 */
var areNumbersEqual = sameValueZeroEqual;
/**
 * Whether the objects are equal in value.
 */
function areObjectsEqual(a, b, state) {
    var properties = keys(a);
    var index = properties.length;
    if (keys(b).length !== index) {
        return false;
    }
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        if (!isPropertyEqual(a, b, state, properties[index])) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the objects are equal in value with strict property checking.
 */
function areObjectsEqualStrict(a, b, state) {
    var properties = getStrictProperties(a);
    var index = properties.length;
    if (getStrictProperties(b).length !== index) {
        return false;
    }
    var property;
    var descriptorA;
    var descriptorB;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        property = properties[index];
        if (!isPropertyEqual(a, b, state, property)) {
            return false;
        }
        descriptorA = getOwnPropertyDescriptor(a, property);
        descriptorB = getOwnPropertyDescriptor(b, property);
        if ((descriptorA || descriptorB) &&
            (!descriptorA ||
                !descriptorB ||
                descriptorA.configurable !== descriptorB.configurable ||
                descriptorA.enumerable !== descriptorB.enumerable ||
                descriptorA.writable !== descriptorB.writable)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the primitive wrappers passed are equal in value.
 */
function arePrimitiveWrappersEqual(a, b) {
    return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
/**
 * Whether the regexps passed are equal in value.
 */
function areRegExpsEqual(a, b) {
    return a.source === b.source && a.flags === b.flags;
}
/**
 * Whether the `Set`s are equal in value.
 */
function areSetsEqual(a, b, state) {
    var size = a.size;
    if (size !== b.size) {
        return false;
    }
    if (!size) {
        return true;
    }
    var matchedIndices = new Array(size);
    var aIterable = a.values();
    var aResult;
    var bResult;
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        var bIterable = b.values();
        var hasMatch = false;
        var matchIndex = 0;
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            if (!matchedIndices[matchIndex] &&
                state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state)) {
                hasMatch = matchedIndices[matchIndex] = true;
                break;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the TypedArray instances are equal in value.
 */
function areTypedArraysEqual(a, b) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (a[index] !== b[index]) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the URL instances are equal in value.
 */
function areUrlsEqual(a, b) {
    return (a.hostname === b.hostname &&
        a.pathname === b.pathname &&
        a.protocol === b.protocol &&
        a.port === b.port &&
        a.hash === b.hash &&
        a.username === b.username &&
        a.password === b.password);
}
function isPropertyEqual(a, b, state, property) {
    if ((property === REACT_OWNER ||
        property === PREACT_OWNER ||
        property === PREACT_VNODE) &&
        (a.$$typeof || b.$$typeof)) {
        return true;
    }
    return (hasOwn(b, property) &&
        state.equals(a[property], b[property], property, property, a, b, state));
}

var ARGUMENTS_TAG = '[object Arguments]';
var BOOLEAN_TAG = '[object Boolean]';
var DATE_TAG = '[object Date]';
var ERROR_TAG = '[object Error]';
var MAP_TAG = '[object Map]';
var NUMBER_TAG = '[object Number]';
var OBJECT_TAG = '[object Object]';
var REG_EXP_TAG = '[object RegExp]';
var SET_TAG = '[object Set]';
var STRING_TAG = '[object String]';
var URL_TAG = '[object URL]';
var isArray$2 = Array.isArray;
var isTypedArray = typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? ArrayBuffer.isView
    : null;
var assign = Object.assign;
var getTag = Object.prototype.toString.call.bind(Object.prototype.toString);
/**
 * Create a comparator method based on the type-specific equality comparators passed.
 */
function createEqualityComparator(_a) {
    var areArraysEqual = _a.areArraysEqual, areDatesEqual = _a.areDatesEqual, areErrorsEqual = _a.areErrorsEqual, areFunctionsEqual = _a.areFunctionsEqual, areMapsEqual = _a.areMapsEqual, areNumbersEqual = _a.areNumbersEqual, areObjectsEqual = _a.areObjectsEqual, arePrimitiveWrappersEqual = _a.arePrimitiveWrappersEqual, areRegExpsEqual = _a.areRegExpsEqual, areSetsEqual = _a.areSetsEqual, areTypedArraysEqual = _a.areTypedArraysEqual, areUrlsEqual = _a.areUrlsEqual;
    /**
     * compare the value of the two objects and return true if they are equivalent in values
     */
    return function comparator(a, b, state) {
        // If the items are strictly equal, no need to do a value comparison.
        if (a === b) {
            return true;
        }
        // If either of the items are nullish and fail the strictly equal check
        // above, then they must be unequal.
        if (a == null || b == null) {
            return false;
        }
        var type = typeof a;
        if (type !== typeof b) {
            return false;
        }
        if (type !== 'object') {
            if (type === 'number') {
                return areNumbersEqual(a, b, state);
            }
            if (type === 'function') {
                return areFunctionsEqual(a, b, state);
            }
            // If a primitive value that is not strictly equal, it must be unequal.
            return false;
        }
        var constructor = a.constructor;
        // Checks are listed in order of commonality of use-case:
        //   1. Common complex object types (plain object, array)
        //   2. Common data values (date, regexp)
        //   3. Less-common complex object types (map, set)
        //   4. Less-common data values (promise, primitive wrappers)
        // Inherently this is both subjective and assumptive, however
        // when reviewing comparable libraries in the wild this order
        // appears to be generally consistent.
        // Constructors should match, otherwise there is potential for false positives
        // between class and subclass or custom object and POJO.
        if (constructor !== b.constructor) {
            return false;
        }
        // `isPlainObject` only checks against the object's own realm. Cross-realm
        // comparisons are rare, and will be handled in the ultimate fallback, so
        // we can avoid capturing the string tag.
        if (constructor === Object) {
            return areObjectsEqual(a, b, state);
        }
        // `isArray()` works on subclasses and is cross-realm, so we can avoid capturing
        // the string tag or doing an `instanceof` check.
        if (isArray$2(a)) {
            return areArraysEqual(a, b, state);
        }
        // `isTypedArray()` works on all possible TypedArray classes, so we can avoid
        // capturing the string tag or comparing against all possible constructors.
        if (isTypedArray != null && isTypedArray(a)) {
            return areTypedArraysEqual(a, b, state);
        }
        // Try to fast-path equality checks for other complex object types in the
        // same realm to avoid capturing the string tag. Strict equality is used
        // instead of `instanceof` because it is more performant for the common
        // use-case. If someone is subclassing a native class, it will be handled
        // with the string tag comparison.
        if (constructor === Date) {
            return areDatesEqual(a, b, state);
        }
        if (constructor === RegExp) {
            return areRegExpsEqual(a, b, state);
        }
        if (constructor === Map) {
            return areMapsEqual(a, b, state);
        }
        if (constructor === Set) {
            return areSetsEqual(a, b, state);
        }
        // Since this is a custom object, capture the string tag to determing its type.
        // This is reasonably performant in modern environments like v8 and SpiderMonkey.
        var tag = getTag(a);
        if (tag === DATE_TAG) {
            return areDatesEqual(a, b, state);
        }
        // For RegExp, the properties are not enumerable, and therefore will give false positives if
        // tested like a standard object.
        if (tag === REG_EXP_TAG) {
            return areRegExpsEqual(a, b, state);
        }
        if (tag === MAP_TAG) {
            return areMapsEqual(a, b, state);
        }
        if (tag === SET_TAG) {
            return areSetsEqual(a, b, state);
        }
        if (tag === OBJECT_TAG) {
            // The exception for value comparison is custom `Promise`-like class instances. These should
            // be treated the same as standard `Promise` objects, which means strict equality, and if
            // it reaches this point then that strict equality comparison has already failed.
            return (typeof a.then !== 'function' &&
                typeof b.then !== 'function' &&
                areObjectsEqual(a, b, state));
        }
        // If a URL tag, it should be tested explicitly. Like RegExp, the properties are not
        // enumerable, and therefore will give false positives if tested like a standard object.
        if (tag === URL_TAG) {
            return areUrlsEqual(a, b, state);
        }
        // If an error tag, it should be tested explicitly. Like RegExp, the properties are not
        // enumerable, and therefore will give false positives if tested like a standard object.
        if (tag === ERROR_TAG) {
            return areErrorsEqual(a, b, state);
        }
        // If an arguments tag, it should be treated as a standard object.
        if (tag === ARGUMENTS_TAG) {
            return areObjectsEqual(a, b, state);
        }
        // As the penultimate fallback, check if the values passed are primitive wrappers. This
        // is very rare in modern JS, which is why it is deprioritized compared to all other object
        // types.
        if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) {
            return arePrimitiveWrappersEqual(a, b, state);
        }
        // If not matching any tags that require a specific type of comparison, then we hard-code false because
        // the only thing remaining is strict equality, which has already been compared. This is for a few reasons:
        //   - Certain types that cannot be introspected (e.g., `WeakMap`). For these types, this is the only
        //     comparison that can be made.
        //   - For types that can be introspected, but rarely have requirements to be compared
        //     (`ArrayBuffer`, `DataView`, etc.), the cost is avoided to prioritize the common
        //     use-cases (may be included in a future release, if requested enough).
        //   - For types that can be introspected but do not have an objective definition of what
        //     equality is (`Error`, etc.), the subjective decision is to be conservative and strictly compare.
        // In all cases, these decisions should be reevaluated based on changes to the language and
        // common development practices.
        return false;
    };
}
/**
 * Create the configuration object used for building comparators.
 */
function createEqualityComparatorConfig(_a) {
    var circular = _a.circular, createCustomConfig = _a.createCustomConfig, strict = _a.strict;
    var config = {
        areArraysEqual: strict
            ? areObjectsEqualStrict
            : areArraysEqual,
        areDatesEqual: areDatesEqual,
        areErrorsEqual: areErrorsEqual,
        areFunctionsEqual: areFunctionsEqual,
        areMapsEqual: strict
            ? combineComparators(areMapsEqual, areObjectsEqualStrict)
            : areMapsEqual,
        areNumbersEqual: areNumbersEqual,
        areObjectsEqual: strict
            ? areObjectsEqualStrict
            : areObjectsEqual,
        arePrimitiveWrappersEqual: arePrimitiveWrappersEqual,
        areRegExpsEqual: areRegExpsEqual,
        areSetsEqual: strict
            ? combineComparators(areSetsEqual, areObjectsEqualStrict)
            : areSetsEqual,
        areTypedArraysEqual: strict
            ? areObjectsEqualStrict
            : areTypedArraysEqual,
        areUrlsEqual: areUrlsEqual,
    };
    if (createCustomConfig) {
        config = assign({}, config, createCustomConfig(config));
    }
    if (circular) {
        var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
        var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
        var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
        var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
        config = assign({}, config, {
            areArraysEqual: areArraysEqual$1,
            areMapsEqual: areMapsEqual$1,
            areObjectsEqual: areObjectsEqual$1,
            areSetsEqual: areSetsEqual$1,
        });
    }
    return config;
}
/**
 * Default equality comparator pass-through, used as the standard `isEqual` creator for
 * use inside the built comparator.
 */
function createInternalEqualityComparator(compare) {
    return function (a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
        return compare(a, b, state);
    };
}
/**
 * Create the `isEqual` function used by the consuming application.
 */
function createIsEqual(_a) {
    var circular = _a.circular, comparator = _a.comparator, createState = _a.createState, equals = _a.equals, strict = _a.strict;
    if (createState) {
        return function isEqual(a, b) {
            var _a = createState(), _b = _a.cache, cache = _b === void 0 ? circular ? new WeakMap() : undefined : _b, meta = _a.meta;
            return comparator(a, b, {
                cache: cache,
                equals: equals,
                meta: meta,
                strict: strict,
            });
        };
    }
    if (circular) {
        return function isEqual(a, b) {
            return comparator(a, b, {
                cache: new WeakMap(),
                equals: equals,
                meta: undefined,
                strict: strict,
            });
        };
    }
    var state = {
        cache: undefined,
        equals: equals,
        meta: undefined,
        strict: strict,
    };
    return function isEqual(a, b) {
        return comparator(a, b, state);
    };
}

/**
 * Whether the items passed are deeply-equal in value.
 */
var deepEqual = createCustomEqual();
/**
 * Whether the items passed are deeply-equal in value based on strict comparison.
 */
createCustomEqual({ strict: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references.
 */
createCustomEqual({ circular: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references,
 * based on strict comparison.
 */
createCustomEqual({
    circular: true,
    strict: true,
});
/**
 * Whether the items passed are shallowly-equal in value.
 */
createCustomEqual({
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value based on strict comparison
 */
createCustomEqual({
    strict: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references.
 */
createCustomEqual({
    circular: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references,
 * based on strict comparison.
 */
createCustomEqual({
    circular: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
    strict: true,
});
/**
 * Create a custom equality comparison method.
 *
 * This can be done to create very targeted comparisons in extreme hot-path scenarios
 * where the standard methods are not performant enough, but can also be used to provide
 * support for legacy environments that do not support expected features like
 * `RegExp.prototype.flags` out of the box.
 */
function createCustomEqual(options) {
    if (options === void 0) { options = {}; }
    var _a = options.circular, circular = _a === void 0 ? false : _a, createCustomInternalComparator = options.createInternalComparator, createState = options.createState, _b = options.strict, strict = _b === void 0 ? false : _b;
    var config = createEqualityComparatorConfig(options);
    var comparator = createEqualityComparator(config);
    var equals = createCustomInternalComparator
        ? createCustomInternalComparator(comparator)
        : createInternalEqualityComparator(comparator);
    return createIsEqual({ circular: circular, comparator: comparator, createState: createState, equals: equals, strict: strict });
}

function safeRequestAnimationFrame(callback) {
  if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(callback);
}
function setRafTimeout(callback) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var currTime = -1;
  var shouldUpdate = function shouldUpdate(now) {
    if (currTime < 0) {
      currTime = now;
    }
    if (now - currTime > timeout) {
      callback(now);
      currTime = -1;
    } else {
      safeRequestAnimationFrame(shouldUpdate);
    }
  };
  requestAnimationFrame(shouldUpdate);
}

function _typeof$j(o) { "@babel/helpers - typeof"; return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$j(o); }
function _toArray(arr) { return _arrayWithHoles$6(arr) || _iterableToArray$6(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray$6(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
function createAnimateManager() {
  var currStyle = {};
  var handleChange = function handleChange() {
    return null;
  };
  var shouldStop = false;
  var setStyle = function setStyle(_style) {
    if (shouldStop) {
      return;
    }
    if (Array.isArray(_style)) {
      if (!_style.length) {
        return;
      }
      var styles = _style;
      var _styles = _toArray(styles),
        curr = _styles[0],
        restStyles = _styles.slice(1);
      if (typeof curr === 'number') {
        setRafTimeout(setStyle.bind(null, restStyles), curr);
        return;
      }
      setStyle(curr);
      setRafTimeout(setStyle.bind(null, restStyles));
      return;
    }
    if (_typeof$j(_style) === 'object') {
      currStyle = _style;
      handleChange(currStyle);
    }
    if (typeof _style === 'function') {
      _style();
    }
  };
  return {
    stop: function stop() {
      shouldStop = true;
    },
    start: function start(style) {
      shouldStop = false;
      setStyle(style);
    },
    subscribe: function subscribe(_handleChange) {
      handleChange = _handleChange;
      return function () {
        handleChange = function handleChange() {
          return null;
        };
      };
    }
  };
}

function _typeof$i(o) {
  "@babel/helpers - typeof";
  return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$i(o);
}
function ownKeys$h(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$h(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$h(Object(t), true).forEach(function(r2) {
      _defineProperty$i(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$h(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$i(obj, key, value) {
  key = _toPropertyKey$i(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$i(arg) {
  var key = _toPrimitive$i(arg, "string");
  return _typeof$i(key) === "symbol" ? key : String(key);
}
function _toPrimitive$i(input, hint) {
  if (_typeof$i(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint);
    if (_typeof$i(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var getIntersectionKeys = function getIntersectionKeys2(preObj, nextObj) {
  return [Object.keys(preObj), Object.keys(nextObj)].reduce(function(a, b) {
    return a.filter(function(c) {
      return b.includes(c);
    });
  });
};
var identity = function identity2(param) {
  return param;
};
var getDashCase = function getDashCase2(name) {
  return name.replace(/([A-Z])/g, function(v) {
    return "-".concat(v.toLowerCase());
  });
};
var mapObject = function mapObject2(fn, obj) {
  return Object.keys(obj).reduce(function(res, key) {
    return _objectSpread$h(_objectSpread$h({}, res), {}, _defineProperty$i({}, key, fn(key, obj[key])));
  }, {});
};
var getTransitionVal = function getTransitionVal2(props, duration, easing) {
  return props.map(function(prop) {
    return "".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing);
  }).join(",");
};

function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$5(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray$5(arr) { return _arrayWithoutHoles$5(arr) || _iterableToArray$5(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableSpread$5(); }
function _nonIterableSpread$5() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _iterableToArray$5(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$5(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$8(arr); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ACCURACY = 1e-4;
var cubicBezierFactor = function cubicBezierFactor(c1, c2) {
  return [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
};
var multyTime = function multyTime(params, t) {
  return params.map(function (param, i) {
    return param * Math.pow(t, i);
  }).reduce(function (pre, curr) {
    return pre + curr;
  });
};
var cubicBezier = function cubicBezier(c1, c2) {
  return function (t) {
    var params = cubicBezierFactor(c1, c2);
    return multyTime(params, t);
  };
};
var derivativeCubicBezier = function derivativeCubicBezier(c1, c2) {
  return function (t) {
    var params = cubicBezierFactor(c1, c2);
    var newParams = [].concat(_toConsumableArray$5(params.map(function (param, i) {
      return param * i;
    }).slice(1)), [0]);
    return multyTime(newParams, t);
  };
};

// calculate cubic-bezier using Newton's method
var configBezier = function configBezier() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var x1 = args[0],
    y1 = args[1],
    x2 = args[2],
    y2 = args[3];
  if (args.length === 1) {
    switch (args[0]) {
      case 'linear':
        x1 = 0.0;
        y1 = 0.0;
        x2 = 1.0;
        y2 = 1.0;
        break;
      case 'ease':
        x1 = 0.25;
        y1 = 0.1;
        x2 = 0.25;
        y2 = 1.0;
        break;
      case 'ease-in':
        x1 = 0.42;
        y1 = 0.0;
        x2 = 1.0;
        y2 = 1.0;
        break;
      case 'ease-out':
        x1 = 0.42;
        y1 = 0.0;
        x2 = 0.58;
        y2 = 1.0;
        break;
      case 'ease-in-out':
        x1 = 0.0;
        y1 = 0.0;
        x2 = 0.58;
        y2 = 1.0;
        break;
      default:
        {
          var easing = args[0].split('(');
          if (easing[0] === 'cubic-bezier' && easing[1].split(')')[0].split(',').length === 4) {
            var _easing$1$split$0$spl = easing[1].split(')')[0].split(',').map(function (x) {
              return parseFloat(x);
            });
            var _easing$1$split$0$spl2 = _slicedToArray$5(_easing$1$split$0$spl, 4);
            x1 = _easing$1$split$0$spl2[0];
            y1 = _easing$1$split$0$spl2[1];
            x2 = _easing$1$split$0$spl2[2];
            y2 = _easing$1$split$0$spl2[3];
          }
        }
    }
  }
  var curveX = cubicBezier(x1, x2);
  var curveY = cubicBezier(y1, y2);
  var derCurveX = derivativeCubicBezier(x1, x2);
  var rangeValue = function rangeValue(value) {
    if (value > 1) {
      return 1;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  };
  var bezier = function bezier(_t) {
    var t = _t > 1 ? 1 : _t;
    var x = t;
    for (var i = 0; i < 8; ++i) {
      var evalT = curveX(x) - t;
      var derVal = derCurveX(x);
      if (Math.abs(evalT - t) < ACCURACY || derVal < ACCURACY) {
        return curveY(x);
      }
      x = rangeValue(x - evalT / derVal);
    }
    return curveY(x);
  };
  bezier.isStepper = false;
  return bezier;
};
var configSpring = function configSpring() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$stiff = config.stiff,
    stiff = _config$stiff === void 0 ? 100 : _config$stiff,
    _config$damping = config.damping,
    damping = _config$damping === void 0 ? 8 : _config$damping,
    _config$dt = config.dt,
    dt = _config$dt === void 0 ? 17 : _config$dt;
  var stepper = function stepper(currX, destX, currV) {
    var FSpring = -(currX - destX) * stiff;
    var FDamping = currV * damping;
    var newV = currV + (FSpring - FDamping) * dt / 1000;
    var newX = currV * dt / 1000 + currX;
    if (Math.abs(newX - destX) < ACCURACY && Math.abs(newV) < ACCURACY) {
      return [destX, 0];
    }
    return [newX, newV];
  };
  stepper.isStepper = true;
  stepper.dt = dt;
  return stepper;
};
var configEasing = function configEasing() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var easing = args[0];
  if (typeof easing === 'string') {
    switch (easing) {
      case 'ease':
      case 'ease-in-out':
      case 'ease-out':
      case 'ease-in':
      case 'linear':
        return configBezier(easing);
      case 'spring':
        return configSpring();
      default:
        if (easing.split('(')[0] === 'cubic-bezier') {
          return configBezier(easing);
        }
    }
  }
  if (typeof easing === 'function') {
    return easing;
  }
  return null;
};

function _typeof$h(o) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$h(o); }
function _toConsumableArray$4(arr) { return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$7(arr) || _nonIterableSpread$4(); }
function _nonIterableSpread$4() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$4(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$4(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$7(arr); }
function ownKeys$g(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$g(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$g(Object(t), true).forEach(function (r) { _defineProperty$h(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$g(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$h(obj, key, value) { key = _toPropertyKey$h(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$h(arg) { var key = _toPrimitive$h(arg, "string"); return _typeof$h(key) === "symbol" ? key : String(key); }
function _toPrimitive$h(input, hint) { if (_typeof$h(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (_typeof$h(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var alpha = function alpha(begin, end, k) {
  return begin + (end - begin) * k;
};
var needContinue = function needContinue(_ref) {
  var from = _ref.from,
    to = _ref.to;
  return from !== to;
};

/*
 * @description: cal new from value and velocity in each stepper
 * @return: { [styleProperty]: { from, to, velocity } }
 */
var calStepperVals = function calStepperVals(easing, preVals, steps) {
  var nextStepVals = mapObject(function (key, val) {
    if (needContinue(val)) {
      var _easing = easing(val.from, val.to, val.velocity),
        _easing2 = _slicedToArray$4(_easing, 2),
        newX = _easing2[0],
        newV = _easing2[1];
      return _objectSpread$g(_objectSpread$g({}, val), {}, {
        from: newX,
        velocity: newV
      });
    }
    return val;
  }, preVals);
  if (steps < 1) {
    return mapObject(function (key, val) {
      if (needContinue(val)) {
        return _objectSpread$g(_objectSpread$g({}, val), {}, {
          velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
          from: alpha(val.from, nextStepVals[key].from, steps)
        });
      }
      return val;
    }, preVals);
  }
  return calStepperVals(easing, nextStepVals, steps - 1);
};

// configure update function
const configUpdate = (function (from, to, easing, duration, render) {
  var interKeys = getIntersectionKeys(from, to);
  var timingStyle = interKeys.reduce(function (res, key) {
    return _objectSpread$g(_objectSpread$g({}, res), {}, _defineProperty$h({}, key, [from[key], to[key]]));
  }, {});
  var stepperStyle = interKeys.reduce(function (res, key) {
    return _objectSpread$g(_objectSpread$g({}, res), {}, _defineProperty$h({}, key, {
      from: from[key],
      velocity: 0,
      to: to[key]
    }));
  }, {});
  var cafId = -1;
  var preTime;
  var beginTime;
  var update = function update() {
    return null;
  };
  var getCurrStyle = function getCurrStyle() {
    return mapObject(function (key, val) {
      return val.from;
    }, stepperStyle);
  };
  var shouldStopAnimation = function shouldStopAnimation() {
    return !Object.values(stepperStyle).filter(needContinue).length;
  };

  // stepper timing function like spring
  var stepperUpdate = function stepperUpdate(now) {
    if (!preTime) {
      preTime = now;
    }
    var deltaTime = now - preTime;
    var steps = deltaTime / easing.dt;
    stepperStyle = calStepperVals(easing, stepperStyle, steps);
    // get union set and add compatible prefix
    render(_objectSpread$g(_objectSpread$g(_objectSpread$g({}, from), to), getCurrStyle()));
    preTime = now;
    if (!shouldStopAnimation()) {
      cafId = requestAnimationFrame(update);
    }
  };

  // t => val timing function like cubic-bezier
  var timingUpdate = function timingUpdate(now) {
    if (!beginTime) {
      beginTime = now;
    }
    var t = (now - beginTime) / duration;
    var currStyle = mapObject(function (key, val) {
      return alpha.apply(void 0, _toConsumableArray$4(val).concat([easing(t)]));
    }, timingStyle);

    // get union set and add compatible prefix
    render(_objectSpread$g(_objectSpread$g(_objectSpread$g({}, from), to), currStyle));
    if (t < 1) {
      cafId = requestAnimationFrame(update);
    } else {
      var finalStyle = mapObject(function (key, val) {
        return alpha.apply(void 0, _toConsumableArray$4(val).concat([easing(1)]));
      }, timingStyle);
      render(_objectSpread$g(_objectSpread$g(_objectSpread$g({}, from), to), finalStyle));
    }
  };
  update = easing.isStepper ? stepperUpdate : timingUpdate;

  // return start animation method
  return function () {
    requestAnimationFrame(update);

    // return stop animation method
    return function () {
      cancelAnimationFrame(cafId);
    };
  };
});

function _typeof$g(o) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$g(o); }
var _excluded$5 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function _objectWithoutProperties$5(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$5(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$3(); }
function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _iterableToArray$3(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$6(arr); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$f(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$f(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$f(Object(t), true).forEach(function (r) { _defineProperty$g(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$g(obj, key, value) { key = _toPropertyKey$g(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$g(descriptor.key), descriptor); } }
function _createClass$a(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$a(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$g(arg) { var key = _toPrimitive$g(arg, "string"); return _typeof$g(key) === "symbol" ? key : String(key); }
function _toPrimitive$g(input, hint) { if (_typeof$g(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (_typeof$g(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$8(subClass, superClass); }
function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf$8(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$8(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$8(this, result); }; }
function _possibleConstructorReturn$8(self, call) { if (call && (_typeof$g(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$8(self); }
function _assertThisInitialized$8(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$8(o) { _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$8(o); }
const React$f = await importShared('react');
const {PureComponent: PureComponent$4,cloneElement: cloneElement$3,Children: Children$1} = React$f;
var Animate = /*#__PURE__*/function (_PureComponent) {
  _inherits$8(Animate, _PureComponent);
  var _super = _createSuper(Animate);
  function Animate(props, context) {
    var _this;
    _classCallCheck$a(this, Animate);
    _this = _super.call(this, props, context);
    var _this$props = _this.props,
      isActive = _this$props.isActive,
      attributeName = _this$props.attributeName,
      from = _this$props.from,
      to = _this$props.to,
      steps = _this$props.steps,
      children = _this$props.children,
      duration = _this$props.duration;
    _this.handleStyleChange = _this.handleStyleChange.bind(_assertThisInitialized$8(_this));
    _this.changeStyle = _this.changeStyle.bind(_assertThisInitialized$8(_this));
    if (!isActive || duration <= 0) {
      _this.state = {
        style: {}
      };

      // if children is a function and animation is not active, set style to 'to'
      if (typeof children === 'function') {
        _this.state = {
          style: to
        };
      }
      return _possibleConstructorReturn$8(_this);
    }
    if (steps && steps.length) {
      _this.state = {
        style: steps[0].style
      };
    } else if (from) {
      if (typeof children === 'function') {
        _this.state = {
          style: from
        };
        return _possibleConstructorReturn$8(_this);
      }
      _this.state = {
        style: attributeName ? _defineProperty$g({}, attributeName, from) : from
      };
    } else {
      _this.state = {
        style: {}
      };
    }
    return _this;
  }
  _createClass$a(Animate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
        isActive = _this$props2.isActive,
        canBegin = _this$props2.canBegin;
      this.mounted = true;
      if (!isActive || !canBegin) {
        return;
      }
      this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
        isActive = _this$props3.isActive,
        canBegin = _this$props3.canBegin,
        attributeName = _this$props3.attributeName,
        shouldReAnimate = _this$props3.shouldReAnimate,
        to = _this$props3.to,
        currentFrom = _this$props3.from;
      var style = this.state.style;
      if (!canBegin) {
        return;
      }
      if (!isActive) {
        var newState = {
          style: attributeName ? _defineProperty$g({}, attributeName, to) : to
        };
        if (this.state && style) {
          if (attributeName && style[attributeName] !== to || !attributeName && style !== to) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(newState);
          }
        }
        return;
      }
      if (deepEqual(prevProps.to, to) && prevProps.canBegin && prevProps.isActive) {
        return;
      }
      var isTriggered = !prevProps.canBegin || !prevProps.isActive;
      if (this.manager) {
        this.manager.stop();
      }
      if (this.stopJSAnimation) {
        this.stopJSAnimation();
      }
      var from = isTriggered || shouldReAnimate ? currentFrom : prevProps.to;
      if (this.state && style) {
        var _newState = {
          style: attributeName ? _defineProperty$g({}, attributeName, from) : from
        };
        if (attributeName && style[attributeName] !== from || !attributeName && style !== from) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState(_newState);
        }
      }
      this.runAnimation(_objectSpread$f(_objectSpread$f({}, this.props), {}, {
        from: from,
        begin: 0
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      var onAnimationEnd = this.props.onAnimationEnd;
      if (this.unSubscribe) {
        this.unSubscribe();
      }
      if (this.manager) {
        this.manager.stop();
        this.manager = null;
      }
      if (this.stopJSAnimation) {
        this.stopJSAnimation();
      }
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    }
  }, {
    key: "handleStyleChange",
    value: function handleStyleChange(style) {
      this.changeStyle(style);
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      if (this.mounted) {
        this.setState({
          style: style
        });
      }
    }
  }, {
    key: "runJSAnimation",
    value: function runJSAnimation(props) {
      var _this2 = this;
      var from = props.from,
        to = props.to,
        duration = props.duration,
        easing = props.easing,
        begin = props.begin,
        onAnimationEnd = props.onAnimationEnd,
        onAnimationStart = props.onAnimationStart;
      var startAnimation = configUpdate(from, to, configEasing(easing), duration, this.changeStyle);
      var finalStartAnimation = function finalStartAnimation() {
        _this2.stopJSAnimation = startAnimation();
      };
      this.manager.start([onAnimationStart, begin, finalStartAnimation, duration, onAnimationEnd]);
    }
  }, {
    key: "runStepAnimation",
    value: function runStepAnimation(props) {
      var _this3 = this;
      var steps = props.steps,
        begin = props.begin,
        onAnimationStart = props.onAnimationStart;
      var _steps$ = steps[0],
        initialStyle = _steps$.style,
        _steps$$duration = _steps$.duration,
        initialTime = _steps$$duration === void 0 ? 0 : _steps$$duration;
      var addStyle = function addStyle(sequence, nextItem, index) {
        if (index === 0) {
          return sequence;
        }
        var duration = nextItem.duration,
          _nextItem$easing = nextItem.easing,
          easing = _nextItem$easing === void 0 ? 'ease' : _nextItem$easing,
          style = nextItem.style,
          nextProperties = nextItem.properties,
          onAnimationEnd = nextItem.onAnimationEnd;
        var preItem = index > 0 ? steps[index - 1] : nextItem;
        var properties = nextProperties || Object.keys(style);
        if (typeof easing === 'function' || easing === 'spring') {
          return [].concat(_toConsumableArray$3(sequence), [_this3.runJSAnimation.bind(_this3, {
            from: preItem.style,
            to: style,
            duration: duration,
            easing: easing
          }), duration]);
        }
        var transition = getTransitionVal(properties, duration, easing);
        var newStyle = _objectSpread$f(_objectSpread$f(_objectSpread$f({}, preItem.style), style), {}, {
          transition: transition
        });
        return [].concat(_toConsumableArray$3(sequence), [newStyle, duration, onAnimationEnd]).filter(identity);
      };
      return this.manager.start([onAnimationStart].concat(_toConsumableArray$3(steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)])), [props.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function runAnimation(props) {
      if (!this.manager) {
        this.manager = createAnimateManager();
      }
      var begin = props.begin,
        duration = props.duration,
        attributeName = props.attributeName,
        propsTo = props.to,
        easing = props.easing,
        onAnimationStart = props.onAnimationStart,
        onAnimationEnd = props.onAnimationEnd,
        steps = props.steps,
        children = props.children;
      var manager = this.manager;
      this.unSubscribe = manager.subscribe(this.handleStyleChange);
      if (typeof easing === 'function' || typeof children === 'function' || easing === 'spring') {
        this.runJSAnimation(props);
        return;
      }
      if (steps.length > 1) {
        this.runStepAnimation(props);
        return;
      }
      var to = attributeName ? _defineProperty$g({}, attributeName, propsTo) : propsTo;
      var transition = getTransitionVal(Object.keys(to), duration, easing);
      manager.start([onAnimationStart, begin, _objectSpread$f(_objectSpread$f({}, to), {}, {
        transition: transition
      }), duration, onAnimationEnd]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        children = _this$props4.children;
        _this$props4.begin;
        var duration = _this$props4.duration;
        _this$props4.attributeName;
        _this$props4.easing;
        var isActive = _this$props4.isActive;
        _this$props4.steps;
        _this$props4.from;
        _this$props4.to;
        _this$props4.canBegin;
        _this$props4.onAnimationEnd;
        _this$props4.shouldReAnimate;
        _this$props4.onAnimationReStart;
        var others = _objectWithoutProperties$5(_this$props4, _excluded$5);
      var count = Children$1.count(children);
      // eslint-disable-next-line react/destructuring-assignment
      var stateStyle = this.state.style;
      if (typeof children === 'function') {
        return children(stateStyle);
      }
      if (!isActive || count === 0 || duration <= 0) {
        return children;
      }
      var cloneContainer = function cloneContainer(container) {
        var _container$props = container.props,
          _container$props$styl = _container$props.style,
          style = _container$props$styl === void 0 ? {} : _container$props$styl,
          className = _container$props.className;
        var res = /*#__PURE__*/cloneElement$3(container, _objectSpread$f(_objectSpread$f({}, others), {}, {
          style: _objectSpread$f(_objectSpread$f({}, style), stateStyle),
          className: className
        }));
        return res;
      };
      if (count === 1) {
        return cloneContainer(Children$1.only(children));
      }
      return /*#__PURE__*/React$f.createElement("div", null, Children$1.map(children, function (child) {
        return cloneContainer(child);
      }));
    }
  }]);
  return Animate;
}(PureComponent$4);
Animate.displayName = 'Animate';
Animate.defaultProps = {
  begin: 0,
  duration: 1000,
  from: '',
  to: '',
  attributeName: '',
  easing: 'ease',
  isActive: true,
  canBegin: true,
  steps: [],
  onAnimationEnd: function onAnimationEnd() {},
  onAnimationStart: function onAnimationStart() {}
};
Animate.propTypes = {
  from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  attributeName: PropTypes.string,
  // animation duration
  duration: PropTypes.number,
  begin: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  steps: PropTypes.arrayOf(PropTypes.shape({
    duration: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    easing: PropTypes.oneOfType([PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']), PropTypes.func]),
    // transition css properties(dash case), optional
    properties: PropTypes.arrayOf('string'),
    onAnimationEnd: PropTypes.func
  })),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isActive: PropTypes.bool,
  canBegin: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: PropTypes.bool,
  onAnimationStart: PropTypes.func,
  onAnimationReStart: PropTypes.func
};

function _typeof$f(o) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$f(o); }
function _extends$c() { _extends$c = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$e(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$e(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$e(Object(t), true).forEach(function (r) { _defineProperty$f(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$f(obj, key, value) { key = _toPropertyKey$f(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$f(t) { var i = _toPrimitive$f(t, "string"); return "symbol" == _typeof$f(i) ? i : i + ""; }
function _toPrimitive$f(t, r) { if ("object" != _typeof$f(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$f(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview Rectangle
 */
const React$e = await importShared('react');
const {useEffect: useEffect$2,useRef: useRef$1,useState: useState$2} = React$e;
var getRectanglePath = function getRectanglePath(x, y, width, height, radius) {
  var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
  var ySign = height >= 0 ? 1 : -1;
  var xSign = width >= 0 ? 1 : -1;
  var clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && radius instanceof Array) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }
    path = "M".concat(x, ",").concat(y + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += "A ".concat(newRadius[0], ",").concat(newRadius[0], ",0,0,").concat(clockWise, ",").concat(x + xSign * newRadius[0], ",").concat(y);
    }
    path += "L ".concat(x + width - xSign * newRadius[1], ",").concat(y);
    if (newRadius[1] > 0) {
      path += "A ".concat(newRadius[1], ",").concat(newRadius[1], ",0,0,").concat(clockWise, ",\n        ").concat(x + width, ",").concat(y + ySign * newRadius[1]);
    }
    path += "L ".concat(x + width, ",").concat(y + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += "A ".concat(newRadius[2], ",").concat(newRadius[2], ",0,0,").concat(clockWise, ",\n        ").concat(x + width - xSign * newRadius[2], ",").concat(y + height);
    }
    path += "L ".concat(x + xSign * newRadius[3], ",").concat(y + height);
    if (newRadius[3] > 0) {
      path += "A ".concat(newRadius[3], ",").concat(newRadius[3], ",0,0,").concat(clockWise, ",\n        ").concat(x, ",").concat(y + height - ySign * newRadius[3]);
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = "M ".concat(x, ",").concat(y + ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + xSign * _newRadius, ",").concat(y, "\n            L ").concat(x + width - xSign * _newRadius, ",").concat(y, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + width, ",").concat(y + ySign * _newRadius, "\n            L ").concat(x + width, ",").concat(y + height - ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + width - xSign * _newRadius, ",").concat(y + height, "\n            L ").concat(x + xSign * _newRadius, ",").concat(y + height, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x, ",").concat(y + height - ySign * _newRadius, " Z");
  } else {
    path = "M ".concat(x, ",").concat(y, " h ").concat(width, " v ").concat(height, " h ").concat(-width, " Z");
  }
  return path;
};
var isInRectangle = function isInRectangle(point, rect) {
  if (!point || !rect) {
    return false;
  }
  var px = point.x,
    py = point.y;
  var x = rect.x,
    y = rect.y,
    width = rect.width,
    height = rect.height;
  if (Math.abs(width) > 0 && Math.abs(height) > 0) {
    var minX = Math.min(x, x + width);
    var maxX = Math.max(x, x + width);
    var minY = Math.min(y, y + height);
    var maxY = Math.max(y, y + height);
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
  }
  return false;
};
var defaultProps$1 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
var Rectangle = function Rectangle(rectangleProps) {
  var props = _objectSpread$e(_objectSpread$e({}, defaultProps$1), rectangleProps);
  var pathRef = useRef$1();
  var _useState = useState$2(-1),
    _useState2 = _slicedToArray$3(_useState, 2),
    totalLength = _useState2[0],
    setTotalLength = _useState2[1];
  useEffect$2(function () {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (err) {
        // calculate total length error
      }
    }
  }, []);
  var x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    radius = props.radius,
    className = props.className;
  var animationEasing = props.animationEasing,
    animationDuration = props.animationDuration,
    animationBegin = props.animationBegin,
    isAnimationActive = props.isAnimationActive,
    isUpdateAnimationActive = props.isUpdateAnimationActive;
  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx('recharts-rectangle', className);
  if (!isUpdateAnimationActive) {
    return /*#__PURE__*/React$e.createElement("path", _extends$c({}, filterProps(props, true), {
      className: layerClass,
      d: getRectanglePath(x, y, width, height, radius)
    }));
  }
  return /*#__PURE__*/React$e.createElement(Animate, {
    canBegin: totalLength > 0,
    from: {
      width: width,
      height: height,
      x: x,
      y: y
    },
    to: {
      width: width,
      height: height,
      x: x,
      y: y
    },
    duration: animationDuration,
    animationEasing: animationEasing,
    isActive: isUpdateAnimationActive
  }, function (_ref) {
    var currWidth = _ref.width,
      currHeight = _ref.height,
      currX = _ref.x,
      currY = _ref.y;
    return /*#__PURE__*/React$e.createElement(Animate, {
      canBegin: totalLength > 0,
      from: "0px ".concat(totalLength === -1 ? 1 : totalLength, "px"),
      to: "".concat(totalLength, "px 0px"),
      attributeName: "strokeDasharray",
      begin: animationBegin,
      duration: animationDuration,
      isActive: isAnimationActive,
      easing: animationEasing
    }, /*#__PURE__*/React$e.createElement("path", _extends$c({}, filterProps(props, true), {
      className: layerClass,
      d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
      ref: pathRef
    })));
  });
};

var _excluded$4 = ["points", "className", "baseLinePoints", "connectNulls"];
function _extends$b() { _extends$b = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }
function _objectWithoutProperties$4(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$4(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$4(arr); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * @fileOverview Polygon
 */
const React$d = await importShared('react');
var isValidatePoint = function isValidatePoint(point) {
  return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints() {
  var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var segmentPoints = [[]];
  points.forEach(function (entry) {
    if (isValidatePoint(entry)) {
      segmentPoints[segmentPoints.length - 1].push(entry);
    } else if (segmentPoints[segmentPoints.length - 1].length > 0) {
      // add another path
      segmentPoints.push([]);
    }
  });
  if (isValidatePoint(points[0])) {
    segmentPoints[segmentPoints.length - 1].push(points[0]);
  }
  if (segmentPoints[segmentPoints.length - 1].length <= 0) {
    segmentPoints = segmentPoints.slice(0, -1);
  }
  return segmentPoints;
};
var getSinglePolygonPath = function getSinglePolygonPath(points, connectNulls) {
  var segmentPoints = getParsedPoints(points);
  if (connectNulls) {
    segmentPoints = [segmentPoints.reduce(function (res, segPoints) {
      return [].concat(_toConsumableArray$2(res), _toConsumableArray$2(segPoints));
    }, [])];
  }
  var polygonPath = segmentPoints.map(function (segPoints) {
    return segPoints.reduce(function (path, point, index) {
      return "".concat(path).concat(index === 0 ? 'M' : 'L').concat(point.x, ",").concat(point.y);
    }, '');
  }).join('');
  return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = function getRanglePath(points, baseLinePoints, connectNulls) {
  var outerPath = getSinglePolygonPath(points, connectNulls);
  return "".concat(outerPath.slice(-1) === 'Z' ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1));
};
var Polygon = function Polygon(props) {
  var points = props.points,
    className = props.className,
    baseLinePoints = props.baseLinePoints,
    connectNulls = props.connectNulls,
    others = _objectWithoutProperties$4(props, _excluded$4);
  if (!points || !points.length) {
    return null;
  }
  var layerClass = clsx('recharts-polygon', className);
  if (baseLinePoints && baseLinePoints.length) {
    var hasStroke = others.stroke && others.stroke !== 'none';
    var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
    return /*#__PURE__*/React$d.createElement("g", {
      className: layerClass
    }, /*#__PURE__*/React$d.createElement("path", _extends$b({}, filterProps(others, true), {
      fill: rangePath.slice(-1) === 'Z' ? others.fill : 'none',
      stroke: "none",
      d: rangePath
    })), hasStroke ? /*#__PURE__*/React$d.createElement("path", _extends$b({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(points, connectNulls)
    })) : null, hasStroke ? /*#__PURE__*/React$d.createElement("path", _extends$b({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(baseLinePoints, connectNulls)
    })) : null);
  }
  var singlePath = getSinglePolygonPath(points, connectNulls);
  return /*#__PURE__*/React$d.createElement("path", _extends$b({}, filterProps(others, true), {
    fill: singlePath.slice(-1) === 'Z' ? others.fill : 'none',
    className: layerClass,
    d: singlePath
  }));
};

function _extends$a() { _extends$a = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }
/**
 * @fileOverview Dot
 */
const React$c = await importShared('react');
var Dot = function Dot(props) {
  var cx = props.cx,
    cy = props.cy,
    r = props.r,
    className = props.className;
  var layerClass = clsx('recharts-dot', className);
  if (cx === +cx && cy === +cy && r === +r) {
    return /*#__PURE__*/React$c.createElement("circle", _extends$a({}, filterProps(props, false), adaptEventHandlers(props), {
      className: layerClass,
      cx: cx,
      cy: cy,
      r: r
    }));
  }
  return null;
};

function _typeof$e(o) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$e(o); }
var _excluded$3 = ["x", "y", "top", "left", "width", "height", "className"];
function _extends$9() { _extends$9 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }
function ownKeys$d(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$d(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$d(Object(t), true).forEach(function (r) { _defineProperty$e(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$e(obj, key, value) { key = _toPropertyKey$e(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$e(t) { var i = _toPrimitive$e(t, "string"); return "symbol" == _typeof$e(i) ? i : i + ""; }
function _toPrimitive$e(t, r) { if ("object" != _typeof$e(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$e(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$3(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$3(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
/**
 * @fileOverview Cross
 */
const React$b = await importShared('react');
var getPath = function getPath(x, y, width, height, top, left) {
  return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
};
var Cross = function Cross(_ref) {
  var _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 0 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 0 : _ref$height,
    className = _ref.className,
    rest = _objectWithoutProperties$3(_ref, _excluded$3);
  var props = _objectSpread$d({
    x: x,
    y: y,
    top: top,
    left: left,
    width: width,
    height: height
  }, rest);
  if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) {
    return null;
  }
  return /*#__PURE__*/React$b.createElement("path", _extends$9({}, filterProps(props, true), {
    className: clsx('recharts-cross', className),
    d: getPath(x, y, width, height, top, left)
  }));
};

var baseExtremum$1 = _baseExtremum,
    baseGt = _baseGt,
    baseIteratee$4 = _baseIteratee;

/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.maxBy(objects, 'n');
 * // => { 'n': 2 }
 */
function maxBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum$1(array, baseIteratee$4(iteratee), baseGt)
    : undefined;
}

var maxBy_1 = maxBy;

const maxBy$1 = /*@__PURE__*/getDefaultExportFromCjs(maxBy_1);

var baseExtremum = _baseExtremum,
    baseIteratee$3 = _baseIteratee,
    baseLt = _baseLt;

/**
 * This method is like `_.min` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.minBy(objects, function(o) { return o.n; });
 * // => { 'n': 1 }
 *
 * // The `_.property` iteratee shorthand.
 * _.minBy(objects, 'n');
 * // => { 'n': 1 }
 */
function minBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum(array, baseIteratee$3(iteratee), baseLt)
    : undefined;
}

var minBy_1 = minBy;

const minBy$1 = /*@__PURE__*/getDefaultExportFromCjs(minBy_1);

var _excluded$2 = ["cx", "cy", "angle", "ticks", "axisLine"],
  _excluded2$1 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function _typeof$d(o) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$d(o); }
function _extends$8() { _extends$8 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }
function ownKeys$c(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$c(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$c(Object(t), true).forEach(function (r) { _defineProperty$d(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$d(descriptor.key), descriptor); } }
function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$9(Constructor.prototype, protoProps); if (staticProps) _defineProperties$9(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$7(t, o, e) { return o = _getPrototypeOf$7(o), _possibleConstructorReturn$7(t, _isNativeReflectConstruct$7() ? Reflect.construct(o, e || [], _getPrototypeOf$7(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$7(self, call) { if (call && (_typeof$d(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$7(self); }
function _assertThisInitialized$7(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$7() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$7 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$7(o) { _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$7(o); }
function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$7(subClass, superClass); }
function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }
function _defineProperty$d(obj, key, value) { key = _toPropertyKey$d(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$d(t) { var i = _toPrimitive$d(t, "string"); return "symbol" == _typeof$d(i) ? i : i + ""; }
function _toPrimitive$d(t, r) { if ("object" != _typeof$d(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$d(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview The axis of polar coordinate system
 */
const React$a = await importShared('react');
const {PureComponent: PureComponent$3} = React$a;
var PolarRadiusAxis = /*#__PURE__*/function (_PureComponent) {
  function PolarRadiusAxis() {
    _classCallCheck$9(this, PolarRadiusAxis);
    return _callSuper$7(this, PolarRadiusAxis, arguments);
  }
  _inherits$7(PolarRadiusAxis, _PureComponent);
  return _createClass$9(PolarRadiusAxis, [{
    key: "getTickValueCoord",
    value:
    /**
     * Calculate the coordinate of tick
     * @param  {Number} coordinate The radius of tick
     * @return {Object} (x, y)
     */
    function getTickValueCoord(_ref) {
      var coordinate = _ref.coordinate;
      var _this$props = this.props,
        angle = _this$props.angle,
        cx = _this$props.cx,
        cy = _this$props.cy;
      return polarToCartesian(cx, cy, coordinate, angle);
    }
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var orientation = this.props.orientation;
      var textAnchor;
      switch (orientation) {
        case 'left':
          textAnchor = 'end';
          break;
        case 'right':
          textAnchor = 'start';
          break;
        default:
          textAnchor = 'middle';
          break;
      }
      return textAnchor;
    }
  }, {
    key: "getViewBox",
    value: function getViewBox() {
      var _this$props2 = this.props,
        cx = _this$props2.cx,
        cy = _this$props2.cy,
        angle = _this$props2.angle,
        ticks = _this$props2.ticks;
      var maxRadiusTick = maxBy$1(ticks, function (entry) {
        return entry.coordinate || 0;
      });
      var minRadiusTick = minBy$1(ticks, function (entry) {
        return entry.coordinate || 0;
      });
      return {
        cx: cx,
        cy: cy,
        startAngle: angle,
        endAngle: angle,
        innerRadius: minRadiusTick.coordinate || 0,
        outerRadius: maxRadiusTick.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props3 = this.props,
        cx = _this$props3.cx,
        cy = _this$props3.cy,
        angle = _this$props3.angle,
        ticks = _this$props3.ticks,
        axisLine = _this$props3.axisLine,
        others = _objectWithoutProperties$2(_this$props3, _excluded$2);
      var extent = ticks.reduce(function (result, entry) {
        return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
      }, [Infinity, -Infinity]);
      var point0 = polarToCartesian(cx, cy, extent[0], angle);
      var point1 = polarToCartesian(cx, cy, extent[1], angle);
      var props = _objectSpread$c(_objectSpread$c(_objectSpread$c({}, filterProps(others, false)), {}, {
        fill: 'none'
      }, filterProps(axisLine, false)), {}, {
        x1: point0.x,
        y1: point0.y,
        x2: point1.x,
        y2: point1.y
      });
      return /*#__PURE__*/React$a.createElement("line", _extends$8({
        className: "recharts-polar-radius-axis-line"
      }, props));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props4 = this.props,
        ticks = _this$props4.ticks,
        tick = _this$props4.tick,
        angle = _this$props4.angle,
        tickFormatter = _this$props4.tickFormatter,
        stroke = _this$props4.stroke,
        others = _objectWithoutProperties$2(_this$props4, _excluded2$1);
      var textAnchor = this.getTickTextAnchor();
      var axisProps = filterProps(others, false);
      var customTickProps = filterProps(tick, false);
      var items = ticks.map(function (entry, i) {
        var coord = _this.getTickValueCoord(entry);
        var tickProps = _objectSpread$c(_objectSpread$c(_objectSpread$c(_objectSpread$c({
          textAnchor: textAnchor,
          transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
        }, axisProps), {}, {
          stroke: 'none',
          fill: stroke
        }, customTickProps), {}, {
          index: i
        }, coord), {}, {
          payload: entry
        });
        return /*#__PURE__*/React$a.createElement(Layer, _extends$8({
          className: clsx('recharts-polar-radius-axis-tick', getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), PolarRadiusAxis.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /*#__PURE__*/React$a.createElement(Layer, {
        className: "recharts-polar-radius-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        ticks = _this$props5.ticks,
        axisLine = _this$props5.axisLine,
        tick = _this$props5.tick;
      if (!ticks || !ticks.length) {
        return null;
      }
      return /*#__PURE__*/React$a.createElement(Layer, {
        className: clsx('recharts-polar-radius-axis', this.props.className)
      }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if ( /*#__PURE__*/React$a.isValidElement(option)) {
        tickItem = /*#__PURE__*/React$a.cloneElement(option, props);
      } else if (isFunction$3(option)) {
        tickItem = option(props);
      } else {
        tickItem = /*#__PURE__*/React$a.createElement(Text, _extends$8({}, props, {
          className: "recharts-polar-radius-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(PureComponent$3);
_defineProperty$d(PolarRadiusAxis, "displayName", 'PolarRadiusAxis');
_defineProperty$d(PolarRadiusAxis, "axisType", 'radiusAxis');
_defineProperty$d(PolarRadiusAxis, "defaultProps", {
  type: 'number',
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: 'right',
  stroke: '#ccc',
  axisLine: true,
  tick: true,
  tickCount: 5,
  allowDataOverflow: false,
  scale: 'auto',
  allowDuplicatedCategory: true
});

function _typeof$c(o) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$c(o); }
function _extends$7() { _extends$7 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }
function ownKeys$b(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$b(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$b(Object(t), true).forEach(function (r) { _defineProperty$c(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$c(descriptor.key), descriptor); } }
function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$8(Constructor.prototype, protoProps); if (staticProps) _defineProperties$8(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$6(t, o, e) { return o = _getPrototypeOf$6(o), _possibleConstructorReturn$6(t, _isNativeReflectConstruct$6() ? Reflect.construct(o, e || [], _getPrototypeOf$6(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$6(self, call) { if (call && (_typeof$c(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$6(self); }
function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$6() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$6 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$6(o) { _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$6(o); }
function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$6(subClass, superClass); }
function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }
function _defineProperty$c(obj, key, value) { key = _toPropertyKey$c(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$c(t) { var i = _toPrimitive$c(t, "string"); return "symbol" == _typeof$c(i) ? i : i + ""; }
function _toPrimitive$c(t, r) { if ("object" != _typeof$c(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$c(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview Axis of radial direction
 */
const React$9 = await importShared('react');
const {PureComponent: PureComponent$2} = React$9;
var RADIAN = Math.PI / 180;
var eps = 1e-5;
var PolarAngleAxis = /*#__PURE__*/function (_PureComponent) {
  function PolarAngleAxis() {
    _classCallCheck$8(this, PolarAngleAxis);
    return _callSuper$6(this, PolarAngleAxis, arguments);
  }
  _inherits$6(PolarAngleAxis, _PureComponent);
  return _createClass$8(PolarAngleAxis, [{
    key: "getTickLineCoord",
    value:
    /**
     * Calculate the coordinate of line endpoint
     * @param  {Object} data The Data if ticks
     * @return {Object} (x0, y0): The start point of text,
     *                  (x1, y1): The end point close to text,
     *                  (x2, y2): The end point close to axis
     */
    function getTickLineCoord(data) {
      var _this$props = this.props,
        cx = _this$props.cx,
        cy = _this$props.cy,
        radius = _this$props.radius,
        orientation = _this$props.orientation,
        tickSize = _this$props.tickSize;
      var tickLineSize = tickSize || 8;
      var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
      var p2 = polarToCartesian(cx, cy, radius + (orientation === 'inner' ? -1 : 1) * tickLineSize, data.coordinate);
      return {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y
      };
    }

    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor(data) {
      var orientation = this.props.orientation;
      var cos = Math.cos(-data.coordinate * RADIAN);
      var textAnchor;
      if (cos > eps) {
        textAnchor = orientation === 'outer' ? 'start' : 'end';
      } else if (cos < -1e-5) {
        textAnchor = orientation === 'outer' ? 'end' : 'start';
      } else {
        textAnchor = 'middle';
      }
      return textAnchor;
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props2 = this.props,
        cx = _this$props2.cx,
        cy = _this$props2.cy,
        radius = _this$props2.radius,
        axisLine = _this$props2.axisLine,
        axisLineType = _this$props2.axisLineType;
      var props = _objectSpread$b(_objectSpread$b({}, filterProps(this.props, false)), {}, {
        fill: 'none'
      }, filterProps(axisLine, false));
      if (axisLineType === 'circle') {
        return /*#__PURE__*/React$9.createElement(Dot, _extends$7({
          className: "recharts-polar-angle-axis-line"
        }, props, {
          cx: cx,
          cy: cy,
          r: radius
        }));
      }
      var ticks = this.props.ticks;
      var points = ticks.map(function (entry) {
        return polarToCartesian(cx, cy, radius, entry.coordinate);
      });
      return /*#__PURE__*/React$9.createElement(Polygon, _extends$7({
        className: "recharts-polar-angle-axis-line"
      }, props, {
        points: points
      }));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props3 = this.props,
        ticks = _this$props3.ticks,
        tick = _this$props3.tick,
        tickLine = _this$props3.tickLine,
        tickFormatter = _this$props3.tickFormatter,
        stroke = _this$props3.stroke;
      var axisProps = filterProps(this.props, false);
      var customTickProps = filterProps(tick, false);
      var tickLineProps = _objectSpread$b(_objectSpread$b({}, axisProps), {}, {
        fill: 'none'
      }, filterProps(tickLine, false));
      var items = ticks.map(function (entry, i) {
        var lineCoord = _this.getTickLineCoord(entry);
        var textAnchor = _this.getTickTextAnchor(entry);
        var tickProps = _objectSpread$b(_objectSpread$b(_objectSpread$b({
          textAnchor: textAnchor
        }, axisProps), {}, {
          stroke: 'none',
          fill: stroke
        }, customTickProps), {}, {
          index: i,
          payload: entry,
          x: lineCoord.x2,
          y: lineCoord.y2
        });
        return /*#__PURE__*/React$9.createElement(Layer, _extends$7({
          className: clsx('recharts-polar-angle-axis-tick', getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), tickLine && /*#__PURE__*/React$9.createElement("line", _extends$7({
          className: "recharts-polar-angle-axis-tick-line"
        }, tickLineProps, lineCoord)), tick && PolarAngleAxis.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /*#__PURE__*/React$9.createElement(Layer, {
        className: "recharts-polar-angle-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        ticks = _this$props4.ticks,
        radius = _this$props4.radius,
        axisLine = _this$props4.axisLine;
      if (radius <= 0 || !ticks || !ticks.length) {
        return null;
      }
      return /*#__PURE__*/React$9.createElement(Layer, {
        className: clsx('recharts-polar-angle-axis', this.props.className)
      }, axisLine && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if ( /*#__PURE__*/React$9.isValidElement(option)) {
        tickItem = /*#__PURE__*/React$9.cloneElement(option, props);
      } else if (isFunction$3(option)) {
        tickItem = option(props);
      } else {
        tickItem = /*#__PURE__*/React$9.createElement(Text, _extends$7({}, props, {
          className: "recharts-polar-angle-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(PureComponent$2);
_defineProperty$c(PolarAngleAxis, "displayName", 'PolarAngleAxis');
_defineProperty$c(PolarAngleAxis, "axisType", 'angleAxis');
_defineProperty$c(PolarAngleAxis, "defaultProps", {
  type: 'category',
  angleAxisId: 0,
  scale: 'auto',
  cx: 0,
  cy: 0,
  orientation: 'outer',
  axisLine: true,
  tickLine: true,
  tickSize: 8,
  tick: true,
  hide: false,
  allowDuplicatedCategory: true
});

var overArg = _overArg;

/** Built-in value references. */
var getPrototype$1 = overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$1;

var baseGetTag$1 = _baseGetTag,
    getPrototype = _getPrototype,
    isObjectLike$1 = isObjectLike_1;

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject;

const isPlainObject$1 = /*@__PURE__*/getDefaultExportFromCjs(isPlainObject_1);

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && baseGetTag(value) == boolTag);
}

var isBoolean_1 = isBoolean;

const isBoolean$1 = /*@__PURE__*/getDefaultExportFromCjs(isBoolean_1);

function _typeof$b(o) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$b(o); }
function _extends$6() { _extends$6 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$a(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$a(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$a(Object(t), true).forEach(function (r) { _defineProperty$b(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(t) { var i = _toPrimitive$b(t, "string"); return "symbol" == _typeof$b(i) ? i : i + ""; }
function _toPrimitive$b(t, r) { if ("object" != _typeof$b(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$b(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileOverview Rectangle
 */
const React$8 = await importShared('react');
const {useEffect: useEffect$1,useRef,useState: useState$1} = React$8;
var getTrapezoidPath = function getTrapezoidPath(x, y, upperWidth, lowerWidth, height) {
  var widthGap = upperWidth - lowerWidth;
  var path;
  path = "M ".concat(x, ",").concat(y);
  path += "L ".concat(x + upperWidth, ",").concat(y);
  path += "L ".concat(x + upperWidth - widthGap / 2, ",").concat(y + height);
  path += "L ".concat(x + upperWidth - widthGap / 2 - lowerWidth, ",").concat(y + height);
  path += "L ".concat(x, ",").concat(y, " Z");
  return path;
};
var defaultProps = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
var Trapezoid = function Trapezoid(props) {
  var trapezoidProps = _objectSpread$a(_objectSpread$a({}, defaultProps), props);
  var pathRef = useRef();
  var _useState = useState$1(-1),
    _useState2 = _slicedToArray$2(_useState, 2),
    totalLength = _useState2[0],
    setTotalLength = _useState2[1];
  useEffect$1(function () {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (err) {
        // calculate total length error
      }
    }
  }, []);
  var x = trapezoidProps.x,
    y = trapezoidProps.y,
    upperWidth = trapezoidProps.upperWidth,
    lowerWidth = trapezoidProps.lowerWidth,
    height = trapezoidProps.height,
    className = trapezoidProps.className;
  var animationEasing = trapezoidProps.animationEasing,
    animationDuration = trapezoidProps.animationDuration,
    animationBegin = trapezoidProps.animationBegin,
    isUpdateAnimationActive = trapezoidProps.isUpdateAnimationActive;
  if (x !== +x || y !== +y || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx('recharts-trapezoid', className);
  if (!isUpdateAnimationActive) {
    return /*#__PURE__*/React$8.createElement("g", null, /*#__PURE__*/React$8.createElement("path", _extends$6({}, filterProps(trapezoidProps, true), {
      className: layerClass,
      d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height)
    })));
  }
  return /*#__PURE__*/React$8.createElement(Animate, {
    canBegin: totalLength > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: height,
      x: x,
      y: y
    },
    to: {
      upperWidth: upperWidth,
      lowerWidth: lowerWidth,
      height: height,
      x: x,
      y: y
    },
    duration: animationDuration,
    animationEasing: animationEasing,
    isActive: isUpdateAnimationActive
  }, function (_ref) {
    var currUpperWidth = _ref.upperWidth,
      currLowerWidth = _ref.lowerWidth,
      currHeight = _ref.height,
      currX = _ref.x,
      currY = _ref.y;
    return /*#__PURE__*/React$8.createElement(Animate, {
      canBegin: totalLength > 0,
      from: "0px ".concat(totalLength === -1 ? 1 : totalLength, "px"),
      to: "".concat(totalLength, "px 0px"),
      attributeName: "strokeDasharray",
      begin: animationBegin,
      duration: animationDuration,
      easing: animationEasing
    }, /*#__PURE__*/React$8.createElement("path", _extends$6({}, filterProps(trapezoidProps, true), {
      className: layerClass,
      d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
      ref: pathRef
    })));
  });
};

var _excluded$1 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function _typeof$a(o) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$a(o); }
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function ownKeys$9(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$9(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$9(Object(t), true).forEach(function (r) { _defineProperty$a(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(t) { var i = _toPrimitive$a(t, "string"); return "symbol" == _typeof$a(i) ? i : i + ""; }
function _toPrimitive$a(t, r) { if ("object" != _typeof$a(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$a(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const React$7 = await importShared('react');
const {isValidElement: isValidElement$2,cloneElement: cloneElement$2} = React$7;

/**
 * This is an abstraction for rendering a user defined prop for a customized shape in several forms.
 *
 * <Shape /> is the root and will handle taking in:
 *  - an object of svg properties
 *  - a boolean
 *  - a render prop(inline function that returns jsx)
 *  - a react element
 *
 * <ShapeSelector /> is a subcomponent of <Shape /> and used to match a component
 * to the value of props.shapeType that is passed to the root.
 *
 */

function defaultPropTransformer(option, props) {
  return _objectSpread$9(_objectSpread$9({}, props), option);
}
function isSymbolsProps(shapeType, _elementProps) {
  return shapeType === 'symbols';
}
function ShapeSelector(_ref) {
  var shapeType = _ref.shapeType,
    elementProps = _ref.elementProps;
  switch (shapeType) {
    case 'rectangle':
      return /*#__PURE__*/React$7.createElement(Rectangle, elementProps);
    case 'trapezoid':
      return /*#__PURE__*/React$7.createElement(Trapezoid, elementProps);
    case 'sector':
      return /*#__PURE__*/React$7.createElement(Sector, elementProps);
    case 'symbols':
      if (isSymbolsProps(shapeType)) {
        return /*#__PURE__*/React$7.createElement(Symbols, elementProps);
      }
      break;
    default:
      return null;
  }
}
function getPropsFromShapeOption(option) {
  if ( /*#__PURE__*/isValidElement$2(option)) {
    return option.props;
  }
  return option;
}
function Shape(_ref2) {
  var option = _ref2.option,
    shapeType = _ref2.shapeType,
    _ref2$propTransformer = _ref2.propTransformer,
    propTransformer = _ref2$propTransformer === void 0 ? defaultPropTransformer : _ref2$propTransformer,
    _ref2$activeClassName = _ref2.activeClassName,
    activeClassName = _ref2$activeClassName === void 0 ? 'recharts-active-shape' : _ref2$activeClassName,
    isActive = _ref2.isActive,
    props = _objectWithoutProperties$1(_ref2, _excluded$1);
  var shape;
  if ( /*#__PURE__*/isValidElement$2(option)) {
    shape = /*#__PURE__*/cloneElement$2(option, _objectSpread$9(_objectSpread$9({}, props), getPropsFromShapeOption(option)));
  } else if (isFunction$3(option)) {
    shape = option(props);
  } else if (isPlainObject$1(option) && !isBoolean$1(option)) {
    var nextProps = propTransformer(option, props);
    shape = /*#__PURE__*/React$7.createElement(ShapeSelector, {
      shapeType: shapeType,
      elementProps: nextProps
    });
  } else {
    var elementProps = props;
    shape = /*#__PURE__*/React$7.createElement(ShapeSelector, {
      shapeType: shapeType,
      elementProps: elementProps
    });
  }
  if (isActive) {
    return /*#__PURE__*/React$7.createElement(Layer, {
      className: activeClassName
    }, shape);
  }
  return shape;
}

/**
 * This is an abstraction to handle identifying the active index from a tooltip mouse interaction
 */

function isFunnel(graphicalItem, _item) {
  return _item != null && 'trapezoids' in graphicalItem.props;
}
function isPie(graphicalItem, _item) {
  return _item != null && 'sectors' in graphicalItem.props;
}
function isScatter(graphicalItem, _item) {
  return _item != null && 'points' in graphicalItem.props;
}
function compareFunnel(shapeData, activeTooltipItem) {
  var _activeTooltipItem$la, _activeTooltipItem$la2;
  var xMatches = shapeData.x === (activeTooltipItem === null || activeTooltipItem === void 0 || (_activeTooltipItem$la = activeTooltipItem.labelViewBox) === null || _activeTooltipItem$la === void 0 ? void 0 : _activeTooltipItem$la.x) || shapeData.x === activeTooltipItem.x;
  var yMatches = shapeData.y === (activeTooltipItem === null || activeTooltipItem === void 0 || (_activeTooltipItem$la2 = activeTooltipItem.labelViewBox) === null || _activeTooltipItem$la2 === void 0 ? void 0 : _activeTooltipItem$la2.y) || shapeData.y === activeTooltipItem.y;
  return xMatches && yMatches;
}
function comparePie(shapeData, activeTooltipItem) {
  var startAngleMatches = shapeData.endAngle === activeTooltipItem.endAngle;
  var endAngleMatches = shapeData.startAngle === activeTooltipItem.startAngle;
  return startAngleMatches && endAngleMatches;
}
function compareScatter(shapeData, activeTooltipItem) {
  var xMatches = shapeData.x === activeTooltipItem.x;
  var yMatches = shapeData.y === activeTooltipItem.y;
  var zMatches = shapeData.z === activeTooltipItem.z;
  return xMatches && yMatches && zMatches;
}
function getComparisonFn(graphicalItem, activeItem) {
  var comparison;
  if (isFunnel(graphicalItem, activeItem)) {
    comparison = compareFunnel;
  } else if (isPie(graphicalItem, activeItem)) {
    comparison = comparePie;
  } else if (isScatter(graphicalItem, activeItem)) {
    comparison = compareScatter;
  }
  return comparison;
}
function getShapeDataKey(graphicalItem, activeItem) {
  var shapeKey;
  if (isFunnel(graphicalItem, activeItem)) {
    shapeKey = 'trapezoids';
  } else if (isPie(graphicalItem, activeItem)) {
    shapeKey = 'sectors';
  } else if (isScatter(graphicalItem, activeItem)) {
    shapeKey = 'points';
  }
  return shapeKey;
}
function getActiveShapeTooltipPayload(graphicalItem, activeItem) {
  if (isFunnel(graphicalItem, activeItem)) {
    var _activeItem$tooltipPa;
    return (_activeItem$tooltipPa = activeItem.tooltipPayload) === null || _activeItem$tooltipPa === void 0 || (_activeItem$tooltipPa = _activeItem$tooltipPa[0]) === null || _activeItem$tooltipPa === void 0 || (_activeItem$tooltipPa = _activeItem$tooltipPa.payload) === null || _activeItem$tooltipPa === void 0 ? void 0 : _activeItem$tooltipPa.payload;
  }
  if (isPie(graphicalItem, activeItem)) {
    var _activeItem$tooltipPa2;
    return (_activeItem$tooltipPa2 = activeItem.tooltipPayload) === null || _activeItem$tooltipPa2 === void 0 || (_activeItem$tooltipPa2 = _activeItem$tooltipPa2[0]) === null || _activeItem$tooltipPa2 === void 0 || (_activeItem$tooltipPa2 = _activeItem$tooltipPa2.payload) === null || _activeItem$tooltipPa2 === void 0 ? void 0 : _activeItem$tooltipPa2.payload;
  }
  if (isScatter(graphicalItem, activeItem)) {
    return activeItem.payload;
  }
  return {};
}
/**
 *
 * @param {GetActiveShapeIndexForTooltip} arg an object of incoming attributes from Tooltip
 * @returns {number}
 *
 * To handle possible duplicates in the data set,
 * match both the data value of the active item to a data value on a graph item,
 * and match the mouse coordinates of the active item to the coordinates of in a particular components shape data.
 * This assumes equal lengths of shape objects to data items.
 */
function getActiveShapeIndexForTooltip(_ref3) {
  var activeTooltipItem = _ref3.activeTooltipItem,
    graphicalItem = _ref3.graphicalItem,
    itemData = _ref3.itemData;
  var shapeKey = getShapeDataKey(graphicalItem, activeTooltipItem);
  var tooltipPayload = getActiveShapeTooltipPayload(graphicalItem, activeTooltipItem);
  var activeItemMatches = itemData.filter(function (datum, dataIndex) {
    var valuesMatch = isEqual$1(tooltipPayload, datum);
    var mouseCoordinateMatches = graphicalItem.props[shapeKey].filter(function (shapeData) {
      var comparison = getComparisonFn(graphicalItem, activeTooltipItem);
      return comparison(shapeData, activeTooltipItem);
    });

    // get the last index in case of multiple matches
    var indexOfMouseCoordinates = graphicalItem.props[shapeKey].indexOf(mouseCoordinateMatches[mouseCoordinateMatches.length - 1]);
    var coordinatesMatch = dataIndex === indexOfMouseCoordinates;
    return valuesMatch && coordinatesMatch;
  });

  // get the last index in case of multiple matches
  var activeIndex = itemData.indexOf(activeItemMatches[activeItemMatches.length - 1]);
  return activeIndex;
}

var _Pie;
function _typeof$9(o) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$9(o); }
function _extends$5() { _extends$5 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }
function ownKeys$8(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$8(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$8(Object(t), true).forEach(function (r) { _defineProperty$9(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$9(descriptor.key), descriptor); } }
function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$7(Constructor.prototype, protoProps); if (staticProps) _defineProperties$7(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$5(t, o, e) { return o = _getPrototypeOf$5(o), _possibleConstructorReturn$5(t, _isNativeReflectConstruct$5() ? Reflect.construct(o, e || [], _getPrototypeOf$5(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$9(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$5(self); }
function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$5() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$5 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }
function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$5(subClass, superClass); }
function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(t) { var i = _toPrimitive$9(t, "string"); return "symbol" == _typeof$9(i) ? i : i + ""; }
function _toPrimitive$9(t, r) { if ("object" != _typeof$9(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$9(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
/**
 * @fileOverview Render sectors of a pie
 */
const React$6 = await importShared('react');
const {PureComponent: PureComponent$1} = React$6;
var Pie = /*#__PURE__*/function (_PureComponent) {
  function Pie(props) {
    var _this;
    _classCallCheck$7(this, Pie);
    _this = _callSuper$5(this, Pie, [props]);
    _defineProperty$9(_this, "pieRef", null);
    _defineProperty$9(_this, "sectorRefs", []);
    _defineProperty$9(_this, "id", uniqueId('recharts-pie-'));
    _defineProperty$9(_this, "handleAnimationEnd", function () {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction$3(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty$9(_this, "handleAnimationStart", function () {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction$3(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _this.state = {
      isAnimationFinished: !props.isAnimationActive,
      prevIsAnimationActive: props.isAnimationActive,
      prevAnimationId: props.animationId,
      sectorToFocus: 0
    };
    return _this;
  }
  _inherits$5(Pie, _PureComponent);
  return _createClass$7(Pie, [{
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;
      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }
      return i === activeIndex;
    }
  }, {
    key: "hasActiveIndex",
    value: function hasActiveIndex() {
      var activeIndex = this.props.activeIndex;
      return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props,
        label = _this$props.label,
        labelLine = _this$props.labelLine,
        dataKey = _this$props.dataKey,
        valueKey = _this$props.valueKey;
      var pieProps = filterProps(this.props, false);
      var customLabelProps = filterProps(label, false);
      var customLabelLineProps = filterProps(labelLine, false);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function (entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
        var labelProps = _objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8({}, pieProps), entry), {}, {
          stroke: 'none'
        }, customLabelProps), {}, {
          index: i,
          textAnchor: Pie.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);
        var lineProps = _objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8({}, pieProps), entry), {}, {
          fill: 'none',
          stroke: entry.fill
        }, customLabelLineProps), {}, {
          index: i,
          points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
        });
        var realDataKey = dataKey;
        // TODO: compatible to lower versions
        if (isNil$1(dataKey) && isNil$1(valueKey)) {
          realDataKey = 'value';
        } else if (isNil$1(dataKey)) {
          realDataKey = valueKey;
        }
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          React$6.createElement(Layer, {
            key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
          }, labelLine && Pie.renderLabelLineItem(labelLine, lineProps, 'line'), Pie.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)))
        );
      });
      return /*#__PURE__*/React$6.createElement(Layer, {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props,
        activeShape = _this$props2.activeShape,
        blendStroke = _this$props2.blendStroke,
        inactiveShapeProp = _this$props2.inactiveShape;
      return sectors.map(function (entry, i) {
        if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
        var isActive = _this2.isActiveIndex(i);
        var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
        var sectorOptions = isActive ? activeShape : inactiveShape;
        var sectorProps = _objectSpread$8(_objectSpread$8({}, entry), {}, {
          stroke: blendStroke ? entry.fill : entry.stroke,
          tabIndex: -1
        });
        return /*#__PURE__*/React$6.createElement(Layer, _extends$5({
          ref: function ref(_ref) {
            if (_ref && !_this2.sectorRefs.includes(_ref)) {
              _this2.sectorRefs.push(_ref);
            }
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
        }), /*#__PURE__*/React$6.createElement(Shape, _extends$5({
          option: sectorOptions,
          isActive: isActive,
          shapeType: "sector"
        }, sectorProps)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props,
        sectors = _this$props3.sectors,
        isAnimationActive = _this$props3.isAnimationActive,
        animationBegin = _this$props3.animationBegin,
        animationDuration = _this$props3.animationDuration,
        animationEasing = _this$props3.animationEasing,
        animationId = _this$props3.animationId;
      var _this$state = this.state,
        prevSectors = _this$state.prevSectors,
        prevIsAnimationActive = _this$state.prevIsAnimationActive;
      return /*#__PURE__*/React$6.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function (_ref2) {
        var t = _ref2.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function (entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? get$2(entry, 'paddingAngle', 0) : 0;
          if (prev) {
            var angleIp = interpolateNumber$2(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
            var latest = _objectSpread$8(_objectSpread$8({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });
            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle,
              startAngle = entry.startAngle;
            var interpolatorAngle = interpolateNumber$2(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);
            var _latest = _objectSpread$8(_objectSpread$8({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });
            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return /*#__PURE__*/React$6.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function attachKeyboardHandlers(pieRef) {
      var _this4 = this;
      // eslint-disable-next-line no-param-reassign
      pieRef.onkeydown = function (e) {
        if (!e.altKey) {
          switch (e.key) {
            case 'ArrowLeft':
              {
                var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
                _this4.sectorRefs[next].focus();
                _this4.setState({
                  sectorToFocus: next
                });
                break;
              }
            case 'ArrowRight':
              {
                var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
                _this4.sectorRefs[_next].focus();
                _this4.setState({
                  sectorToFocus: _next
                });
                break;
              }
            case 'Escape':
              {
                _this4.sectorRefs[_this4.state.sectorToFocus].blur();
                _this4.setState({
                  sectorToFocus: 0
                });
                break;
              }
          }
        }
      };
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props,
        sectors = _this$props4.sectors,
        isAnimationActive = _this$props4.isAnimationActive;
      var prevSectors = this.state.prevSectors;
      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !isEqual$1(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.pieRef) {
        this.attachKeyboardHandlers(this.pieRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props5 = this.props,
        hide = _this$props5.hide,
        sectors = _this$props5.sectors,
        className = _this$props5.className,
        label = _this$props5.label,
        cx = _this$props5.cx,
        cy = _this$props5.cy,
        innerRadius = _this$props5.innerRadius,
        outerRadius = _this$props5.outerRadius,
        isAnimationActive = _this$props5.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) {
        return null;
      }
      var layerClass = clsx('recharts-pie', className);
      return /*#__PURE__*/React$6.createElement(Layer, {
        tabIndex: this.props.rootTabIndex,
        className: layerClass,
        ref: function ref(_ref3) {
          _this5.pieRef = _ref3;
        }
      }, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) {
        return {
          prevIsAnimationActive: nextProps.isAnimationActive,
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: [],
          isAnimationFinished: true
        };
      }
      if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: prevState.curSectors,
          isAnimationFinished: true
        };
      }
      if (nextProps.sectors !== prevState.curSectors) {
        return {
          curSectors: nextProps.sectors,
          isAnimationFinished: true
        };
      }
      return null;
    }
  }, {
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return 'start';
      }
      if (x < cx) {
        return 'end';
      }
      return 'middle';
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props, key) {
      if ( /*#__PURE__*/React$6.isValidElement(option)) {
        return /*#__PURE__*/React$6.cloneElement(option, props);
      }
      if (isFunction$3(option)) {
        return option(props);
      }
      var className = clsx('recharts-pie-label-line', typeof option !== 'boolean' ? option.className : '');
      return /*#__PURE__*/React$6.createElement(Curve, _extends$5({}, props, {
        key: key,
        type: "linear",
        className: className
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if ( /*#__PURE__*/React$6.isValidElement(option)) {
        return /*#__PURE__*/React$6.cloneElement(option, props);
      }
      var label = value;
      if (isFunction$3(option)) {
        label = option(props);
        if ( /*#__PURE__*/React$6.isValidElement(label)) {
          return label;
        }
      }
      var className = clsx('recharts-pie-label-text', typeof option !== 'boolean' && !isFunction$3(option) ? option.className : '');
      return /*#__PURE__*/React$6.createElement(Text, _extends$5({}, props, {
        alignmentBaseline: "middle",
        className: className
      }), label);
    }
  }]);
}(PureComponent$1);
_Pie = Pie;
_defineProperty$9(Pie, "displayName", 'Pie');
_defineProperty$9(Pie, "defaultProps", {
  stroke: '#fff',
  fill: '#808080',
  legendType: 'rect',
  cx: '50%',
  cy: '50%',
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: '80%',
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !Global.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: 'ease',
  nameKey: 'name',
  blendStroke: false,
  rootTabIndex: 0
});
_defineProperty$9(Pie, "parseDeltaAngle", function (startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
});
_defineProperty$9(Pie, "getRealPieData", function (itemProps) {
  var data = itemProps.data,
    children = itemProps.children;
  var presentationProps = filterProps(itemProps, false);
  var cells = findAllByType(children, Cell);
  if (data && data.length) {
    return data.map(function (entry, index) {
      return _objectSpread$8(_objectSpread$8(_objectSpread$8({
        payload: entry
      }, presentationProps), entry), cells && cells[index] && cells[index].props);
    });
  }
  if (cells && cells.length) {
    return cells.map(function (cell) {
      return _objectSpread$8(_objectSpread$8({}, presentationProps), cell.props);
    });
  }
  return [];
});
_defineProperty$9(Pie, "parseCoordinateOfPie", function (itemProps, offset) {
  var top = offset.top,
    left = offset.left,
    width = offset.width,
    height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(itemProps.cx, width, width / 2);
  var cy = top + getPercentValue(itemProps.cy, height, height / 2);
  var innerRadius = getPercentValue(itemProps.innerRadius, maxPieRadius, 0);
  var outerRadius = getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx: cx,
    cy: cy,
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    maxRadius: maxRadius
  };
});
_defineProperty$9(Pie, "getComposedData", function (_ref4) {
  var item = _ref4.item,
    offset = _ref4.offset;
  var itemProps = item.type.defaultProps !== undefined ? _objectSpread$8(_objectSpread$8({}, item.type.defaultProps), item.props) : item.props;
  var pieData = _Pie.getRealPieData(itemProps);
  if (!pieData || !pieData.length) {
    return null;
  }
  var cornerRadius = itemProps.cornerRadius,
    startAngle = itemProps.startAngle,
    endAngle = itemProps.endAngle,
    paddingAngle = itemProps.paddingAngle,
    dataKey = itemProps.dataKey,
    nameKey = itemProps.nameKey,
    valueKey = itemProps.valueKey,
    tooltipType = itemProps.tooltipType;
  var minAngle = Math.abs(itemProps.minAngle);
  var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
  var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var realDataKey = dataKey;
  if (isNil$1(dataKey) && isNil$1(valueKey)) {
    warn(false, "Use \"dataKey\" to specify the value of pie,\n      the props \"valueKey\" will be deprecated in 1.1.0");
    realDataKey = 'value';
  } else if (isNil$1(dataKey)) {
    warn(false, "Use \"dataKey\" to specify the value of pie,\n      the props \"valueKey\" will be deprecated in 1.1.0");
    realDataKey = valueKey;
  }
  var notZeroItemCount = pieData.filter(function (entry) {
    return getValueByDataKey(entry, realDataKey, 0) !== 0;
  }).length;
  var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
  var sum = pieData.reduce(function (result, entry) {
    var val = getValueByDataKey(entry, realDataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = pieData.map(function (entry, i) {
      var val = getValueByDataKey(entry, realDataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name: name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread$8(_objectSpread$8(_objectSpread$8({
        percent: percent,
        cornerRadius: cornerRadius,
        name: name,
        tooltipPayload: tooltipPayload,
        midAngle: midAngle,
        middleRadius: middleRadius,
        tooltipPosition: tooltipPosition
      }, entry), coordinate), {}, {
        value: getValueByDataKey(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: mathSign(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }
  return _objectSpread$8(_objectSpread$8({}, coordinate), {}, {
    sectors: sectors,
    data: pieData
  });
});

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange$1(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

var _baseRange = baseRange$1;

var toNumber = toNumber_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite$1(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -Infinity) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite$1;

var baseRange = _baseRange,
    isIterateeCall$2 = _isIterateeCall,
    toFinite = toFinite_1;

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange$1(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall$2(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

var _createRange = createRange$1;

var createRange = _createRange;

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = createRange();

var range_1 = range;

const range$1 = /*@__PURE__*/getDefaultExportFromCjs(range_1);

function _typeof$8(o) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$8(o); }
function ownKeys$7(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$7(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$7(Object(t), true).forEach(function (r) { _defineProperty$8(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(t) { var i = _toPrimitive$8(t, "string"); return "symbol" == _typeof$8(i) ? i : i + ""; }
function _toPrimitive$8(t, r) { if ("object" != _typeof$8(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$8(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PREFIX_LIST = ['Webkit', 'Moz', 'O', 'ms'];
var generatePrefixStyle = function generatePrefixStyle(name, value) {
  var camelName = name.replace(/(\w)/, function (v) {
    return v.toUpperCase();
  });
  var result = PREFIX_LIST.reduce(function (res, entry) {
    return _objectSpread$7(_objectSpread$7({}, res), {}, _defineProperty$8({}, entry + camelName, value));
  }, {});
  result[name] = value;
  return result;
};

function _typeof$7(o) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$7(o); }
function _extends$4() { _extends$4 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), true).forEach(function (r) { _defineProperty$7(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$7(descriptor.key), descriptor); } }
function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$4(t, o, e) { return o = _getPrototypeOf$4(o), _possibleConstructorReturn$4(t, _isNativeReflectConstruct$4() ? Reflect.construct(o, e || [], _getPrototypeOf$4(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$7(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$4(self); }
function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$4() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }
function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$4(subClass, superClass); }
function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(t) { var i = _toPrimitive$7(t, "string"); return "symbol" == _typeof$7(i) ? i : i + ""; }
function _toPrimitive$7(t, r) { if ("object" != _typeof$7(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$7(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
/**
 * @fileOverview Brush
 */
const React$5 = await importShared('react');
const {PureComponent,Children} = React$5;
var createScale = function createScale(_ref) {
  var data = _ref.data,
    startIndex = _ref.startIndex,
    endIndex = _ref.endIndex,
    x = _ref.x,
    width = _ref.width,
    travellerWidth = _ref.travellerWidth;
  if (!data || !data.length) {
    return {};
  }
  var len = data.length;
  var scale = point().domain(range$1(0, len)).range([x, x + width - travellerWidth]);
  var scaleValues = scale.domain().map(function (entry) {
    return scale(entry);
  });
  return {
    isTextActive: false,
    isSlideMoving: false,
    isTravellerMoving: false,
    isTravellerFocused: false,
    startX: scale(startIndex),
    endX: scale(endIndex),
    scale: scale,
    scaleValues: scaleValues
  };
};
var isTouch = function isTouch(e) {
  return e.changedTouches && !!e.changedTouches.length;
};
var Brush = /*#__PURE__*/function (_PureComponent) {
  function Brush(props) {
    var _this;
    _classCallCheck$6(this, Brush);
    _this = _callSuper$4(this, Brush, [props]);
    _defineProperty$7(_this, "handleDrag", function (e) {
      if (_this.leaveTimer) {
        clearTimeout(_this.leaveTimer);
        _this.leaveTimer = null;
      }
      if (_this.state.isTravellerMoving) {
        _this.handleTravellerMove(e);
      } else if (_this.state.isSlideMoving) {
        _this.handleSlideDrag(e);
      }
    });
    _defineProperty$7(_this, "handleTouchMove", function (e) {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        _this.handleDrag(e.changedTouches[0]);
      }
    });
    _defineProperty$7(_this, "handleDragEnd", function () {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: false
      }, function () {
        var _this$props = _this.props,
          endIndex = _this$props.endIndex,
          onDragEnd = _this$props.onDragEnd,
          startIndex = _this$props.startIndex;
        onDragEnd === null || onDragEnd === void 0 || onDragEnd({
          endIndex: endIndex,
          startIndex: startIndex
        });
      });
      _this.detachDragEndListener();
    });
    _defineProperty$7(_this, "handleLeaveWrapper", function () {
      if (_this.state.isTravellerMoving || _this.state.isSlideMoving) {
        _this.leaveTimer = window.setTimeout(_this.handleDragEnd, _this.props.leaveTimeOut);
      }
    });
    _defineProperty$7(_this, "handleEnterSlideOrTraveller", function () {
      _this.setState({
        isTextActive: true
      });
    });
    _defineProperty$7(_this, "handleLeaveSlideOrTraveller", function () {
      _this.setState({
        isTextActive: false
      });
    });
    _defineProperty$7(_this, "handleSlideDragStart", function (e) {
      var event = isTouch(e) ? e.changedTouches[0] : e;
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: true,
        slideMoveStartX: event.pageX
      });
      _this.attachDragEndListener();
    });
    _this.travellerDragStartHandlers = {
      startX: _this.handleTravellerDragStart.bind(_this, 'startX'),
      endX: _this.handleTravellerDragStart.bind(_this, 'endX')
    };
    _this.state = {};
    return _this;
  }
  _inherits$4(Brush, _PureComponent);
  return _createClass$6(Brush, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
      this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function getIndex(_ref2) {
      var startX = _ref2.startX,
        endX = _ref2.endX;
      var scaleValues = this.state.scaleValues;
      var _this$props2 = this.props,
        gap = _this$props2.gap,
        data = _this$props2.data;
      var lastIndex = data.length - 1;
      var min = Math.min(startX, endX);
      var max = Math.max(startX, endX);
      var minIndex = Brush.getIndexInRange(scaleValues, min);
      var maxIndex = Brush.getIndexInRange(scaleValues, max);
      return {
        startIndex: minIndex - minIndex % gap,
        endIndex: maxIndex === lastIndex ? lastIndex : maxIndex - maxIndex % gap
      };
    }
  }, {
    key: "getTextOfTick",
    value: function getTextOfTick(index) {
      var _this$props3 = this.props,
        data = _this$props3.data,
        tickFormatter = _this$props3.tickFormatter,
        dataKey = _this$props3.dataKey;
      var text = getValueByDataKey(data[index], dataKey, index);
      return isFunction$3(tickFormatter) ? tickFormatter(text, index) : text;
    }
  }, {
    key: "attachDragEndListener",
    value: function attachDragEndListener() {
      window.addEventListener('mouseup', this.handleDragEnd, true);
      window.addEventListener('touchend', this.handleDragEnd, true);
      window.addEventListener('mousemove', this.handleDrag, true);
    }
  }, {
    key: "detachDragEndListener",
    value: function detachDragEndListener() {
      window.removeEventListener('mouseup', this.handleDragEnd, true);
      window.removeEventListener('touchend', this.handleDragEnd, true);
      window.removeEventListener('mousemove', this.handleDrag, true);
    }
  }, {
    key: "handleSlideDrag",
    value: function handleSlideDrag(e) {
      var _this$state = this.state,
        slideMoveStartX = _this$state.slideMoveStartX,
        startX = _this$state.startX,
        endX = _this$state.endX;
      var _this$props4 = this.props,
        x = _this$props4.x,
        width = _this$props4.width,
        travellerWidth = _this$props4.travellerWidth,
        startIndex = _this$props4.startIndex,
        endIndex = _this$props4.endIndex,
        onChange = _this$props4.onChange;
      var delta = e.pageX - slideMoveStartX;
      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
      } else if (delta < 0) {
        delta = Math.max(delta, x - startX, x - endX);
      }
      var newIndex = this.getIndex({
        startX: startX + delta,
        endX: endX + delta
      });
      if ((newIndex.startIndex !== startIndex || newIndex.endIndex !== endIndex) && onChange) {
        onChange(newIndex);
      }
      this.setState({
        startX: startX + delta,
        endX: endX + delta,
        slideMoveStartX: e.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function handleTravellerDragStart(id, e) {
      var event = isTouch(e) ? e.changedTouches[0] : e;
      this.setState({
        isSlideMoving: false,
        isTravellerMoving: true,
        movingTravellerId: id,
        brushMoveStartX: event.pageX
      });
      this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function handleTravellerMove(e) {
      var _this$state2 = this.state,
        brushMoveStartX = _this$state2.brushMoveStartX,
        movingTravellerId = _this$state2.movingTravellerId,
        endX = _this$state2.endX,
        startX = _this$state2.startX;
      var prevValue = this.state[movingTravellerId];
      var _this$props5 = this.props,
        x = _this$props5.x,
        width = _this$props5.width,
        travellerWidth = _this$props5.travellerWidth,
        onChange = _this$props5.onChange,
        gap = _this$props5.gap,
        data = _this$props5.data;
      var params = {
        startX: this.state.startX,
        endX: this.state.endX
      };
      var delta = e.pageX - brushMoveStartX;
      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - prevValue);
      } else if (delta < 0) {
        delta = Math.max(delta, x - prevValue);
      }
      params[movingTravellerId] = prevValue + delta;
      var newIndex = this.getIndex(params);
      var startIndex = newIndex.startIndex,
        endIndex = newIndex.endIndex;
      var isFullGap = function isFullGap() {
        var lastIndex = data.length - 1;
        if (movingTravellerId === 'startX' && (endX > startX ? startIndex % gap === 0 : endIndex % gap === 0) || endX < startX && endIndex === lastIndex || movingTravellerId === 'endX' && (endX > startX ? endIndex % gap === 0 : startIndex % gap === 0) || endX > startX && endIndex === lastIndex) {
          return true;
        }
        return false;
      };
      this.setState(_defineProperty$7(_defineProperty$7({}, movingTravellerId, prevValue + delta), "brushMoveStartX", e.pageX), function () {
        if (onChange) {
          if (isFullGap()) {
            onChange(newIndex);
          }
        }
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function handleTravellerMoveKeyboard(direction, id) {
      var _this2 = this;
      // scaleValues are a list of coordinates. For example: [65, 250, 435, 620, 805, 990].
      var _this$state3 = this.state,
        scaleValues = _this$state3.scaleValues,
        startX = _this$state3.startX,
        endX = _this$state3.endX;
      // currentScaleValue refers to which coordinate the current traveller should be placed at.
      var currentScaleValue = this.state[id];
      var currentIndex = scaleValues.indexOf(currentScaleValue);
      if (currentIndex === -1) {
        return;
      }
      var newIndex = currentIndex + direction;
      if (newIndex === -1 || newIndex >= scaleValues.length) {
        return;
      }
      var newScaleValue = scaleValues[newIndex];

      // Prevent travellers from being on top of each other or overlapping
      if (id === 'startX' && newScaleValue >= endX || id === 'endX' && newScaleValue <= startX) {
        return;
      }
      this.setState(_defineProperty$7({}, id, newScaleValue), function () {
        _this2.props.onChange(_this2.getIndex({
          startX: _this2.state.startX,
          endX: _this2.state.endX
        }));
      });
    }
  }, {
    key: "renderBackground",
    value: function renderBackground() {
      var _this$props6 = this.props,
        x = _this$props6.x,
        y = _this$props6.y,
        width = _this$props6.width,
        height = _this$props6.height,
        fill = _this$props6.fill,
        stroke = _this$props6.stroke;
      return /*#__PURE__*/React$5.createElement("rect", {
        stroke: stroke,
        fill: fill,
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  }, {
    key: "renderPanorama",
    value: function renderPanorama() {
      var _this$props7 = this.props,
        x = _this$props7.x,
        y = _this$props7.y,
        width = _this$props7.width,
        height = _this$props7.height,
        data = _this$props7.data,
        children = _this$props7.children,
        padding = _this$props7.padding;
      var chartElement = Children.only(children);
      if (!chartElement) {
        return null;
      }
      return /*#__PURE__*/React$5.cloneElement(chartElement, {
        x: x,
        y: y,
        width: width,
        height: height,
        margin: padding,
        compact: true,
        data: data
      });
    }
  }, {
    key: "renderTravellerLayer",
    value: function renderTravellerLayer(travellerX, id) {
      var _data$startIndex,
        _data$endIndex,
        _this3 = this;
      var _this$props8 = this.props,
        y = _this$props8.y,
        travellerWidth = _this$props8.travellerWidth,
        height = _this$props8.height,
        traveller = _this$props8.traveller,
        ariaLabel = _this$props8.ariaLabel,
        data = _this$props8.data,
        startIndex = _this$props8.startIndex,
        endIndex = _this$props8.endIndex;
      var x = Math.max(travellerX, this.props.x);
      var travellerProps = _objectSpread$6(_objectSpread$6({}, filterProps(this.props, false)), {}, {
        x: x,
        y: y,
        width: travellerWidth,
        height: height
      });
      var ariaLabelBrush = ariaLabel || "Min value: ".concat((_data$startIndex = data[startIndex]) === null || _data$startIndex === void 0 ? void 0 : _data$startIndex.name, ", Max value: ").concat((_data$endIndex = data[endIndex]) === null || _data$endIndex === void 0 ? void 0 : _data$endIndex.name);
      return /*#__PURE__*/React$5.createElement(Layer, {
        tabIndex: 0,
        role: "slider",
        "aria-label": ariaLabelBrush,
        "aria-valuenow": travellerX,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[id],
        onTouchStart: this.travellerDragStartHandlers[id],
        onKeyDown: function onKeyDown(e) {
          if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          _this3.handleTravellerMoveKeyboard(e.key === 'ArrowRight' ? 1 : -1, id);
        },
        onFocus: function onFocus() {
          _this3.setState({
            isTravellerFocused: true
          });
        },
        onBlur: function onBlur() {
          _this3.setState({
            isTravellerFocused: false
          });
        },
        style: {
          cursor: 'col-resize'
        }
      }, Brush.renderTraveller(traveller, travellerProps));
    }
  }, {
    key: "renderSlide",
    value: function renderSlide(startX, endX) {
      var _this$props9 = this.props,
        y = _this$props9.y,
        height = _this$props9.height,
        stroke = _this$props9.stroke,
        travellerWidth = _this$props9.travellerWidth;
      var x = Math.min(startX, endX) + travellerWidth;
      var width = Math.max(Math.abs(endX - startX) - travellerWidth, 0);
      return /*#__PURE__*/React$5.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: 'move'
        },
        stroke: "none",
        fill: stroke,
        fillOpacity: 0.2,
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  }, {
    key: "renderText",
    value: function renderText() {
      var _this$props10 = this.props,
        startIndex = _this$props10.startIndex,
        endIndex = _this$props10.endIndex,
        y = _this$props10.y,
        height = _this$props10.height,
        travellerWidth = _this$props10.travellerWidth,
        stroke = _this$props10.stroke;
      var _this$state4 = this.state,
        startX = _this$state4.startX,
        endX = _this$state4.endX;
      var offset = 5;
      var attrs = {
        pointerEvents: 'none',
        fill: stroke
      };
      return /*#__PURE__*/React$5.createElement(Layer, {
        className: "recharts-brush-texts"
      }, /*#__PURE__*/React$5.createElement(Text, _extends$4({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(startX, endX) - offset,
        y: y + height / 2
      }, attrs), this.getTextOfTick(startIndex)), /*#__PURE__*/React$5.createElement(Text, _extends$4({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(startX, endX) + travellerWidth + offset,
        y: y + height / 2
      }, attrs), this.getTextOfTick(endIndex)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
        data = _this$props11.data,
        className = _this$props11.className,
        children = _this$props11.children,
        x = _this$props11.x,
        y = _this$props11.y,
        width = _this$props11.width,
        height = _this$props11.height,
        alwaysShowText = _this$props11.alwaysShowText;
      var _this$state5 = this.state,
        startX = _this$state5.startX,
        endX = _this$state5.endX,
        isTextActive = _this$state5.isTextActive,
        isSlideMoving = _this$state5.isSlideMoving,
        isTravellerMoving = _this$state5.isTravellerMoving,
        isTravellerFocused = _this$state5.isTravellerFocused;
      if (!data || !data.length || !isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || width <= 0 || height <= 0) {
        return null;
      }
      var layerClass = clsx('recharts-brush', className);
      var isPanoramic = React$5.Children.count(children) === 1;
      var style = generatePrefixStyle('userSelect', 'none');
      return /*#__PURE__*/React$5.createElement(Layer, {
        className: layerClass,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: style
      }, this.renderBackground(), isPanoramic && this.renderPanorama(), this.renderSlide(startX, endX), this.renderTravellerLayer(startX, 'startX'), this.renderTravellerLayer(endX, 'endX'), (isTextActive || isSlideMoving || isTravellerMoving || isTravellerFocused || alwaysShowText) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function renderDefaultTraveller(props) {
      var x = props.x,
        y = props.y,
        width = props.width,
        height = props.height,
        stroke = props.stroke;
      var lineY = Math.floor(y + height / 2) - 1;
      return /*#__PURE__*/React$5.createElement(React$5.Fragment, null, /*#__PURE__*/React$5.createElement("rect", {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: stroke,
        stroke: "none"
      }), /*#__PURE__*/React$5.createElement("line", {
        x1: x + 1,
        y1: lineY,
        x2: x + width - 1,
        y2: lineY,
        fill: "none",
        stroke: "#fff"
      }), /*#__PURE__*/React$5.createElement("line", {
        x1: x + 1,
        y1: lineY + 2,
        x2: x + width - 1,
        y2: lineY + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function renderTraveller(option, props) {
      var rectangle;
      if ( /*#__PURE__*/React$5.isValidElement(option)) {
        rectangle = /*#__PURE__*/React$5.cloneElement(option, props);
      } else if (isFunction$3(option)) {
        rectangle = option(props);
      } else {
        rectangle = Brush.renderDefaultTraveller(props);
      }
      return rectangle;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var data = nextProps.data,
        width = nextProps.width,
        x = nextProps.x,
        travellerWidth = nextProps.travellerWidth,
        updateId = nextProps.updateId,
        startIndex = nextProps.startIndex,
        endIndex = nextProps.endIndex;
      if (data !== prevState.prevData || updateId !== prevState.prevUpdateId) {
        return _objectSpread$6({
          prevData: data,
          prevTravellerWidth: travellerWidth,
          prevUpdateId: updateId,
          prevX: x,
          prevWidth: width
        }, data && data.length ? createScale({
          data: data,
          width: width,
          x: x,
          travellerWidth: travellerWidth,
          startIndex: startIndex,
          endIndex: endIndex
        }) : {
          scale: null,
          scaleValues: null
        });
      }
      if (prevState.scale && (width !== prevState.prevWidth || x !== prevState.prevX || travellerWidth !== prevState.prevTravellerWidth)) {
        prevState.scale.range([x, x + width - travellerWidth]);
        var scaleValues = prevState.scale.domain().map(function (entry) {
          return prevState.scale(entry);
        });
        return {
          prevData: data,
          prevTravellerWidth: travellerWidth,
          prevUpdateId: updateId,
          prevX: x,
          prevWidth: width,
          startX: prevState.scale(nextProps.startIndex),
          endX: prevState.scale(nextProps.endIndex),
          scaleValues: scaleValues
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function getIndexInRange(valueRange, x) {
      var len = valueRange.length;
      var start = 0;
      var end = len - 1;
      while (end - start > 1) {
        var middle = Math.floor((start + end) / 2);
        if (valueRange[middle] > x) {
          end = middle;
        } else {
          start = middle;
        }
      }
      return x >= valueRange[end] ? end : start;
    }
  }]);
}(PureComponent);
_defineProperty$7(Brush, "displayName", 'Brush');
_defineProperty$7(Brush, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: '#fff',
  stroke: '#666',
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1000,
  alwaysShowText: false
});

var baseEach$1 = _baseEach;

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome$1(collection, predicate) {
  var result;

  baseEach$1(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

var _baseSome = baseSome$1;

var arraySome = _arraySome,
    baseIteratee$2 = _baseIteratee,
    baseSome = _baseSome,
    isArray$1 = isArray_1,
    isIterateeCall$1 = _isIterateeCall;

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray$1(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall$1(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee$2(predicate));
}

var some_1 = some;

const some$1 = /*@__PURE__*/getDefaultExportFromCjs(some_1);

var ifOverflowMatches = function ifOverflowMatches(props, value) {
  var alwaysShow = props.alwaysShow;
  var ifOverflow = props.ifOverflow;
  if (alwaysShow) {
    ifOverflow = 'extendDomain';
  }
  return ifOverflow === value;
};

var defineProperty = _defineProperty$x;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$1(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$1;

var baseAssignValue = _baseAssignValue,
    baseForOwn = _baseForOwn,
    baseIteratee$1 = _baseIteratee;

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee$1(iteratee);

  baseForOwn(object, function(value, key, object) {
    baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

var mapValues_1 = mapValues;

const mapValues$1 = /*@__PURE__*/getDefaultExportFromCjs(mapValues_1);

/**
 * A specialized version of `_.every` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */

function arrayEvery$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

var _arrayEvery = arrayEvery$1;

var baseEach = _baseEach;

/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery$1(collection, predicate) {
  var result = true;
  baseEach(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

var _baseEvery = baseEvery$1;

var arrayEvery = _arrayEvery,
    baseEvery = _baseEvery,
    baseIteratee = _baseIteratee,
    isArray = isArray_1,
    isIterateeCall = _isIterateeCall;

/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * **Note:** This method returns `true` for
 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty collections.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.every(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.every(users, 'active');
 * // => false
 */
function every(collection, predicate, guard) {
  var func = isArray(collection) ? arrayEvery : baseEvery;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate));
}

var every_1 = every;

const every$1 = /*@__PURE__*/getDefaultExportFromCjs(every_1);

function _typeof$6(o) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$6(o); }
function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$6(descriptor.key), descriptor); } }
function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), true).forEach(function (r) { _defineProperty$6(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(t) { var i = _toPrimitive$6(t, "string"); return "symbol" == _typeof$6(i) ? i : i + ""; }
function _toPrimitive$6(t, r) { if ("object" != _typeof$6(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$6(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var rectWithPoints = function rectWithPoints(_ref, _ref2) {
  var x1 = _ref.x,
    y1 = _ref.y;
  var x2 = _ref2.x,
    y2 = _ref2.y;
  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1)
  };
};

/**
 * Compute the x, y, width, and height of a box from two reference points.
 * @param  {Object} coords     x1, x2, y1, and y2
 * @return {Object} object
 */
var rectWithCoords = function rectWithCoords(_ref3) {
  var x1 = _ref3.x1,
    y1 = _ref3.y1,
    x2 = _ref3.x2,
    y2 = _ref3.y2;
  return rectWithPoints({
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  });
};
var ScaleHelper = /*#__PURE__*/function () {
  function ScaleHelper(scale) {
    _classCallCheck$5(this, ScaleHelper);
    this.scale = scale;
  }
  return _createClass$5(ScaleHelper, [{
    key: "domain",
    get: function get() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function get() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function get() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function get() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function get() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function apply(value) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        bandAware = _ref4.bandAware,
        position = _ref4.position;
      if (value === undefined) {
        return undefined;
      }
      if (position) {
        switch (position) {
          case 'start':
            {
              return this.scale(value);
            }
          case 'middle':
            {
              var offset = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(value) + offset;
            }
          case 'end':
            {
              var _offset = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(value) + _offset;
            }
          default:
            {
              return this.scale(value);
            }
        }
      }
      if (bandAware) {
        var _offset2 = this.bandwidth ? this.bandwidth() / 2 : 0;
        return this.scale(value) + _offset2;
      }
      return this.scale(value);
    }
  }, {
    key: "isInRange",
    value: function isInRange(value) {
      var range = this.range();
      var first = range[0];
      var last = range[range.length - 1];
      return first <= last ? value >= first && value <= last : value >= last && value <= first;
    }
  }], [{
    key: "create",
    value: function create(obj) {
      return new ScaleHelper(obj);
    }
  }]);
}();
_defineProperty$6(ScaleHelper, "EPS", 1e-4);
var createLabeledScales = function createLabeledScales(options) {
  var scales = Object.keys(options).reduce(function (res, key) {
    return _objectSpread$5(_objectSpread$5({}, res), {}, _defineProperty$6({}, key, ScaleHelper.create(options[key])));
  }, {});
  return _objectSpread$5(_objectSpread$5({}, scales), {}, {
    apply: function apply(coord) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        bandAware = _ref5.bandAware,
        position = _ref5.position;
      return mapValues$1(coord, function (value, label) {
        return scales[label].apply(value, {
          bandAware: bandAware,
          position: position
        });
      });
    },
    isInRange: function isInRange(coord) {
      return every$1(coord, function (value, label) {
        return scales[label].isInRange(value);
      });
    }
  });
};

/**
 * This is memoized because the viewBox is unlikely to change often
 * - but because it is computed from offset, any change to it would re-render all children.
 *
 * And because we have many readers of the viewBox, and update it only rarely,
 * then let's optimize with memoization.
 */
var calculateViewBox = memoize$3(function (offset) {
  return {
    x: offset.left,
    y: offset.top,
    width: offset.width,
    height: offset.height
  };
}, function (offset) {
  return ['l', offset.left, 't', offset.top, 'w', offset.width, 'h', offset.height].join('');
});

const React$4 = await importShared('react');
const {createContext,useContext} = React$4;
var XAxisContext = /* @__PURE__ */ createContext(void 0);
var YAxisContext = /* @__PURE__ */ createContext(void 0);
var ViewBoxContext = /* @__PURE__ */ createContext(void 0);
var OffsetContext = /* @__PURE__ */ createContext({});
var ClipPathIdContext = /* @__PURE__ */ createContext(void 0);
var ChartHeightContext = /* @__PURE__ */ createContext(0);
var ChartWidthContext = /* @__PURE__ */ createContext(0);
var ChartLayoutContextProvider = function ChartLayoutContextProvider2(props) {
  var _props$state = props.state, xAxisMap = _props$state.xAxisMap, yAxisMap = _props$state.yAxisMap, offset = _props$state.offset, clipPathId = props.clipPathId, children = props.children, width = props.width, height = props.height;
  var viewBox = calculateViewBox(offset);
  return /* @__PURE__ */ React$4.createElement(XAxisContext.Provider, {
    value: xAxisMap
  }, /* @__PURE__ */ React$4.createElement(YAxisContext.Provider, {
    value: yAxisMap
  }, /* @__PURE__ */ React$4.createElement(OffsetContext.Provider, {
    value: offset
  }, /* @__PURE__ */ React$4.createElement(ViewBoxContext.Provider, {
    value: viewBox
  }, /* @__PURE__ */ React$4.createElement(ClipPathIdContext.Provider, {
    value: clipPathId
  }, /* @__PURE__ */ React$4.createElement(ChartHeightContext.Provider, {
    value: height
  }, /* @__PURE__ */ React$4.createElement(ChartWidthContext.Provider, {
    value: width
  }, children)))))));
};
var useClipPathId = function useClipPathId2() {
  return useContext(ClipPathIdContext);
};
var useXAxisOrThrow = function useXAxisOrThrow2(xAxisId) {
  var xAxisMap = useContext(XAxisContext);
  !(xAxisMap != null) ? invariant() : void 0;
  var xAxis = xAxisMap[xAxisId];
  !(xAxis != null) ? invariant() : void 0;
  return xAxis;
};
var useYAxisOrThrow = function useYAxisOrThrow2(yAxisId) {
  var yAxisMap = useContext(YAxisContext);
  !(yAxisMap != null) ? invariant() : void 0;
  var yAxis = yAxisMap[yAxisId];
  !(yAxis != null) ? invariant() : void 0;
  return yAxis;
};
var useViewBox = function useViewBox2() {
  var viewBox = useContext(ViewBoxContext);
  return viewBox;
};

function _typeof$5(o) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$5(o); }
function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$5(descriptor.key), descriptor); } }
function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$3(t, o, e) { return o = _getPrototypeOf$3(o), _possibleConstructorReturn$3(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf$3(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$5(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$3(self); }
function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$3() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }
function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$3(subClass, superClass); }
function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), true).forEach(function (r) { _defineProperty$5(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(t) { var i = _toPrimitive$5(t, "string"); return "symbol" == _typeof$5(i) ? i : i + ""; }
function _toPrimitive$5(t, r) { if ("object" != _typeof$5(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$5(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function _extends$3() { _extends$3 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
/**
 * @fileOverview Reference Line
 */
const React$3 = await importShared('react');

/**
 * This excludes `viewBox` prop from svg for two reasons:
 * 1. The components wants viewBox of object type, and svg wants string
 *    - so there's a conflict, and the component will throw if it gets string
 * 2. Internally the component calls `filterProps` which filters the viewBox away anyway
 */

var renderLine = function renderLine(option, props) {
  var line;
  if ( /*#__PURE__*/React$3.isValidElement(option)) {
    line = /*#__PURE__*/React$3.cloneElement(option, props);
  } else if (isFunction$3(option)) {
    line = option(props);
  } else {
    line = /*#__PURE__*/React$3.createElement("line", _extends$3({}, props, {
      className: "recharts-reference-line-line"
    }));
  }
  return line;
};
// TODO: ScaleHelper
var getEndPoints = function getEndPoints(scales, isFixedX, isFixedY, isSegment, viewBox, position, xAxisOrientation, yAxisOrientation, props) {
  var x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height;
  if (isFixedY) {
    var yCoord = props.y;
    var coord = scales.y.apply(yCoord, {
      position: position
    });
    if (ifOverflowMatches(props, 'discard') && !scales.y.isInRange(coord)) {
      return null;
    }
    var points = [{
      x: x + width,
      y: coord
    }, {
      x: x,
      y: coord
    }];
    return yAxisOrientation === 'left' ? points.reverse() : points;
  }
  if (isFixedX) {
    var xCoord = props.x;
    var _coord = scales.x.apply(xCoord, {
      position: position
    });
    if (ifOverflowMatches(props, 'discard') && !scales.x.isInRange(_coord)) {
      return null;
    }
    var _points = [{
      x: _coord,
      y: y + height
    }, {
      x: _coord,
      y: y
    }];
    return xAxisOrientation === 'top' ? _points.reverse() : _points;
  }
  if (isSegment) {
    var segment = props.segment;
    var _points2 = segment.map(function (p) {
      return scales.apply(p, {
        position: position
      });
    });
    if (ifOverflowMatches(props, 'discard') && some$1(_points2, function (p) {
      return !scales.isInRange(p);
    })) {
      return null;
    }
    return _points2;
  }
  return null;
};
function ReferenceLineImpl(props) {
  var fixedX = props.x,
    fixedY = props.y,
    segment = props.segment,
    xAxisId = props.xAxisId,
    yAxisId = props.yAxisId,
    shape = props.shape,
    className = props.className,
    alwaysShow = props.alwaysShow;
  var clipPathId = useClipPathId();
  var xAxis = useXAxisOrThrow(xAxisId);
  var yAxis = useYAxisOrThrow(yAxisId);
  var viewBox = useViewBox();
  if (!clipPathId || !viewBox) {
    return null;
  }
  warn(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var scales = createLabeledScales({
    x: xAxis.scale,
    y: yAxis.scale
  });
  var isX = isNumOrStr(fixedX);
  var isY = isNumOrStr(fixedY);
  var isSegment = segment && segment.length === 2;
  var endPoints = getEndPoints(scales, isX, isY, isSegment, viewBox, props.position, xAxis.orientation, yAxis.orientation, props);
  if (!endPoints) {
    return null;
  }
  var _endPoints = _slicedToArray$1(endPoints, 2),
    _endPoints$ = _endPoints[0],
    x1 = _endPoints$.x,
    y1 = _endPoints$.y,
    _endPoints$2 = _endPoints[1],
    x2 = _endPoints$2.x,
    y2 = _endPoints$2.y;
  var clipPath = ifOverflowMatches(props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;
  var lineProps = _objectSpread$4(_objectSpread$4({
    clipPath: clipPath
  }, filterProps(props, true)), {}, {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  });
  return /*#__PURE__*/React$3.createElement(Layer, {
    className: clsx('recharts-reference-line', className)
  }, renderLine(shape, lineProps), Label.renderCallByParent(props, rectWithCoords({
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  })));
}

// eslint-disable-next-line react/prefer-stateless-function -- requires static defaultProps
var ReferenceLine = /*#__PURE__*/function (_React$Component) {
  function ReferenceLine() {
    _classCallCheck$4(this, ReferenceLine);
    return _callSuper$3(this, ReferenceLine, arguments);
  }
  _inherits$3(ReferenceLine, _React$Component);
  return _createClass$4(ReferenceLine, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$3.createElement(ReferenceLineImpl, this.props);
    }
  }]);
}(React$3.Component);
_defineProperty$5(ReferenceLine, "displayName", 'ReferenceLine');
_defineProperty$5(ReferenceLine, "defaultProps", {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  fill: 'none',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
  position: 'middle'
});

function _extends$2() { _extends$2 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), true).forEach(function (r) { _defineProperty$4(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$4(descriptor.key), descriptor); } }
function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$2(t, o, e) { return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$2(self); }
function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$2() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$2(subClass, superClass); }
function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$4(i) ? i : i + ""; }
function _toPrimitive$4(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
/**
 * @fileOverview Reference Dot
 */
const React$2 = await importShared('react');
var getCoordinate = function getCoordinate(props) {
  var x = props.x,
    y = props.y,
    xAxis = props.xAxis,
    yAxis = props.yAxis;
  var scales = createLabeledScales({
    x: xAxis.scale,
    y: yAxis.scale
  });
  var result = scales.apply({
    x: x,
    y: y
  }, {
    bandAware: true
  });
  if (ifOverflowMatches(props, 'discard') && !scales.isInRange(result)) {
    return null;
  }
  return result;
};

// eslint-disable-next-line react/prefer-stateless-function -- requires static defaultProps
var ReferenceDot = /*#__PURE__*/function (_React$Component) {
  function ReferenceDot() {
    _classCallCheck$3(this, ReferenceDot);
    return _callSuper$2(this, ReferenceDot, arguments);
  }
  _inherits$2(ReferenceDot, _React$Component);
  return _createClass$3(ReferenceDot, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        x = _this$props.x,
        y = _this$props.y,
        r = _this$props.r,
        alwaysShow = _this$props.alwaysShow,
        clipPathId = _this$props.clipPathId;
      var isX = isNumOrStr(x);
      var isY = isNumOrStr(y);
      warn(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      if (!isX || !isY) {
        return null;
      }
      var coordinate = getCoordinate(this.props);
      if (!coordinate) {
        return null;
      }
      var cx = coordinate.x,
        cy = coordinate.y;
      var _this$props2 = this.props,
        shape = _this$props2.shape,
        className = _this$props2.className;
      var clipPath = ifOverflowMatches(this.props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;
      var dotProps = _objectSpread$3(_objectSpread$3({
        clipPath: clipPath
      }, filterProps(this.props, true)), {}, {
        cx: cx,
        cy: cy
      });
      return /*#__PURE__*/React$2.createElement(Layer, {
        className: clsx('recharts-reference-dot', className)
      }, ReferenceDot.renderDot(shape, dotProps), Label.renderCallByParent(this.props, {
        x: cx - r,
        y: cy - r,
        width: 2 * r,
        height: 2 * r
      }));
    }
  }]);
}(React$2.Component);
_defineProperty$4(ReferenceDot, "displayName", 'ReferenceDot');
_defineProperty$4(ReferenceDot, "defaultProps", {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#fff',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1
});
_defineProperty$4(ReferenceDot, "renderDot", function (option, props) {
  var dot;
  if ( /*#__PURE__*/React$2.isValidElement(option)) {
    dot = /*#__PURE__*/React$2.cloneElement(option, props);
  } else if (isFunction$3(option)) {
    dot = option(props);
  } else {
    dot = /*#__PURE__*/React$2.createElement(Dot, _extends$2({}, props, {
      cx: props.cx,
      cy: props.cy,
      className: "recharts-reference-dot-dot"
    }));
  }
  return dot;
});

function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), true).forEach(function (r) { _defineProperty$3(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor); } }
function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper$1(t, o, e) { return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$1(self); }
function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$1(subClass, superClass); }
function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : i + ""; }
function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
/**
 * @fileOverview Reference Line
 */
const React$1 = await importShared('react');
var getRect = function getRect(hasX1, hasX2, hasY1, hasY2, props) {
  var xValue1 = props.x1,
    xValue2 = props.x2,
    yValue1 = props.y1,
    yValue2 = props.y2,
    xAxis = props.xAxis,
    yAxis = props.yAxis;
  if (!xAxis || !yAxis) return null;
  var scales = createLabeledScales({
    x: xAxis.scale,
    y: yAxis.scale
  });
  var p1 = {
    x: hasX1 ? scales.x.apply(xValue1, {
      position: 'start'
    }) : scales.x.rangeMin,
    y: hasY1 ? scales.y.apply(yValue1, {
      position: 'start'
    }) : scales.y.rangeMin
  };
  var p2 = {
    x: hasX2 ? scales.x.apply(xValue2, {
      position: 'end'
    }) : scales.x.rangeMax,
    y: hasY2 ? scales.y.apply(yValue2, {
      position: 'end'
    }) : scales.y.rangeMax
  };
  if (ifOverflowMatches(props, 'discard') && (!scales.isInRange(p1) || !scales.isInRange(p2))) {
    return null;
  }
  return rectWithPoints(p1, p2);
};

// eslint-disable-next-line react/prefer-stateless-function -- requires static defaultProps
var ReferenceArea = /*#__PURE__*/function (_React$Component) {
  function ReferenceArea() {
    _classCallCheck$2(this, ReferenceArea);
    return _callSuper$1(this, ReferenceArea, arguments);
  }
  _inherits$1(ReferenceArea, _React$Component);
  return _createClass$2(ReferenceArea, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        x1 = _this$props.x1,
        x2 = _this$props.x2,
        y1 = _this$props.y1,
        y2 = _this$props.y2,
        className = _this$props.className,
        alwaysShow = _this$props.alwaysShow,
        clipPathId = _this$props.clipPathId;
      warn(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var hasX1 = isNumOrStr(x1);
      var hasX2 = isNumOrStr(x2);
      var hasY1 = isNumOrStr(y1);
      var hasY2 = isNumOrStr(y2);
      var shape = this.props.shape;
      if (!hasX1 && !hasX2 && !hasY1 && !hasY2 && !shape) {
        return null;
      }
      var rect = getRect(hasX1, hasX2, hasY1, hasY2, this.props);
      if (!rect && !shape) {
        return null;
      }
      var clipPath = ifOverflowMatches(this.props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;
      return /*#__PURE__*/React$1.createElement(Layer, {
        className: clsx('recharts-reference-area', className)
      }, ReferenceArea.renderRect(shape, _objectSpread$2(_objectSpread$2({
        clipPath: clipPath
      }, filterProps(this.props, true)), rect)), Label.renderCallByParent(this.props, rect));
    }
  }]);
}(React$1.Component);
_defineProperty$3(ReferenceArea, "displayName", 'ReferenceArea');
_defineProperty$3(ReferenceArea, "defaultProps", {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#ccc',
  fillOpacity: 0.5,
  stroke: 'none',
  strokeWidth: 1
});
_defineProperty$3(ReferenceArea, "renderRect", function (option, props) {
  var rect;
  if ( /*#__PURE__*/React$1.isValidElement(option)) {
    rect = /*#__PURE__*/React$1.cloneElement(option, props);
  } else if (isFunction$3(option)) {
    rect = option(props);
  } else {
    rect = /*#__PURE__*/React$1.createElement(Rectangle, _extends$1({}, props, {
      className: "recharts-reference-area-rect"
    }));
  }
  return rect;
});

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var detectReferenceElementsDomain = function detectReferenceElementsDomain(children, domain, axisId, axisType, specifiedTicks) {
  var lines = findAllByType(children, ReferenceLine);
  var dots = findAllByType(children, ReferenceDot);
  var elements = [].concat(_toConsumableArray$1(lines), _toConsumableArray$1(dots));
  var areas = findAllByType(children, ReferenceArea);
  var idKey = "".concat(axisType, "Id");
  var valueKey = axisType[0];
  var finalDomain = domain;
  if (elements.length) {
    finalDomain = elements.reduce(function (result, el) {
      if (el.props[idKey] === axisId && ifOverflowMatches(el.props, 'extendDomain') && isNumber(el.props[valueKey])) {
        var value = el.props[valueKey];
        return [Math.min(result[0], value), Math.max(result[1], value)];
      }
      return result;
    }, finalDomain);
  }
  if (areas.length) {
    var key1 = "".concat(valueKey, "1");
    var key2 = "".concat(valueKey, "2");
    finalDomain = areas.reduce(function (result, el) {
      if (el.props[idKey] === axisId && ifOverflowMatches(el.props, 'extendDomain') && isNumber(el.props[key1]) && isNumber(el.props[key2])) {
        var value1 = el.props[key1];
        var value2 = el.props[key2];
        return [Math.min(result[0], value1, value2), Math.max(result[1], value1, value2)];
      }
      return result;
    }, finalDomain);
  }
  if (specifiedTicks && specifiedTicks.length) {
    finalDomain = specifiedTicks.reduce(function (result, tick) {
      if (isNumber(tick)) {
        return [Math.min(result[0], tick), Math.max(result[1], tick)];
      }
      return result;
    }, finalDomain);
  }
  return finalDomain;
};

var eventemitter3 = {exports: {}};

(function (module) {

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];

	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];

	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }

	  return ee;
	};

	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];

	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	{
	  module.exports = EventEmitter;
	} 
} (eventemitter3));

var eventemitter3Exports = eventemitter3.exports;
const EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

var eventCenter = new EventEmitter();
var SYNC_EVENT = 'recharts.syncMouseEvents';

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor); } }
function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : i + ""; }
function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
var AccessibilityManager = /*#__PURE__*/function () {
  function AccessibilityManager() {
    _classCallCheck$1(this, AccessibilityManager);
    _defineProperty$2(this, "activeIndex", 0);
    _defineProperty$2(this, "coordinateList", []);
    _defineProperty$2(this, "layout", 'horizontal');
  }
  return _createClass$1(AccessibilityManager, [{
    key: "setDetails",
    value: function setDetails(_ref) {
      var _ref2;
      var _ref$coordinateList = _ref.coordinateList,
        coordinateList = _ref$coordinateList === void 0 ? null : _ref$coordinateList,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$layout = _ref.layout,
        layout = _ref$layout === void 0 ? null : _ref$layout,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? null : _ref$offset,
        _ref$mouseHandlerCall = _ref.mouseHandlerCallback,
        mouseHandlerCallback = _ref$mouseHandlerCall === void 0 ? null : _ref$mouseHandlerCall;
      this.coordinateList = (_ref2 = coordinateList !== null && coordinateList !== void 0 ? coordinateList : this.coordinateList) !== null && _ref2 !== void 0 ? _ref2 : [];
      this.container = container !== null && container !== void 0 ? container : this.container;
      this.layout = layout !== null && layout !== void 0 ? layout : this.layout;
      this.offset = offset !== null && offset !== void 0 ? offset : this.offset;
      this.mouseHandlerCallback = mouseHandlerCallback !== null && mouseHandlerCallback !== void 0 ? mouseHandlerCallback : this.mouseHandlerCallback;

      // Keep activeIndex in the bounds between 0 and the last coordinate index
      this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function keyboardEvent(e) {
      // The AccessibilityManager relies on the Tooltip component. When tooltips suddenly stop existing,
      // it can cause errors. We use this function to check. We don't want arrow keys to be processed
      // if there are no tooltips, since that will cause unexpected behavior of users.
      if (this.coordinateList.length === 0) {
        return;
      }
      switch (e.key) {
        case 'ArrowRight':
          {
            if (this.layout !== 'horizontal') {
              return;
            }
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1);
            this.spoofMouse();
            break;
          }
        case 'ArrowLeft':
          {
            if (this.layout !== 'horizontal') {
              return;
            }
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            this.spoofMouse();
            break;
          }
      }
    }
  }, {
    key: "setIndex",
    value: function setIndex(newIndex) {
      this.activeIndex = newIndex;
    }
  }, {
    key: "spoofMouse",
    value: function spoofMouse() {
      var _window, _window2;
      if (this.layout !== 'horizontal') {
        return;
      }

      // This can happen when the tooltips suddenly stop existing as children of the component
      // That update doesn't otherwise fire events, so we have to double check here.
      if (this.coordinateList.length === 0) {
        return;
      }
      var _this$container$getBo = this.container.getBoundingClientRect(),
        x = _this$container$getBo.x,
        y = _this$container$getBo.y,
        height = _this$container$getBo.height;
      var coordinate = this.coordinateList[this.activeIndex].coordinate;
      var scrollOffsetX = ((_window = window) === null || _window === void 0 ? void 0 : _window.scrollX) || 0;
      var scrollOffsetY = ((_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.scrollY) || 0;
      var pageX = x + coordinate + scrollOffsetX;
      var pageY = y + this.offset.top + height / 2 + scrollOffsetY;
      this.mouseHandlerCallback({
        pageX: pageX,
        pageY: pageY
      });
    }
  }]);
}();

/**
 * Takes a domain and user props to determine whether he provided the domain via props or if we need to calculate it.
 * @param   {AxisDomain}  domain              The potential domain from props
 * @param   {Boolean}     allowDataOverflow   from props
 * @param   {String}      axisType            from props
 * @returns {Boolean}                         `true` if domain is specified by user
 */
function isDomainSpecifiedByUser(domain, allowDataOverflow, axisType) {
  if (axisType === 'number' && allowDataOverflow === true && Array.isArray(domain)) {
    var domainStart = domain === null || domain === void 0 ? void 0 : domain[0];
    var domainEnd = domain === null || domain === void 0 ? void 0 : domain[1];

    /*
     * The `isNumber` check is needed because the user could also provide strings like "dataMin" via the domain props.
     * In such case, we have to compute the domain from the data.
     */
    if (!!domainStart && !!domainEnd && isNumber(domainStart) && isNumber(domainEnd)) {
      return true;
    }
  }
  return false;
}

function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
  var halfSize = tooltipAxisBandSize / 2;
  return {
    stroke: 'none',
    fill: '#ccc',
    x: layout === 'horizontal' ? activeCoordinate.x - halfSize : offset.left + 0.5,
    y: layout === 'horizontal' ? offset.top + 0.5 : activeCoordinate.y - halfSize,
    width: layout === 'horizontal' ? tooltipAxisBandSize : offset.width - 1,
    height: layout === 'horizontal' ? offset.height - 1 : tooltipAxisBandSize
  };
}

/**
 * Only applicable for radial layouts
 * @param {Object} activeCoordinate ChartCoordinate
 * @returns {Object} RadialCursorPoints
 */
function getRadialCursorPoints(activeCoordinate) {
  var cx = activeCoordinate.cx,
    cy = activeCoordinate.cy,
    radius = activeCoordinate.radius,
    startAngle = activeCoordinate.startAngle,
    endAngle = activeCoordinate.endAngle;
  var startPoint = polarToCartesian(cx, cy, radius, startAngle);
  var endPoint = polarToCartesian(cx, cy, radius, endAngle);
  return {
    points: [startPoint, endPoint],
    cx: cx,
    cy: cy,
    radius: radius,
    startAngle: startAngle,
    endAngle: endAngle
  };
}

function getCursorPoints(layout, activeCoordinate, offset) {
  var x1, y1, x2, y2;
  if (layout === 'horizontal') {
    x1 = activeCoordinate.x;
    x2 = x1;
    y1 = offset.top;
    y2 = offset.top + offset.height;
  } else if (layout === 'vertical') {
    y1 = activeCoordinate.y;
    y2 = y1;
    x1 = offset.left;
    x2 = offset.left + offset.width;
  } else if (activeCoordinate.cx != null && activeCoordinate.cy != null) {
    if (layout === 'centric') {
      var cx = activeCoordinate.cx,
        cy = activeCoordinate.cy,
        innerRadius = activeCoordinate.innerRadius,
        outerRadius = activeCoordinate.outerRadius,
        angle = activeCoordinate.angle;
      var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
      var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
      x1 = innerPoint.x;
      y1 = innerPoint.y;
      x2 = outerPoint.x;
      y2 = outerPoint.y;
    } else {
      return getRadialCursorPoints(activeCoordinate);
    }
  }
  return [{
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  }];
}

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {cloneElement: cloneElement$1,createElement,isValidElement: isValidElement$1} = await importShared('react');
/*
 * Cursor is the background, or a highlight,
 * that shows when user mouses over or activates
 * an area.
 *
 * It usually shows together with a tooltip
 * to emphasise which part of the chart does the tooltip refer to.
 */
function Cursor(props) {
  var _element$props$cursor, _defaultProps;
  var element = props.element,
    tooltipEventType = props.tooltipEventType,
    isActive = props.isActive,
    activeCoordinate = props.activeCoordinate,
    activePayload = props.activePayload,
    offset = props.offset,
    activeTooltipIndex = props.activeTooltipIndex,
    tooltipAxisBandSize = props.tooltipAxisBandSize,
    layout = props.layout,
    chartName = props.chartName;
  var elementPropsCursor = (_element$props$cursor = element.props.cursor) !== null && _element$props$cursor !== void 0 ? _element$props$cursor : (_defaultProps = element.type.defaultProps) === null || _defaultProps === void 0 ? void 0 : _defaultProps.cursor;
  if (!element || !elementPropsCursor || !isActive || !activeCoordinate || chartName !== 'ScatterChart' && tooltipEventType !== 'axis') {
    return null;
  }
  var restProps;
  var cursorComp = Curve;
  if (chartName === 'ScatterChart') {
    restProps = activeCoordinate;
    cursorComp = Cross;
  } else if (chartName === 'BarChart') {
    restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
    cursorComp = Rectangle;
  } else if (layout === 'radial') {
    var _getRadialCursorPoint = getRadialCursorPoints(activeCoordinate),
      cx = _getRadialCursorPoint.cx,
      cy = _getRadialCursorPoint.cy,
      radius = _getRadialCursorPoint.radius,
      startAngle = _getRadialCursorPoint.startAngle,
      endAngle = _getRadialCursorPoint.endAngle;
    restProps = {
      cx: cx,
      cy: cy,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: radius,
      outerRadius: radius
    };
    cursorComp = Sector;
  } else {
    restProps = {
      points: getCursorPoints(layout, activeCoordinate, offset)
    };
    cursorComp = Curve;
  }
  var cursorProps = _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
    stroke: '#ccc',
    pointerEvents: 'none'
  }, offset), restProps), filterProps(elementPropsCursor, false)), {}, {
    payload: activePayload,
    payloadIndex: activeTooltipIndex,
    className: clsx('recharts-tooltip-cursor', elementPropsCursor.className)
  });
  return /*#__PURE__*/isValidElement$1(elementPropsCursor) ? /*#__PURE__*/cloneElement$1(elementPropsCursor, cursorProps) : /*#__PURE__*/createElement(cursorComp, cursorProps);
}

var _excluded = ["item"], _excluded2 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
const React = await importShared('react');
const {Component,cloneElement,isValidElement,forwardRef} = React;
var ORIENT_MAP = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
};
var FULL_WIDTH_AND_HEIGHT = {
  width: "100%",
  height: "100%"
};
var originCoordinate = {
  x: 0,
  y: 0
};
function renderAsIs(element) {
  return element;
}
var calculateTooltipPos = function calculateTooltipPos2(rangeObj, layout) {
  if (layout === "horizontal") {
    return rangeObj.x;
  }
  if (layout === "vertical") {
    return rangeObj.y;
  }
  if (layout === "centric") {
    return rangeObj.angle;
  }
  return rangeObj.radius;
};
var getActiveCoordinate = function getActiveCoordinate2(layout, tooltipTicks, activeIndex, rangeObj) {
  var entry = tooltipTicks.find(function(tick) {
    return tick && tick.index === activeIndex;
  });
  if (entry) {
    if (layout === "horizontal") {
      return {
        x: entry.coordinate,
        y: rangeObj.y
      };
    }
    if (layout === "vertical") {
      return {
        x: rangeObj.x,
        y: entry.coordinate
      };
    }
    if (layout === "centric") {
      var _angle = entry.coordinate;
      var _radius = rangeObj.radius;
      return _objectSpread(_objectSpread(_objectSpread({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
        angle: _angle,
        radius: _radius
      });
    }
    var radius = entry.coordinate;
    var angle = rangeObj.angle;
    return _objectSpread(_objectSpread(_objectSpread({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
      angle,
      radius
    });
  }
  return originCoordinate;
};
var getDisplayedData = function getDisplayedData2(data, _ref) {
  var graphicalItems = _ref.graphicalItems, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
  var itemsData = (graphicalItems !== null && graphicalItems !== void 0 ? graphicalItems : []).reduce(function(result, child) {
    var itemData = child.props.data;
    if (itemData && itemData.length) {
      return [].concat(_toConsumableArray(result), _toConsumableArray(itemData));
    }
    return result;
  }, []);
  if (itemsData.length > 0) {
    return itemsData;
  }
  if (data && data.length && isNumber(dataStartIndex) && isNumber(dataEndIndex)) {
    return data.slice(dataStartIndex, dataEndIndex + 1);
  }
  return [];
};
function getDefaultDomainByAxisType(axisType) {
  return axisType === "number" ? [0, "auto"] : void 0;
}
var getTooltipContent = function getTooltipContent2(state, chartData, activeIndex, activeLabel) {
  var graphicalItems = state.graphicalItems, tooltipAxis = state.tooltipAxis;
  var displayedData = getDisplayedData(chartData, state);
  if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) {
    return null;
  }
  return graphicalItems.reduce(function(result, child) {
    var _child$props$data;
    var data = (_child$props$data = child.props.data) !== null && _child$props$data !== void 0 ? _child$props$data : chartData;
    if (data && state.dataStartIndex + state.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    state.dataEndIndex - state.dataStartIndex >= activeIndex) {
      data = data.slice(state.dataStartIndex, state.dataEndIndex + 1);
    }
    var payload;
    if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
      var entries = data === void 0 ? displayedData : data;
      payload = findEntryInArray(entries, tooltipAxis.dataKey, activeLabel);
    } else {
      payload = data && data[activeIndex] || displayedData[activeIndex];
    }
    if (!payload) {
      return result;
    }
    return [].concat(_toConsumableArray(result), [getTooltipItem(child, payload)]);
  }, []);
};
var getTooltipData = function getTooltipData2(state, chartData, layout, rangeObj) {
  var rangeData = rangeObj || {
    x: state.chartX,
    y: state.chartY
  };
  var pos = calculateTooltipPos(rangeData, layout);
  var ticks = state.orderedTooltipTicks, axis = state.tooltipAxis, tooltipTicks = state.tooltipTicks;
  var activeIndex = calculateActiveTickIndex(pos, ticks, tooltipTicks, axis);
  if (activeIndex >= 0 && tooltipTicks) {
    var activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value;
    var activePayload = getTooltipContent(state, chartData, activeIndex, activeLabel);
    var activeCoordinate = getActiveCoordinate(layout, ticks, activeIndex, rangeData);
    return {
      activeTooltipIndex: activeIndex,
      activeLabel,
      activePayload,
      activeCoordinate
    };
  }
  return null;
};
var getAxisMapByAxes = function getAxisMapByAxes2(props, _ref2) {
  var axes = _ref2.axes, graphicalItems = _ref2.graphicalItems, axisType = _ref2.axisType, axisIdKey = _ref2.axisIdKey, stackGroups = _ref2.stackGroups, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  var layout = props.layout, children = props.children, stackOffset = props.stackOffset;
  var isCategorical = isCategoricalAxis(layout, axisType);
  return axes.reduce(function(result, child) {
    var _childProps$domain2;
    var childProps = child.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, child.type.defaultProps), child.props) : child.props;
    var type = childProps.type, dataKey = childProps.dataKey, allowDataOverflow = childProps.allowDataOverflow, allowDuplicatedCategory = childProps.allowDuplicatedCategory, scale = childProps.scale, ticks = childProps.ticks, includeHidden = childProps.includeHidden;
    var axisId = childProps[axisIdKey];
    if (result[axisId]) {
      return result;
    }
    var displayedData = getDisplayedData(props.data, {
      graphicalItems: graphicalItems.filter(function(item) {
        var _defaultProps;
        var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : (_defaultProps = item.type.defaultProps) === null || _defaultProps === void 0 ? void 0 : _defaultProps[axisIdKey];
        return itemAxisId === axisId;
      }),
      dataStartIndex,
      dataEndIndex
    });
    var len = displayedData.length;
    var domain, duplicateDomain, categoricalDomain;
    if (isDomainSpecifiedByUser(childProps.domain, allowDataOverflow, type)) {
      domain = parseSpecifiedDomain(childProps.domain, null, allowDataOverflow);
      if (isCategorical && (type === "number" || scale !== "auto")) {
        categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, "category");
      }
    }
    var defaultDomain = getDefaultDomainByAxisType(type);
    if (!domain || domain.length === 0) {
      var _childProps$domain;
      var childDomain = (_childProps$domain = childProps.domain) !== null && _childProps$domain !== void 0 ? _childProps$domain : defaultDomain;
      if (dataKey) {
        domain = getDomainOfDataByKey(displayedData, dataKey, type);
        if (type === "category" && isCategorical) {
          var duplicate = hasDuplicate(domain);
          if (allowDuplicatedCategory && duplicate) {
            duplicateDomain = domain;
            domain = range$1(0, len);
          } else if (!allowDuplicatedCategory) {
            domain = parseDomainOfCategoryAxis(childDomain, domain, child).reduce(function(finalDomain, entry) {
              return finalDomain.indexOf(entry) >= 0 ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
            }, []);
          }
        } else if (type === "category") {
          if (!allowDuplicatedCategory) {
            domain = parseDomainOfCategoryAxis(childDomain, domain, child).reduce(function(finalDomain, entry) {
              return finalDomain.indexOf(entry) >= 0 || entry === "" || isNil$1(entry) ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
            }, []);
          } else {
            domain = domain.filter(function(entry) {
              return entry !== "" && !isNil$1(entry);
            });
          }
        } else if (type === "number") {
          var errorBarsDomain = parseErrorBarsOfAxis(displayedData, graphicalItems.filter(function(item) {
            var _defaultProps2, _defaultProps3;
            var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : (_defaultProps2 = item.type.defaultProps) === null || _defaultProps2 === void 0 ? void 0 : _defaultProps2[axisIdKey];
            var itemHide = "hide" in item.props ? item.props.hide : (_defaultProps3 = item.type.defaultProps) === null || _defaultProps3 === void 0 ? void 0 : _defaultProps3.hide;
            return itemAxisId === axisId && (includeHidden || !itemHide);
          }), dataKey, axisType, layout);
          if (errorBarsDomain) {
            domain = errorBarsDomain;
          }
        }
        if (isCategorical && (type === "number" || scale !== "auto")) {
          categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, "category");
        }
      } else if (isCategorical) {
        domain = range$1(0, len);
      } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && type === "number") {
        domain = stackOffset === "expand" ? [0, 1] : getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
      } else {
        domain = getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter(function(item) {
          var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : item.type.defaultProps[axisIdKey];
          var itemHide = "hide" in item.props ? item.props.hide : item.type.defaultProps.hide;
          return itemAxisId === axisId && (includeHidden || !itemHide);
        }), type, layout, true);
      }
      if (type === "number") {
        domain = detectReferenceElementsDomain(children, domain, axisId, axisType, ticks);
        if (childDomain) {
          domain = parseSpecifiedDomain(childDomain, domain, allowDataOverflow);
        }
      } else if (type === "category" && childDomain) {
        var axisDomain = childDomain;
        var isDomainValid = domain.every(function(entry) {
          return axisDomain.indexOf(entry) >= 0;
        });
        if (isDomainValid) {
          domain = axisDomain;
        }
      }
    }
    return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, axisId, _objectSpread(_objectSpread({}, childProps), {}, {
      axisType,
      domain,
      categoricalDomain,
      duplicateDomain,
      originalDomain: (_childProps$domain2 = childProps.domain) !== null && _childProps$domain2 !== void 0 ? _childProps$domain2 : defaultDomain,
      isCategorical,
      layout
    })));
  }, {});
};
var getAxisMapByItems = function getAxisMapByItems2(props, _ref3) {
  var graphicalItems = _ref3.graphicalItems, Axis = _ref3.Axis, axisType = _ref3.axisType, axisIdKey = _ref3.axisIdKey, stackGroups = _ref3.stackGroups, dataStartIndex = _ref3.dataStartIndex, dataEndIndex = _ref3.dataEndIndex;
  var layout = props.layout, children = props.children;
  var displayedData = getDisplayedData(props.data, {
    graphicalItems,
    dataStartIndex,
    dataEndIndex
  });
  var len = displayedData.length;
  var isCategorical = isCategoricalAxis(layout, axisType);
  var index = -1;
  return graphicalItems.reduce(function(result, child) {
    var childProps = child.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, child.type.defaultProps), child.props) : child.props;
    var axisId = childProps[axisIdKey];
    var originalDomain = getDefaultDomainByAxisType("number");
    if (!result[axisId]) {
      index++;
      var domain;
      if (isCategorical) {
        domain = range$1(0, len);
      } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
        domain = getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
        domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
      } else {
        domain = parseSpecifiedDomain(originalDomain, getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter(function(item) {
          var _defaultProps4, _defaultProps5;
          var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : (_defaultProps4 = item.type.defaultProps) === null || _defaultProps4 === void 0 ? void 0 : _defaultProps4[axisIdKey];
          var itemHide = "hide" in item.props ? item.props.hide : (_defaultProps5 = item.type.defaultProps) === null || _defaultProps5 === void 0 ? void 0 : _defaultProps5.hide;
          return itemAxisId === axisId && !itemHide;
        }), "number", layout), Axis.defaultProps.allowDataOverflow);
        domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
      }
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, axisId, _objectSpread(_objectSpread({
        axisType
      }, Axis.defaultProps), {}, {
        hide: true,
        orientation: get$2(ORIENT_MAP, "".concat(axisType, ".").concat(index % 2), null),
        domain,
        originalDomain,
        isCategorical,
        layout
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return result;
  }, {});
};
var getAxisMap = function getAxisMap2(props, _ref4) {
  var _ref4$axisType = _ref4.axisType, axisType = _ref4$axisType === void 0 ? "xAxis" : _ref4$axisType, AxisComp = _ref4.AxisComp, graphicalItems = _ref4.graphicalItems, stackGroups = _ref4.stackGroups, dataStartIndex = _ref4.dataStartIndex, dataEndIndex = _ref4.dataEndIndex;
  var children = props.children;
  var axisIdKey = "".concat(axisType, "Id");
  var axes = findAllByType(children, AxisComp);
  var axisMap = {};
  if (axes && axes.length) {
    axisMap = getAxisMapByAxes(props, {
      axes,
      graphicalItems,
      axisType,
      axisIdKey,
      stackGroups,
      dataStartIndex,
      dataEndIndex
    });
  } else if (graphicalItems && graphicalItems.length) {
    axisMap = getAxisMapByItems(props, {
      Axis: AxisComp,
      graphicalItems,
      axisType,
      axisIdKey,
      stackGroups,
      dataStartIndex,
      dataEndIndex
    });
  }
  return axisMap;
};
var tooltipTicksGenerator = function tooltipTicksGenerator2(axisMap) {
  var axis = getAnyElementOfObject(axisMap);
  var tooltipTicks = getTicksOfAxis(axis, false, true);
  return {
    tooltipTicks,
    orderedTooltipTicks: sortBy$1(tooltipTicks, function(o) {
      return o.coordinate;
    }),
    tooltipAxis: axis,
    tooltipAxisBandSize: getBandSizeOfAxis(axis, tooltipTicks)
  };
};
var createDefaultState = function createDefaultState2(props) {
  var children = props.children, defaultShowTooltip = props.defaultShowTooltip;
  var brushItem = findChildByType(children, Brush);
  var startIndex = 0;
  var endIndex = 0;
  if (props.data && props.data.length !== 0) {
    endIndex = props.data.length - 1;
  }
  if (brushItem && brushItem.props) {
    if (brushItem.props.startIndex >= 0) {
      startIndex = brushItem.props.startIndex;
    }
    if (brushItem.props.endIndex >= 0) {
      endIndex = brushItem.props.endIndex;
    }
  }
  return {
    chartX: 0,
    chartY: 0,
    dataStartIndex: startIndex,
    dataEndIndex: endIndex,
    activeTooltipIndex: -1,
    isTooltipActive: Boolean(defaultShowTooltip)
  };
};
var hasGraphicalBarItem = function hasGraphicalBarItem2(graphicalItems) {
  if (!graphicalItems || !graphicalItems.length) {
    return false;
  }
  return graphicalItems.some(function(item) {
    var name = getDisplayName(item && item.type);
    return name && name.indexOf("Bar") >= 0;
  });
};
var getAxisNameByLayout = function getAxisNameByLayout2(layout) {
  if (layout === "horizontal") {
    return {
      numericAxisName: "yAxis",
      cateAxisName: "xAxis"
    };
  }
  if (layout === "vertical") {
    return {
      numericAxisName: "xAxis",
      cateAxisName: "yAxis"
    };
  }
  if (layout === "centric") {
    return {
      numericAxisName: "radiusAxis",
      cateAxisName: "angleAxis"
    };
  }
  return {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
};
var calculateOffset = function calculateOffset2(_ref5, prevLegendBBox) {
  var props = _ref5.props, graphicalItems = _ref5.graphicalItems, _ref5$xAxisMap = _ref5.xAxisMap, xAxisMap = _ref5$xAxisMap === void 0 ? {} : _ref5$xAxisMap, _ref5$yAxisMap = _ref5.yAxisMap, yAxisMap = _ref5$yAxisMap === void 0 ? {} : _ref5$yAxisMap;
  var width = props.width, height = props.height, children = props.children;
  var margin = props.margin || {};
  var brushItem = findChildByType(children, Brush);
  var legendItem = findChildByType(children, Legend);
  var offsetH = Object.keys(yAxisMap).reduce(function(result, id) {
    var entry = yAxisMap[id];
    var orientation = entry.orientation;
    if (!entry.mirror && !entry.hide) {
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, orientation, result[orientation] + entry.width));
    }
    return result;
  }, {
    left: margin.left || 0,
    right: margin.right || 0
  });
  var offsetV = Object.keys(xAxisMap).reduce(function(result, id) {
    var entry = xAxisMap[id];
    var orientation = entry.orientation;
    if (!entry.mirror && !entry.hide) {
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, orientation, get$2(result, "".concat(orientation)) + entry.height));
    }
    return result;
  }, {
    top: margin.top || 0,
    bottom: margin.bottom || 0
  });
  var offset = _objectSpread(_objectSpread({}, offsetV), offsetH);
  var brushBottom = offset.bottom;
  if (brushItem) {
    offset.bottom += brushItem.props.height || Brush.defaultProps.height;
  }
  if (legendItem && prevLegendBBox) {
    offset = appendOffsetOfLegend(offset, graphicalItems, props, prevLegendBBox);
  }
  var offsetWidth = width - offset.left - offset.right;
  var offsetHeight = height - offset.top - offset.bottom;
  return _objectSpread(_objectSpread({
    brushBottom
  }, offset), {}, {
    // never return negative values for height and width
    width: Math.max(offsetWidth, 0),
    height: Math.max(offsetHeight, 0)
  });
};
var getCartesianAxisSize = function getCartesianAxisSize2(axisObj, axisName) {
  if (axisName === "xAxis") {
    return axisObj[axisName].width;
  }
  if (axisName === "yAxis") {
    return axisObj[axisName].height;
  }
  return void 0;
};
var generateCategoricalChart = function generateCategoricalChart2(_ref6) {
  var chartName = _ref6.chartName, GraphicalChild = _ref6.GraphicalChild, _ref6$defaultTooltipE = _ref6.defaultTooltipEventType, defaultTooltipEventType = _ref6$defaultTooltipE === void 0 ? "axis" : _ref6$defaultTooltipE, _ref6$validateTooltip = _ref6.validateTooltipEventTypes, validateTooltipEventTypes = _ref6$validateTooltip === void 0 ? ["axis"] : _ref6$validateTooltip, axisComponents = _ref6.axisComponents, legendContent = _ref6.legendContent, formatAxisMap = _ref6.formatAxisMap, defaultProps = _ref6.defaultProps;
  var getFormatItems = function getFormatItems2(props, currentState) {
    var graphicalItems = currentState.graphicalItems, stackGroups = currentState.stackGroups, offset = currentState.offset, updateId = currentState.updateId, dataStartIndex = currentState.dataStartIndex, dataEndIndex = currentState.dataEndIndex;
    var barSize = props.barSize, layout = props.layout, barGap = props.barGap, barCategoryGap = props.barCategoryGap, globalMaxBarSize = props.maxBarSize;
    var _getAxisNameByLayout = getAxisNameByLayout(layout), numericAxisName = _getAxisNameByLayout.numericAxisName, cateAxisName = _getAxisNameByLayout.cateAxisName;
    var hasBar = hasGraphicalBarItem(graphicalItems);
    var formattedItems = [];
    graphicalItems.forEach(function(item, index) {
      var displayedData = getDisplayedData(props.data, {
        graphicalItems: [item],
        dataStartIndex,
        dataEndIndex
      });
      var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
      var dataKey = itemProps.dataKey, childMaxBarSize = itemProps.maxBarSize;
      var numericAxisId = itemProps["".concat(numericAxisName, "Id")];
      var cateAxisId = itemProps["".concat(cateAxisName, "Id")];
      var axisObjInitialValue = {};
      var axisObj = axisComponents.reduce(function(result, entry) {
        var axisMap = currentState["".concat(entry.axisType, "Map")];
        var id = itemProps["".concat(entry.axisType, "Id")];
        !(axisMap && axisMap[id] || entry.axisType === "zAxis") ? invariant() : void 0;
        var axis = axisMap[id];
        return _objectSpread(_objectSpread({}, result), {}, _defineProperty(_defineProperty({}, entry.axisType, axis), "".concat(entry.axisType, "Ticks"), getTicksOfAxis(axis)));
      }, axisObjInitialValue);
      var cateAxis = axisObj[cateAxisName];
      var cateTicks = axisObj["".concat(cateAxisName, "Ticks")];
      var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && getStackedDataOfItem(item, stackGroups[numericAxisId].stackGroups);
      var itemIsBar = getDisplayName(item.type).indexOf("Bar") >= 0;
      var bandSize = getBandSizeOfAxis(cateAxis, cateTicks);
      var barPosition = [];
      var sizeList = hasBar && getBarSizeList({
        barSize,
        stackGroups,
        totalSize: getCartesianAxisSize(axisObj, cateAxisName)
      });
      if (itemIsBar) {
        var _ref7, _getBandSizeOfAxis;
        var maxBarSize = isNil$1(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
        var barBandSize = (_ref7 = (_getBandSizeOfAxis = getBandSizeOfAxis(cateAxis, cateTicks, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref7 !== void 0 ? _ref7 : 0;
        barPosition = getBarPosition({
          barGap,
          barCategoryGap,
          bandSize: barBandSize !== bandSize ? barBandSize : bandSize,
          sizeList: sizeList[cateAxisId],
          maxBarSize
        });
        if (barBandSize !== bandSize) {
          barPosition = barPosition.map(function(pos) {
            return _objectSpread(_objectSpread({}, pos), {}, {
              position: _objectSpread(_objectSpread({}, pos.position), {}, {
                offset: pos.position.offset - barBandSize / 2
              })
            });
          });
        }
      }
      var composedFn = item && item.type && item.type.getComposedData;
      if (composedFn) {
        formattedItems.push({
          props: _objectSpread(_objectSpread({}, composedFn(_objectSpread(_objectSpread({}, axisObj), {}, {
            displayedData,
            props,
            dataKey,
            item,
            bandSize,
            barPosition,
            offset,
            stackedData,
            layout,
            dataStartIndex,
            dataEndIndex
          }))), {}, _defineProperty(_defineProperty(_defineProperty({
            key: item.key || "item-".concat(index)
          }, numericAxisName, axisObj[numericAxisName]), cateAxisName, axisObj[cateAxisName]), "animationId", updateId)),
          childIndex: parseChildIndex(item, props.children),
          item
        });
      }
    });
    return formattedItems;
  };
  var updateStateOfAxisMapsOffsetAndStackGroups = function updateStateOfAxisMapsOffsetAndStackGroups2(_ref8, prevState) {
    var props = _ref8.props, dataStartIndex = _ref8.dataStartIndex, dataEndIndex = _ref8.dataEndIndex, updateId = _ref8.updateId;
    if (!validateWidthHeight({
      props
    })) {
      return null;
    }
    var children = props.children, layout = props.layout, stackOffset = props.stackOffset, data = props.data, reverseStackOrder = props.reverseStackOrder;
    var _getAxisNameByLayout2 = getAxisNameByLayout(layout), numericAxisName = _getAxisNameByLayout2.numericAxisName, cateAxisName = _getAxisNameByLayout2.cateAxisName;
    var graphicalItems = findAllByType(children, GraphicalChild);
    var stackGroups = getStackGroupsByAxisId(data, graphicalItems, "".concat(numericAxisName, "Id"), "".concat(cateAxisName, "Id"), stackOffset, reverseStackOrder);
    var axisObj = axisComponents.reduce(function(result, entry) {
      var name = "".concat(entry.axisType, "Map");
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, name, getAxisMap(props, _objectSpread(_objectSpread({}, entry), {}, {
        graphicalItems,
        stackGroups: entry.axisType === numericAxisName && stackGroups,
        dataStartIndex,
        dataEndIndex
      }))));
    }, {});
    var offset = calculateOffset(_objectSpread(_objectSpread({}, axisObj), {}, {
      props,
      graphicalItems
    }), prevState === null || prevState === void 0 ? void 0 : prevState.legendBBox);
    Object.keys(axisObj).forEach(function(key) {
      axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace("Map", ""), chartName);
    });
    var cateAxisMap = axisObj["".concat(cateAxisName, "Map")];
    var ticksObj = tooltipTicksGenerator(cateAxisMap);
    var formattedGraphicalItems = getFormatItems(props, _objectSpread(_objectSpread({}, axisObj), {}, {
      dataStartIndex,
      dataEndIndex,
      updateId,
      graphicalItems,
      stackGroups,
      offset
    }));
    return _objectSpread(_objectSpread({
      formattedGraphicalItems,
      graphicalItems,
      offset,
      stackGroups
    }, ticksObj), axisObj);
  };
  var CategoricalChartWrapper = /* @__PURE__ */ function(_Component) {
    function CategoricalChartWrapper2(_props) {
      var _props$id, _props$throttleDelay;
      var _this;
      _classCallCheck(this, CategoricalChartWrapper2);
      _this = _callSuper(this, CategoricalChartWrapper2, [_props]);
      _defineProperty(_this, "eventEmitterSymbol", Symbol("rechartsEventEmitter"));
      _defineProperty(_this, "accessibilityManager", new AccessibilityManager());
      _defineProperty(_this, "handleLegendBBoxUpdate", function(box) {
        if (box) {
          var _this$state = _this.state, dataStartIndex = _this$state.dataStartIndex, dataEndIndex = _this$state.dataEndIndex, updateId = _this$state.updateId;
          _this.setState(_objectSpread({
            legendBBox: box
          }, updateStateOfAxisMapsOffsetAndStackGroups({
            props: _this.props,
            dataStartIndex,
            dataEndIndex,
            updateId
          }, _objectSpread(_objectSpread({}, _this.state), {}, {
            legendBBox: box
          }))));
        }
      });
      _defineProperty(_this, "handleReceiveSyncEvent", function(cId, data, emitter) {
        if (_this.props.syncId === cId) {
          if (emitter === _this.eventEmitterSymbol && typeof _this.props.syncMethod !== "function") {
            return;
          }
          _this.applySyncEvent(data);
        }
      });
      _defineProperty(_this, "handleBrushChange", function(_ref9) {
        var startIndex = _ref9.startIndex, endIndex = _ref9.endIndex;
        if (startIndex !== _this.state.dataStartIndex || endIndex !== _this.state.dataEndIndex) {
          var updateId = _this.state.updateId;
          _this.setState(function() {
            return _objectSpread({
              dataStartIndex: startIndex,
              dataEndIndex: endIndex
            }, updateStateOfAxisMapsOffsetAndStackGroups({
              props: _this.props,
              dataStartIndex: startIndex,
              dataEndIndex: endIndex,
              updateId
            }, _this.state));
          });
          _this.triggerSyncEvent({
            dataStartIndex: startIndex,
            dataEndIndex: endIndex
          });
        }
      });
      _defineProperty(_this, "handleMouseEnter", function(e) {
        var mouse = _this.getMouseInfo(e);
        if (mouse) {
          var _nextState = _objectSpread(_objectSpread({}, mouse), {}, {
            isTooltipActive: true
          });
          _this.setState(_nextState);
          _this.triggerSyncEvent(_nextState);
          var onMouseEnter = _this.props.onMouseEnter;
          if (isFunction$3(onMouseEnter)) {
            onMouseEnter(_nextState, e);
          }
        }
      });
      _defineProperty(_this, "triggeredAfterMouseMove", function(e) {
        var mouse = _this.getMouseInfo(e);
        var nextState = mouse ? _objectSpread(_objectSpread({}, mouse), {}, {
          isTooltipActive: true
        }) : {
          isTooltipActive: false
        };
        _this.setState(nextState);
        _this.triggerSyncEvent(nextState);
        var onMouseMove = _this.props.onMouseMove;
        if (isFunction$3(onMouseMove)) {
          onMouseMove(nextState, e);
        }
      });
      _defineProperty(_this, "handleItemMouseEnter", function(el) {
        _this.setState(function() {
          return {
            isTooltipActive: true,
            activeItem: el,
            activePayload: el.tooltipPayload,
            activeCoordinate: el.tooltipPosition || {
              x: el.cx,
              y: el.cy
            }
          };
        });
      });
      _defineProperty(_this, "handleItemMouseLeave", function() {
        _this.setState(function() {
          return {
            isTooltipActive: false
          };
        });
      });
      _defineProperty(_this, "handleMouseMove", function(e) {
        e.persist();
        _this.throttleTriggeredAfterMouseMove(e);
      });
      _defineProperty(_this, "handleMouseLeave", function(e) {
        _this.throttleTriggeredAfterMouseMove.cancel();
        var nextState = {
          isTooltipActive: false
        };
        _this.setState(nextState);
        _this.triggerSyncEvent(nextState);
        var onMouseLeave = _this.props.onMouseLeave;
        if (isFunction$3(onMouseLeave)) {
          onMouseLeave(nextState, e);
        }
      });
      _defineProperty(_this, "handleOuterEvent", function(e) {
        var eventName = getReactEventByType(e);
        var event = get$2(_this.props, "".concat(eventName));
        if (eventName && isFunction$3(event)) {
          var _mouse;
          var mouse;
          if (/.*touch.*/i.test(eventName)) {
            mouse = _this.getMouseInfo(e.changedTouches[0]);
          } else {
            mouse = _this.getMouseInfo(e);
          }
          event((_mouse = mouse) !== null && _mouse !== void 0 ? _mouse : {}, e);
        }
      });
      _defineProperty(_this, "handleClick", function(e) {
        var mouse = _this.getMouseInfo(e);
        if (mouse) {
          var _nextState2 = _objectSpread(_objectSpread({}, mouse), {}, {
            isTooltipActive: true
          });
          _this.setState(_nextState2);
          _this.triggerSyncEvent(_nextState2);
          var onClick = _this.props.onClick;
          if (isFunction$3(onClick)) {
            onClick(_nextState2, e);
          }
        }
      });
      _defineProperty(_this, "handleMouseDown", function(e) {
        var onMouseDown = _this.props.onMouseDown;
        if (isFunction$3(onMouseDown)) {
          var _nextState3 = _this.getMouseInfo(e);
          onMouseDown(_nextState3, e);
        }
      });
      _defineProperty(_this, "handleMouseUp", function(e) {
        var onMouseUp = _this.props.onMouseUp;
        if (isFunction$3(onMouseUp)) {
          var _nextState4 = _this.getMouseInfo(e);
          onMouseUp(_nextState4, e);
        }
      });
      _defineProperty(_this, "handleTouchMove", function(e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.throttleTriggeredAfterMouseMove(e.changedTouches[0]);
        }
      });
      _defineProperty(_this, "handleTouchStart", function(e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseDown(e.changedTouches[0]);
        }
      });
      _defineProperty(_this, "handleTouchEnd", function(e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseUp(e.changedTouches[0]);
        }
      });
      _defineProperty(_this, "handleDoubleClick", function(e) {
        var onDoubleClick = _this.props.onDoubleClick;
        if (isFunction$3(onDoubleClick)) {
          var _nextState5 = _this.getMouseInfo(e);
          onDoubleClick(_nextState5, e);
        }
      });
      _defineProperty(_this, "handleContextMenu", function(e) {
        var onContextMenu = _this.props.onContextMenu;
        if (isFunction$3(onContextMenu)) {
          var _nextState6 = _this.getMouseInfo(e);
          onContextMenu(_nextState6, e);
        }
      });
      _defineProperty(_this, "triggerSyncEvent", function(data) {
        if (_this.props.syncId !== void 0) {
          eventCenter.emit(SYNC_EVENT, _this.props.syncId, data, _this.eventEmitterSymbol);
        }
      });
      _defineProperty(_this, "applySyncEvent", function(data) {
        var _this$props = _this.props, layout = _this$props.layout, syncMethod = _this$props.syncMethod;
        var updateId = _this.state.updateId;
        var dataStartIndex = data.dataStartIndex, dataEndIndex = data.dataEndIndex;
        if (data.dataStartIndex !== void 0 || data.dataEndIndex !== void 0) {
          _this.setState(_objectSpread({
            dataStartIndex,
            dataEndIndex
          }, updateStateOfAxisMapsOffsetAndStackGroups({
            props: _this.props,
            dataStartIndex,
            dataEndIndex,
            updateId
          }, _this.state)));
        } else if (data.activeTooltipIndex !== void 0) {
          var chartX = data.chartX, chartY = data.chartY;
          var activeTooltipIndex = data.activeTooltipIndex;
          var _this$state2 = _this.state, offset = _this$state2.offset, tooltipTicks = _this$state2.tooltipTicks;
          if (!offset) {
            return;
          }
          if (typeof syncMethod === "function") {
            activeTooltipIndex = syncMethod(tooltipTicks, data);
          } else if (syncMethod === "value") {
            activeTooltipIndex = -1;
            for (var i = 0; i < tooltipTicks.length; i++) {
              if (tooltipTicks[i].value === data.activeLabel) {
                activeTooltipIndex = i;
                break;
              }
            }
          }
          var viewBox = _objectSpread(_objectSpread({}, offset), {}, {
            x: offset.left,
            y: offset.top
          });
          var validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
          var validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
          var activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;
          var activePayload = getTooltipContent(_this.state, _this.props.data, activeTooltipIndex);
          var activeCoordinate = tooltipTicks[activeTooltipIndex] ? {
            x: layout === "horizontal" ? tooltipTicks[activeTooltipIndex].coordinate : validateChartX,
            y: layout === "horizontal" ? validateChartY : tooltipTicks[activeTooltipIndex].coordinate
          } : originCoordinate;
          _this.setState(_objectSpread(_objectSpread({}, data), {}, {
            activeLabel,
            activeCoordinate,
            activePayload,
            activeTooltipIndex
          }));
        } else {
          _this.setState(data);
        }
      });
      _defineProperty(_this, "renderCursor", function(element) {
        var _element$props$active;
        var _this$state3 = _this.state, isTooltipActive = _this$state3.isTooltipActive, activeCoordinate = _this$state3.activeCoordinate, activePayload = _this$state3.activePayload, offset = _this$state3.offset, activeTooltipIndex = _this$state3.activeTooltipIndex, tooltipAxisBandSize = _this$state3.tooltipAxisBandSize;
        var tooltipEventType = _this.getTooltipEventType();
        var isActive = (_element$props$active = element.props.active) !== null && _element$props$active !== void 0 ? _element$props$active : isTooltipActive;
        var layout = _this.props.layout;
        var key = element.key || "_recharts-cursor";
        return /* @__PURE__ */ React.createElement(Cursor, {
          key,
          activeCoordinate,
          activePayload,
          activeTooltipIndex,
          chartName,
          element,
          isActive,
          layout,
          offset,
          tooltipAxisBandSize,
          tooltipEventType
        });
      });
      _defineProperty(_this, "renderPolarAxis", function(element, displayName, index) {
        var axisType = get$2(element, "type.axisType");
        var axisMap = get$2(_this.state, "".concat(axisType, "Map"));
        var elementDefaultProps = element.type.defaultProps;
        var elementProps = elementDefaultProps !== void 0 ? _objectSpread(_objectSpread({}, elementDefaultProps), element.props) : element.props;
        var axisOption = axisMap && axisMap[elementProps["".concat(axisType, "Id")]];
        return /* @__PURE__ */ cloneElement(element, _objectSpread(_objectSpread({}, axisOption), {}, {
          className: clsx(axisType, axisOption.className),
          key: element.key || "".concat(displayName, "-").concat(index),
          ticks: getTicksOfAxis(axisOption, true)
        }));
      });
      _defineProperty(_this, "renderPolarGrid", function(element) {
        var _element$props = element.props, radialLines = _element$props.radialLines, polarAngles = _element$props.polarAngles, polarRadius = _element$props.polarRadius;
        var _this$state4 = _this.state, radiusAxisMap = _this$state4.radiusAxisMap, angleAxisMap = _this$state4.angleAxisMap;
        var radiusAxis = getAnyElementOfObject(radiusAxisMap);
        var angleAxis = getAnyElementOfObject(angleAxisMap);
        var cx = angleAxis.cx, cy = angleAxis.cy, innerRadius = angleAxis.innerRadius, outerRadius = angleAxis.outerRadius;
        return /* @__PURE__ */ cloneElement(element, {
          polarAngles: Array.isArray(polarAngles) ? polarAngles : getTicksOfAxis(angleAxis, true).map(function(entry) {
            return entry.coordinate;
          }),
          polarRadius: Array.isArray(polarRadius) ? polarRadius : getTicksOfAxis(radiusAxis, true).map(function(entry) {
            return entry.coordinate;
          }),
          cx,
          cy,
          innerRadius,
          outerRadius,
          key: element.key || "polar-grid",
          radialLines
        });
      });
      _defineProperty(_this, "renderLegend", function() {
        var formattedGraphicalItems = _this.state.formattedGraphicalItems;
        var _this$props2 = _this.props, children = _this$props2.children, width = _this$props2.width, height = _this$props2.height;
        var margin = _this.props.margin || {};
        var legendWidth = width - (margin.left || 0) - (margin.right || 0);
        var props = getLegendProps({
          children,
          formattedGraphicalItems,
          legendWidth,
          legendContent
        });
        if (!props) {
          return null;
        }
        var item = props.item, otherProps = _objectWithoutProperties(props, _excluded);
        return /* @__PURE__ */ cloneElement(item, _objectSpread(_objectSpread({}, otherProps), {}, {
          chartWidth: width,
          chartHeight: height,
          margin,
          onBBoxUpdate: _this.handleLegendBBoxUpdate
        }));
      });
      _defineProperty(_this, "renderTooltip", function() {
        var _tooltipItem$props$ac;
        var _this$props3 = _this.props, children = _this$props3.children, accessibilityLayer = _this$props3.accessibilityLayer;
        var tooltipItem = findChildByType(children, Tooltip);
        if (!tooltipItem) {
          return null;
        }
        var _this$state5 = _this.state, isTooltipActive = _this$state5.isTooltipActive, activeCoordinate = _this$state5.activeCoordinate, activePayload = _this$state5.activePayload, activeLabel = _this$state5.activeLabel, offset = _this$state5.offset;
        var isActive = (_tooltipItem$props$ac = tooltipItem.props.active) !== null && _tooltipItem$props$ac !== void 0 ? _tooltipItem$props$ac : isTooltipActive;
        return /* @__PURE__ */ cloneElement(tooltipItem, {
          viewBox: _objectSpread(_objectSpread({}, offset), {}, {
            x: offset.left,
            y: offset.top
          }),
          active: isActive,
          label: activeLabel,
          payload: isActive ? activePayload : [],
          coordinate: activeCoordinate,
          accessibilityLayer
        });
      });
      _defineProperty(_this, "renderBrush", function(element) {
        var _this$props4 = _this.props, margin = _this$props4.margin, data = _this$props4.data;
        var _this$state6 = _this.state, offset = _this$state6.offset, dataStartIndex = _this$state6.dataStartIndex, dataEndIndex = _this$state6.dataEndIndex, updateId = _this$state6.updateId;
        return /* @__PURE__ */ cloneElement(element, {
          key: element.key || "_recharts-brush",
          onChange: combineEventHandlers(_this.handleBrushChange, element.props.onChange),
          data,
          x: isNumber(element.props.x) ? element.props.x : offset.left,
          y: isNumber(element.props.y) ? element.props.y : offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
          width: isNumber(element.props.width) ? element.props.width : offset.width,
          startIndex: dataStartIndex,
          endIndex: dataEndIndex,
          updateId: "brush-".concat(updateId)
        });
      });
      _defineProperty(_this, "renderReferenceElement", function(element, displayName, index) {
        if (!element) {
          return null;
        }
        var _this2 = _this, clipPathId = _this2.clipPathId;
        var _this$state7 = _this.state, xAxisMap = _this$state7.xAxisMap, yAxisMap = _this$state7.yAxisMap, offset = _this$state7.offset;
        var elementDefaultProps = element.type.defaultProps || {};
        var _element$props2 = element.props, _element$props2$xAxis = _element$props2.xAxisId, xAxisId = _element$props2$xAxis === void 0 ? elementDefaultProps.xAxisId : _element$props2$xAxis, _element$props2$yAxis = _element$props2.yAxisId, yAxisId = _element$props2$yAxis === void 0 ? elementDefaultProps.yAxisId : _element$props2$yAxis;
        return /* @__PURE__ */ cloneElement(element, {
          key: element.key || "".concat(displayName, "-").concat(index),
          xAxis: xAxisMap[xAxisId],
          yAxis: yAxisMap[yAxisId],
          viewBox: {
            x: offset.left,
            y: offset.top,
            width: offset.width,
            height: offset.height
          },
          clipPathId
        });
      });
      _defineProperty(_this, "renderActivePoints", function(_ref10) {
        var item = _ref10.item, activePoint = _ref10.activePoint, basePoint = _ref10.basePoint, childIndex = _ref10.childIndex, isRange = _ref10.isRange;
        var result = [];
        var key = item.props.key;
        var itemItemProps = item.item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.item.type.defaultProps), item.item.props) : item.item.props;
        var activeDot = itemItemProps.activeDot, dataKey = itemItemProps.dataKey;
        var dotProps = _objectSpread(_objectSpread({
          index: childIndex,
          dataKey,
          cx: activePoint.x,
          cy: activePoint.y,
          r: 4,
          fill: getMainColorOfGraphicItem(item.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: activePoint.payload,
          value: activePoint.value
        }, filterProps(activeDot, false)), adaptEventHandlers(activeDot));
        result.push(CategoricalChartWrapper2.renderActiveDot(activeDot, dotProps, "".concat(key, "-activePoint-").concat(childIndex)));
        if (basePoint) {
          result.push(CategoricalChartWrapper2.renderActiveDot(activeDot, _objectSpread(_objectSpread({}, dotProps), {}, {
            cx: basePoint.x,
            cy: basePoint.y
          }), "".concat(key, "-basePoint-").concat(childIndex)));
        } else if (isRange) {
          result.push(null);
        }
        return result;
      });
      _defineProperty(_this, "renderGraphicChild", function(element, displayName, index) {
        var item = _this.filterFormatItem(element, displayName, index);
        if (!item) {
          return null;
        }
        var tooltipEventType = _this.getTooltipEventType();
        var _this$state8 = _this.state, isTooltipActive = _this$state8.isTooltipActive, tooltipAxis = _this$state8.tooltipAxis, activeTooltipIndex = _this$state8.activeTooltipIndex, activeLabel = _this$state8.activeLabel;
        var children = _this.props.children;
        var tooltipItem = findChildByType(children, Tooltip);
        var _item$props = item.props, points = _item$props.points, isRange = _item$props.isRange, baseLine = _item$props.baseLine;
        var itemItemProps = item.item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.item.type.defaultProps), item.item.props) : item.item.props;
        var activeDot = itemItemProps.activeDot, hide = itemItemProps.hide, activeBar = itemItemProps.activeBar, activeShape = itemItemProps.activeShape;
        var hasActive = Boolean(!hide && isTooltipActive && tooltipItem && (activeDot || activeBar || activeShape));
        var itemEvents = {};
        if (tooltipEventType !== "axis" && tooltipItem && tooltipItem.props.trigger === "click") {
          itemEvents = {
            onClick: combineEventHandlers(_this.handleItemMouseEnter, element.props.onClick)
          };
        } else if (tooltipEventType !== "axis") {
          itemEvents = {
            onMouseLeave: combineEventHandlers(_this.handleItemMouseLeave, element.props.onMouseLeave),
            onMouseEnter: combineEventHandlers(_this.handleItemMouseEnter, element.props.onMouseEnter)
          };
        }
        var graphicalItem = /* @__PURE__ */ cloneElement(element, _objectSpread(_objectSpread({}, item.props), itemEvents));
        function findWithPayload(entry) {
          return typeof tooltipAxis.dataKey === "function" ? tooltipAxis.dataKey(entry.payload) : null;
        }
        if (hasActive) {
          if (activeTooltipIndex >= 0) {
            var activePoint, basePoint;
            if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
              var specifiedKey = typeof tooltipAxis.dataKey === "function" ? findWithPayload : "payload.".concat(tooltipAxis.dataKey.toString());
              activePoint = findEntryInArray(points, specifiedKey, activeLabel);
              basePoint = isRange && baseLine && findEntryInArray(baseLine, specifiedKey, activeLabel);
            } else {
              activePoint = points === null || points === void 0 ? void 0 : points[activeTooltipIndex];
              basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
            }
            if (activeShape || activeBar) {
              var activeIndex = element.props.activeIndex !== void 0 ? element.props.activeIndex : activeTooltipIndex;
              return [/* @__PURE__ */ cloneElement(element, _objectSpread(_objectSpread(_objectSpread({}, item.props), itemEvents), {}, {
                activeIndex
              })), null, null];
            }
            if (!isNil$1(activePoint)) {
              return [graphicalItem].concat(_toConsumableArray(_this.renderActivePoints({
                item,
                activePoint,
                basePoint,
                childIndex: activeTooltipIndex,
                isRange
              })));
            }
          } else {
            var _this$getItemByXY;
            var _ref11 = (_this$getItemByXY = _this.getItemByXY(_this.state.activeCoordinate)) !== null && _this$getItemByXY !== void 0 ? _this$getItemByXY : {
              graphicalItem
            }, _ref11$graphicalItem = _ref11.graphicalItem, _ref11$graphicalItem$ = _ref11$graphicalItem.item, xyItem = _ref11$graphicalItem$ === void 0 ? element : _ref11$graphicalItem$, childIndex = _ref11$graphicalItem.childIndex;
            var elementProps = _objectSpread(_objectSpread(_objectSpread({}, item.props), itemEvents), {}, {
              activeIndex: childIndex
            });
            return [/* @__PURE__ */ cloneElement(xyItem, elementProps), null, null];
          }
        }
        if (isRange) {
          return [graphicalItem, null, null];
        }
        return [graphicalItem, null];
      });
      _defineProperty(_this, "renderCustomized", function(element, displayName, index) {
        return /* @__PURE__ */ cloneElement(element, _objectSpread(_objectSpread({
          key: "recharts-customized-".concat(index)
        }, _this.props), _this.state));
      });
      _defineProperty(_this, "renderMap", {
        CartesianGrid: {
          handler: renderAsIs,
          once: true
        },
        ReferenceArea: {
          handler: _this.renderReferenceElement
        },
        ReferenceLine: {
          handler: renderAsIs
        },
        ReferenceDot: {
          handler: _this.renderReferenceElement
        },
        XAxis: {
          handler: renderAsIs
        },
        YAxis: {
          handler: renderAsIs
        },
        Brush: {
          handler: _this.renderBrush,
          once: true
        },
        Bar: {
          handler: _this.renderGraphicChild
        },
        Line: {
          handler: _this.renderGraphicChild
        },
        Area: {
          handler: _this.renderGraphicChild
        },
        Radar: {
          handler: _this.renderGraphicChild
        },
        RadialBar: {
          handler: _this.renderGraphicChild
        },
        Scatter: {
          handler: _this.renderGraphicChild
        },
        Pie: {
          handler: _this.renderGraphicChild
        },
        Funnel: {
          handler: _this.renderGraphicChild
        },
        Tooltip: {
          handler: _this.renderCursor,
          once: true
        },
        PolarGrid: {
          handler: _this.renderPolarGrid,
          once: true
        },
        PolarAngleAxis: {
          handler: _this.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: _this.renderPolarAxis
        },
        Customized: {
          handler: _this.renderCustomized
        }
      });
      _this.clipPathId = "".concat((_props$id = _props.id) !== null && _props$id !== void 0 ? _props$id : uniqueId("recharts"), "-clip");
      _this.throttleTriggeredAfterMouseMove = throttle$1(_this.triggeredAfterMouseMove, (_props$throttleDelay = _props.throttleDelay) !== null && _props$throttleDelay !== void 0 ? _props$throttleDelay : 1e3 / 60);
      _this.state = {};
      return _this;
    }
    _inherits(CategoricalChartWrapper2, _Component);
    return _createClass(CategoricalChartWrapper2, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props$margin$le, _this$props$margin$to;
        this.addListener();
        this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (_this$props$margin$le = this.props.margin.left) !== null && _this$props$margin$le !== void 0 ? _this$props$margin$le : 0,
            top: (_this$props$margin$to = this.props.margin.top) !== null && _this$props$margin$to !== void 0 ? _this$props$margin$to : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        });
        this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function displayDefaultTooltip() {
        var _this$props5 = this.props, children = _this$props5.children, data = _this$props5.data, height = _this$props5.height, layout = _this$props5.layout;
        var tooltipElem = findChildByType(children, Tooltip);
        if (!tooltipElem) {
          return;
        }
        var defaultIndex = tooltipElem.props.defaultIndex;
        if (typeof defaultIndex !== "number" || defaultIndex < 0 || defaultIndex > this.state.tooltipTicks.length - 1) {
          return;
        }
        var activeLabel = this.state.tooltipTicks[defaultIndex] && this.state.tooltipTicks[defaultIndex].value;
        var activePayload = getTooltipContent(this.state, data, defaultIndex, activeLabel);
        var independentAxisCoord = this.state.tooltipTicks[defaultIndex].coordinate;
        var dependentAxisCoord = (this.state.offset.top + height) / 2;
        var isHorizontal = layout === "horizontal";
        var activeCoordinate = isHorizontal ? {
          x: independentAxisCoord,
          y: dependentAxisCoord
        } : {
          y: independentAxisCoord,
          x: dependentAxisCoord
        };
        var scatterPlotElement = this.state.formattedGraphicalItems.find(function(_ref12) {
          var item = _ref12.item;
          return item.type.name === "Scatter";
        });
        if (scatterPlotElement) {
          activeCoordinate = _objectSpread(_objectSpread({}, activeCoordinate), scatterPlotElement.props.points[defaultIndex].tooltipPosition);
          activePayload = scatterPlotElement.props.points[defaultIndex].tooltipPayload;
        }
        var nextState = {
          activeTooltipIndex: defaultIndex,
          isTooltipActive: true,
          activeLabel,
          activePayload,
          activeCoordinate
        };
        this.setState(nextState);
        this.renderCursor(tooltipElem);
        this.accessibilityManager.setIndex(defaultIndex);
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function getSnapshotBeforeUpdate(prevProps, prevState) {
        if (!this.props.accessibilityLayer) {
          return null;
        }
        if (this.state.tooltipTicks !== prevState.tooltipTicks) {
          this.accessibilityManager.setDetails({
            coordinateList: this.state.tooltipTicks
          });
        }
        if (this.props.layout !== prevProps.layout) {
          this.accessibilityManager.setDetails({
            layout: this.props.layout
          });
        }
        if (this.props.margin !== prevProps.margin) {
          var _this$props$margin$le2, _this$props$margin$to2;
          this.accessibilityManager.setDetails({
            offset: {
              left: (_this$props$margin$le2 = this.props.margin.left) !== null && _this$props$margin$le2 !== void 0 ? _this$props$margin$le2 : 0,
              top: (_this$props$margin$to2 = this.props.margin.top) !== null && _this$props$margin$to2 !== void 0 ? _this$props$margin$to2 : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (!isChildrenEqual([findChildByType(prevProps.children, Tooltip)], [findChildByType(this.props.children, Tooltip)])) {
          this.displayDefaultTooltip();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.removeListener();
        this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function getTooltipEventType() {
        var tooltipItem = findChildByType(this.props.children, Tooltip);
        if (tooltipItem && typeof tooltipItem.props.shared === "boolean") {
          var eventType = tooltipItem.props.shared ? "axis" : "item";
          return validateTooltipEventTypes.indexOf(eventType) >= 0 ? eventType : defaultTooltipEventType;
        }
        return defaultTooltipEventType;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function getMouseInfo(event) {
        if (!this.container) {
          return null;
        }
        var element = this.container;
        var boundingRect = element.getBoundingClientRect();
        var containerOffset = getOffset(boundingRect);
        var e = {
          chartX: Math.round(event.pageX - containerOffset.left),
          chartY: Math.round(event.pageY - containerOffset.top)
        };
        var scale = boundingRect.width / element.offsetWidth || 1;
        var rangeObj = this.inRange(e.chartX, e.chartY, scale);
        if (!rangeObj) {
          return null;
        }
        var _this$state9 = this.state, xAxisMap = _this$state9.xAxisMap, yAxisMap = _this$state9.yAxisMap;
        var tooltipEventType = this.getTooltipEventType();
        var toolTipData = getTooltipData(this.state, this.props.data, this.props.layout, rangeObj);
        if (tooltipEventType !== "axis" && xAxisMap && yAxisMap) {
          var xScale = getAnyElementOfObject(xAxisMap).scale;
          var yScale = getAnyElementOfObject(yAxisMap).scale;
          var xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
          var yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;
          return _objectSpread(_objectSpread({}, e), {}, {
            xValue,
            yValue
          }, toolTipData);
        }
        if (toolTipData) {
          return _objectSpread(_objectSpread({}, e), toolTipData);
        }
        return null;
      }
    }, {
      key: "inRange",
      value: function inRange(x, y) {
        var scale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var layout = this.props.layout;
        var scaledX = x / scale, scaledY = y / scale;
        if (layout === "horizontal" || layout === "vertical") {
          var offset = this.state.offset;
          var isInRange = scaledX >= offset.left && scaledX <= offset.left + offset.width && scaledY >= offset.top && scaledY <= offset.top + offset.height;
          return isInRange ? {
            x: scaledX,
            y: scaledY
          } : null;
        }
        var _this$state10 = this.state, angleAxisMap = _this$state10.angleAxisMap, radiusAxisMap = _this$state10.radiusAxisMap;
        if (angleAxisMap && radiusAxisMap) {
          var angleAxis = getAnyElementOfObject(angleAxisMap);
          return inRangeOfSector({
            x: scaledX,
            y: scaledY
          }, angleAxis);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function parseEventsOfWrapper() {
        var children = this.props.children;
        var tooltipEventType = this.getTooltipEventType();
        var tooltipItem = findChildByType(children, Tooltip);
        var tooltipEvents = {};
        if (tooltipItem && tooltipEventType === "axis") {
          if (tooltipItem.props.trigger === "click") {
            tooltipEvents = {
              onClick: this.handleClick
            };
          } else {
            tooltipEvents = {
              onMouseEnter: this.handleMouseEnter,
              onDoubleClick: this.handleDoubleClick,
              onMouseMove: this.handleMouseMove,
              onMouseLeave: this.handleMouseLeave,
              onTouchMove: this.handleTouchMove,
              onTouchStart: this.handleTouchStart,
              onTouchEnd: this.handleTouchEnd,
              onContextMenu: this.handleContextMenu
            };
          }
        }
        var outerEvents = adaptEventHandlers(this.props, this.handleOuterEvent);
        return _objectSpread(_objectSpread({}, outerEvents), tooltipEvents);
      }
    }, {
      key: "addListener",
      value: function addListener() {
        eventCenter.on(SYNC_EVENT, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function removeListener() {
        eventCenter.removeListener(SYNC_EVENT, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function filterFormatItem(item, displayName, childIndex) {
        var formattedGraphicalItems = this.state.formattedGraphicalItems;
        for (var i = 0, len = formattedGraphicalItems.length; i < len; i++) {
          var entry = formattedGraphicalItems[i];
          if (entry.item === item || entry.props.key === item.key || displayName === getDisplayName(entry.item.type) && childIndex === entry.childIndex) {
            return entry;
          }
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function renderClipPath() {
        var clipPathId = this.clipPathId;
        var _this$state$offset = this.state.offset, left = _this$state$offset.left, top = _this$state$offset.top, height = _this$state$offset.height, width = _this$state$offset.width;
        return /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
          id: clipPathId
        }, /* @__PURE__ */ React.createElement("rect", {
          x: left,
          y: top,
          height,
          width
        })));
      }
    }, {
      key: "getXScales",
      value: function getXScales() {
        var xAxisMap = this.state.xAxisMap;
        return xAxisMap ? Object.entries(xAxisMap).reduce(function(res, _ref13) {
          var _ref14 = _slicedToArray(_ref13, 2), axisId = _ref14[0], axisProps = _ref14[1];
          return _objectSpread(_objectSpread({}, res), {}, _defineProperty({}, axisId, axisProps.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function getYScales() {
        var yAxisMap = this.state.yAxisMap;
        return yAxisMap ? Object.entries(yAxisMap).reduce(function(res, _ref15) {
          var _ref16 = _slicedToArray(_ref15, 2), axisId = _ref16[0], axisProps = _ref16[1];
          return _objectSpread(_objectSpread({}, res), {}, _defineProperty({}, axisId, axisProps.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function getXScaleByAxisId(axisId) {
        var _this$state$xAxisMap;
        return (_this$state$xAxisMap = this.state.xAxisMap) === null || _this$state$xAxisMap === void 0 || (_this$state$xAxisMap = _this$state$xAxisMap[axisId]) === null || _this$state$xAxisMap === void 0 ? void 0 : _this$state$xAxisMap.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function getYScaleByAxisId(axisId) {
        var _this$state$yAxisMap;
        return (_this$state$yAxisMap = this.state.yAxisMap) === null || _this$state$yAxisMap === void 0 || (_this$state$yAxisMap = _this$state$yAxisMap[axisId]) === null || _this$state$yAxisMap === void 0 ? void 0 : _this$state$yAxisMap.scale;
      }
    }, {
      key: "getItemByXY",
      value: function getItemByXY(chartXY) {
        var _this$state11 = this.state, formattedGraphicalItems = _this$state11.formattedGraphicalItems, activeItem = _this$state11.activeItem;
        if (formattedGraphicalItems && formattedGraphicalItems.length) {
          for (var i = 0, len = formattedGraphicalItems.length; i < len; i++) {
            var graphicalItem = formattedGraphicalItems[i];
            var props = graphicalItem.props, item = graphicalItem.item;
            var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
            var itemDisplayName = getDisplayName(item.type);
            if (itemDisplayName === "Bar") {
              var activeBarItem = (props.data || []).find(function(entry) {
                return isInRectangle(chartXY, entry);
              });
              if (activeBarItem) {
                return {
                  graphicalItem,
                  payload: activeBarItem
                };
              }
            } else if (itemDisplayName === "RadialBar") {
              var _activeBarItem = (props.data || []).find(function(entry) {
                return inRangeOfSector(chartXY, entry);
              });
              if (_activeBarItem) {
                return {
                  graphicalItem,
                  payload: _activeBarItem
                };
              }
            } else if (isFunnel(graphicalItem, activeItem) || isPie(graphicalItem, activeItem) || isScatter(graphicalItem, activeItem)) {
              var activeIndex = getActiveShapeIndexForTooltip({
                graphicalItem,
                activeTooltipItem: activeItem,
                itemData: itemProps.data
              });
              var childIndex = itemProps.activeIndex === void 0 ? activeIndex : itemProps.activeIndex;
              return {
                graphicalItem: _objectSpread(_objectSpread({}, graphicalItem), {}, {
                  childIndex
                }),
                payload: isScatter(graphicalItem, activeItem) ? itemProps.data[activeIndex] : graphicalItem.props.data[activeIndex]
              };
            }
          }
        }
        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        if (!validateWidthHeight(this)) {
          return null;
        }
        var _this$props6 = this.props, children = _this$props6.children, className = _this$props6.className, width = _this$props6.width, height = _this$props6.height, style = _this$props6.style, compact = _this$props6.compact, title = _this$props6.title, desc = _this$props6.desc, others = _objectWithoutProperties(_this$props6, _excluded2);
        var attrs = filterProps(others, false);
        if (compact) {
          return /* @__PURE__ */ React.createElement(ChartLayoutContextProvider, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ React.createElement(Surface, _extends({}, attrs, {
            width,
            height,
            title,
            desc
          }), this.renderClipPath(), renderByOrder(children, this.renderMap)));
        }
        if (this.props.accessibilityLayer) {
          var _this$props$tabIndex, _this$props$role;
          attrs.tabIndex = (_this$props$tabIndex = this.props.tabIndex) !== null && _this$props$tabIndex !== void 0 ? _this$props$tabIndex : 0;
          attrs.role = (_this$props$role = this.props.role) !== null && _this$props$role !== void 0 ? _this$props$role : "application";
          attrs.onKeyDown = function(e) {
            _this3.accessibilityManager.keyboardEvent(e);
          };
          attrs.onFocus = function() {
            _this3.accessibilityManager.focus();
          };
        }
        var events = this.parseEventsOfWrapper();
        return /* @__PURE__ */ React.createElement(ChartLayoutContextProvider, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ React.createElement("div", _extends({
          className: clsx("recharts-wrapper", className),
          style: _objectSpread({
            position: "relative",
            cursor: "default",
            width,
            height
          }, style)
        }, events, {
          ref: function ref(node) {
            _this3.container = node;
          }
        }), /* @__PURE__ */ React.createElement(Surface, _extends({}, attrs, {
          width,
          height,
          title,
          desc,
          style: FULL_WIDTH_AND_HEIGHT
        }), this.renderClipPath(), renderByOrder(children, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  }(Component);
  _defineProperty(CategoricalChartWrapper, "displayName", chartName);
  _defineProperty(CategoricalChartWrapper, "defaultProps", _objectSpread({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: false,
    syncMethod: "index"
  }, defaultProps));
  _defineProperty(CategoricalChartWrapper, "getDerivedStateFromProps", function(nextProps, prevState) {
    var dataKey = nextProps.dataKey, data = nextProps.data, children = nextProps.children, width = nextProps.width, height = nextProps.height, layout = nextProps.layout, stackOffset = nextProps.stackOffset, margin = nextProps.margin;
    var dataStartIndex = prevState.dataStartIndex, dataEndIndex = prevState.dataEndIndex;
    if (prevState.updateId === void 0) {
      var defaultState = createDefaultState(nextProps);
      return _objectSpread(_objectSpread(_objectSpread({}, defaultState), {}, {
        updateId: 0
      }, updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread(_objectSpread({
        props: nextProps
      }, defaultState), {}, {
        updateId: 0
      }), prevState)), {}, {
        prevDataKey: dataKey,
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevLayout: layout,
        prevStackOffset: stackOffset,
        prevMargin: margin,
        prevChildren: children
      });
    }
    if (dataKey !== prevState.prevDataKey || data !== prevState.prevData || width !== prevState.prevWidth || height !== prevState.prevHeight || layout !== prevState.prevLayout || stackOffset !== prevState.prevStackOffset || !shallowEqual(margin, prevState.prevMargin)) {
      var _defaultState = createDefaultState(nextProps);
      var keepFromPrevState = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: prevState.chartX,
        chartY: prevState.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: prevState.isTooltipActive
      };
      var updatesToState = _objectSpread(_objectSpread({}, getTooltipData(prevState, data, layout)), {}, {
        updateId: prevState.updateId + 1
      });
      var newState = _objectSpread(_objectSpread(_objectSpread({}, _defaultState), keepFromPrevState), updatesToState);
      return _objectSpread(_objectSpread(_objectSpread({}, newState), updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread({
        props: nextProps
      }, newState), prevState)), {}, {
        prevDataKey: dataKey,
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevLayout: layout,
        prevStackOffset: stackOffset,
        prevMargin: margin,
        prevChildren: children
      });
    }
    if (!isChildrenEqual(children, prevState.prevChildren)) {
      var _brush$props$startInd, _brush$props, _brush$props$endIndex, _brush$props2;
      var brush = findChildByType(children, Brush);
      var startIndex = brush ? (_brush$props$startInd = (_brush$props = brush.props) === null || _brush$props === void 0 ? void 0 : _brush$props.startIndex) !== null && _brush$props$startInd !== void 0 ? _brush$props$startInd : dataStartIndex : dataStartIndex;
      var endIndex = brush ? (_brush$props$endIndex = (_brush$props2 = brush.props) === null || _brush$props2 === void 0 ? void 0 : _brush$props2.endIndex) !== null && _brush$props$endIndex !== void 0 ? _brush$props$endIndex : dataEndIndex : dataEndIndex;
      var hasDifferentStartOrEndIndex = startIndex !== dataStartIndex || endIndex !== dataEndIndex;
      var hasGlobalData = !isNil$1(data);
      var newUpdateId = hasGlobalData && !hasDifferentStartOrEndIndex ? prevState.updateId : prevState.updateId + 1;
      return _objectSpread(_objectSpread({
        updateId: newUpdateId
      }, updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread(_objectSpread({
        props: nextProps
      }, prevState), {}, {
        updateId: newUpdateId,
        dataStartIndex: startIndex,
        dataEndIndex: endIndex
      }), prevState)), {}, {
        prevChildren: children,
        dataStartIndex: startIndex,
        dataEndIndex: endIndex
      });
    }
    return null;
  });
  _defineProperty(CategoricalChartWrapper, "renderActiveDot", function(option, props, key) {
    var dot;
    if (/* @__PURE__ */ isValidElement(option)) {
      dot = /* @__PURE__ */ cloneElement(option, props);
    } else if (isFunction$3(option)) {
      dot = option(props);
    } else {
      dot = /* @__PURE__ */ React.createElement(Dot, props);
    }
    return /* @__PURE__ */ React.createElement(Layer, {
      className: "recharts-active-dot",
      key
    }, dot);
  });
  var CategoricalChart = /* @__PURE__ */ forwardRef(function CategoricalChart2(props, ref) {
    return /* @__PURE__ */ React.createElement(CategoricalChartWrapper, _extends({}, props, {
      ref
    }));
  });
  CategoricalChart.displayName = CategoricalChartWrapper.displayName;
  return CategoricalChart;
};

/**
 * @fileOverview Pie Chart
 */
var PieChart = generateCategoricalChart({
  chartName: 'PieChart',
  GraphicalChild: Pie,
  validateTooltipEventTypes: ['item'],
  defaultTooltipEventType: 'item',
  legendContent: 'children',
  axisComponents: [{
    axisType: 'angleAxis',
    AxisComp: PolarAngleAxis
  }, {
    axisType: 'radiusAxis',
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap: formatAxisMap,
  defaultProps: {
    layout: 'centric',
    startAngle: 0,
    endAngle: 360,
    cx: '50%',
    cy: '50%',
    innerRadius: 0,
    outerRadius: '80%'
  }
});

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#d8854f",
  "#b6b6b6",
  "#f7b7a3",
  "#a3f7bf",
  "#f7e6a3",
  "#a3d8f7",
  "#e6a3f7",
  "#f7a3c1",
  "#c1f7a3"
];
const getStatusPieData = (vocabList) => {
  const statusCount = {};
  vocabList.forEach((item) => {
    const status = item.status || "尚未作答";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  return Object.entries(statusCount).map(([status, value]) => ({
    name: status,
    value
  }));
};
const renderCustomizedLabel = ({
  name,
  value,
  percent,
  x,
  y,
  cx,
  cy,
  midAngle,
  outerRadius,
  index
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "text",
    {
      x,
      y,
      fill: "#333",
      textAnchor: "middle",
      dominantBaseline: "central",
      fontSize: 16,
      fontWeight: "bold",
      children: `${name} ${value}`
    }
  );
};
const ProgressChart = ({ vocabList, handleImport, handleExport }) => {
  const statusPieData = getStatusPieData(vocabList);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", maxWidth: 600, height: 320, margin: "0 auto 24px auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pie,
        {
          data: statusPieData,
          dataKey: "value",
          nameKey: "name",
          cx: "50%",
          cy: "50%",
          outerRadius: 100,
          label: renderCustomizedLabel,
          children: statusPieData.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[idx % COLORS.length] }, `status-cell-${idx}`))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto", maxHeight: "70vh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "#f3f4f6" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "主題" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "單字" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "詞性" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "解釋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "例句1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "例句2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "狀態" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: vocabList.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.topic }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.word }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.pos }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.meaning }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.example1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.example2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.status || "尚未作答" })
      ] }, idx)) })
    ] }) })
  ] });
};

const {useState,useEffect} = await importShared('react');
const STORAGE_KEY = "Vocab1200";
const parseCSV = (csv) => {
  const lines = csv.trim().split("\n");
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.replace(/^"|"$/g, "").trim());
    return {
      topic: values[0] || "",
      word: values[1] || "",
      pos: values[2] || "",
      meaning: values[3] || "",
      example1: values[4] || "",
      example2: values[5] || "",
      status: values[6] || "尚未作答"
    };
  });
};
const Vocab1200 = () => {
  const [vocabList, setVocabList] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setVocabList(JSON.parse(stored));
    }
  }, []);
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        const items = parseCSV(text);
        setVocabList(items);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    };
    reader.readAsText(file, "utf-8");
  };
  const handleExport = () => {
    const header = ['"主題"', '"單字"', '"詞性"', '"解釋"', '"例句1"', '"例句2"', '"狀態"'];
    const rows = vocabList.map(
      (item) => [
        `"${item.topic}"`,
        `"${item.word}"`,
        `"${item.pos}"`,
        `"${item.meaning}"`,
        `"${item.example1}"`,
        `"${item.example2}"`,
        `"${item.status || "尚未作答"}"`
      ].join(",")
    );
    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "國中1200.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: !showQuiz ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          gap: 8
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 20, fontWeight: "bold", color: "#222" }, children: "Progress Chart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "file",
                accept: ".csv",
                id: "csvInput",
                style: { display: "none" },
                onChange: handleImport
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                style: {
                  padding: "0.5rem 1rem",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                onClick: () => document.getElementById("csvInput")?.click(),
                children: "Import CSV"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                style: {
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                onClick: handleExport,
                children: "Export CSV"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                style: {
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f59e42",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                onClick: () => setShowQuiz(true),
                children: "Start Quiz"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProgressChart,
      {
        vocabList,
        handleImport,
        handleExport
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Quiz1200,
    {
      vocabList,
      onCancel: () => setShowQuiz(false)
    }
  ) });
};

export { Vocab1200 as default, reactIsExports as r };
