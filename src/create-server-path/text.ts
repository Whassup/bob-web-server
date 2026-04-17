import http2 from 'http2';
import type { BobWebServer } from '../create-server/create-server.ts';

export var text = (server: BobWebServer, path: string, text: string): void => {
    var respondFn = (stream: http2.ServerHttp2Stream, headers) => {
        stream.respond({
            'content-type': 'text/plain; charset=utf-8',
            ':status': 200,
        });
        stream.end(text);
    };
    server._paths.push({
        path,
        respondFn
    })
}