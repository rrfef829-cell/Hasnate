import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const welcomeTimer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  const handleLogin = () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    // Simulate a network request
    setTimeout(() => {
      login();
      setIsLoggingIn(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-teal-300/20 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/5 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Time and Date Display */}
        <div className="absolute top-8 left-8 text-white/80 text-right">
          <div className="text-2xl font-bold font-mono">{formatTime(currentTime)}</div>
          <div className="text-sm mt-1">{formatDate(currentTime)}</div>
        </div>

        {/* Welcome Animation */}
        {showWelcomeAnimation && (
          <div className="absolute inset-0 flex items-center justify-center bg-teal-900/90 z-20 animate-fade-out">
            <div className="text-center text-white animate-scale-in">
              <div className="text-6xl mb-4">🕌</div>
              <h2 className="text-3xl font-bold mb-2">أهلاً وسهلاً</h2>
              <p className="text-lg opacity-80">{getGreeting()}</p>
            </div>
          </div>
        )}

        {/* Main Login Card */}
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-down">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-glow">
              <span className="text-3xl">🕌</span>
            </div>
            <h1 className="text-6xl font-bold text-white font-arabic mb-2 animate-text-glow">حسناتي</h1>
            <p className="text-white/80 text-lg mb-2">طريقك إلى الطمأنينة والسكينة</p>
            <p className="text-white/60 text-sm">تطبيق شامل للعبادة والذكر</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-up">
            <div className="space-y-6">
              {/* Primary Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="group w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {isLoggingIn ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="ph ph-spinner animate-spin text-2xl"></i>
                    <span>جاري تسجيل الدخول...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <i className="ph-fill ph-sign-in text-xl"></i>
                    <span>تسجيل الدخول / إنشاء حساب</span>
                  </div>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-white/30"></div>
                <span className="flex-shrink mx-4 text-white/70 text-sm bg-white/10 px-3 py-1 rounded-full">أو</span>
                <div className="flex-grow border-t border-white/30"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full bg-white/20 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 border border-white/30 hover:border-white/50 disabled:opacity-75"
                >
                  {isLoggingIn ? (
                    <i className="ph ph-spinner animate-spin text-xl"></i>
                  ) : (
                    <>
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                      <span>المتابعة باستخدام جوجل</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full bg-transparent border-2 border-white/30 text-white/90 font-medium py-3 px-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 disabled:opacity-75"
                >
                  {isLoggingIn ? (
                    <i className="ph ph-spinner animate-spin text-xl"></i>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <i className="ph-fill ph-user text-xl"></i>
                      <span>المتابعة كضيف</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/70 text-sm text-center mb-4">ما ستجده في التطبيق:</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                  <i className="ph-fill ph-book-open text-teal-300"></i>
                  <span>القرآن الكريم</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                  <i className="ph-fill ph-speaker-high text-teal-300"></i>
                  <span>التلاوات الصوتية</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                  <i className="ph-fill ph-clock text-teal-300"></i>
                  <span>أوقات الصلاة</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                  <i className="ph-fill ph-compass text-teal-300"></i>
                  <span>اتجاه القبلة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-white/60 text-sm">
            <p>بسم الله نبدأ رحلتنا الروحانية</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes fade-out {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(20, 184, 166, 0.5); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 40px rgba(20, 184, 166, 0.4); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-fade-out { animation: fade-out 2s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.8s ease-out; }
        .animate-slide-down { animation: slide-down 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.2s both; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LoginPage;