const http = require('http');
const url = require('url');

let calc = (x, y, req, res) => {
    res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
    res.write(`x = ${x}, y = ${y}\n`);
    res.write(`x + y = ${x + y}\n`);
    res.write(`x - y = ${x - y}\n`);
    res.write(`x * y = ${x * y}\n`);
    res.write(`x / y = ${x / y}\n`);
    res.end();
};

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
    switch(true) {
        case path === '/connection':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(`KeepAliveTimeout: ${server.keepAliveTimeout}`);
            break;
        case /\/connection\/set=\d+/.test(path):
            server.keepAliveTimeout = parseInt(/\d+/.exec(path)[0], 10);
            res.end(`KeepAliveTimeout: ${server.keepAliveTimeout}`);
            break;
        case path === '/headers':
            res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
            res.write(`REQUEST HEADERS: ${JSON.stringify(req.headers)}\n`);
            res.write(`RESPONSE HEADERS: ${JSON.stringify(res.headers)}\n`);
            res.end();
            break;
        case /\/parameter\/\w+\/\w+/.test(path): {
            let arr = path.split('/');
            let x = arr[2];
            let y = arr[3];
            if (isNaN(x) || isNaN(y)) {
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end(req.url);
            } else {
                calc(x, y, req, res);
            }
            break;
        }
        case path === '/parameter':
            let url_parts = url.parse(req.url, true);
            let query = url_parts.query;
            let x = parseInt(query.x, 10);
            let y = parseInt(query.y, 10);
            if(isNaN(x) || isNaN(y)) {
                res.writeHead(405, {'Content-Type':'text/plain; charset=utf-8'});
                res.end('ERROR 405: x and y must be numbers');
            } else {
                calc(x, y, req, res);
            }
            break;
        case path === '/close':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("Server will be closed in 10 sec.");
            server.setTimeout(10000, () => server.close(() => console.log('Server closed.')));
            break;
        case path === '/socket':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.write(`Local address = ${req.connection.localAddress}\n`);
            res.write(`Local port = ${req.connection.localPort}\n`);
            res.write(`Remote address = ${req.connection.remoteAddress}\n`);
            res.write(`Remote port = ${req.connection.remotePort}\n`);
            res.end();
            break;
        case path === '/req-data':
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            let buf = '';
            req.on('data', (data) => {
               console.log(`Data length(data): ${data.length}`);
               buf += data;
            });
            req.on('end', () => {console.log(`Data length(end): ${buf.length}`);});
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