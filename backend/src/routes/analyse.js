var express = require('express');
var router = express.Router();
var scanner = require('../scanner');

var scanInProgress = false;

router.get('/', async function(req, res, next) {
  if (scanInProgress) {
    res.json({scanInProgress: true});
  } else {
    scanInProgress = true;
    const results = await scanner({
      url: req.query.url,
      emulatedDevice: req.query.device,
			chromePort: process.env.CHROME_DEBUGGING_PORT || null,
    });
    scanInProgress = false;
    res.json(results);
  }
});

module.exports = router;
