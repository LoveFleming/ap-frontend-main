import React, { useState } from 'react';
import { VocabItem } from './Vocab1200';

interface Quiz1200Props {
    vocabList: VocabItem[];
    onCancel: () => void;
}

interface QuizResult {
    word: string;
    correct: boolean;
    userAnswer: string;
    meaning: string;
}

const getRandomQuestions = (list: VocabItem[], count: number) => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
};

const maskWordInSentence = (sentence: string, word: string): string => {
    if (!sentence || !word) return sentence;
    // 用正則遮蔽單字（忽略大小寫，僅遮蔽完整單字）
    const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    return sentence.replace(pattern, '____');
};


const Quiz1200: React.FC<Quiz1200Props> = ({ vocabList, onCancel }) => {
    const [step, setStep] = useState<'setup' | 'quiz' | 'result'>('setup');
    const [questionCount, setQuestionCount] = useState(10);
    const [questions, setQuestions] = useState<VocabItem[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [idx: number]: string }>({});
    const [results, setResults] = useState<QuizResult[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('全部');
    // 新增 quizStatus 狀態
    const [quizStatus, setQuizStatus] = useState<'success' | 'fail' | null>(null);
    // 新增題號範圍 state
    const [startIndex, setStartIndex] = useState(1);
    const [endIndex, setEndIndex] = useState(vocabList.length);

    // Chrome TTS 朗讀例句
    const handleSpeak = (text: string) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utter = new window.SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
    };

    // 根據狀態與題號範圍篩選
    const getFilteredVocabList = () => {
        let filtered = vocabList;
        if (statusFilter !== '全部') {
            filtered = filtered.filter(item => (item.status || '尚未作答') === statusFilter);
        }
        // 題號範圍（index 0-based, 顯示 1-based）
        const start = Math.max(0, startIndex - 1);
        const end = Math.min(filtered.length, endIndex);
        return filtered.slice(start, end);
    };

    // 當 vocabList 變動時，重設題號範圍
    React.useEffect(() => {
        setStartIndex(1);
        setEndIndex(vocabList.length);
    }, [vocabList.length]);

    const startQuiz = () => {
        const filteredList = getFilteredVocabList();
        const qs = getRandomQuestions(filteredList, questionCount);
        setQuestions(qs);
        setUserAnswers({});
        setStep('quiz');
    };

    const handleInput = (idx: number, value: string) => {
        setUserAnswers(prev => ({ ...prev, [idx]: value }));
    };

    const submitQuiz = () => {
        const res: QuizResult[] = questions.map((q, idx) => ({
            word: q.word,
            correct: (userAnswers[idx] || '').trim().toLowerCase() === q.word.trim().toLowerCase(),
            userAnswer: userAnswers[idx] || '',
            meaning: q.meaning,
        }));

        // 根據答題結果設定 quizStatus
        const allCorrect = res.every(r => r.correct);
        setQuizStatus(allCorrect ? 'success' : 'fail');

        // 更新 localStorage status
        try {
            const STORAGE_KEY = 'Vocab1200';
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                let vocabArr = JSON.parse(stored);
                // 只更新本次考題
                questions.forEach((q, idx) => {
                    const i = vocabArr.findIndex((item: any) => item.word === q.word && item.meaning === q.meaning);
                    if (i !== -1) {
                        vocabArr[i].status = res[idx].correct ? 'pass' : 'fail';
                    }
                });
                localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabArr));
            }
        } catch (e) {
            // ignore
        }

        setResults(res);
        setStep('result');
    };

    return (
        <div className={`quiz1200-bg${step === 'quiz' ? ' quiz1200-full-width' : ''}`}>
            <style>{`
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
            `}</style>
            <div className={`quiz1200-card${step === 'quiz' ? ' full-width' : ''}`}>
                {step === 'setup' && (
                    <>
                        <div className="quiz1200-title">單字測驗</div>
                        <div className="quiz1200-section">
                            <div className="quiz1200-row">
                                <div className="quiz1200-label">題號範圍：</div>
                                <div className="quiz1200-value">
                                    <input
                                        className="quiz1200-input"
                                        style={{ width: 60 }}
                                        type="number"
                                        min={1}
                                        max={vocabList.length}
                                        value={startIndex}
                                        onChange={e => {
                                            const val = Math.max(1, Math.min(vocabList.length, parseInt(e.target.value) || 1));
                                            setStartIndex(val);
                                            if (val > endIndex) setEndIndex(val);
                                        }}
                                    // style={{ width: 60, marginLeft: 0, marginRight: 0 }}
                                    />
                                    ～
                                    <input
                                        className="quiz1200-input"
                                        style={{ width: 60 }}
                                        type="number"
                                        min={startIndex}
                                        max={vocabList.length}
                                        value={endIndex}
                                        onChange={e => {
                                            const val = Math.max(startIndex, Math.min(vocabList.length, parseInt(e.target.value) || vocabList.length));
                                            setEndIndex(val);
                                        }}
                                    // style={{ width: 60, marginLeft: 0 }}
                                    />
                                </div>
                                <div className="quiz1200-value">／ 共 {vocabList.length} 題</div>
                            </div>
                        </div>
                        <div className="quiz1200-section">
                            <div className="quiz1200-row">
                                <div className="quiz1200-label">狀態篩選：</div>
                                <div className="quiz1200-value">
                                    <select
                                        className="quiz1200-select"
                                        style={{ minWidth: 90 }}
                                        value={statusFilter}
                                        onChange={e => setStatusFilter(e.target.value)}
                                    // style={{ minWidth: 90, marginLeft: 0 }}
                                    >
                                        <option value="全部">全部</option>
                                        <option value="尚未作答">尚未作答</option>
                                        <option value="pass">pass</option>
                                        <option value="fail">fail</option>
                                    </select>
                                </div>
                                <div className="quiz1200-value">可用題數：{getFilteredVocabList().length}</div>
                            </div>
                        </div>
                        <div className="quiz1200-section">
                            <div className="quiz1200-row">
                                <div className="quiz1200-label">考試題數：</div>
                                <div className="quiz1200-value">
                                    <input
                                        className="quiz1200-input"
                                        style={{ width: 80 }}
                                        type="number"
                                        min={1}
                                        max={getFilteredVocabList().length}
                                        value={questionCount}
                                        onChange={e => {
                                            const val = Math.max(1, Math.min(getFilteredVocabList().length, parseInt(e.target.value) || 1));
                                            setQuestionCount(val);
                                        }}
                                    // style={{ width: 80, marginLeft: 0 }}
                                    />
                                    ／ 可用題數：{getFilteredVocabList().length}
                                </div>
                            </div>
                        </div>
                        <div className="quiz1200-button-group">
                            <button
                                className="quiz1200-btn start"
                                onClick={startQuiz}
                                disabled={getFilteredVocabList().length === 0}
                            >
                                <span role="img" aria-label="rocket">🚀</span> 開始考試
                            </button>
                            <button
                                className="quiz1200-btn back"
                                onClick={onCancel}
                            >
                                <span role="img" aria-label="back">⬅️</span> 返回
                            </button>
                        </div>
                    </>
                )}

                {step === 'quiz' && (
                    <>
                        <div className="quiz1200-title" style={{ fontSize: "1.3rem", marginBottom: 0 }}>
                            作答中（{questions.length} 題）
                        </div>
                        {/* 進度條 */}
                        <div className="quiz1200-progress-bar-bg">
                            <div
                                className="quiz1200-progress-bar"
                                style={{
                                    width: `${Math.round(
                                        (Object.keys(userAnswers).length / questions.length) * 100
                                    )}%`,
                                }}
                            />
                        </div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                submitQuiz();
                            }}
                        >
                            {/* 三題同列 */}
                            <div>
                                {Array.from({ length: Math.ceil(questions.length / 3) }).map((_, rowIdx) => (
                                    <div className="quiz1200-row" key={rowIdx} style={{ marginBottom: 24 }}>
                                        {questions.slice(rowIdx * 3, rowIdx * 3 + 3).map((q, idxInRow) => {
                                            const idx = rowIdx * 3 + idxInRow;
                                            return (
                                                <div key={idx} style={{ flex: 1, minWidth: 0, maxWidth: '32%' }}>
                                                    <div>
                                                        <span style={{ fontWeight: 700, color: "#2563eb" }}>
                                                            Q{idx + 1}
                                                        </span>
                                                        <strong style={{ marginLeft: 8 }}>{q.meaning}</strong>
                                                        <span style={{ color: "#64748b", marginLeft: 6, fontSize: "0.98em" }}>
                                                            （{q.pos}）
                                                        </span>
                                                    </div>
                                                    {/* 顯示例句1，遮蔽單字 */}
                                                    {q.example1 && (
                                                        <div className="quiz1200-example" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            例句：{maskWordInSentence(q.example1, q.word)}
                                                            <button
                                                                type="button"
                                                                title="朗讀例句"
                                                                style={{
                                                                    marginLeft: 8,
                                                                    border: 'none',
                                                                    background: 'none',
                                                                    cursor: 'pointer',
                                                                    fontSize: '1.1em',
                                                                    color: '#2563eb',
                                                                    padding: 0,
                                                                }}
                                                                onClick={() => handleSpeak(q.example1)}
                                                            >
                                                                <span role="img" aria-label="speak">🔊</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <input
                                                            className="quiz1200-input"
                                                            type="text"
                                                            placeholder="請輸入英文單字"
                                                            value={userAnswers[idx] || ''}
                                                            onChange={e => handleInput(idx, e.target.value)}
                                                            style={{ width: '90%', marginTop: 4 }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            <div className="quiz1200-button-group">
                                <button
                                    type="submit"
                                    className="quiz1200-btn green"
                                >
                                    <span role="img" aria-label="check">✅</span> 送出答案
                                </button>
                                <button
                                    type="button"
                                    className="quiz1200-btn red"
                                    onClick={onCancel}
                                >
                                    <span role="img" aria-label="stop">🛑</span> 放棄
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {step === 'result' && (
                    <>
                        <div className="quiz1200-title" style={{ fontSize: "1.3rem", marginBottom: 0 }}>
                            成績
                        </div>
                        {/* 顯示本次所有題目的中文意思 */}
                        <div style={{ textAlign: 'center', marginBottom: '0.8rem', color: '#374151', fontWeight: 600 }}>
                            {results.map((r, idx) => (
                                <span key={idx}>
                                    {r.meaning}{idx < results.length - 1 ? '、' : ''}
                                </span>
                            ))}
                        </div>
                        <div className="quiz1200-score">
                            <span role="img" aria-label="star">🌟</span>
                            {results.filter(r => r.correct).length} / {results.length} 題
                        </div>
                        <ol className="quiz1200-result-list">
                            {results.map((r, idx) => (
                                <li key={idx}>
                                    <span
                                        className={`quiz1200-result-word ${r.correct ? 'quiz1200-result-correct' : 'quiz1200-result-wrong'
                                            }`}
                                    >
                                        {r.meaning} {r.word}
                                    </span>
                                    ：你的答案「{r.userAnswer}」
                                    {r.correct ? (
                                        <span style={{ marginLeft: 4 }} role="img" aria-label="correct">✅</span>
                                    ) : (
                                        <>
                                            <span style={{ marginLeft: 4 }} role="img" aria-label="wrong">❌</span>
                                            ，正確答案：{r.word}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ol>
                        <div className="quiz1200-button-group">
                            <button
                                className="quiz1200-btn start"
                                onClick={onCancel}
                            >
                                <span role="img" aria-label="back">⬅️</span> 返回單字表
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz1200;