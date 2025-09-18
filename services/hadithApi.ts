import axios from 'axios';

// Hadith API endpoints
const HADITH_API_BASE = 'https://api.hadith.gading.dev';
const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

export interface HadithBook {
  id: string;
  name: string;
  arabicName: string;
  englishName: string;
  totalHadith: number;
  description: string;
  author: string;
}

export interface Hadith {
  id: number;
  arab: string;
  english?: string;
  indonesian?: string;
  number: number;
  grade?: string;
  narrator?: string;
  book: string;
  chapter?: string;
  reference?: string;
}

export interface HadithCollection {
  book: HadithBook;
  hadiths: Hadith[];
  totalPages: number;
  currentPage: number;
}

// Available Hadith books
export const HADITH_BOOKS: HadithBook[] = [
  {
    id: 'bukhari',
    name: 'صحيح البخاري',
    arabicName: 'صحيح البخاري',
    englishName: 'Sahih al-Bukhari',
    totalHadith: 7563,
    description: 'أصح كتاب بعد كتاب الله',
    author: 'الإمام محمد بن إسماعيل البخاري'
  },
  {
    id: 'muslim',
    name: 'صحيح مسلم',
    arabicName: 'صحيح مسلم',
    englishName: 'Sahih Muslim',
    totalHadith: 7190,
    description: 'ثاني أصح الكتب بعد صحيح البخاري',
    author: 'الإمام مسلم بن الحجاج'
  },
  {
    id: 'abudawud',
    name: 'سنن أبي داود',
    arabicName: 'سنن أبي داود',
    englishName: 'Sunan Abi Dawud',
    totalHadith: 5274,
    description: 'من كتب السنن الأربعة',
    author: 'الإمام أبو داود السجستاني'
  },
  {
    id: 'tirmidhi',
    name: 'جامع الترمذي',
    arabicName: 'جامع الترمذي',
    englishName: 'Jami` at-Tirmidhi',
    totalHadith: 3956,
    description: 'من كتب السنن الأربعة',
    author: 'الإمام محمد بن عيسى الترمذي'
  },
  {
    id: 'nasai',
    name: 'سنن النسائي',
    arabicName: 'سنن النسائي',
    englishName: 'Sunan an-Nasa\'i',
    totalHadith: 5761,
    description: 'من كتب السنن الأربعة',
    author: 'الإمام أحمد بن شعيب النسائي'
  },
  {
    id: 'ibnmajah',
    name: 'سنن ابن ماجه',
    arabicName: 'سنن ابن ماجه',
    englishName: 'Sunan Ibn Majah',
    totalHadith: 4341,
    description: 'من كتب السنن الأربعة',
    author: 'الإمام محمد بن يزيد ابن ماجه'
  },
  {
    id: 'malik',
    name: 'موطأ مالك',
    arabicName: 'موطأ مالك',
    englishName: 'Muwatta Malik',
    totalHadith: 1594,
    description: 'من أقدم كتب الحديث',
    author: 'الإمام مالك بن أنس'
  },
  {
    id: 'ahmad',
    name: 'مسند أحمد',
    arabicName: 'مسند أحمد',
    englishName: 'Musnad Ahmad',
    totalHadith: 26363,
    description: 'أكبر مجموعة أحاديث مسندة',
    author: 'الإمام أحمد بن حنبل'
  }
];

// Get all available hadith books
export const getHadithBooks = (): HadithBook[] => {
  return HADITH_BOOKS;
};

// Get specific hadith book info
export const getHadithBook = (bookId: string): HadithBook | null => {
  return HADITH_BOOKS.find(book => book.id === bookId) || null;
};

