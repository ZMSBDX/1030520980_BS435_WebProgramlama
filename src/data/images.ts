export interface ImageItem {
    id: number;
    category: string;
    url: string;
    isAI: boolean;
    hint: string;
}

export const imagesData: ImageItem[] = [

    // --- Kategori: Hayvanlar (Animals) ---

    // Cat Series
    { id: 1, category: 'animal', url: '/images/cat.jpg', isAI: false, hint: '' },
    { id: 2, category: 'animal', url: '/images/cat2.jpg', isAI: false, hint: '' },
    { id: 3, category: 'animal', url: '/images/cat3.png', isAI: true,
        hint: 'Gözlerin çok parlak mavi tonlarına ve burun/ağız çevresindeki simetriye dikkat edin.' }, // Yeni AI Görseli

    // Elephant Series
    { id: 4, category: 'animal', url: '/images/elephant.jpg', isAI: false, hint: '' },
    { id: 5, category: 'animal', url: '/images/elephant2.jpg', isAI: false, hint: '' },
    { id: 6, category: 'animal', url: '/images/elephant3.png', isAI: true,
        hint: 'Kulak ve hortumun başla birleştiği kısımdaki düzensiz geçişleri kontrol edin.' }, // Yeni AI Görseli

    // Fox Series
    { id: 7, category: 'animal', url: '/images/fox.jpg', isAI: false, hint: '' },
    { id: 8, category: 'animal', url: '/images/fox2.jpg', isAI: false, hint: '' },
    { id: 9, category: 'animal', url: '/images/fox3.png', isAI: true,
        hint: 'Kürkün keskinliğindeki ve gözlerin ifadesindeki yapaylığı arayın.' }, // Yeni AI Görseli

    // Lion Series
    { id: 10, category: 'animal', url: '/images/lion.jpg', isAI: false, hint: '' },
    { id: 11, category: 'animal', url: '/images/lion2.jpg', isAI: false, hint: '' },
    { id: 12, category: 'animal', url: '/images/lion3.png', isAI: true,
        hint: 'Yele ve bıyıkların rastgeleliği yerine fazla düzenli yapısına dikkat edin.' }, // Yeni AI Görseli


    // --- Kategori: Manzara/Doğa (Landscape/Nature) ---

    // Hill Series
    { id: 13, category: 'landscape', url: '/images/hill.jpg', isAI: false, hint: '' },
    { id: 14, category: 'landscape', url: '/images/hill2.jpg', isAI: false, hint: '' },
    { id: 15, category: 'landscape', url: '/images/hill3.png', isAI: true,
        hint: 'Bulutların şeklindeki veya çimenlerin dokusundaki tekrar eden desenleri arayın.' }, // Yeni AI Görseli

    // Waterfall Series
    { id: 16, category: 'landscape', url: '/images/waterfall.jpg', isAI: false, hint: '' },
    { id: 17, category: 'landscape', url: '/images/waterfall2.jpg', isAI: false, hint: '' },
    { id: 18, category: 'landscape', url: '/images/waterfall3.png', isAI: true,
        hint: 'Suyun akışındaki bulanıklığın veya hareketin gerçekçiliğini kontrol edin.' }, // Yeni AI Görseli

    // Winterhome Series
    { id: 19, category: 'landscape', url: '/images/winterhome.jpg', isAI: false, hint: '' },
    { id: 20, category: 'landscape', url: '/images/winterhome2.jpg', isAI: false, hint: '' },
    { id: 21, category: 'landscape', url: '/images/winterhome3.png', isAI: true,
        hint: 'Dağların ve karın birleştiği çizgideki keskinlik ve yapay ışıklandırma hataları olabilir.' }, // Yeni AI Görseli


    // --- Kategori: Yapı/Kültürel (Building/Culture) ---

    // Eiffel Tower Series
    { id: 22, category: 'building', url: '/images/eiffel-tower.jpg', isAI: false, hint: '' },
    { id: 23, category: 'building', url: '/images/eiffel-tower2.jpg', isAI: false, hint: '' },
    { id: 24, category: 'building', url: '/images/eiffel-tower3.png', isAI: true,
        hint: 'Binaların, köprülerin veya ufuk çizgisindeki geometrik bozulmaları inceleyin.' }, // Yeni AI Görseli

    // Mosque Series
    { id: 25, category: 'building', url: '/images/mosque.jpg', isAI: false, hint: '' },
    { id: 26, category: 'building', url: '/images/mosque2.jpg', isAI: false, hint: '' },
    { id: 27, category: 'building', url: '/images/mosque3.png', isAI: true,
        hint: 'Minarelerin eğriliğindeki veya mermer dokusundaki tekrar eden desenleri kontrol edin.' }, // Yeni AI Görseli


    // --- Kategori: İnsan/Olay (People/Event) ---

    // Fisherman Series
    { id: 28, category: 'people', url: '/images/fisherman.jpg', isAI: false, hint: '' },
    { id: 29, category: 'people', url: '/images/fisherman2.jpg', isAI: false, hint: '' },
    { id: 30, category: 'people', url: '/images/fisherman3.png', isAI: true,
        hint: 'Ellerin, ayakların veya tutulan nesnelerin (ağ/olta) şeklindeki garip uzantılara odaklanın.' }, // Yeni AI Görseli
];

export const categories: string[] = ['animal', 'landscape', 'building', 'people'];