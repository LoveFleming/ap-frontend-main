import { importShared } from './__federation_fn_import-DIdBnpG9.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CsM3lTE3.js';
import { C as Chart, p as plugin } from './chartjs-plugin-datalabels.esm-CayJgq7g.js';

const {useState,useEffect,useRef} = await importShared('react');
function ArticlePractice() {
  const [verbs, setVerbs] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [testAmount, setTestAmount] = useState(5);
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
            onClick: () => setActiveTab("quiz"),
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
      onCancel: () => setActiveTab("dashboard")
    }
  ) }) });
}

export { ArticlePractice as default };
