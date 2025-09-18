import axios from 'axios';

// Complete Quran API endpoints
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const QURAN_COM_API = 'https://api.quran.com/api/v4';

export interface CompleteQuranData {
  surahs: CompleteSurah[];
  totalSurahs: number;
  totalAyahs: number;
}

export interface CompleteSurah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: CompleteVerse[];
}

export interface CompleteVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number?: number;
  text_uthmani: string;
  text_uthmani_simple: string;
  text_imlaei: string;
  text_indopak: string;
  juz_number: number;
  page_number: number;
  audio_url?: string;
  translations?: Translation[];
  tafsir?: Tafsir[];
}

export interface Translation {
  id: number;
  language_name: string;
  text: string;
  resource_name: string;
}

export interface Tafsir {
  id: number;
  text: string;
  language_name: string;
  resource_name: string;
}

// Get complete Quran with all surahs and verses
export const getCompleteQuran = async (): Promise<CompleteQuranData> => {
  try {
    const response = await axios.get(`${QURAN_COM_API}/chapters`);
    const chapters = response.data.chapters;
    
    const surahs: CompleteSurah[] = [];
    
    // Get verses for each surah
    for (const chapter of chapters) {
      const versesResponse = await axios.get(
        `${QURAN_COM_API}/verses/by_chapter/${chapter.id}?language=ar&text_type=uthmani&per_page=300`
      );
      
      const verses: CompleteVerse[] = versesResponse.data.verses.map((verse: any) => ({
        id: verse.id,
        verse_number: verse.verse_number,
        verse_key: verse.verse_key,
        hizb_number: verse.hizb_number,
        rub_el_hizb_number: verse.rub_el_hizb_number,
        ruku_number: verse.ruku_number,
        manzil_number: verse.manzil_number,
        sajdah_number: verse.sajdah_number,
        text_uthmani: verse.text_uthmani,
        text_uthmani_simple: verse.text_uthmani_simple,
        text_imlaei: verse.text_imlaei || verse.text_uthmani,
        text_indopak: verse.text_indopak || verse.text_uthmani,
        juz_number: verse.juz_number,
        page_number: verse.page_number,
      }));
      
      surahs.push({
        id: chapter.id,
        name: chapter.name_arabic,
        transliteration: chapter.name_simple,
        translation: chapter.translated_name?.name || chapter.name_simple,
        type: chapter.revelation_place,
        total_verses: chapter.verses_count,
        verses: verses
      });
    }
    
    const totalAyahs = surahs.reduce((total, surah) => total + surah.total_verses, 0);
    
    return {
      surahs,
      totalSurahs: surahs.length,
      totalAyahs
    };
  } catch (error) {
    console.error('Error fetching complete Quran:', error);
    throw new Error('فشل في جلب القرآن الكريم كاملاً');
  }
};

// Get specific surah with complete data
export const getCompleteSurah = async (surahId: number): Promise<CompleteSurah> => {
  try {
    // Get chapter info
    const chapterResponse = await axios.get(`${QURAN_COM_API}/chapters/${surahId}`);
    const chapter = chapterResponse.data.chapter;
    
    // Get verses
    const versesResponse = await axios.get(
      `${QURAN_COM_API}/verses/by_chapter/${surahId}?language=ar&text_type=uthmani&per_page=300`
    );
    
    const verses: CompleteVerse[] = versesResponse.data.verses.map((verse: any) => ({
      id: verse.id,
      verse_number: verse.verse_number,
      verse_key: verse.verse_key,
      hizb_number: verse.hizb_number,
      rub_el_hizb_number: verse.rub_el_hizb_number,
      ruku_number: verse.ruku_number,
      manzil_number: verse.manzil_number,
      sajdah_number: verse.sajdah_number,
      text_uthmani: verse.text_uthmani,
      text_uthmani_simple: verse.text_uthmani_simple,
      text_imlaei: verse.text_imlaei || verse.text_uthmani,
      text_indopak: verse.text_indopak || verse.text_uthmani,
      juz_number: verse.juz_number,
      page_number: verse.page_number,
    }));
    
    return {
      id: chapter.id,
      name: chapter.name_arabic,
      transliteration: chapter.name_simple,
      translation: chapter.translated_name?.name || chapter.name_simple,
      type: chapter.revelation_place,
      total_verses: chapter.verses_count,
      verses: verses
    };
  } catch (error) {
    console.error('Error fetching complete surah:', error);
    throw new Error('فشل في جلب السورة كاملة');
  }
};

