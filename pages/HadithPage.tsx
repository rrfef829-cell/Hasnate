import React, { useState, useEffect } from 'react';
import { 
  getHadithBooks, 
  getHadithsFromBook, 
  getHadithOfTheDay, 
  searchHadiths, 
  getRandomHadith,
  getFavoriteHadiths,
  HadithBook,
  Hadith,
  HadithCollection
} from '../services/hadithApi';
import Spinner from '../components/ui/Spinner';

const HadithPage: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<HadithBook | null>(null);
  const [hadithCollection, setHadithCollection] = useState<HadithCollection | null>(null);
  const [hadithOfTheDay, setHadithOfTheDay] = useState<Hadith | null>(null);
  const [favoriteHadiths, setFavoriteHadiths] = useState<Hadith[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'books' | 'daily' | 'favorites' | 'search'>('daily');

  const hadithBooks = getHadithBooks();

  useEffect(() => {
    loadHadithOfTheDay();
    loadFavoriteHadiths();
  }, []);

  const loadHadithOfTheDay = async () => {
    try {
      setLoading(true);
      const hadith = await getHadithOfTheDay();
      setHadithOfTheDay(hadith);
    } catch (err) {
      setError('فشل في جلب حديث اليوم');
    } finally {
      setLoading(false);
    }
  };

  const loadFavoriteHadiths = async () => {
    try {
      const hadiths = await getFavoriteHadiths();
      setFavoriteHadiths(hadiths);
    } catch (err) {
      console.error('Error loading favorite hadiths:', err);
    }
  };

  const handleSelectBook = async (book: HadithBook) => {
    try {
      setLoading(true);
      setSelectedBook(book);
      setCurrentPage(1);
      const collection = await getHadithsFromBook(book.id, 1);
      setHadithCollection(collection);
      setActiveTab('books');
    } catch (err) {
      setError('فشل في جلب أحاديث الكتاب');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    if (!selectedBook) return;
    
    try {
      setLoading(true);
      const collection = await getHadithsFromBook(selectedBook.id, page);
      setHadithCollection(collection);
      setCurrentPage(page);
    } catch (err) {
      setError('فشل في جلب الصفحة');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const results = await searchHadiths(searchQuery);
      setSearchResults(results);
      setActiveTab('search');
    } catch (err) {
      setError('فشل في البحث');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomHadith = async () => {
    try {
      setLoading(true);
      const hadith = await getRandomHadith();
      setHadithOfTheDay(hadith);
      setActiveTab('daily');
    } catch (err) {
      setError('فشل في جلب حديث عشوائي');
    } finally {
      setLoading(false);
    }
  };

  const HadithCard: React.FC<{ hadith: Hadith; showBook?: boolean }> = ({ hadith, showBook = false }) => (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-r-4 border-teal-500 shadow-lg">
      <div className="mb-4">
        <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-arabic">
          {hadith.arab}
        </p>
      </div>
      
      {hadith.english && (
        <div className="mb-4 p-4 bg-white/50 dark:bg-gray-900/30 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 italic">
            {hadith.english}
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2 space-x-reverse">
          {showBook && (
            <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded">
              {hadith.book}
            </span>
          )}
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            رقم {hadith.number}
          </span>
        </div>
        
        {hadith.narrator && (
          <div className="text-teal-600 dark:text-teal-400 font-medium">
            الراوي: {hadith.narrator}
          </div>
        )}
      </div>
      
      {hadith.grade && (
        <div className="mt-2">
          <span className={`px-2 py-1 rounded text-xs ${
            hadith.grade.includes('صحيح') 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {hadith.grade}
          </span>
        </div>
      )}
    </div>
  );

  if (loading && !hadithCollection && !hadithOfTheDay) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-teal-800 dark:text-teal-300 mb-2">مكتبة الحديث الشريف</h1>
          <p className="text-gray-600 dark:text-gray-400">أحاديث الرسول صلى الله عليه وسلم</p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="ابحث في الأحاديث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <i className="ph ph-magnifying-glass"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'daily'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            حديث اليوم
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'favorites'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            أحاديث مختارة
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'books'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            كتب الحديث
          </button>
          <button
            onClick={handleRandomHadith}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            حديث عشوائي
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 dark:text-red-400 hover:underline"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Content */}
      {activeTab === 'daily' && hadithOfTheDay && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">حديث اليوم</h2>
          <HadithCard hadith={hadithOfTheDay} showBook />
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">أحاديث مختارة</h2>
          <div className="space-y-6">
            {favoriteHadiths.map((hadith, index) => (
              <HadithCard key={`${hadith.book}-${hadith.id}`} hadith={hadith} showBook />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'search' && searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            نتائج البحث ({searchResults.length})
          </h2>
          <div className="space-y-6">
            {searchResults.map((hadith, index) => (
              <HadithCard key={`search-${hadith.book}-${hadith.id}`} hadith={hadith} showBook />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'books' && !selectedBook && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">كتب الحديث</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {hadithBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => handleSelectBook(book)}
                className="p-6 text-right bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-teal-100 hover:to-emerald-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{book.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{book.description}</p>
                <p className="text-sm text-teal-600 dark:text-teal-400">{book.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{book.totalHadith} حديث</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'books' && selectedBook && hadithCollection && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <button
              onClick={() => {
                setSelectedBook(null);
                setHadithCollection(null);
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-4"
            >
              <i className="ph-fill ph-arrow-right text-xl text-gray-600 dark:text-gray-300"></i>
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{selectedBook.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">الصفحة {currentPage} من {hadithCollection.totalPages}</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              hadithCollection.hadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
              ))
            )}
          </div>

          {/* Pagination */}
          {hadithCollection.totalPages > 1 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  السابق
                </button>
                <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-lg">
                  {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === hadithCollection.totalPages}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HadithPage;