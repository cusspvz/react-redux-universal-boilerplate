module.exports = {
  "development": {
    "domain": "localhost",
    "serveBrowserAssetsOver": "/rsrcs/",
    "publicBrowserAssetsPath": "http://localhost:3000/rsrcs/",
    "backendEndpoint": "http://localhost:8888",
  },
  "staging": {
    // "domain": "staging.yourdomain.com",
    "domain": "localhost",
    "serveBrowserAssetsOver": "/rsrcs/",
    "publicBrowserAssetsPath": "https://rsrcs.cdn.staging.yourdomain.com/",
    "backendEndpoint": "https://api.staging.yourdomain.com",
  },
  "production": {
    "androidApp": "com.yourdomain.app",
    "iosApp": "com.yourdomain.app",
    "domain": "localhost",
    // "domain": "www.yourdomain.com",
    "serveBrowserAssetsOver": "/rsrcs/",
    "publicBrowserAssetsPath": "https://www.yourdomain.com/rsrcs/",
    "backendEndpoint": "https://api.yourdomain.com",
    // "publicBrowserAssetsPath": "https://rsrcs.cdn.yourdomain.com/",
    // NOTE: In case you're using a CDN, we advise you to direct it into the
    // assets path directly.
    //
    // Example: rsrcs.cdn.yourdomain.com/ -> www.yourdomain.com/rsrcs/
  }
}
