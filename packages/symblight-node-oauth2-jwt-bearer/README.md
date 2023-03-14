## Getting started

### Requirements

This package supports the following tooling versions:

- Node.js: `^12.19.0 || ^14.15.0 || ^16.13.0` || ^18.12.0

### Installation

Using [npm](https://npmjs.org) in your project directory run the following command:

```shell
npm install symblight-node-oauth2-jwt-bearer
```

## Getting started

#### Environment Variables

```shell
ISSUER_BASE_URL=https://YOUR_ISSUER_DOMAIN
AUDIENCE=https://my-api.com
```

```js
const { getToken, jwtVerifier } = require('symblight-node-oauth2-jwt-bearer');

async function middleware(req: Request, res: Response, next: NextFunction) {
  try {
    const verifyJwt = jwtVerifier({
      audience: process.env.AUDIENCE,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
    });

    const jwt = getToken(
      req.headers,
      req.query,
      req.body,
      !!req.is('urlencoded')
    );
    req.auth = await verifyJwt(jwt);
    next();
  } catch (e) {
    next(e);
  }
}
```
