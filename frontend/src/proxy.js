const ParcelProxyServer = require('parcel-proxy-server');

var backendAddress = 'http://localhost:3001';
if ( process.env.SCANNER_BACKEND_ADDRESS ) {
	backendAddress = process.env.SCANNER_BACKEND_ADDRESS;
}

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: './index.html',
  parcelOptions: {
    // provide parcel options here
    // these are directly passed into the
    // parcel bundler
    //
    // More info on supported options are documented at
    // https://parceljs.org/api
    // https: true
  },
  proxies: {
    // add proxies here
    '/analyse': {
      target: backendAddress,
    }
  }
});

// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on('buildEnd', () => {
  console.log('Build completed!');
});

// start up the server
server.listen(1234, () => {
  console.log('Parcel proxy server has started');
});
