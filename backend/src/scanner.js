const lighthouse = require('lighthouse');
const lighthouseConfig = require('./lighthouse/config');
const chromeLauncher = require('chrome-launcher');
const log = require('lighthouse-logger');

async function scanner( args ) {
  let client;
  let results = {};

  var chrome = null;
  try {
    var opts = {
      logLevel: 'info',
    };
    if ( args.chromePort ) {
      opts.port = args.chromePort;
    } else {
      var launcherArgs = {
        chromeFlags: [ '--headless' ],
        logLevel: 'error',
      };
      if ( ! process.env.CHROME_PATH ) {
        const chromium = require( 'chromium' );
        launcherArgs.chromePath = chromium.path;
      }
      chrome = await chromeLauncher.launch( launcherArgs );
      opts.port = chrome.port;
    }
    log.setLevel(opts.logLevel);
    var config = lighthouseConfig;
    if ( args.emulatedDevice === 'desktop' ) {
      config = { ...config, settings: {
        ...config.settings,
				// blockedUrlPatterns: [
				// 	'*//localhost*'
				// ],
				emulatedFormFactor: 'desktop',
      } };
    }
    results = await lighthouse( args.url, opts, config );
  } catch (err) {
    console.error(err);
    var errorCode = 'GENERAL';
    if (['INVALID_URL'].indexOf(err.code) > -1) {
      errorCode = err.code;
    }
    return {
      error: errorCode,
    };
  } finally {
    if ( chrome ) {
      await chrome.kill();
    }
  }
  return {
    success: true,
    results: results.lhr,
  };
}

module.exports = scanner;
