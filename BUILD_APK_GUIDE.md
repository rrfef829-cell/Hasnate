# دليل بناء APK لتطبيق حسناتي 📱

## المتطلبات الأساسية

### 1. تثبيت Android Studio
- حمل وثبت [Android Studio](https://developer.android.com/studio)
- تأكد من تثبيت Android SDK
- قم بإعداد متغيرات البيئة:
  ```bash
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

### 2. تثبيت Java Development Kit (JDK)
- ثبت JDK 11 أو أحدث
- تأكد من إعداد متغير JAVA_HOME

## خطوات بناء APK

### الخطوة 1: بناء التطبيق للإنتاج
```bash
npm run build
```

### الخطوة 2: مزامنة Capacitor
```bash
npx cap sync android
```

### الخطوة 3: فتح المشروع في Android Studio
```bash
npx cap open android
```

### الخطوة 4: إعداد الأيقونات (اختياري)
1. انتقل إلى `android/app/src/main/res/`
2. استبدل الأيقونات في مجلدات `mipmap-*` بالأيقونة المخصصة
3. الأحجام المطلوبة:
   - `mipmap-ldpi`: 36x36px
   - `mipmap-mdpi`: 48x48px
   - `mipmap-hdpi`: 72x72px
   - `mipmap-xhdpi`: 96x96px
   - `mipmap-xxhdpi`: 144x144px
   - `mipmap-xxxhdpi`: 192x192px

### الخطوة 5: بناء APK من Android Studio
1. في Android Studio، اختر `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
2. انتظر حتى اكتمال البناء
3. ستجد APK في `android/app/build/outputs/apk/debug/`

## بناء APK من سطر الأوامر

### للتطوير (Debug APK)
```bash
cd android
./gradlew assembleDebug
```

### للإنتاج (Release APK)
```bash
cd android
./gradlew assembleRelease
```

## إعداد التوقيع للإنتاج

### 1. إنشاء مفتاح التوقيع
```bash
keytool -genkey -v -keystore hasanati-release-key.keystore -alias hasanati -keyalg RSA -keysize 2048 -validity 10000
```

### 2. إعداد ملف gradle.properties
أضف في `android/gradle.properties`:
```properties
HASANATI_UPLOAD_STORE_FILE=hasanati-release-key.keystore
HASANATI_UPLOAD_KEY_ALIAS=hasanati
HASANATI_UPLOAD_STORE_PASSWORD=your_store_password
HASANATI_UPLOAD_KEY_PASSWORD=your_key_password
```

### 3. تحديث build.gradle
في `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('HASANATI_UPLOAD_STORE_FILE')) {
                storeFile file(HASANATI_UPLOAD_STORE_FILE)
                storePassword HASANATI_UPLOAD_STORE_PASSWORD
                keyAlias HASANATI_UPLOAD_KEY_ALIAS
                keyPassword HASANATI_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## تحسين APK

### 1. تمكين ProGuard/R8
في `android/app/build.gradle`:
```gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 2. تمكين ضغط الموارد
```gradle
buildTypes {
    release {
        shrinkResources true
        minifyEnabled true
    }
}
```

## اختبار APK

### 1. تثبيت APK على الجهاز
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 2. فحص APK
```bash
aapt dump badging android/app/build/outputs/apk/debug/app-debug.apk
```

## نشر التطبيق

### Google Play Store
1. إنشاء حساب مطور على Google Play Console
2. رفع APK الموقع
3. ملء معلومات التطبيق
4. إرسال للمراجعة

### متاجر أخرى
- Amazon Appstore
- Samsung Galaxy Store
- Huawei AppGallery

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### خطأ في SDK
```bash
# تحديث SDK
sdkmanager --update
```

#### مشاكل في Gradle
```bash
# تنظيف المشروع
cd android
./gradlew clean
```

#### مشاكل في الذاكرة
أضف في `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

## ملفات مهمة

### capacitor.config.ts
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hasanati.app',
  appName: 'حسناتي',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### android/app/src/main/AndroidManifest.xml
تأكد من الأذونات المطلوبة:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

## معلومات التطبيق

- **اسم التطبيق**: حسناتي
- **معرف الحزمة**: com.hasanati.app
- **الإصدار**: 1.0.0
- **الحد الأدنى لـ Android**: API 22 (Android 5.1)
- **الهدف**: API 34 (Android 14)

## الميزات المدعومة

✅ القرآن الكريم مع التلاوات الصوتية  
✅ مكتبة الأحاديث النبوية الشاملة  
✅ فيديوهات قصص الأنبياء  
✅ الوضع الداكن والفاتح  
✅ واجهة عربية كاملة  
✅ تصميم متجاوب  
✅ دعم الاتجاه RTL  

## الدعم والمساعدة

للحصول على المساعدة:
1. راجع [وثائق Capacitor](https://capacitorjs.com/docs)
2. راجع [وثائق Android](https://developer.android.com/docs)
3. تحقق من [مشاكل GitHub الشائعة](https://github.com/ionic-team/capacitor/issues)

---

**ملاحظة**: تأكد من اختبار التطبيق على أجهزة مختلفة قبل النشر النهائي.