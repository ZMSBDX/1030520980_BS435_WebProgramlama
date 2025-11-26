import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

import SettingScreen from './SettingScreen.tsx';
import GameScreen from './GameScreen';
import ResultScreen from './ResultScreen';

export type GameState = 'mode-select' | 'playing' | 'result';
// 👇 'timed' BURAYA EKLENDİ
export type GameMode = 'classic' | 'category' | 'timed';

export const Game = () => {

    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLoginRedirect = () => {navigate("/login");}

    if(!isLoggedIn)
    {
        return (
            <>
                <div>Lütfen giriş yapınız. Giriş yapmadan oyuna başlayamazsınız.</div>
                <button onClick={handleLoginRedirect}>
                    Giriş Yap
                </button>
            </>
        );
    }

    const [gameState, setGameState] = useState<GameState>('mode-select');
    const [currentScore, setCurrentScore] = useState(0);
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


    if (gameState === 'mode-select')
    {
        return (
            <SettingScreen setGameState={setGameState} setGameMode={setGameMode} setSelectedCategory={setSelectedCategory}/>
        );
    }

    else if (gameState === 'playing') {
        if (!gameMode)
        {
            return <div>Hata: Oyun modu belirlenmemiş.</div>;
        }
        return (<GameScreen setGameState={setGameState} setCurrentScore={setCurrentScore} gameMode={gameMode} selectedCategory={selectedCategory}/>
        );
    }

    else if (gameState === 'result')
    {
        return (
            <ResultScreen setGameState={setGameState} currentScore={currentScore} setCurrentScore={setCurrentScore}/>
        );
    }

    else
    {
        return <div>Oyun durumu beklenmedik bir değerde.</div>;
    }
};