import { serve } from './deps.ts';

const port = 3018;

function generateRandomNumber() {
   const randomNumber = Math.random() * 6;
   //console.log('Random number is', randomNumber);
   return Math.ceil(randomNumber);
}

function generateRandomNumbers(numberCount: number): Array<number> {
   const resultArray: Array<number> = [];
   if (numberCount > 1000) {
      numberCount = 1000;
   }
   for (let index = 0; index < numberCount; index++) {
      resultArray.push(generateRandomNumber());
   }
   return resultArray;
}

function handleRequest(request: Request): Response {
   const responseHeaders = new Headers();
   responseHeaders.set('content-type', 'application/json; charset=UTF-8');

   const origin = request.headers.get('origin');
   if (origin) {
      responseHeaders.set('Access-Control-Allow-Origin', origin);
   }

   if (request.method === 'OPTIONS') {
      //responseHeaders.set('Access-Control-Allow-Headers', 'Authorization');
      return new Response(undefined, { headers: responseHeaders });
   } else {
      const { pathname } = new URL(request.url);
      if (pathname.includes('/random/')) {
         const urlParam = pathname.substring(8);
         if (urlParam) {
            const numberOfRandomNumbers = parseInt(urlParam);
            if (numberOfRandomNumbers) {
               return new Response(
                  JSON.stringify({
                     numbers: generateRandomNumbers(numberOfRandomNumbers),
                  }),
                  { headers: responseHeaders },
               );
            }
         }
      }
      return new Response(JSON.stringify({ message: 'Hello stackstream!' }), {
         headers: responseHeaders,
      });
   }
}

serve(handleRequest, { port: port });
