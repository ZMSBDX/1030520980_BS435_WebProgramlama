import React, { useState, useEffect } from 'react';
import { imagesData, categories } from '../data/images';

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

    const ImageCard = ({ image, onClick, isSelected, isRevealed }) => {
        const handleClick = () => {
            if (isRevealed) return;
            onClick(image.id);
        };

        let borderStyle = '4px solid transparent';
        if (isSelected) borderStyle = '4px solid orange';
        if (isRevealed) {
            if (image.isAI) borderStyle = '4px solid green'; // Doğru
            else if (isSelected) borderStyle = '4px solid red'; // Yanlış
        }

        return (
            <div onClick={handleClick} style={{
                border: borderStyle,
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                margin: '15px',
                // --- SABİT KUTU BOYUTLARI ---
                width: '400px',
                height: '300px',
                // ---------------------------
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                // --- ORTALAMA VE ARKA PLAN ---
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                // ---------------------------
            }}>
                <img
                    src={image.url}
                    alt={`Görsel ${image.id}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        // --- RESMİ KESMEDEN SIĞDIR ---
                        objectFit: 'contain',
                        // ---------------------------
                        display: 'block'
                    }}
                />
                {isSelected && !isRevealed && <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'orange', color: 'white', textAlign: 'center', padding: '5px' }}>SEÇİLDİ</div>}
            </div>
        );
    };

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

        if(aiId !== 0) {
            setUsedAIIds(prev => [...prev, aiId]);
        }

        setGuessAttempt(1);
        setSelectedImageId(null);
        setIsRoundFinished(false);
        setTimeLeft(15); // Süreyi her turda 15'e çek
    }, [currentRound]);


    useEffect(() => {
        if (gameMode === 'timed' && !isRoundFinished && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (gameMode === 'timed' && timeLeft === 0 && !isRoundFinished) {
            setIsRoundFinished(true);
        }
    }, [timeLeft, isRoundFinished, gameMode]);


    const handleNextRound = () => {
        if (currentRound < TOTAL_ROUNDS) {
            setCurrentRound(prev => prev + 1);
        } else {
            setGameState('result');
        }
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
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Hangi Görsel Yapay Zeka (AI)?</h2>

            <h3>Tur: {currentRound} / {TOTAL_ROUNDS}</h3>

            {gameMode === 'timed' && (
                <div style={{
                    color: timeLeft <= 5 ? 'red' : 'black',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                }}>
                    ⏳ Süre: {timeLeft} sn
                </div>
            )}

            {gameMode === 'timed' && timeLeft === 0 && (
                <div style={{ color: 'red', fontWeight: 'bold', margin: '10px' }}>SÜRE DOLDU!</div>
            )}

            {guessAttempt === 2 && (
                <div style={{ backgroundColor: '#fff3cd', padding: '10px', margin: '10px auto', maxWidth: '600px', borderRadius: '5px' }}>
                    <strong>İPUCU:</strong> {hintText}
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ color: selectedImageId && currentImages.find(i=>i.id===selectedImageId)?.isAI ? 'green' : 'red' }}>
                        {timeLeft === 0 && gameMode === 'timed'
                            ? "Süre Bitti! Cevap veremedin."
                            : (selectedImageId && currentImages.find(i=>i.id===selectedImageId)?.isAI ? "Tebrikler! Doğru Bildin." : "Maalesef Bilemedin.")}
                    </h3>
                    <button
                        onClick={handleNextRound}
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                        {currentRound < TOTAL_ROUNDS ? "Sıradaki Tur >>" : "Sonuçları Gör"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameScreen;