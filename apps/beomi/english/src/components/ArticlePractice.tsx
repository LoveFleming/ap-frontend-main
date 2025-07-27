

import React, { useState, useEffect, useRef } from 'react';

import { Chart } from 'chart.js/auto';
// @ts-ignore - No types available
import ChartDataLabels from 'chartjs-plugin-datalabels';

export interface ArticleTestItem {
    no: number;
    sentence: string;
    answer: string;
    article_explanation: string;
    status: string;
}

export default function ArticleTestArticles() {
    const [articles, setArticles] = useState<ArticleTestItem[]>([]);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'articles'>('dashboard');
    const [testAmount, setTestAmount] = useState(5);

    // 範例 handleQuizAnswer，未來可根據實際 quiz 功能調整
    const handleQuizAnswer = (item: ArticleTestItem, isCorrect: boolean) => {
        const updatedArticles = articles.map(v =>
            v.no === item.no
                ? { ...v, status: isCorrect ? '正確' : '錯誤' }
                : v
        );
        setArticles(updatedArticles);
        localStorage.setItem('ArticleTestArticles', JSON.stringify(updatedArticles));
    };
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (articles.length > 0 && activeTab === 'dashboard') {
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
            acc[item.status || '尚未作答'] = (acc[item.status || '尚未作答'] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Learning Progress'
                    },
                    // @ts-ignore - Chart.js plugin configuration
                    datalabels: {
                        formatter: (value: number) => value.toString(),
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    };

    useEffect(() => {
        const storedArticles = localStorage.getItem('ArticleTestArticles');
        if (storedArticles) {
            setArticles(JSON.parse(storedArticles));
        } else {
            const defaultArticles: ArticleTestItem[] = [
                {
                    no: 19,
                    sentence: "The internet has changed our lives",
                    answer: "the",
                    article_explanation: "全球唯一的系統性事物，使用 the",
                    status: "正確"
                }
            ];
            localStorage.setItem('ArticleTestArticles', JSON.stringify(defaultArticles));
            setArticles(defaultArticles);
        }
    }, []);

    // 匯出 JSON
    const handleExport = () => {
        const jsonContent = JSON.stringify(articles, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'article-test-export.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 匯入 JSON
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result;
            if (typeof text === 'string') {
                try {
                    const importedArticles = JSON.parse(text);
                    if (Array.isArray(importedArticles)) {
                        localStorage.setItem('ArticleTestArticles', JSON.stringify(importedArticles));
                        setArticles(importedArticles);
                    } else {
                        alert('檔案格式錯誤，請確認為正確的 JSON 陣列。');
                    }
                } catch {
                    alert('檔案解析失敗，請確認為正確的 JSON 格式。');
                }
            }
        };
        reader.readAsText(file);
    };

    const sidebarStyle = {
        width: '16rem',
        borderRight: '1px solid #d1d5db',
        padding: '1rem',
        backgroundColor: '#f9fafb'
    };

    const listItemStyle = (isActive: boolean) => ({
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        backgroundColor: isActive ? '#bfdbfe' : 'transparent',
        fontWeight: isActive ? '600' : 'normal'
    });

    return (
        <div style={{ display: 'flex', height: '100vh' }}>


            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>



                {activeTab === 'articles' ? (
                    <div />
                ) : activeTab === 'dashboard' ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0 }}>答題進度</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={handleExport}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    匯出 JSON
                                </button>
                                <input
                                    type="file"
                                    accept=".json"
                                    style={{ display: 'none' }}
                                    id="jsonInput"
                                    onChange={handleImport}
                                />
                                <button
                                    onClick={() => document.getElementById('jsonInput')?.click()}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    匯入 JSON
                                </button>
                                <button
                                    onClick={() => setActiveTab('quiz')}
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        backgroundColor: '#f59e0b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginLeft: '1rem'
                                    }}
                                >
                                    開始測驗
                                </button>
                            </div>
                        </div>
                        <div style={{ height: '300px', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '1rem', marginBottom: '2rem' }}>
                            <canvas ref={chartRef} />
                        </div>
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f3f4f6' }}>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>#</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>題目</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>答案</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>解釋</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>狀態</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((item) => (
                                    <tr key={item.no}>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.no}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.sentence}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.answer}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.article_explanation}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <ArticleTestQuiz
                        articles={articles}
                        testAmount={testAmount}
                        onBack={() => setActiveTab('dashboard')}
                        onUpdateStatus={(updatedArticles) => {
                            setArticles(updatedArticles);
                            localStorage.setItem('ArticleTestArticles', JSON.stringify(updatedArticles));
                        }}
                    />
                )}
            </div>
        </div>
    );
}

