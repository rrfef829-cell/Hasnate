import React, { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';

const ThemeToggle: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setIsAnimating(true);
    updateSettings({ theme: newTheme });
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getCurrentThemeIcon = () => {
    switch (settings.theme) {
      case 'light':
        return 'ph-fill ph-sun';
      case 'dark':
        return 'ph-fill ph-moon';
      case 'system':
        return 'ph-fill ph-monitor';
      default:
        return 'ph-fill ph-sun';
    }
  };

  const getCurrentThemeLabel = () => {
    switch (settings.theme) {
      case 'light':
        return 'الوضع الفاتح';
      case 'dark':
        return 'الوضع الداكن';
      case 'system':
        return 'تلقائي';
      default:
        return 'الوضع الفاتح';
    }
  };

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">المظهر</h3>
          <div className={`text-2xl transition-transform duration-300 ${isAnimating ? 'scale-110 rotate-12' : ''}`}>
            <i className={`${getCurrentThemeIcon()} text-teal-600 dark:text-teal-400`}></i>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          اختر المظهر المفضل لديك
        </p>

        {/* Theme Options */}
        <div className="space-y-2">
          {/* Light Theme */}
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              settings.theme === 'light'
                ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border-2 border-teal-500'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                settings.theme === 'light' 
                  ? 'bg-teal-200 dark:bg-teal-800' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                <i className="ph-fill ph-sun text-xl text-yellow-600"></i>
              </div>
              <div className="text-right">
                <div className="font-medium">الوضع الفاتح</div>
                <div className="text-xs opacity-75">مظهر فاتح ومشرق</div>
              </div>
            </div>
            {settings.theme === 'light' && (
              <i className="ph-fill ph-check text-xl text-teal-600 dark:text-teal-400"></i>
            )}
          </button>

          {/* Dark Theme */}
          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              settings.theme === 'dark'
                ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border-2 border-teal-500'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                settings.theme === 'dark' 
                  ? 'bg-teal-200 dark:bg-teal-800' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                <i className="ph-fill ph-moon text-xl text-blue-600"></i>
              </div>
              <div className="text-right">
                <div className="font-medium">الوضع الداكن</div>
                <div className="text-xs opacity-75">مظهر داكن ومريح للعين</div>
              </div>
            </div>
            {settings.theme === 'dark' && (
              <i className="ph-fill ph-check text-xl text-teal-600 dark:text-teal-400"></i>
            )}
          </button>

          {/* System Theme */}
          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              settings.theme === 'system'
                ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border-2 border-teal-500'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                settings.theme === 'system' 
                  ? 'bg-teal-200 dark:bg-teal-800' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                <i className="ph-fill ph-monitor text-xl text-gray-600"></i>
              </div>
              <div className="text-right">
                <div className="font-medium">تلقائي</div>
                <div className="text-xs opacity-75">يتبع إعدادات النظام</div>
              </div>
            </div>
            {settings.theme === 'system' && (
              <i className="ph-fill ph-check text-xl text-teal-600 dark:text-teal-400"></i>
            )}
          </button>
        </div>

        {/* Current Theme Display */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">المظهر الحالي:</span>
            <div className="flex items-center space-x-2 space-x-reverse">
              <i className={`${getCurrentThemeIcon()} text-teal-600 dark:text-teal-400`}></i>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {getCurrentThemeLabel()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Preview Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Light Preview */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-teal-300 transition-colors"
             onClick={() => handleThemeChange('light')}>
          <div className="text-center mb-2">
            <i className="ph-fill ph-sun text-2xl text-yellow-600"></i>
          </div>
          <div className="bg-gray-100 h-16 rounded mb-2"></div>
          <div className="text-xs text-gray-600 text-center">الوضع الفاتح</div>
        </div>

        {/* Dark Preview */}
        <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 cursor-pointer hover:border-teal-500 transition-colors"
             onClick={() => handleThemeChange('dark')}>
          <div className="text-center mb-2">
            <i className="ph-fill ph-moon text-2xl text-blue-400"></i>
          </div>
          <div className="bg-gray-700 h-16 rounded mb-2"></div>
          <div className="text-xs text-gray-300 text-center">الوضع الداكن</div>
        </div>

        {/* System Preview */}
        <div className="bg-gradient-to-br from-white to-gray-800 border-2 border-gray-400 rounded-lg p-3 cursor-pointer hover:border-teal-400 transition-colors"
             onClick={() => handleThemeChange('system')}>
          <div className="text-center mb-2">
            <i className="ph-fill ph-monitor text-2xl text-gray-600"></i>
          </div>
          <div className="bg-gradient-to-r from-gray-100 to-gray-700 h-16 rounded mb-2"></div>
          <div className="text-xs text-gray-600 text-center">تلقائي</div>
        </div>
      </div>

      {/* Additional Theme Settings */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">إعدادات إضافية</h4>
        
        <div className="space-y-3">
          {/* High Contrast Mode */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">التباين العالي</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">لتحسين الرؤية</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">تقليل الحركة</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">لتقليل الرسوم المتحركة</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;