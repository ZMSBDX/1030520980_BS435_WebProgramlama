import React, { useState} from 'react';
import { GameMode, GameState } from './Game';

const SettingScreen = ({ setGameState, setGameMode,setSelectedCategory }) => {


    const handleStartClassicMode = () => {
        // 1. Durum Emirleri Gönderilir
        setGameMode('classic');
        setSelectedCategory(null);
        setGameState('playing');
    };


    return (
        <>
            <div>Ayarlar Ekranı</div>
            <button onClick={handleStartClassicMode}>
                Klasik Modu Başlat
            </button>
        </>

    );
};
export default SettingScreen;