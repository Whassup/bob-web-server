import { html } from './create-server-path/html.ts';
import { json } from './create-server-path/json.ts';
import { text } from './create-server-path/text.ts';
import { createServer } from './create-server/create-server.ts';

const server = createServer()

text(server, "/text*/**", "here is some text")
html(server, "/html", "<h1>here is some html text</h1>")
json(server, "/json", { test: "Okay", number: 1, array: [1, "two", { tree: "four" }] })