import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

import ModeSelectionScreen from './SettingScreen.tsx';
import GameScreen from './GameScreen';
import ResultScreen from './ResultScreen';

export type GameState = 'mode-select' | 'playing' | 'result';
export type GameMode = 'classic' | 'category';

export const Game = () => {

    const {isLoggedIn} = useAuth();
    const nav = useNavigate();

    const handleClick = () => {nav("/login");}

    if(!isLoggedIn)
    {
        return <>
            <div>Lütfen giriş yapınız.</div>
            <button onClick={handleClick}>
                Giriş Yap
            </button>
        </>
    }

    const [gameState, setGameState] = useState<GameState>('mode-select');
    const [currentScore, setCurrentScore] = useState(0);
    const [gameMode, setGameMode] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);


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
            <ResultScreen setGameState={setGameState} currentScore={currentScore}/>
        );
    }

    else
    {
        return <div>Oyun durumu beklenmedik bir değerde.</div>;
    }
};