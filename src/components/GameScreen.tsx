import React, { useState, useEffect } from 'react';
import { imagesData, categories } from '../data/images';
import './GameScreen.css'; // <--- CSS DOSYASINI BURAYA EKLEDİK

// --- YARDIMCI FONKSİYON (AYNI) ---
const selectRandomImages = (usedIds: number[], specificCategory: string | null) => {
    let pool = imagesData;
    if (specificCategory) {
        pool = imagesData.filter(img => img.category === specificCategory);
    }
    let availableAIImages = pool.filter(img => img.isAI && !usedIds.includes(img.id));
    if (availableAIImages.length === 0) {
        availableAIImages = pool.filter(img => img.isAI);
    }
    const selectedAI = availableAIImages[Math.floor(Math.random() * availableAIImages.length)];
    const currentCategory = selectedAI.category;
    const realImages = pool.filter(img => !img.isAI && img.category === currentCategory);
    if (realImages.length < 2) {
        return { images: [], hint: "Yetersiz görsel.", aiId: 0 };
    }
    const selectedRealImages = realImages.sort(() => Math.random() - 0.5).slice(0, 2);
    const gameImages = [selectedAI, ...selectedRealImages].sort(() => Math.random() - 0.5);
    return { images: gameImages, hint: selectedAI.hint, aiId: selectedAI.id };
};

const GameScreen = ({ setGameState, setCurrentScore, gameMode, selectedCategory }) => {

    // --- ImageCard (ARTIK ÇOK DAHA TEMİZ) ---
    const ImageCard = ({ image, onClick, isSelected, isRevealed }) => {
        const handleClick = () => {
            if (isRevealed) return;
            onClick(image.id);
        };

        // Hangi CSS sınıflarını (class) kullanacağımızı belirliyoruz
        let cardClassName = 'image-card';

        if (isRevealed) {
            if (image.isAI) {
                cardClassName += ' correct'; // Doğru (Yeşil)
            } else if (isSelected) {
                cardClassName += ' wrong';   // Yanlış (Kırmızı)
            }
        } else if (isSelected) {
            cardClassName += ' selected';    // Seçili (Turuncu)
        }

        return (
            <div className={cardClassName} onClick={handleClick}>
                <img src={image.url} alt={`Görsel ${image.id}`} />
                {isSelected && !isRevealed && (
                    <div className="selected-label">SEÇİLDİ</div>
                )}
            </div>
        );
    };

    // --- STATE TANIMLARI (AYNI) ---
    const TOTAL_ROUNDS = 5;
    const [currentRound, setCurrentRound] = useState(1);
    const [currentImages, setCurrentImages] = useState([]);
    const [guessAttempt, setGuessAttempt] = useState(1);
    const [hintText, setHintText] = useState('');
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [isRoundFinished, setIsRoundFinished] = useState(false);
    const [usedAIIds, setUsedAIIds] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        const { images, hint, aiId } = selectRandomImages(usedAIIds, selectedCategory);
        setCurrentImages(images);
        setHintText(hint);
        if(aiId !== 0) setUsedAIIds(prev => [...prev, aiId]);
        setGuessAttempt(1);
        setSelectedImageId(null);
        setIsRoundFinished(false);
        setTimeLeft(15);
    }, [currentRound]);

    useEffect(() => {
        if (gameMode === 'timed' && !isRoundFinished && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (gameMode === 'timed' && timeLeft === 0 && !isRoundFinished) {
            setIsRoundFinished(true);
        }
    }, [timeLeft, isRoundFinished, gameMode]);

    const handleNextRound = () => {
        if (currentRound < TOTAL_ROUNDS) setCurrentRound(prev => prev + 1);
        else setGameState('result');
    };

    const handleImageClick = (imageId) => {
        if (isRoundFinished) return;
        setSelectedImageId(imageId);
        const selectedImage = currentImages.find(img => img.id === imageId);
        if (selectedImage.isAI) {
            const points = guessAttempt === 1 ? 10 : 5;
            setCurrentScore(prev => prev + points);
            setIsRoundFinished(true);
        } else {
            if (guessAttempt === 1) {
                setGuessAttempt(2);
                setTimeout(() => setSelectedImageId(null), 500);
            } else {
                setIsRoundFinished(true);
            }
        }
    };

    return (
        <div className="game-container">
            <h2 className="game-title">Hangi Görsel Yapay Zeka (AI)?</h2>

            <h3 className="round-info">
                Tur: <span className="current-round">{currentRound}</span> / {TOTAL_ROUNDS}
            </h3>

            {gameMode === 'timed' && (
                <div className={`timer-box ${timeLeft <= 5 ? 'warning' : ''}`}>
                    ⏳ Süre: {timeLeft} sn
                </div>
            )}

            {gameMode === 'timed' && timeLeft === 0 && (
                <div className="time-up-msg">⚠️ SÜRE DOLDU!</div>
            )}

            {guessAttempt === 2 && (
                <div className="hint-box">
                    <strong>💡 İPUCU:</strong> {hintText}
                </div>
            )}

            <div className="image-grid">
                {currentImages.map((img) => (
                    <ImageCard
                        key={img.id}
                        image={img}
                        onClick={handleImageClick}
                        isSelected={selectedImageId === img.id}
                        isRevealed={isRoundFinished}
                    />
                ))}
            </div>

            {isRoundFinished && (
                <div className="result-area">
                    <h3 className="result-title" style={{
                        color: selectedImageId && currentImages.find(i=>i.id===selectedImageId)?.isAI ? '#2e7d32' : '#c62828'
                    }}>
                        {timeLeft === 0 && gameMode === 'timed'
                            ? "Süre Bitti! Cevap veremedin."
                            : (selectedImageId && currentImages.find(i=>i.id===selectedImageId)?.isAI ? "🎉 Tebrikler! Doğru Bildin." : "❌ Maalesef Bilemedin.")}
                    </h3>

                    <button className="next-btn" onClick={handleNextRound}>
                        {currentRound < TOTAL_ROUNDS ? "Sıradaki Tur >>" : "Sonuçları Gör 🏆"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameScreen;