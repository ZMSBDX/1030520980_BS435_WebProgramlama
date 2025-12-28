import React, { useState } from 'react';
import { GameMode, GameState } from './Game';
import { categories } from '../data/images';
import './SettingScreen.css'; // <--- CSS dosyasını dahil ettik

interface SettingScreenProps {
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode | null>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ setGameState, setGameMode, setSelectedCategory }) => {

    const [selectedCat, setSelectedCat] = useState<string>('');

    const handleStartClassicMode = () => {
        setGameMode('classic');
        setSelectedCategory(null);
        setGameState('playing');
    };

    const handleStartCategoryMode = () => {
        if(!selectedCat) {
            alert("Lütfen önce bir kategori seçiniz!");
            return;
        }
        setGameMode('category');
        setSelectedCategory(selectedCat);
        setGameState('playing');
    };

    const handleStartTimedMode = () => {
        setGameMode('timed');
        setSelectedCategory(null);
        setGameState('playing');
    };

    return (
        <div className="setting-container">
            <h2 className="setting-title">Oyun Modunu Seç</h2>

            <div className="modes-grid">

                {/* 1. KART: KLASİK MOD */}
                <div className="mode-card">
                    <div className="mode-icon">🎮</div>
                    <h3 className="mode-header">Klasik Mod</h3>
                    <p className="mode-desc">
                        Karışık kategorilerden sorular gelir. Süre sınırı yoktur, rahatça oynayabilirsin.
                    </p>
                    <button className="mode-btn btn-blue" onClick={handleStartClassicMode}>
                        Klasik Modu Başlat
                    </button>
                </div>

                {/* 2. KART: KATEGORİ MODU */}
                <div className="mode-card">
                    <div className="mode-icon">📂</div>
                    <h3 className="mode-header">Kategori Modu</h3>
                    <p className="mode-desc">
                        Sadece senin seçtiğin alandan (Hayvan, Manzara vb.) sorular gelir.
                    </p>

                    <select
                        className="category-select"
                        value={selectedCat}
                        onChange={(e) => setSelectedCat(e.target.value)}
                    >
                        <option value="">-- Kategori Seç --</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Baş harfi büyüt */}
                            </option>
                        ))}
                    </select>

                    <button className="mode-btn btn-blue" onClick={handleStartCategoryMode}>
                        Kategori Modunu Başlat
                    </button>
                </div>

                {/* 3. KART: SÜRELİ MOD */}
                <div className="mode-card">
                    <div className="mode-icon">⏳</div>
                    <h3 className="mode-header">Süreli Mod (Zor)</h3>
                    <p className="mode-desc">
                        Kendine güveniyor musun? Her soru için sadece <strong>15 saniyen</strong> var!
                    </p>
                    <button className="mode-btn btn-red" onClick={handleStartTimedMode}>
                        Süreli Modu Başlat
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingScreen;