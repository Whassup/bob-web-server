import http2 from 'http2';
import type { BobWebServer } from '../create-server/create-server.ts';

export var json = (server: BobWebServer, path: string, json: Object): void => {
    var respondFn = (stream: http2.ServerHttp2Stream, headers) => {
        stream.respond({
            'content-type': 'application/json; charset=utf-8',
            ':status': 200,
        });
        stream.end(JSON.stringify(json));
    };
    server._paths.push({
        path,
        respondFn
    })
}