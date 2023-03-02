import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { jwtVerifier } from 'access-token-jwt';
import { getToken } from 'oauth2-bearer';

declare module 'fastify' {
  interface FastifyInstance {
    Oauth2: any;
  }
}

export async function auth(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions = {},
  done: any
) {
  const verifyJwt = jwtVerifier(opts);

  fastify.decorate('Oauth2', { verifyJwt, getToken });
  done();
}

export const fastifyOauth2 = fp(auth);
