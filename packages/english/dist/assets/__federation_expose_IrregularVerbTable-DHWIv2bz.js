import { importShared } from './__federation_fn_import-DIdBnpG9.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CsM3lTE3.js';
import { C as Chart, p as plugin } from './chartjs-plugin-datalabels.esm-CayJgq7g.js';

const {useState: useState$1,useEffect: useEffect$1} = await importShared('react');

function Quiz({ verbs, testAmount, setTestAmount, onCancel, autoStart }) {
  const [testVerbs, setTestVerbs] = useState$1([]);
  const [userAnswers, setUserAnswers] = useState$1({});
  const [quizStarted, setQuizStarted] = useState$1(false);
  const [results, setResults] = useState$1({});
  const [filter, setFilter] = useState$1("all");
  useEffect$1(() => {
    if (autoStart) {
      setQuizStarted(true);
    }
  }, [autoStart]);
  useEffect$1(() => {
    if (quizStarted) {
      let filteredVerbs = [...verbs];
      if (filter === "unanswered") {
        filteredVerbs = filteredVerbs.filter((v) => !v.status || v.status === "尚未作答");
      } else if (filter === "incorrect") {
        filteredVerbs = filteredVerbs.filter((v) => v.status === "Incorrect");
      }
      const shuffled = filteredVerbs.sort(() => 0.5 - Math.random());
      setTestVerbs(shuffled.slice(0, Math.min(testAmount, shuffled.length)));
      setUserAnswers({});
      setResults({});
    }
  }, [quizStarted, verbs, testAmount, filter]);
  const handleSubmit = () => {
    const storedVerbs = JSON.parse(localStorage.getItem("Irregular") || "[]");
    testVerbs.forEach((verb) => {
      const userAnswer = userAnswers[verb.no];
      if (userAnswer) {
        const isCorrect = userAnswer.past.toLowerCase() === verb.past.toLowerCase() && userAnswer.pastParticiple.toLowerCase() === verb.pastParticiple.toLowerCase();
        const status = isCorrect ? "Correct" : "Incorrect";
        const updatedVerb = { ...verb, status };
        setResults((prev) => ({ ...prev, [verb.no]: isCorrect }));
        const existingIndex = storedVerbs.findIndex((v) => v.no === verb.no);
        if (existingIndex >= 0) {
          storedVerbs[existingIndex] = updatedVerb;
        } else {
          storedVerbs.push(updatedVerb);
        }
      }
    });
    localStorage.setItem("Irregular", JSON.stringify(storedVerbs));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "1rem" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Quiz" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Questions:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: "1",
            max: verbs.length,
            value: testAmount,
            onChange: (e) => setTestAmount(Math.max(1, Math.min(verbs.length, parseInt(e.target.value) || 20))),
            style: { marginLeft: "0.5rem", width: "50px" }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Filter:",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filter,
            onChange: (e) => setFilter(e.target.value),
            style: { marginLeft: "0.5rem" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Verbs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unanswered", children: "Unanswered Only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "incorrect", children: "Incorrect Only" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setQuizStarted(true),
          style: {
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer"
          },
          children: "Start Quiz"
        }
      )
    ] }),
    quizStarted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { margin: 0 }, children: [
          "Current Quiz (",
          testVerbs.length,
          " questions)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleSubmit,
              style: {
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer"
              },
              children: "Check Answers"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                onCancel();
                window.location.reload();
              },
              style: {
                padding: "0.5rem 1rem",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer"
              },
              children: "Back to Dashboard"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "0.9rem"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #ddd", padding: "4px", width: "20%" }, children: "Base" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #ddd", padding: "4px", width: "20%" }, children: "Past" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #ddd", padding: "4px", width: "20%" }, children: "Past Participle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #ddd", padding: "4px", width: "40%" }, children: "Result" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: testVerbs.map((verb) => {
          const userAnswer = userAnswers[verb.no];
          const isCorrect = results[verb.no];
          const hasResult = typeof isCorrect !== "undefined";
          const isPastCorrect = hasResult && userAnswer?.past?.toLowerCase() === verb.past.toLowerCase();
          const isParticipleCorrect = hasResult && userAnswer?.pastParticiple?.toLowerCase() === verb.pastParticiple.toLowerCase();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { border: "1px solid #ddd", padding: "4px", display: "flex", alignItems: "center", gap: "4px" }, children: [
              verb.base,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: async () => {
                    try {
                      if (!("speechSynthesis" in window)) {
                        alert("Text-to-speech is not supported in your browser");
                        return;
                      }
                      console.log("Available voices:", speechSynthesis.getVoices());
                      const utterance = new SpeechSynthesisUtterance(verb.base);
                      utterance.lang = "en-US";
                      utterance.rate = 0.9;
                      if (speechSynthesis.getVoices().length === 0) {
                        await new Promise((resolve) => {
                          speechSynthesis.onvoiceschanged = resolve;
                        });
                      }
                      const voices = speechSynthesis.getVoices();
                      const englishVoice = voices.find((v) => v.lang.includes("en-"));
                      if (englishVoice) {
                        utterance.voice = englishVoice;
                      }
                      console.log("Speaking with:", utterance.voice);
                      speechSynthesis.cancel();
                      speechSynthesis.speak(utterance);
                    } catch (error) {
                      console.error("Speech synthesis error:", error);
                      alert(`Error: ${error instanceof Error ? error.message : "Failed to speak"}`);
                    }
                  },
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px"
                  },
                  children: "🔊"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #ddd", padding: "4px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: userAnswer?.past || "",
                  onChange: (e) => setUserAnswers((prev) => ({
                    ...prev,
                    [verb.no]: {
                      ...prev[verb.no] || { past: "", pastParticiple: "" },
                      past: e.target.value
                    }
                  })),
                  style: {
                    width: "100%",
                    padding: "2px",
                    boxSizing: "border-box",
                    color: hasResult ? isPastCorrect ? "#16a34a" : "#dc2626" : "inherit",
                    fontWeight: hasResult ? "bold" : "normal"
                  }
                }
              ),
              hasResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontSize: "0.8em",
                    color: "#6b7280",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  },
                  onClick: () => {
                    const utterance = new SpeechSynthesisUtterance(verb.past);
                    utterance.lang = "en-US";
                    speechSynthesis.speak(utterance);
                  },
                  children: [
                    "Correct: ",
                    verb.past,
                    " 🔊"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #ddd", padding: "4px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: userAnswer?.pastParticiple || "",
                  onChange: (e) => setUserAnswers((prev) => ({
                    ...prev,
                    [verb.no]: {
                      ...prev[verb.no] || { past: "", pastParticiple: "" },
                      pastParticiple: e.target.value
                    }
                  })),
                  style: {
                    width: "100%",
                    padding: "2px",
                    boxSizing: "border-box",
                    color: hasResult ? isParticipleCorrect ? "#16a34a" : "#dc2626" : "inherit",
                    fontWeight: hasResult ? "bold" : "normal"
                  }
                }
              ),
              hasResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontSize: "0.8em",
                    color: "#6b7280",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  },
                  onClick: () => {
                    const utterance = new SpeechSynthesisUtterance(verb.pastParticiple);
                    utterance.lang = "en-US";
                    speechSynthesis.speak(utterance);
                  },
                  children: [
                    "Correct: ",
                    verb.pastParticiple,
                    " 🔊"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #ddd", padding: "4px", textAlign: "center" }, children: hasResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontSize: "1.2em",
              color: isCorrect ? "#16a34a" : "#dc2626"
            }, children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "✅",
              /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { autoPlay: true, src: "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "❌",
              /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { autoPlay: true, src: "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3" })
            ] }) }) })
          ] }, verb.no);
        }) })
      ] })
    ] })
  ] });
}

