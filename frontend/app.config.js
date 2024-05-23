export default {
  "expo": {
    "owner": "meetscu",
    "name": "meetscu",
    "slug": "meetscu",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.csen174.meetscu",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.csen174.meetscu",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "@react-native-google-signin/google-signin"
    ],
    "extra": {
      "eas": {
        "projectId": "adff44a2-28b2-421d-b0c6-134e52738e39"
      }
    }
  }
}
