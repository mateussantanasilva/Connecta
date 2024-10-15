import { FastifyInstance } from 'fastify';
import { OAuth2Namespace, OAuth2Token } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
  interface OAuth2Token {
    access_token: string;  // Adiciona a propriedade access_token
    // Adicione outras propriedades conforme necessário
  }
}