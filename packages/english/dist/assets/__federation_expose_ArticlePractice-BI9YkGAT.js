import { importShared } from './__federation_fn_import-DIdBnpG9.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CsM3lTE3.js';
import { C as Chart, p as plugin } from './chartjs-plugin-datalabels.esm-CayJgq7g.js';

const React = await importShared('react');
const {useState,useEffect,useRef} = React;
function ArticleTestArticles() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [testAmount, setTestAmount] = useState(5);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (articles.length > 0 && activeTab === "dashboard") {
      renderChart();
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [articles, activeTab]);
  const renderChart = () => {
    if (!chartRef.current) return;
    const statusCounts = articles.reduce((acc, item) => {
      acc[item.status || "尚未作答"] = (acc[item.status || "尚未作答"] || 0) + 1;
      return acc;
    }, {});
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right"
          },
          title: {
            display: true,
            text: "Learning Progress"
          },
          // @ts-ignore - Chart.js plugin configuration
          datalabels: {
            formatter: (value) => value.toString(),
            color: "#fff",
            font: {
              weight: "bold"
            }
          }
        }
      },
      plugins: [plugin]
    });
  };
  useEffect(() => {
    const storedArticles = localStorage.getItem("ArticleTestArticles");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    } else {
      const defaultArticles = [
        {
          no: 19,
          sentence: "The internet has changed our lives",
          answer: "the",
          article_explanation: "全球唯一的系統性事物，使用 the",
          status: "正確"
        }
      ];
      localStorage.setItem("ArticleTestArticles", JSON.stringify(defaultArticles));
      setArticles(defaultArticles);
    }
  }, []);
  const handleExport = () => {
    const jsonContent = JSON.stringify(articles, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "article-test-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        try {
          const importedArticles = JSON.parse(text);
          if (Array.isArray(importedArticles)) {
            localStorage.setItem("ArticleTestArticles", JSON.stringify(importedArticles));
            setArticles(importedArticles);
          } else {
            alert("檔案格式錯誤，請確認為正確的 JSON 陣列。");
          }
        } catch {
          alert("檔案解析失敗，請確認為正確的 JSON 格式。");
        }
      }
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", height: "100vh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, padding: "1rem", overflowY: "auto" }, children: activeTab === "articles" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}) : activeTab === "dashboard" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "答題進度" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleExport,
            style: {
              padding: "0.5rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer"
            },
            children: "匯出 JSON"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: ".json",
            style: { display: "none" },
            id: "jsonInput",
            onChange: handleImport
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => document.getElementById("jsonInput")?.click(),
            style: {
              padding: "0.5rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer"
            },
            children: "匯入 JSON"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("quiz"),
            style: {
              padding: "0.5rem 1.2rem",
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: 600,
              marginLeft: "1rem"
            },
            children: "開始測驗"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "300px", border: "1px solid #d1d5db", borderRadius: "0.375rem", padding: "1rem", marginBottom: "2rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: chartRef }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "#f3f4f6" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "題目" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "答案" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "解釋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "狀態" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: articles.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.no }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.sentence }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.answer }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.article_explanation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: item.status })
      ] }, item.no)) })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ArticleTestQuiz,
    {
      articles,
      testAmount,
      onBack: () => setActiveTab("dashboard"),
      onUpdateStatus: (updatedArticles) => {
        setArticles(updatedArticles);
        localStorage.setItem("ArticleTestArticles", JSON.stringify(updatedArticles));
      }
    }
  ) }) });
}
function ArticleTestQuiz({
  articles,
  testAmount,
  onBack,
  onUpdateStatus
}) {
  const [step, setStep] = useState("setup");
  const [amount, setAmount] = useState(testAmount);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState("全部");
  const filteredArticles = React.useMemo(() => {
    if (statusFilter === "全部") return articles;
    if (statusFilter === "尚未作答") {
      return articles.filter((a) => !a.status || a.status === "尚未作答");
    }
    return articles.filter((a) => a.status === statusFilter);
  }, [articles, statusFilter]);
  const getRandomQuestions = (list, count) => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };
  const startQuiz = () => {
    const qs = getRandomQuestions(filteredArticles, amount);
    setQuestions(qs);
    setUserAnswers({});
    setStep("quiz");
  };
  const handleInput = (idx, value) => {
    setUserAnswers((prev) => ({ ...prev, [idx]: value }));
  };
  const submitQuiz = () => {
    const res = questions.map((q, idx) => {
      const userAns = (userAnswers[idx] || "").trim();
      const correct = userAns.toLowerCase() === q.answer.trim().toLowerCase();
      return {
        correct,
        answer: q.answer,
        userAnswer: userAns,
        sentence: q.sentence,
        explanation: q.article_explanation
      };
    });
    const updatedArticles = articles.map((a) => {
      const qIdx = questions.findIndex((q) => q.no === a.no);
      if (qIdx !== -1) {
        return { ...a, status: res[qIdx].correct ? "正確" : "錯誤" };
      }
      return a;
    });
    onUpdateStatus(updatedArticles);
    setResults(res);
    setStep("result");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    maxWidth: 600,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px #dbeafe",
    padding: "2rem 1.5rem",
    marginTop: 32
  }, children: [
    step === "setup" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { textAlign: "center", color: "#2563eb", fontWeight: 800, marginBottom: 24 }, children: "冠詞測驗" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { marginRight: 12 }, children: "狀態篩選：" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            style: { padding: 4, borderRadius: 4, border: "1px solid #c7d2fe", marginRight: 16 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "全部", children: "全部" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "尚未作答", children: "尚未作答" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "正確", children: "正確" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "錯誤", children: "錯誤" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "測驗題數：" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 1,
            max: filteredArticles.length,
            value: amount,
            onChange: (e) => setAmount(Math.max(1, Math.min(filteredArticles.length, parseInt(e.target.value) || 1))),
            style: { width: 60, marginLeft: 8, marginRight: 8, padding: 4, borderRadius: 4, border: "1px solid #c7d2fe" }
          }
        ),
        "/ 共 ",
        filteredArticles.length,
        " 題"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: startQuiz,
            style: {
              padding: "0.7rem 2rem",
              background: "linear-gradient(90deg, #3b82f6 60%, #2563eb 100%)",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1.1rem",
              cursor: "pointer"
            },
            disabled: filteredArticles.length === 0,
            children: "開始作答"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onBack,
            style: {
              padding: "0.7rem 2rem",
              background: "linear-gradient(90deg, #ef4444 60%, #dc2626 100%)",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1.1rem",
              cursor: "pointer"
            },
            children: "返回"
          }
        )
      ] })
    ] }),
    step === "quiz" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          submitQuiz();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#2563eb", fontWeight: 700, marginBottom: 18 }, children: [
            "作答中（",
            questions.length,
            " 題）"
          ] }),
          questions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            marginBottom: 18,
            padding: "1rem",
            border: "1px solid #e0e7ff",
            borderRadius: 8,
            background: "#f8fafc"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: 700, marginBottom: 6 }, children: [
              "Q",
              idx + 1,
              "：",
              q.sentence
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: userAnswers[idx] || "",
                onChange: (e) => handleInput(idx, e.target.value),
                style: {
                  width: "80%",
                  padding: 6,
                  borderRadius: 4,
                  border: "1.5px solid #c7d2fe",
                  fontSize: "1rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "no need" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "a", children: "a" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "an", children: "an" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "the", children: "the" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#64748b", fontSize: "0.98em", marginTop: 4 }, children: [
              "解釋：",
              q.article_explanation
            ] })
          ] }, q.no)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 16 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                style: {
                  padding: "0.7rem 2rem",
                  background: "linear-gradient(90deg, #10b981 60%, #059669 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: "pointer"
                },
                children: "送出答案"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onBack,
                style: {
                  padding: "0.7rem 2rem",
                  background: "linear-gradient(90deg, #ef4444 60%, #dc2626 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: "pointer"
                },
                children: "放棄"
              }
            )
          ] })
        ]
      }
    ),
    step === "result" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#2563eb", fontWeight: 700, marginBottom: 18 }, children: "成績" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", fontWeight: 600, marginBottom: 12 }, children: [
        results.filter((r) => r.correct).length,
        " / ",
        results.length,
        " 題正確"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { children: results.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 700, color: r.correct ? "#16a34a" : "#dc2626" }, children: [
          "Q",
          idx + 1,
          "：",
          r.sentence
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "你的答案：「",
        r.userAnswer,
        "」",
        r.correct ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 6 }, children: "✅" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 6 }, children: "❌" }),
          "，正確答案：",
          r.answer
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#64748b", fontSize: "0.98em" }, children: [
          "解釋：",
          r.explanation
        ] })
      ] }, idx)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center", marginTop: 18 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          style: {
            padding: "0.7rem 2rem",
            background: "linear-gradient(90deg, #3b82f6 60%, #2563eb 100%)",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer"
          },
          children: "返回"
        }
      ) })
    ] })
  ] });
}

export { ArticleTestArticles as default };