function Articles() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Articles Placeholder" });
}

const {useState,useEffect,useRef} = await importShared('react');
function IrregularVerbTable() {
  const [verbs, setVerbs] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [testAmount, setTestAmount] = useState(5);
  const [quizAutoStart, setQuizAutoStart] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (verbs.length > 0 && activeTab === "dashboard") {
      renderChart();
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [verbs, activeTab]);
  const renderChart = () => {
    if (!chartRef.current) return;
    const statusCounts = verbs.reduce((acc, verb) => {
      acc[verb.status || "尚未作答"] = (acc[verb.status || "尚未作答"] || 0) + 1;
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
    const storedVerbs = localStorage.getItem("Irregular");
    if (storedVerbs) {
      setVerbs(JSON.parse(storedVerbs));
    } else {
      const defaultVerbs = [
        { no: 1, base: "go", past: "went", pastParticiple: "gone", status: "尚未作答" },
        { no: 2, base: "eat", past: "ate", pastParticiple: "eaten", status: "尚未作答" },
        { no: 3, base: "see", past: "saw", pastParticiple: "seen", status: "尚未作答" },
        { no: 4, base: "write", past: "wrote", pastParticiple: "written", status: "尚未作答" },
        { no: 5, base: "begin", past: "began", pastParticiple: "begun", status: "尚未作答" }
      ];
      localStorage.setItem("Irregular", JSON.stringify(defaultVerbs));
      setVerbs(defaultVerbs);
    }
  }, []);
  const handleExport = () => {
    const header = ["#", "base", "past", "pastParticiple", "status"];
    const csvContent = [
      header.join(","),
      ...verbs.map((v) => [v.no, v.base, v.past, v.pastParticiple, v.status || "尚未作答"].join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "irregular-verbs.csv";
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
        const lines = text.trim().split("\n");
        lines[0].split(",").map((h) => h.trim());
        const importedVerbs = lines.slice(1).map((line) => {
          const values = line.split(",");
          return {
            no: parseInt(values[0]),
            base: values[1],
            past: values[2],
            pastParticiple: values[3],
            status: values[4]?.trim() || "尚未作答"
          };
        });
        localStorage.setItem("Irregular", JSON.stringify(importedVerbs));
        setVerbs(importedVerbs);
      }
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", height: "100vh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, padding: "1rem", overflowY: "auto" }, children: activeTab === "articles" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Articles, {}) : activeTab === "dashboard" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Progress Chart" }),
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
            children: "Export CSV"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: ".csv",
            style: { display: "none" },
            id: "csvInput",
            onChange: handleImport
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => document.getElementById("csvInput")?.click(),
            style: {
              padding: "0.5rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer"
            },
            children: "Import CSV"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setQuizAutoStart(true);
              setActiveTab("quiz");
            },
            style: {
              padding: "0.5rem",
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer"
            },
            children: "Start Quiz"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "300px", border: "1px solid #d1d5db", borderRadius: "0.375rem", padding: "1rem", marginBottom: "2rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: chartRef }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "#f3f4f6" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "Past" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "Past Participle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: verbs.map((verb) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: verb.no }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: verb.base }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: verb.past }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: verb.pastParticiple }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #d1d5db", padding: "0.5rem" }, children: verb.status || "尚未作答" })
      ] }, verb.no)) })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Quiz,
    {
      verbs,
      testAmount,
      setTestAmount,
      onCancel: () => {
        setActiveTab("dashboard");
        setQuizAutoStart(false);
      },
      autoStart: quizAutoStart
    }
  ) }) });
}

export { IrregularVerbTable as default };