/** 冠詞測驗元件 */
function ArticleTestQuiz({
    articles,
    testAmount,
    onBack,
    onUpdateStatus,
}: {
    articles: ArticleTestItem[];
    testAmount: number;
    onBack: () => void;
    onUpdateStatus: (updated: ArticleTestItem[]) => void;
}) {
    const [step, setStep] = useState<'setup' | 'quiz' | 'result'>('setup');
    const [amount, setAmount] = useState(testAmount);
    const [questions, setQuestions] = useState<ArticleTestItem[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [idx: number]: string }>({});
    const [results, setResults] = useState<{ correct: boolean; answer: string; userAnswer: string; sentence: string; explanation: string }[]>([]);
    // 狀態篩選
    const [statusFilter, setStatusFilter] = useState<string>('全部');

    // 根據 statusFilter 篩選 articles
    const filteredArticles = React.useMemo(() => {
        if (statusFilter === '全部') return articles;
        if (statusFilter === '尚未作答') {
            return articles.filter(a => !a.status || a.status === '尚未作答');
        }
        return articles.filter(a => a.status === statusFilter);
    }, [articles, statusFilter]);

    // 隨機抽題
    const getRandomQuestions = (list: ArticleTestItem[], count: number) => {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    };

    const startQuiz = () => {
        const qs = getRandomQuestions(filteredArticles, amount);
        setQuestions(qs);
        setUserAnswers({});
        setStep('quiz');
    };

    const handleInput = (idx: number, value: string) => {
        setUserAnswers(prev => ({ ...prev, [idx]: value }));
    };

    const submitQuiz = () => {
        const res = questions.map((q, idx) => {
            const userAns = (userAnswers[idx] || '').trim();
            const correct = userAns.toLowerCase() === q.answer.trim().toLowerCase();
            return {
                correct,
                answer: q.answer,
                userAnswer: userAns,
                sentence: q.sentence,
                explanation: q.article_explanation,
            };
        });

        // 更新 status
        const updatedArticles = articles.map(a => {
            const qIdx = questions.findIndex(q => q.no === a.no);
            if (qIdx !== -1) {
                return { ...a, status: res[qIdx].correct ? '正確' : '錯誤' };
            }
            return a;
        });
        onUpdateStatus(updatedArticles);

        setResults(res);
        setStep('result');
    };

    return (
        <div style={{
            maxWidth: 600,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #dbeafe',
            padding: '2rem 1.5rem',
            marginTop: 32,
        }}>
            {step === 'setup' && (
                <>
                    <h2 style={{ textAlign: 'center', color: '#2563eb', fontWeight: 800, marginBottom: 24 }}>冠詞測驗</h2>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ marginRight: 12 }}>狀態篩選：</label>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            style={{ padding: 4, borderRadius: 4, border: '1px solid #c7d2fe', marginRight: 16 }}
                        >
                            <option value="全部">全部</option>
                            <option value="尚未作答">尚未作答</option>
                            <option value="正確">正確</option>
                            <option value="錯誤">錯誤</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <label>測驗題數：</label>
                        <input
                            type="number"
                            min={1}
                            max={filteredArticles.length}
                            value={amount}
                            onChange={e => setAmount(Math.max(1, Math.min(filteredArticles.length, parseInt(e.target.value) || 1)))}
                            style={{ width: 60, marginLeft: 8, marginRight: 8, padding: 4, borderRadius: 4, border: '1px solid #c7d2fe' }}
                        />
                        / 共 {filteredArticles.length} 題
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                        <button
                            onClick={startQuiz}
                            style={{
                                padding: '0.7rem 2rem',
                                background: 'linear-gradient(90deg, #3b82f6 60%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                            disabled={filteredArticles.length === 0}
                        >
                            開始作答
                        </button>
                        <button
                            onClick={onBack}
                            style={{
                                padding: '0.7rem 2rem',
                                background: 'linear-gradient(90deg, #ef4444 60%, #dc2626 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                        >
                            返回
                        </button>
                    </div>
                </>
            )}
            {step === 'quiz' && (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        submitQuiz();
                    }}
                >
                    <h3 style={{ color: '#2563eb', fontWeight: 700, marginBottom: 18 }}>作答中（{questions.length} 題）</h3>
                    {questions.map((q, idx) => (
                        <div key={q.no} style={{
                            marginBottom: 18,
                            padding: '1rem',
                            border: '1px solid #e0e7ff',
                            borderRadius: 8,
                            background: '#f8fafc'
                        }}>
                            <div style={{ fontWeight: 700, marginBottom: 6 }}>Q{idx + 1}：{q.sentence}</div>
                            <select
                                value={userAnswers[idx] || ''}
                                onChange={e => handleInput(idx, e.target.value)}
                                style={{
                                    width: '80%',
                                    padding: 6,
                                    borderRadius: 4,
                                    border: '1.5px solid #c7d2fe',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="">no need</option>
                                <option value="a">a</option>
                                <option value="an">an</option>
                                <option value="the">the</option>
                            </select>
                            <div style={{ color: '#64748b', fontSize: '0.98em', marginTop: 4 }}>解釋：{q.article_explanation}</div>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                        <button
                            type="submit"
                            style={{
                                padding: '0.7rem 2rem',
                                background: 'linear-gradient(90deg, #10b981 60%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                        >
                            送出答案
                        </button>
                        <button
                            type="button"
                            onClick={onBack}
                            style={{
                                padding: '0.7rem 2rem',
                                background: 'linear-gradient(90deg, #ef4444 60%, #dc2626 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                        >
                            放棄
                        </button>
                    </div>
                </form>
            )}
            {step === 'result' && (
                <>
                    <h3 style={{ color: '#2563eb', fontWeight: 700, marginBottom: 18 }}>成績</h3>
                    <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: 12 }}>
                        {results.filter(r => r.correct).length} / {results.length} 題正確
                    </div>
                    <ol>
                        {results.map((r, idx) => (
                            <li key={idx} style={{ marginBottom: 8 }}>
                                <span style={{ fontWeight: 700, color: r.correct ? '#16a34a' : '#dc2626' }}>
                                    Q{idx + 1}：{r.sentence}
                                </span>
                                <br />
                                你的答案：「{r.userAnswer}」
                                {r.correct ? (
                                    <span style={{ marginLeft: 6 }}>✅</span>
                                ) : (
                                    <>
                                        <span style={{ marginLeft: 6 }}>❌</span>
                                        ，正確答案：{r.answer}
                                    </>
                                )}
                                <div style={{ color: '#64748b', fontSize: '0.98em' }}>解釋：{r.explanation}</div>
                            </li>
                        ))}
                    </ol>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                        <button
                            onClick={onBack}
                            style={{
                                padding: '0.7rem 2rem',
                                background: 'linear-gradient(90deg, #3b82f6 60%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                        >
                            返回
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
