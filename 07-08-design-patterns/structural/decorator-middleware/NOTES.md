# Decorator or Middleware

the goal is to automate the so-called http response and inject the term
```js
function handleRequest(request, response) {
	response.setHeader('X-Instumented-By', 'RafaDW - Rafael');
	response.end('Hello World!!');
}
```
command curl:
```shell
curl -i localhost:3000

```
expected result 

```shell
HTTP/1.1 200 OK
X-Instumented-By: RafaDW - Rafael
Date: Wed, 21 Apr 2021 20:11:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 13
```
