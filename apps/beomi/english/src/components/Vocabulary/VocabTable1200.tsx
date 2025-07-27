import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { VocabItem } from './Vocab1200';

const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#d8854f",
    "#b6b6b6", "#f7b7a3", "#a3f7bf", "#f7e6a3", "#a3d8f7", "#e6a3f7", "#f7a3c1", "#c1f7a3"
];

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

interface ProgressChartProps {
    vocabList: VocabItem[];
    handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleExport: () => void;
}

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
}: any) => {
    // 顯示「名稱 數字」
    return (
        <text
            x={x}
            y={y}
            fill="#333"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={16}
            fontWeight="bold"
        >
            {`${name} ${value}`}
        </text>
    );
};

const ProgressChart: React.FC<ProgressChartProps> = ({ vocabList, handleImport, handleExport }) => {
    const statusPieData = getStatusPieData(vocabList);

    return (
        <div>
            {/* 狀態圓餅圖區塊 */}
            <div style={{ width: '100%', maxWidth: 600, height: 320, margin: '0 auto 24px auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusPieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={renderCustomizedLabel}
                        >
                            {statusPieData.map((entry, idx) => (
                                <Cell key={`status-cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style={{ overflowX: 'auto', maxHeight: '70vh' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f3f4f6' }}>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>主題</th>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>單字</th>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>詞性</th>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>解釋</th>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>例句1</th>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>例句2</th>
                            <th style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabList.map((item, idx) => (
                            <tr key={idx}>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.topic}</td>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.word}</td>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.pos}</td>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.meaning}</td>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.example1}</td>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.example2}</td>
                                <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }}>{item.status || '尚未作答'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgressChart;