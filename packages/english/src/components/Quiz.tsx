import React, { useState, useEffect } from 'react';
import { VerbItem } from './IrregularVerbTable';

interface QuizProps {
    verbs: VerbItem[];
    testAmount: number;
    setTestAmount: (amount: number) => void;
    onCancel: () => void;
    autoStart?: boolean;
}

export default function Quiz({ verbs, testAmount, setTestAmount, onCancel, autoStart }: QuizProps) {
    const [testVerbs, setTestVerbs] = useState<VerbItem[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: { past: string, pastParticiple: string } }>({});
    const [quizStarted, setQuizStarted] = useState(false);
    const [results, setResults] = useState<{ [key: number]: boolean }>({});
    const [filter, setFilter] = useState<'all' | 'unanswered' | 'incorrect'>('all');

    // 若 autoStart 為 true，進入時自動開始 quiz
    useEffect(() => {
        if (autoStart) {
            setQuizStarted(true);
        }
    }, [autoStart]);

    useEffect(() => {
        if (quizStarted) {
            let filteredVerbs = [...verbs];

            if (filter === 'unanswered') {
                filteredVerbs = filteredVerbs.filter(v => !v.status || v.status === '尚未作答');
            } else if (filter === 'incorrect') {
                filteredVerbs = filteredVerbs.filter(v => v.status === 'Incorrect');
            }

            const shuffled = filteredVerbs.sort(() => 0.5 - Math.random());
            setTestVerbs(shuffled.slice(0, Math.min(testAmount, shuffled.length)));
            setUserAnswers({});
            setResults({});
        }
    }, [quizStarted, verbs, testAmount, filter]);

    const handleSubmit = () => {
        const storedVerbs = JSON.parse(localStorage.getItem('Irregular') || '[]') as VerbItem[];

        testVerbs.forEach(verb => {
            const userAnswer = userAnswers[verb.no];
            if (userAnswer) {
                const isCorrect =
                    userAnswer.past.toLowerCase() === verb.past.toLowerCase() &&
                    userAnswer.pastParticiple.toLowerCase() === verb.pastParticiple.toLowerCase();

                const status = isCorrect ? 'Correct' : 'Incorrect';
                const updatedVerb = { ...verb, status };

                // Update results state
                setResults(prev => ({ ...prev, [verb.no]: isCorrect }));

                // Update localStorage
                const existingIndex = storedVerbs.findIndex(v => v.no === verb.no);
                if (existingIndex >= 0) {
                    storedVerbs[existingIndex] = updatedVerb;
                } else {
                    storedVerbs.push(updatedVerb);
                }
            }
        });

        localStorage.setItem('Irregular', JSON.stringify(storedVerbs));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
            }}>
                <h2 style={{ margin: 0 }}>Quiz</h2>
                <div>
                    <label>
                        Questions:
                        <input
                            type="number"
                            min="1"
                            max={verbs.length}
                            value={testAmount}
                            onChange={(e) => setTestAmount(Math.max(1, Math.min(verbs.length, parseInt(e.target.value) || 20)))}
                            style={{ marginLeft: '0.5rem', width: '50px' }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Filter:
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as 'all' | 'unanswered' | 'incorrect')}
                            style={{ marginLeft: '0.5rem' }}
                        >
                            <option value="all">All Verbs</option>
                            <option value="unanswered">Unanswered Only</option>
                            <option value="incorrect">Incorrect Only</option>
                        </select>
                    </label>
                </div>
                <button
                    onClick={() => setQuizStarted(true)}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                >
                    Start Quiz
                </button>
            </div>

            {quizStarted && (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ margin: 0 }}>Current Quiz ({testVerbs.length} questions)</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Check Answers
                            </button>
                            <button
                                onClick={() => {
                                    onCancel();
                                    //window.location.reload();
                                }}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>

                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '0.9rem'
                    }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '4px', width: '20%' }}>Base</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', width: '20%' }}>Past</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', width: '20%' }}>Past Participle</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', width: '40%' }}>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testVerbs.map(verb => {
                                const userAnswer = userAnswers[verb.no];
                                const isCorrect = results[verb.no];
                                const hasResult = typeof isCorrect !== 'undefined';
                                const isPastCorrect = hasResult && userAnswer?.past?.toLowerCase() === verb.past.toLowerCase();
                                const isParticipleCorrect = hasResult && userAnswer?.pastParticiple?.toLowerCase() === verb.pastParticiple.toLowerCase();

                                return (
                                    <tr key={verb.no}>
                                        <td style={{ border: '1px solid #ddd', padding: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {verb.base}
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        if (!('speechSynthesis' in window)) {
                                                            alert('Text-to-speech is not supported in your browser');
                                                            return;
                                                        }

                                                        console.log('Available voices:', speechSynthesis.getVoices());

                                                        const utterance = new SpeechSynthesisUtterance(verb.base);
                                                        utterance.lang = 'en-US';
                                                        utterance.rate = 0.9;

                                                        // Wait for voices to be loaded if needed
                                                        if (speechSynthesis.getVoices().length === 0) {
                                                            await new Promise(resolve => {
                                                                speechSynthesis.onvoiceschanged = resolve;
                                                            });
                                                        }

                                                        const voices = speechSynthesis.getVoices();
                                                        const englishVoice = voices.find(v => v.lang.includes('en-'));
                                                        if (englishVoice) {
                                                            utterance.voice = englishVoice;
                                                        }

                                                        console.log('Speaking with:', utterance.voice);
                                                        speechSynthesis.cancel();
                                                        speechSynthesis.speak(utterance);

                                                    } catch (error) {
                                                        console.error('Speech synthesis error:', error);
                                                        alert(`Error: ${error instanceof Error ? error.message : 'Failed to speak'}`);
                                                    }
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '2px'
                                                }}
                                            >
                                                🔊
                                            </button>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <input
                                                    type="text"
                                                    value={userAnswer?.past || ''}
                                                    onChange={(e) => setUserAnswers(prev => ({
                                                        ...prev,
                                                        [verb.no]: {
                                                            ...(prev[verb.no] || { past: '', pastParticiple: '' }),
                                                            past: e.target.value
                                                        }
                                                    }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '2px',
                                                        boxSizing: 'border-box',
                                                        color: hasResult ? (isPastCorrect ? '#16a34a' : '#dc2626') : 'inherit',
                                                        fontWeight: hasResult ? 'bold' : 'normal'
                                                    }}
                                                />
                                                {hasResult && (
                                                    <span
                                                        style={{
                                                            fontSize: '0.8em',
                                                            color: '#6b7280',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        }}
                                                        onClick={() => {
                                                            const utterance = new SpeechSynthesisUtterance(verb.past);
                                                            utterance.lang = 'en-US';
                                                            speechSynthesis.speak(utterance);
                                                        }}
                                                    >
                                                        Correct: {verb.past} 🔊
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <input
                                                    type="text"
                                                    value={userAnswer?.pastParticiple || ''}
                                                    onChange={(e) => setUserAnswers(prev => ({
                                                        ...prev,
                                                        [verb.no]: {
                                                            ...(prev[verb.no] || { past: '', pastParticiple: '' }),
                                                            pastParticiple: e.target.value
                                                        }
                                                    }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '2px',
                                                        boxSizing: 'border-box',
                                                        color: hasResult ? (isParticipleCorrect ? '#16a34a' : '#dc2626') : 'inherit',
                                                        fontWeight: hasResult ? 'bold' : 'normal'
                                                    }}
                                                />
                                                {hasResult && (
                                                    <span
                                                        style={{
                                                            fontSize: '0.8em',
                                                            color: '#6b7280',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        }}
                                                        onClick={() => {
                                                            const utterance = new SpeechSynthesisUtterance(verb.pastParticiple);
                                                            utterance.lang = 'en-US';
                                                            speechSynthesis.speak(utterance);
                                                        }}
                                                    >
                                                        Correct: {verb.pastParticiple} 🔊
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>
                                            {hasResult && (
                                                <div style={{
                                                    fontSize: '1.2em',
                                                    color: isCorrect ? '#16a34a' : '#dc2626'
                                                }}>
                                                    {isCorrect ? (
                                                        <>
                                                            ✅
                                                            <audio autoPlay src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            ❌
                                                            <audio autoPlay src="https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3" />
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