// Get verse translations
export const getVerseTranslations = async (verseKey: string): Promise<Translation[]> => {
  try {
    const response = await axios.get(
      `${QURAN_COM_API}/verses/by_key/${verseKey}?language=ar&translations=131,20,19`
    );
    
    return response.data.verse.translations.map((translation: any) => ({
      id: translation.resource_id,
      language_name: translation.language_name,
      text: translation.text,
      resource_name: translation.resource_name
    }));
  } catch (error) {
    console.error('Error fetching verse translations:', error);
    return [];
  }
};

// Get verse tafsir
export const getVerseTafsir = async (verseKey: string): Promise<Tafsir[]> => {
  try {
    const response = await axios.get(
      `${QURAN_COM_API}/verses/by_key/${verseKey}?language=ar&tafsirs=169,168`
    );
    
    return response.data.verse.tafsirs?.map((tafsir: any) => ({
      id: tafsir.resource_id,
      text: tafsir.text,
      language_name: tafsir.language_name,
      resource_name: tafsir.resource_name
    })) || [];
  } catch (error) {
    console.error('Error fetching verse tafsir:', error);
    return [];
  }
};

// Search in complete Quran
export const searchCompleteQuran = async (query: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${QURAN_COM_API}/search?q=${encodeURIComponent(query)}&size=20&page=1`
    );
    
    return response.data.search.results.map((result: any) => ({
      verse_key: result.verse_key,
      text: result.text,
      highlighted: result.highlighted,
      translation: result.translations?.[0]?.text || '',
      surah_name: result.verse_key.split(':')[0],
      verse_number: result.verse_key.split(':')[1]
    }));
  } catch (error) {
    console.error('Error searching complete Quran:', error);
    throw new Error('فشل في البحث في القرآن الكريم');
  }
};

// Get Juz (Para) complete data
export const getCompleteJuz = async (juzNumber: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${QURAN_COM_API}/verses/by_juz/${juzNumber}?language=ar&text_type=uthmani&per_page=300`
    );
    
    return {
      juz_number: juzNumber,
      verses: response.data.verses.map((verse: any) => ({
        id: verse.id,
        verse_number: verse.verse_number,
        verse_key: verse.verse_key,
        text_uthmani: verse.text_uthmani,
        surah_name: verse.chapter?.name_arabic || '',
        page_number: verse.page_number
      }))
    };
  } catch (error) {
    console.error('Error fetching complete juz:', error);
    throw new Error('فشل في جلب الجزء كاملاً');
  }
};

// Get page complete data
export const getCompletePage = async (pageNumber: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${QURAN_COM_API}/verses/by_page/${pageNumber}?language=ar&text_type=uthmani&per_page=50`
    );
    
    return {
      page_number: pageNumber,
      verses: response.data.verses.map((verse: any) => ({
        id: verse.id,
        verse_number: verse.verse_number,
        verse_key: verse.verse_key,
        text_uthmani: verse.text_uthmani,
        surah_name: verse.chapter?.name_arabic || '',
        juz_number: verse.juz_number
      }))
    };
  } catch (error) {
    console.error('Error fetching complete page:', error);
    throw new Error('فشل في جلب الصفحة كاملة');
  }
};

// Get random verse with complete data
export const getRandomCompleteVerse = async (): Promise<CompleteVerse> => {
  try {
    // Generate random surah (1-114) and verse
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const surahData = await getCompleteSurah(randomSurah);
    const randomVerse = Math.floor(Math.random() * surahData.total_verses);
    
    return surahData.verses[randomVerse];
  } catch (error) {
    console.error('Error fetching random complete verse:', error);
    throw new Error('فشل في جلب آية عشوائية');
  }
};

// Cache management for offline usage
export const cacheCompleteQuran = async (): Promise<void> => {
  try {
    const completeQuran = await getCompleteQuran();
    localStorage.setItem('completeQuran', JSON.stringify(completeQuran));
    localStorage.setItem('quranCacheDate', new Date().toISOString());
  } catch (error) {
    console.error('Error caching complete Quran:', error);
    throw new Error('فشل في حفظ القرآن الكريم للاستخدام دون اتصال');
  }
};

// Get cached Quran data
export const getCachedCompleteQuran = (): CompleteQuranData | null => {
  try {
    const cachedData = localStorage.getItem('completeQuran');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    console.error('Error getting cached Quran:', error);
    return null;
  }
};

// Check if cache is valid (less than 30 days old)
export const isCacheValid = (): boolean => {
  try {
    const cacheDate = localStorage.getItem('quranCacheDate');
    if (!cacheDate) return false;
    
    const cacheTime = new Date(cacheDate).getTime();
    const currentTime = new Date().getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    
    return (currentTime - cacheTime) < thirtyDays;
  } catch (error) {
    return false;
  }
};