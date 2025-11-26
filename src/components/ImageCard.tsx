import React from 'react';
// Veri dosyasından (images.ts) ImageItem tipini alıyoruz.
// Eğer hata verirse bu satırı silebilirsiniz, TypeScript zorunlu değilse props ile hallederiz.
import { ImageItem } from '../data/images';

const ImageCard = ({ image, onClick, isSelected, isRevealed }) => {

    const handleClick = () => {
        if (isRevealed)
        {
            return;
        }
        else
        {
            onClick(image.id);
        }

    };

    // Görselin çerçeve rengini belirleyen mantık
    let borderStyle = '4px solid transparent'; // Varsayılan
    if (isSelected)
    {
        borderStyle = '4px solid orange'; // Seçiliyse turuncu
    }
    // Oyun bittiğinde:
    if (isRevealed)
    {
        if (image.isAI)
        {
            borderStyle = '4px solid green'; // AI ise Yeşil (Doğru cevap)
        }
        else if (isSelected && !image.isAI)
        {
            borderStyle = '4px solid red'; // Seçilen gerçekse Kırmızı (Yanlış)
        }
    }

    return (
        <div
            onClick={handleClick}
            style={{
                border: borderStyle,
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                margin: '10px',
                width: '300px', // Görsel genişliği
                position: 'relative'
            }}
        >
            <img
                src={image.url}
                alt={`Görsel ${image.id}`}
                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
            />
            {isSelected && !isRevealed && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'orange', color: 'white', textAlign: 'center', padding: '5px'
                }}>
                    SEÇİLDİ
                </div>
            )}
        </div>
    );
};

export default ImageCard;