import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import {
  jwtVerifier,
  claimCheck,
  ClaimCheck,
  claimIncludes,
  ClaimIncludes,
  VerifyJwt,
  JWTPayload,
} from 'access-token-jwt';
import { getToken } from 'oauth2-bearer';

type ClaimChecker = (payload?: JWTPayload) => void;
declare module 'fastify' {
  interface FastifyInstance {
    verifyJwt: VerifyJwt;
    getToken: (
      headers: any,
      query?: any | undefined,
      body?: any | undefined,
      urlEncoded?: boolean | undefined
    ) => string;
    claimCheck: ClaimCheck;
    claimIncludes: ClaimIncludes<ClaimChecker>;
  }
}

export async function auth(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions = {},
  done: any
) {
  const verifyJwt = jwtVerifier(opts);

  fastify.decorate('verifyJwt', verifyJwt);
  fastify.decorate('getToken', getToken);
  fastify.decorate('claimCheck', claimCheck);
  fastify.decorate('claimIncludes', claimIncludes);

  done();
}

export const fastifyOauth2 = fp(auth);

export { VerifyJwt, JWTPayload, ClaimCheck, ClaimChecker, ClaimIncludes };
