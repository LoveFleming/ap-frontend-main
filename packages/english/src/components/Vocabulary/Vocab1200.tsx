import React, { useState, useEffect } from 'react';
import Quiz1200 from './Quiz1200';
import VocabTable1200 from './VocabTable1200';
// 國中1200單字資料型別
export interface VocabItem {
    topic: string;    // 主題
    word: string;     // 單字
    pos: string;      // 詞性
    meaning: string;  // 解釋
    example1: string; // 例句1
    example2: string; // 例句2
    status?: string;  // 狀態
}

// localStorage key
const STORAGE_KEY = 'Vocab1200';

const parseCSV = (csv: string): VocabItem[] => {
    // 解析 CSV 字串為 VocabItem 陣列
    const lines = csv.trim().split('\n');
    // 跳過標題行
    return lines.slice(1).map(line => {
        // 處理逗號分隔，移除前後引號
        const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
        return {
            topic: values[0] || '',
            word: values[1] || '',
            pos: values[2] || '',
            meaning: values[3] || '',
            example1: values[4] || '',
            example2: values[5] || '',
            status: values[6] || '尚未作答',
        };
    });
};

const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#d8854f",
    "#b6b6b6", "#f7b7a3", "#a3f7bf", "#f7e6a3", "#a3d8f7", "#e6a3f7", "#f7a3c1", "#c1f7a3"
];
// COLORS 目前僅用於狀態圓餅圖，保留


// 依 status 統計
const getStatusPieData = (vocabList: VocabItem[]) => {
    const statusCount: { [key: string]: number } = {};
    vocabList.forEach(item => {
        const status = item.status || '尚未作答';
        statusCount[status] = (statusCount[status] || 0) + 1;
    });
    return Object.entries(statusCount).map(([status, value]) => ({
        name: status,
        value
    }));
};

const Vocab1200: React.FC = () => {
    const [vocabList, setVocabList] = useState<VocabItem[]>([]);
    const [showQuiz, setShowQuiz] = useState(false);

    // 初始化：從 localStorage 讀取
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setVocabList(JSON.parse(stored));
        }
    }, []);

    // 匯入 CSV 檔案
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result;
            if (typeof text === 'string') {
                const items = parseCSV(text);
                setVocabList(items);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            }
        };
        reader.readAsText(file, 'utf-8');
    };

    // 匯出 CSV 檔案
    const handleExport = () => {
        const header = ['"主題"', '"單字"', '"詞性"', '"解釋"', '"例句1"', '"例句2"', '"狀態"'];
        const rows = vocabList.map(item =>
            [
                `"${item.topic}"`,
                `"${item.word}"`,
                `"${item.pos}"`,
                `"${item.meaning}"`,
                `"${item.example1}"`,
                `"${item.example2}"`,
                `"尚未作答"`
            ].join(',')
        );
        const csvContent = [header.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '國中1200.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 顯示單字表或考試頁面
    return (
        <div style={{ padding: 24 }}>
            <h2>國中1200單字表</h2>
            {!showQuiz ? (
                <>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                        <button
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            單字表
                        </button>
                        <button
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#f59e42',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={() => setShowQuiz(true)}
                        >
                            考試
                        </button>
                    </div>
                    <VocabTable1200
                        vocabList={vocabList}
                        handleImport={handleImport}
                        handleExport={handleExport}
                    />
                </>
            ) : (
                <Quiz1200
                    vocabList={vocabList}
                    onCancel={() => setShowQuiz(false)}
                />
            )}
        </div>
    );
};

export default Vocab1200;