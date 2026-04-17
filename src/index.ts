import { text } from './create-server-path/text.ts';
import { createServer } from './create-server/create-server.ts';

const server = createServer()

text(server, "/text", "here is some text")