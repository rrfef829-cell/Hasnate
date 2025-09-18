import axios from 'axios';

// Base URLs for different Quran APIs
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const AUDIO_API_BASE = 'https://cdn.islamic.network/quran/audio-surah';

// Popular Quran reciters with their IDs and information
export const RECITERS = [
  {
    id: 'ar.alafasy',
    name: 'مشاري بن راشد العفاسي',
    englishName: 'Mishary Rashid Alafasy',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.abdurrahmaansudais',
    name: 'عبد الرحمن السديس',
    englishName: 'Abdul Rahman Al-Sudais',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.saoodshuraym',
    name: 'سعود الشريم',
    englishName: 'Saood bin Ibrahim Ash-Shuraym',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.mahermuaiqly',
    name: 'ماهر المعيقلي',
    englishName: 'Maher Al Muaiqly',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.yaserdosari',
    name: 'ياسر الدوسري',
    englishName: 'Yasser Al Dosari',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.abdullahbasfar',
    name: 'عبد الله بصفر',
    englishName: 'Abdullah Basfar',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.hanirifai',
    name: 'هاني الرفاعي',
    englishName: 'Hani Ar-Rifai',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.husarymujawwad',
    name: 'محمود خليل الحصري - مجود',
    englishName: 'Mahmoud Khalil Al-Husary (Mujawwad)',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.minshawi',
    name: 'محمد صديق المنشاوي',
    englishName: 'Mohamed Siddiq Al-Minshawi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  },
  {
    id: 'ar.abdulbasitmurattal',
    name: 'عبد الباسط عبد الصمد - مرتل',
    englishName: 'Abdul Basit Abdul Samad (Murattal)',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    language: 'ar',
    style: 'Hafs'
  }
];

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface QuranAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio?: string;
}

export interface QuranSurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: QuranAyah[];
}

export interface ReciterAudio {
  reciter: string;
  style: string;
  url: string;
}

// Get all surahs list
export const getSurahsList = async (): Promise<QuranSurah[]> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/surah`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surahs list:', error);
    throw new Error('فشل في جلب قائمة السور');
  }
};

// Get specific surah with ayahs
export const getSurahData = async (surahNumber: number, reciter: string = 'ar.alafasy'): Promise<QuranSurahData> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}/${reciter}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surah data:', error);
    throw new Error('فشل في جلب بيانات السورة');
  }
};

// Get audio URL for specific surah and reciter
export const getSurahAudioUrl = (surahNumber: number, reciterId: string): string => {
  const paddedNumber = surahNumber.toString().padStart(3, '0');
  return `${AUDIO_API_BASE}/${reciterId}/${paddedNumber}.mp3`;
};

// Get ayah audio URL
export const getAyahAudioUrl = (surahNumber: number, ayahNumber: number, reciterId: string): string => {
  const paddedSurah = surahNumber.toString().padStart(3, '0');
  const paddedAyah = ayahNumber.toString().padStart(3, '0');
  return `https://cdn.islamic.network/quran/audio/${reciterId}/${paddedSurah}${paddedAyah}.mp3`;
};

// Search in Quran
export const searchQuran = async (query: string, language: string = 'ar'): Promise<any> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/search/${query}/${language}`);
    return response.data.data;
  } catch (error) {
    console.error('Error searching Quran:', error);
    throw new Error('فشل في البحث في القرآن');
  }
};

// Get random ayah
export const getRandomAyah = async (reciter: string = 'ar.alafasy'): Promise<QuranAyah> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/ayah/random/${reciter}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching random ayah:', error);
    throw new Error('فشل في جلب آية عشوائية');
  }
};

// Get specific ayah
export const getAyah = async (surahNumber: number, ayahNumber: number, reciter: string = 'ar.alafasy'): Promise<QuranAyah> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/ayah/${surahNumber}:${ayahNumber}/${reciter}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching ayah:', error);
    throw new Error('فشل في جلب الآية');
  }
};

// Get Juz (Para) data
export const getJuzData = async (juzNumber: number, reciter: string = 'ar.alafasy'): Promise<any> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/juz/${juzNumber}/${reciter}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching juz data:', error);
    throw new Error('فشل في جلب بيانات الجزء');
  }
};

// Get page data
export const getPageData = async (pageNumber: number, reciter: string = 'ar.alafasy'): Promise<any> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/page/${pageNumber}/${reciter}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    throw new Error('فشل في جلب بيانات الصفحة');
  }
};

// Get multiple translations for an ayah
export const getAyahTranslations = async (surahNumber: number, ayahNumber: number): Promise<any> => {
  try {
    const translations = ['en.sahih', 'en.pickthall', 'ur.jalandhry'];
    const promises = translations.map(translation => 
      axios.get(`${QURAN_API_BASE}/ayah/${surahNumber}:${ayahNumber}/${translation}`)
    );
    const responses = await Promise.all(promises);
    return responses.map(response => response.data.data);
  } catch (error) {
    console.error('Error fetching ayah translations:', error);
    throw new Error('فشل في جلب ترجمات الآية');
  }
};

// Download audio file (for offline usage)
export const downloadAudio = async (url: string, filename: string): Promise<Blob> => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading audio:', error);
    throw new Error('فشل في تحميل الملف الصوتي');
  }
};

// Check if audio URL is valid
export const checkAudioUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Get reciter by ID
export const getReciterById = (reciterId: string) => {
  return RECITERS.find(reciter => reciter.id === reciterId);
};

// Get all available reciters
export const getAllReciters = () => {
  return RECITERS;
};