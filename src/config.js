module.exports = {
  "development": {
    "domain": "localhost",
    "serveBrowserAssetsOver": "/rsrcs/",
    "publicBrowserAssetsPath": "http://localhost:3000/rsrcs/",
  },
  "staging": {
    "domain": "staging.yourdomain.com",
    "serveBrowserAssetsOver": "/rsrcs/",
    "publicBrowserAssetsPath": "https://rsrcs.cdn.staging.yourdomain.com/",
  },
  "production": {
    "androidApp": "com.yourdomain.app",
    "iosApp": "com.yourdomain.app",
    "domain": "www.yourdomain.com",
    "serveBrowserAssetsOver": "/rsrcs/",
    "publicBrowserAssetsPath": "https://rsrcs.cdn.yourdomain.com/",
    // NOTE: In case you're using a CDN, we advise you to direct it into the
    // assets path directly.
    //
    // Example: rsrcs.cdn.yourdomain.com/ -> www.yourdomain.com/rsrcs/
  }
}
