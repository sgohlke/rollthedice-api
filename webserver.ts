import { serve } from "./deps.ts";

const port = 3018;
const jsonContentTypeHeader = {
    "content-type": "application/json; charset=UTF-8",
    };

function handleRequest(_request: Request): Response {
    return new Response(JSON.stringify({message: 'Hello stackstream!'}), {headers: jsonContentTypeHeader},)
}

serve(handleRequest, { port: port });