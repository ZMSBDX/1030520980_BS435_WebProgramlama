import React from 'react';
import { GameState } from './Game';

interface ResultScreenProps {
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    currentScore: number;
    setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ setGameState, currentScore, setCurrentScore }) => {

    const handleRestart = () => {
        setCurrentScore(0);
        setGameState('mode-select');
    };

    return (
        <div className="result-screen" style={{ textAlign: 'center', padding: '40px' }}>
            <h1 style={{ color: '#28a745', fontSize: '3rem' }}>Oyun Bitti! 🎉</h1>

            <div style={{ margin: '30px 0', fontSize: '1.5rem' }}>
                <p>Toplam Skorunuz:</p>
                <strong style={{ fontSize: '3rem', color: '#333' }}>{currentScore}</strong>
            </div>

            <p style={{ color: '#666', marginBottom: '30px' }}>
                Harika iş çıkardın!
            </p>

            <button
                onClick={handleRestart}
                style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                Yeni Oyun Başlat
            </button>
        </div>
    );
};

export default ResultScreen;