import React, { useState } from 'react';
import { GameMode, GameState } from './Game.tsx';
import { categories } from '../data/images'; // Kategorileri çekiyoruz

interface SettingScreenProps {
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode | null>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ setGameState, setGameMode, setSelectedCategory }) => {

    const [selectedCat, setSelectedCat] = useState<string>('');

    // --- 1. KLASİK MOD ---
    const handleStartClassicMode = () => {
        setGameMode('classic');
        setSelectedCategory(null);
        setGameState('playing');
    };

    // --- 2. KATEGORİ MODU ---
    const handleStartCategoryMode = () => {
        if(!selectedCat) {
            alert("Lütfen önce bir kategori seçiniz!");
            return;
        }
        setGameMode('category');
        setSelectedCategory(selectedCat);
        setGameState('playing');
    };

    // --- 3. SÜRELİ MOD ---
    const handleStartTimedMode = () => {
        setGameMode('timed');
        setSelectedCategory(null);
        setGameState('playing');
    };

    return (
        <div className="setting-screen" style={{textAlign: 'center', padding: '20px'}}>
            <h2>Oyun Modunu Seç</h2>

            {/* KLASİK */}
            <div className="mode-setting" style={{marginBottom: '20px', border: '1px solid #ccc', padding: '10px'}}>
                <h3>1. Klasik Mod</h3>
                <p>Karışık kategoriler, süre sınırı yok.</p>
                <button onClick={handleStartClassicMode}>Klasik Modu Başlat</button>
            </div>

            {/* KATEGORİ */}
            <div className="mode-setting" style={{marginBottom: '20px', border: '1px solid #ccc', padding: '10px'}}>
                <h3>2. Kategori Modu</h3>
                <p>Sadece seçtiğin kategoriden sorular gelir.</p>
                <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    style={{marginRight: '10px', padding: '5px'}}
                >
                    <option value="">-- Kategori Seç --</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                    ))}
                </select>
                <button onClick={handleStartCategoryMode}>Kategori Modunu Başlat</button>
            </div>

            {/* SÜRELİ */}
            <div className="mode-setting" style={{marginBottom: '20px', border: '1px solid #ccc', padding: '10px'}}>
                <h3>3. Süreli Mod (Zor)</h3>
                <p>Her soru için sadece 15 saniyen var!</p>
                <button onClick={handleStartTimedMode} style={{backgroundColor: '#dc3545', color: 'white'}}>Süreli Modu Başlat</button>
            </div>
        </div>
    );
};

export default SettingScreen;