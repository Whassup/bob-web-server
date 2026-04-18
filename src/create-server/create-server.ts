import http2 from 'http2';
import fs from 'fs';
import path from 'path'

export interface BobWebServer {
    _server: http2.Http2SecureServer,
    _paths: {
        path: string,
        respondFn: Function
    }[]
}

export const createServer = (): BobWebServer => {
    const _paths: {
        path: string,
        respondFn: Function
    }[] = []
    const server = http2.createSecureServer({
        key: fs.readFileSync('localhost-privkey.pem'),
        cert: fs.readFileSync('localhost-cert.pem'),
    });
    server.on('error', (err) => console.error(err));

    server.on('stream', (stream: http2.ServerHttp2Stream, headers) => {
        const requestPath: string = headers[':path'] ?? "";
        var path_match: {
            path: string,
            respondFn: Function
        } | undefined = _paths.find(({ path: _path }) => path.matchesGlob(requestPath, _path))

        if (path_match != undefined) {
            path_match.respondFn(stream, headers)
        } else {
            stream.respond({
                'content-type': 'text/html; charset=utf-8',
                ':status': 200,
            });
            stream.end('<h1>Hello World</h1>');
        }
    });

    server.listen(8443);
    return {
        _server: server,
        _paths
    }
}