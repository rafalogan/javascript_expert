InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from "../index.js";


function handleRequest(request, response) {
	response.end('Hello World!!');
}


const server = http.createServer(handleRequest);
const PORT = 3000;


server.listen(
	PORT,
	() => console.log('Sever running at', `http://localhost:${server.address().port}`)
);
