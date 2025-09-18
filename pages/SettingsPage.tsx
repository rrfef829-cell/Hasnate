import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { useDownloads } from '../hooks/useDownloads';
import ThemeToggle from '../components/ui/ThemeToggle';

const SettingsPage: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const { downloadedTracks, deleteTrack } = useDownloads();

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        updateSettings({ theme });
    };

    const handleMethodChange = (prayerMethod: string) => {
        updateSettings({ prayerMethod });
    };

    const handleClearDownloads = () => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف جميع الملفات الصوتية التي تم تنزيلها؟')) {
            Object.keys(downloadedTracks).forEach(key => deleteTrack(key));
            alert('تم حذف جميع الملفات الصوتية.');
        }
    };

    const handleClearLocation = () => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف بيانات موقعك المحفوظة؟')) {
            localStorage.removeItem('userLocation');
            alert('تم حذف بيانات موقعك. سيُطلب منك الإذن مرة أخرى عند الحاجة.');
        }
    };

    const prayerMethods = [
        { id: 'MWL', name: 'رابطة العالم الإسلامي' },
        { id: 'ISNA', name: 'الجمعية الإسلامية لأمريكا الشمالية' },
        { id: 'Egyptian', name: 'الهيئة المصرية العامة للمساحة' },
        { id: 'Makkah', name: 'جامعة أم القرى، مكة' },
        { id: 'Karachi', name: 'جامعة العلوم الإسلامية، كراتشي' },
    ];

    const themes = [
        { id: 'light', name: 'فاتح', icon: 'sun' },
        { id: 'dark', name: 'داكن', icon: 'moon' },
        { id: 'system', name: 'تلقائي (النظام)', icon: 'gear' },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-300">الإعدادات</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">تحكم في تفضيلات التطبيق</p>
            </div>

            {/* Theme Settings */}
            <ThemeToggle />

            {/* Prayer Times Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">مواقيت الصلاة</h3>
                <label htmlFor="prayer-method" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">طريقة الحساب</label>
                <select id="prayer-method" value={settings.prayerMethod} onChange={(e) => handleMethodChange(e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {prayerMethods.map(method => (
                        <option key={method.id} value={method.id}>{method.name}</option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">اختر طريقة الحساب الأنسب لمنطقتك للحصول على أدق الأوقات.</p>
            </div>
            
            {/* Data Management Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">إدارة البيانات</h3>
                <div className="space-y-4">
                    <button onClick={handleClearDownloads}
                        className="w-full text-left p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 flex justify-between items-center transition-colors">
                        <span>حذف الملفات الصوتية التي تم تنزيلها</span>
                        <i className="ph-fill ph-trash"></i>
                    </button>
                    <button onClick={handleClearLocation}
                        className="w-full text-left p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 flex justify-between items-center transition-colors">
                        <span>حذف بيانات الموقع المحفوظة</span>
                        <i className="ph-fill ph-map-pin-line"></i>
                    </button>
                </div>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">هذه الإجراءات لا يمكن التراجع عنها.</p>
            </div>
        </div>
    );
};

export default SettingsPage;