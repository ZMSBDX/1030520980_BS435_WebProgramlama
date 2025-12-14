import React from 'react';
import { GameState } from './Game';

interface WelcomeScreenProps {
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setGameState }) => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh', // Ekranın ortasında durması için
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)', // Hafif gradyan arka plan
                padding: '50px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', // Yumuşak gölge (Depth efekti)
                textAlign: 'center',
                maxWidth: '600px',
                width: '100%',
                border: '1px solid #e5e7eb'
            }}>
                {/* İkon veya Emoji */}
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🤖 🆚 🖼️</div>

                <h1 style={{
                    color: '#111827',
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '10px',
                    letterSpacing: '-1px'
                }}>
                    Gerçek mi, Yapay Zeka mı?
                </h1>

                <p style={{
                    color: '#6b7280',
                    fontSize: '1.2rem',
                    marginBottom: '40px',
                    lineHeight: '1.6'
                }}>
                    Görsel algını test et! Karşına çıkan fotoğraflardan hangisinin
                    <strong> Yapay Zeka (AI)</strong> tarafından üretildiğini bulabilir misin?
                </p>

                <button
                    onClick={() => setGameState('mode-select')}
                    style={{
                        padding: '15px 40px',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: '#2563eb', // Modern mavi
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Oyuna Başla 🚀
                </button>

                <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#9ca3af' }}>
                    BS435 Web Programlama Projesi
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;