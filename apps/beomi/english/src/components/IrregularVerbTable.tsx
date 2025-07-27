import React, { useState, useEffect, useRef } from 'react';

import { Chart } from 'chart.js/auto';
// @ts-ignore - No types available
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Quiz from './IrregularVerbQuiz';
import Articles from './Articles';

export interface VerbItem {
    no: number;
    base: string;
    past: string;
    pastParticiple: string;
    status?: string;
}

interface IrregularVerbTableProps {
    setAppTab?: (tab: "verb" | "article" | "vocab1200") => void;
}

export default function IrregularVerbTable(props: IrregularVerbTableProps) {
    const [verbs, setVerbs] = useState<VerbItem[]>([]);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'articles'>('dashboard');
    const [testAmount, setTestAmount] = useState(5);
    const [quizAutoStart, setQuizAutoStart] = useState(false);

    const handleQuizAnswer = (verb: VerbItem, isCorrect: boolean) => {
        const updatedVerbs = verbs.map(v =>
            v.no === verb.no
                ? { ...v, status: isCorrect ? 'Correct' : 'Incorrect' }
                : v
        );
        setVerbs(updatedVerbs);
        localStorage.setItem('Irregular', JSON.stringify(updatedVerbs));
    };
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (verbs.length > 0 && activeTab === 'dashboard') {
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
            acc[verb.status || '尚未作答'] = (acc[verb.status || '尚未作答'] || 0) + 1;
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
        const storedVerbs = localStorage.getItem('Irregular');
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
            localStorage.setItem('Irregular', JSON.stringify(defaultVerbs));
            setVerbs(defaultVerbs);
        }
    }, []);

    const handleExport = () => {
        const header = ['#', 'base', 'past', 'pastParticiple', 'status'];
        const csvContent = [
            header.join(','),
            ...verbs.map(v => [v.no, v.base, v.past, v.pastParticiple, v.status || '尚未作答'].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'irregular-verbs.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result;
            if (typeof text === 'string') {
                const lines = text.trim().split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                const importedVerbs = lines.slice(1).map(line => {
                    const values = line.split(',');
                    return {
                        no: parseInt(values[0]),
                        base: values[1],
                        past: values[2],
                        pastParticiple: values[3],
                        status: values[4]?.trim() || '尚未作答'
                    };
                });

                localStorage.setItem('Irregular', JSON.stringify(importedVerbs));
                setVerbs(importedVerbs);
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
                    <Articles />
                ) : activeTab === 'dashboard' ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0 }}>Progress Chart</h2>
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
                                    Export CSV
                                </button>
                                <input
                                    type="file"
                                    accept=".csv"
                                    style={{ display: 'none' }}
                                    id="csvInput"
                                    onChange={handleImport}
                                />
                                <button
                                    onClick={() => document.getElementById('csvInput')?.click()}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Import CSV
                                </button>
                                <button
                                    onClick={() => {
                                        setQuizAutoStart(true);
                                        setActiveTab('quiz');
                                    }}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: '#f59e0b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Start Quiz
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
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>Base</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>Past</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>Past Participle</th>
                                    <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verbs.map((verb) => (
                                    <tr key={verb.no}>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{verb.no}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{verb.base}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{verb.past}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{verb.pastParticiple}</td>
                                        <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{verb.status || '尚未作答'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <Quiz
                        verbs={verbs}
                        testAmount={testAmount}
                        setTestAmount={setTestAmount}
                        onCancel={() => {
                            setActiveTab('dashboard');
                            setQuizAutoStart(false);
                            props.setAppTab?.("verb");
                        }}
                        autoStart={quizAutoStart}
                    />
                )}
            </div>
        </div>
    );
}