// Get hadiths from specific book
export const getHadithsFromBook = async (bookId: string, page: number = 1, limit: number = 20): Promise<HadithCollection> => {
  try {
    const response = await axios.get(`${HADITH_API_BASE}/books/${bookId}?range=${(page - 1) * limit + 1}-${page * limit}`);
    
    const book = getHadithBook(bookId);
    if (!book) {
      throw new Error('كتاب الحديث غير موجود');
    }

    const hadiths: Hadith[] = response.data.data.hadiths.map((hadith: any) => ({
      id: hadith.number,
      arab: hadith.arab,
      english: hadith.english,
      indonesian: hadith.indonesian,
      number: hadith.number,
      grade: hadith.grade,
      narrator: hadith.narrator,
      book: book.name,
      chapter: hadith.chapter,
      reference: `${book.name} - ${hadith.number}`
    }));

    return {
      book,
      hadiths,
      totalPages: Math.ceil(book.totalHadith / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching hadiths:', error);
    throw new Error('فشل في جلب الأحاديث');
  }
};

// Get specific hadith by book and number
export const getSpecificHadith = async (bookId: string, hadithNumber: number): Promise<Hadith> => {
  try {
    const response = await axios.get(`${HADITH_API_BASE}/books/${bookId}/${hadithNumber}`);
    
    const book = getHadithBook(bookId);
    if (!book) {
      throw new Error('كتاب الحديث غير موجود');
    }

    const hadithData = response.data.data;
    
    return {
      id: hadithData.number,
      arab: hadithData.arab,
      english: hadithData.english,
      indonesian: hadithData.indonesian,
      number: hadithData.number,
      grade: hadithData.grade,
      narrator: hadithData.narrator,
      book: book.name,
      chapter: hadithData.chapter,
      reference: `${book.name} - ${hadithData.number}`
    };
  } catch (error) {
    console.error('Error fetching specific hadith:', error);
    throw new Error('فشل في جلب الحديث المحدد');
  }
};

// Get random hadith
export const getRandomHadith = async (): Promise<Hadith> => {
  try {
    // Select random book
    const randomBook = HADITH_BOOKS[Math.floor(Math.random() * HADITH_BOOKS.length)];
    
    // Get random hadith number from that book
    const randomNumber = Math.floor(Math.random() * randomBook.totalHadith) + 1;
    
    return await getSpecificHadith(randomBook.id, randomNumber);
  } catch (error) {
    console.error('Error fetching random hadith:', error);
    throw new Error('فشل في جلب حديث عشوائي');
  }
};

// Search hadiths
export const searchHadiths = async (query: string, bookId?: string): Promise<Hadith[]> => {
  try {
    let searchResults: Hadith[] = [];
    
    if (bookId) {
      // Search in specific book
      const response = await axios.get(`${HADITH_API_BASE}/books/${bookId}?search=${encodeURIComponent(query)}`);
      const book = getHadithBook(bookId);
      
      if (book && response.data.data.hadiths) {
        searchResults = response.data.data.hadiths.map((hadith: any) => ({
          id: hadith.number,
          arab: hadith.arab,
          english: hadith.english,
          indonesian: hadith.indonesian,
          number: hadith.number,
          grade: hadith.grade,
          narrator: hadith.narrator,
          book: book.name,
          chapter: hadith.chapter,
          reference: `${book.name} - ${hadith.number}`
        }));
      }
    } else {
      // Search in all books (limited to first few books for performance)
      const searchBooks = ['bukhari', 'muslim', 'abudawud'];
      
      for (const bookId of searchBooks) {
        try {
          const response = await axios.get(`${HADITH_API_BASE}/books/${bookId}?search=${encodeURIComponent(query)}`);
          const book = getHadithBook(bookId);
          
          if (book && response.data.data.hadiths) {
            const bookResults = response.data.data.hadiths.slice(0, 10).map((hadith: any) => ({
              id: hadith.number,
              arab: hadith.arab,
              english: hadith.english,
              indonesian: hadith.indonesian,
              number: hadith.number,
              grade: hadith.grade,
              narrator: hadith.narrator,
              book: book.name,
              chapter: hadith.chapter,
              reference: `${book.name} - ${hadith.number}`
            }));
            
            searchResults = [...searchResults, ...bookResults];
          }
        } catch (bookError) {
          console.warn(`Error searching in book ${bookId}:`, bookError);
        }
      }
    }
    
    return searchResults.slice(0, 50); // Limit results
  } catch (error) {
    console.error('Error searching hadiths:', error);
    throw new Error('فشل في البحث في الأحاديث');
  }
};

// Get hadith of the day
export const getHadithOfTheDay = async (): Promise<Hadith> => {
  try {
    // Use date as seed for consistent daily hadith
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    
    // Select book based on day
    const bookIndex = dayOfYear % HADITH_BOOKS.length;
    const selectedBook = HADITH_BOOKS[bookIndex];
    
    // Select hadith number based on day
    const hadithNumber = (dayOfYear % selectedBook.totalHadith) + 1;
    
    return await getSpecificHadith(selectedBook.id, hadithNumber);
  } catch (error) {
    console.error('Error fetching hadith of the day:', error);
    // Fallback to random hadith
    return await getRandomHadith();
  }
};

// Get hadiths by topic/category
export const getHadithsByTopic = async (topic: string): Promise<Hadith[]> => {
  try {
    // Define topic keywords in Arabic
    const topicKeywords: { [key: string]: string[] } = {
      'prayer': ['صلاة', 'صلوات', 'وضوء', 'قيام'],
      'fasting': ['صوم', 'صيام', 'رمضان', 'إفطار'],
      'charity': ['زكاة', 'صدقة', 'إنفاق', 'فقير'],
      'hajj': ['حج', 'عمرة', 'كعبة', 'مكة'],
      'faith': ['إيمان', 'توحيد', 'عقيدة', 'الله'],
      'character': ['أخلاق', 'صدق', 'أمانة', 'كرم'],
      'family': ['أسرة', 'والدين', 'زوجة', 'أطفال'],
      'knowledge': ['علم', 'تعلم', 'قراءة', 'حكمة']
    };

    const keywords = topicKeywords[topic] || [topic];
    let results: Hadith[] = [];

    // Search for each keyword
    for (const keyword of keywords) {
      try {
        const searchResults = await searchHadiths(keyword);
        results = [...results, ...searchResults];
      } catch (error) {
        console.warn(`Error searching for keyword ${keyword}:`, error);
      }
    }

    // Remove duplicates and limit results
    const uniqueResults = results.filter((hadith, index, self) => 
      index === self.findIndex(h => h.id === hadith.id && h.book === hadith.book)
    );

    return uniqueResults.slice(0, 20);
  } catch (error) {
    console.error('Error fetching hadiths by topic:', error);
    throw new Error('فشل في جلب الأحاديث حسب الموضوع');
  }
};

// Get favorite hadiths (commonly referenced)
export const getFavoriteHadiths = async (): Promise<Hadith[]> => {
  try {
    const favoriteHadithRefs = [
      { book: 'bukhari', number: 1 },
      { book: 'bukhari', number: 6 },
      { book: 'muslim', number: 1 },
      { book: 'muslim', number: 16 },
      { book: 'tirmidhi', number: 1987 },
      { book: 'abudawud', number: 4682 }
    ];

    const favorites: Hadith[] = [];

    for (const ref of favoriteHadithRefs) {
      try {
        const hadith = await getSpecificHadith(ref.book, ref.number);
        favorites.push(hadith);
      } catch (error) {
        console.warn(`Error fetching favorite hadith ${ref.book}:${ref.number}:`, error);
      }
    }

    return favorites;
  } catch (error) {
    console.error('Error fetching favorite hadiths:', error);
    throw new Error('فشل في جلب الأحاديث المفضلة');
  }
};

// Cache hadith for offline usage
export const cacheHadith = (hadith: Hadith): void => {
  try {
    const cachedHadiths = getCachedHadiths();
    const updatedCache = [hadith, ...cachedHadiths.filter(h => 
      !(h.id === hadith.id && h.book === hadith.book)
    )].slice(0, 100); // Keep only last 100 hadiths
    
    localStorage.setItem('cachedHadiths', JSON.stringify(updatedCache));
  } catch (error) {
    console.error('Error caching hadith:', error);
  }
};

// Get cached hadiths
export const getCachedHadiths = (): Hadith[] => {
  try {
    const cached = localStorage.getItem('cachedHadiths');
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    console.error('Error getting cached hadiths:', error);
    return [];
  }
};

// Clear hadith cache
export const clearHadithCache = (): void => {
  try {
    localStorage.removeItem('cachedHadiths');
  } catch (error) {
    console.error('Error clearing hadith cache:', error);
  }
};