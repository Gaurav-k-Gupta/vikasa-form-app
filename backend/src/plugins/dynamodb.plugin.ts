// src/plugins/dynamodb.plugin.ts

import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { createDynamoDBClient } from '../config/dynamodb.config';

interface DynamoDBPluginOptions {
  region: string;
  endpoint?: string;
}

const dynamoDBPlugin: FastifyPluginAsync<DynamoDBPluginOptions> = async (fastify, options) => {
  const docClient = createDynamoDBClient({
    region: options.region,
    endpoint: options.endpoint,
  });

  fastify.decorate('dynamodb', docClient);

  fastify.addHook('onClose', (instance, done) => {
    done();
  });
};

export default fp(dynamoDBPlugin, {
  name: 'dynamodb',
});

// Add type definition for Fastify instance
declare module 'fastify' {
  interface FastifyInstance {
    dynamodb: ReturnType<typeof createDynamoDBClient>;
  }
}