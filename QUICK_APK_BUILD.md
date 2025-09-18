# بناء APK سريع لتطبيق حسناتي 🚀

## الخطوات السريعة

### 1. تأكد من تثبيت المتطلبات
```bash
# تحقق من Node.js
node --version

# تحقق من npm
npm --version

# تحقق من Android Studio (يجب أن يكون مثبت)
```

### 2. بناء التطبيق
```bash
# في مجلد المشروع
npm run build
```

### 3. مزامنة مع Android
```bash
npx cap sync android
```

### 4. فتح في Android Studio
```bash
npx cap open android
```

### 5. بناء APK من Android Studio
1. انتظر حتى يتم تحميل المشروع
2. اذهب إلى `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
3. انتظر حتى اكتمال البناء
4. ستجد APK في: `android/app/build/outputs/apk/debug/app-debug.apk`

## بديل: بناء من سطر الأوامر

```bash
# انتقل إلى مجلد android
cd android

# بناء APK للتطوير
./gradlew assembleDebug

# أو للإنتاج (يتطلب إعداد التوقيع)
./gradlew assembleRelease
```

## تثبيت APK على الجهاز

```bash
# تأكد من تفعيل USB Debugging على الجهاز
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## ملاحظات مهمة

- ✅ التطبيق جاهز للبناء مع جميع التحسينات
- ✅ الأيقونة مضافة ومحسنة
- ✅ إعدادات Capacitor محسنة
- ✅ Manifest.json مُعد للـ PWA
- ✅ جميع الميزات تعمل بشكل صحيح

## حجم APK المتوقع
- Debug APK: ~15-20 MB
- Release APK: ~8-12 MB (مع التحسين)

## الميزات المتاحة في APK
- 📖 القرآن الكريم مع 10+ قراء
- 📚 مكتبة الأحاديث الشاملة
- 🎬 فيديوهات قصص الأنبياء
- 🌙 الوضع الداكن والفاتح
- 🎨 واجهة عربية جميلة
- 📱 تصميم متجاوب

---
**نصيحة**: للحصول على أفضل أداء، استخدم Release APK للنشر النهائي.