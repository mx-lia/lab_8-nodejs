const http = require('http');
const url = require('url');

let http_handler = (req, res) => {
  switch(req.method) {
      case 'GET':
          get_handler(req, res);
          break;
      case 'POST':
          post_handler(req, res);
          break;
      default:
          console.log('This method doesn\'t support');
  }
};

let get_handler = (req, res) => {
    let path = url.parse(req.url).pathname;
    switch(path) {
        case '/connection':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(`KeepAliveTimeout: ${server.keepAliveTimeout}`);
            break;
        case '/headers':
            res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
            res.write(`REQUEST HEADERS: ${JSON.stringify(req.headers)}\n`);
            res.write(`RESPONSE HEADERS: ${JSON.stringify(res.headers)}\n`);
            res.end();
            break;
        case '/close':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("Server will be closed in 10 sec.");
            server.setTimeout(10000, () => server.close(() => console.log('Server closed.')));
            break;
        case '/socket':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.write(`Local address = ${req.connection.localAddress}\n`);
            res.write(`Local port = ${req.connection.localPort}\n`);
            res.write(`Remote address = ${req.connection.remoteAddress}\n`);
            res.write(`Remote port = ${req.connection.remotePort}\n`);
            res.end();
            break;
        case '/req-data':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            let buf = '';
            req.on('data', (data) => {
               console.log(`Data length(data): ${data.length}`);
               buf += data;
            });
            req.on('end', () => {console.log(`Data length(end): ${data.length}`);});
            res.end();
            break;
    }
};

let post_handler = (req, res) => {

};

let server = http.createServer();
server.on('request', http_handler);
server.listen(5000);

console.log('Server running on http://localhost:5000/');