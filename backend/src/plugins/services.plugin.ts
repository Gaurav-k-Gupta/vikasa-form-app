// src/plugins/services.plugin.ts

import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { FarmerService } from '../services/farmer.service';

const servicesPlugin: FastifyPluginAsync = async (fastify) => {
  const farmerService = new FarmerService(fastify.repositories.farmer);

  // Decorate Fastify instance with services
  fastify.decorate('services', {
    farmer: farmerService,
  });
};

export default fp(servicesPlugin, {
  name: 'services',
  dependencies: ['repositories'],
});

// Add type definition for Fastify instance
declare module 'fastify' {
  interface FastifyInstance {
    services: {
      farmer: FarmerService;
    };
  }
}