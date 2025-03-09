import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { FarmerService } from '../services/farmer.service';

const servicesPlugin: FastifyPluginAsync = async (fastify) => {
  const farmerService = new FarmerService(fastify.repositories.farmer);

  fastify.decorate('services', {
    farmer: farmerService,
  });
};

export default fp(servicesPlugin, {
  name: 'services',
  dependencies: ['repositories'],
});
declare module 'fastify' {
  interface FastifyInstance {
    services: {
      farmer: FarmerService;
    };
  }
}