import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { DynamoDBFarmerRepository } from '../repositories/dynamodb/farmer.repository';
import { IFarmerRepository } from '../repositories/farmer.repository.interface';

const repositoriesPlugin: FastifyPluginAsync = async (fastify) => {
  const farmerRepository = new DynamoDBFarmerRepository(fastify.dynamodb);
  fastify.decorate('repositories', {
    farmer: farmerRepository,
  });
};

export default fp(repositoriesPlugin, {
  name: 'repositories',
  dependencies: ['dynamodb'],
});

declare module 'fastify' {
  interface FastifyInstance {
    repositories: {
      farmer: IFarmerRepository;
    };
  }
}