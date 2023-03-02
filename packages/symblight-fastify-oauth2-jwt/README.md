## Getting started

### Requirements

This package supports the following tooling versions:

- Node.js: `^12.19.0 || ^14.15.0 || ^16.13.0` || ^18.12.0

### Installation

Using [npm](https://npmjs.org) in your project directory run the following command:

```shell
npm install @symblight/fastify-oauth2-jwt-bearer
```

## Getting started

#### Environment Variables

```shell
ISSUER_BASE_URL=https://YOUR_ISSUER_DOMAIN
AUDIENCE=https://my-api.com
```

```js
const { fastifyOauth2 } = require('fastify-oauth2-jwt-bearer');
app.register(fastifyOauth2, {
  audience: '',
  issuerBaseURL: ``,
  jwksUri: '',
  algorithms: ['RS256'],
});
```

```js
const checkJwt = async (req, reply) => {
  const jwt = app.Oauth2.getToken(
    req.headers,
    req.query,
    req.body,
    !!reply.header('Content-type', 'urlencoded')
  );
  return await app.Oauth2.verifyJwt(jwt);
};

app.get('/', async function (request, reply) {
  request.auth = await checkJwt(request, reply);
  return reply
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(request.auth?.payload);
});
```
