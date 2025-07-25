# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.reactexecutor.** { *; }
-dontwarn com.facebook.react.**

# Expo
-keep class expo.** { *; }
-keep class com.expo.** { *; }
-dontwarn expo.**

# Fast Image
-keep class com.dylanvann.fastimage.** { *; }

# VLC Player
-keep class org.videolan.** { *; }
-dontwarn org.videolan.**

# YouTube.js - Keep essential classes but allow obfuscation of others
-keep class youtubei.js.** { *; }
-dontwarn youtubei.js.**

# Add any project specific keep options here:
