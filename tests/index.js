import '@babel/polyfill';
const req = require.context('./', true, /\.test\.js$/);
req.keys().forEach(filename => req(filename));
