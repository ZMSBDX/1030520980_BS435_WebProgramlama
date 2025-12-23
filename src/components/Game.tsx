import React, { useState } from 'react';

// Component importları
import WelcomeScreen from './WelcomeScreen';
import SettingScreen from './SettingScreen';
import GameScreen from './GameScreen';
import ResultScreen from './ResultScreen';

// Oyun Durumları: Artık 'welcome' ile başlıyoruz
export type GameState = 'welcome' | 'mode-select' | 'playing' | 'result';
export type GameMode = 'classic' | 'category' | 'timed';

export const Game = () => {

    // Login kontrolü (useAuth) TAMAMEN KALDIRILDI.

    // Başlangıç durumu artık 'welcome'
    const [gameState, setGameState] = useState<GameState>('welcome');

    const [currentScore, setCurrentScore] = useState(0);
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // --- 1. KARŞILAMA EKRANI ---
    if (gameState === 'welcome') {
        return <WelcomeScreen setGameState={setGameState} />;
    }

    // --- 2. AYAR / MOD SEÇİM EKRANI ---
    else if (gameState === 'mode-select') {
        return (
            <SettingScreen
                setGameState={setGameState}
                setGameMode={setGameMode}
                setSelectedCategory={setSelectedCategory}
            />
        );
    }

    // --- 3. OYUN EKRANI ---
    else if (gameState === 'playing') {
        if (!gameMode) return <div>Hata: Oyun modu seçilmedi.</div>;

        return (
            <GameScreen
                setGameState={setGameState}
                setCurrentScore={setCurrentScore}
                gameMode={gameMode}
                selectedCategory={selectedCategory}
            />
        );
    }

    // --- 4. SONUÇ EKRANI ---
    else if (gameState === 'result') {
        return (
            <ResultScreen
                setGameState={setGameState}
                currentScore={currentScore}
                setCurrentScore={setCurrentScore}
            />
        );
    }

    else {
        return <div>Beklenmedik hata.</div>;
    }
};