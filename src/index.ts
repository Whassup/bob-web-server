import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream: http2.ServerHttp2Stream, headers) => {
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });
    stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
