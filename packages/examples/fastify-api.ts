import { fastifyOauth2 } from 'symblight-fastify-oauth2-jwt';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';

const app = fastify();

app.register(fastifyOauth2, {
  audience: '',
  issuerBaseURL: ``,
  jwksUri: '',
  algorithms: ['RS256']
});

const checkJwt = async (req: FastifyRequest, reply: FastifyReply) => {
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

const start = async () => {
  try {
    await app.listen({ port: 3500 });
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
