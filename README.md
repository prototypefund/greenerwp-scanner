# greenerWP Scanner Backend

This is the implementation of greenerWP's [website
scanner](https://scan.greenerwp.net/).

The backend listens for requests from the frontend and launches Chromium and
Lighthouse.

## Howto

### Backend

Install dependencies with `npm install` and start the server with `npm run
start`. The server will by default listen locally on port 3001, which fits
the default configuration of the scanner frontend. You may overwrite the port
with the `PORT` environment variable.

`npm install` will download a Chromium which will be automatically started by
the backend. To use a running Chrome/Chromium instead, set the
`CHROME_DEBUGGING_PORT` environment variable to the used debugging port (usually
passed with `--remote-debugging-port` option to Chromes executable). Alternatively,
set `CHROME_PATH` to the full path to an existing Chrome executable to use this
for automatic starting.

You can also directly run `dist/index.js`, for example with a process runner like
PM2: `pm2 start dist/index.js`.

### Frontend

Install dependencies with `npm install` and start the server with `npm run
startproxy`. It expects the scanner backend running on port 3001. The scanner
itself will run on port 1234.

You can also directly run `src/proxy.js`, for example with a process runner like
PM2: `pm2 start src/proxy.js`.