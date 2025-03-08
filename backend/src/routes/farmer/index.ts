import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { DynamoDBFarmerRepository } from '../../repositories/dynamodb/farmer.repository';
import { 
  CreateFarmerRequest, 
  GetFarmerParams, 
  UpdateFarmerParams, 
  UpdateFarmerRequest, 
  DeleteFarmerParams, 
  GetFarmersByQueryParams,
  schemas
} from './schema';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export default async function farmerRoutes(
  fastify: FastifyInstance,
  options: { dynamoDbClient: DynamoDBDocumentClient }
): Promise<void> {
  const farmerRepository = new DynamoDBFarmerRepository(options.dynamoDbClient);
  
  const getUserId = (request: FastifyRequest): string => {        
    return (request.headers['x-user-id'] as string) || 'system';
  };
  
  fastify.post<{ Body: CreateFarmerRequest }>(
    '/',
    { schema: schemas.createFarmerSchema },
    async (request: FastifyRequest<{ Body: CreateFarmerRequest }>, reply: FastifyReply) => {
      const userId = getUserId(request);
      const farmer = await farmerRepository.create(request.body, userId);
      return reply.code(201).send(farmer);
    }
  );
  
  fastify.get<{ Params: GetFarmerParams }>(
    '/:id',
    { schema: schemas.getFarmerSchema },
    async (request: FastifyRequest<{ Params: GetFarmerParams }>, reply: FastifyReply) => {
      const { id } = request.params;
      const farmer = await farmerRepository.findById(id);
      
      if (!farmer) {
        return reply.code(404).send({ message: 'Farmer not found' });
      }
      
      return reply.code(200).send(farmer);
    }
  );
  
  fastify.patch<{ Params: UpdateFarmerParams; Body: UpdateFarmerRequest }>(
    '/:id',
    { schema: schemas.updateFarmerSchema },
    async (request: FastifyRequest<{ Params: UpdateFarmerParams; Body: UpdateFarmerRequest }>, reply: FastifyReply) => {
      const { id } = request.params;
      const userId = getUserId(request);
      
      const updatedFarmer = await farmerRepository.update(id, request.body, userId);
      
      if (!updatedFarmer) {
        return reply.code(404).send({ message: 'Farmer not found' });
      }
      
      return reply.code(200).send(updatedFarmer);
    }
  );
  
  fastify.delete<{ Params: DeleteFarmerParams }>(
    '/:id',
    { schema: schemas.deleteFarmerSchema },
    async (request: FastifyRequest<{ Params: DeleteFarmerParams }>, reply: FastifyReply) => {
      const { id } = request.params;
      const success = await farmerRepository.delete(id);
      
      if (!success) {
        return reply.code(404).send({ message: 'Farmer not found' });
      }
      
      return reply.code(200).send({ success: true });
    }
  );
  
  fastify.get<{ Querystring: GetFarmersByQueryParams }>(
    '/',
    { schema: schemas.getFarmersByQuerySchema },
    async (request: FastifyRequest<{ Querystring: GetFarmersByQueryParams }>, reply: FastifyReply) => {
      const { mobile, email, cluster, village } = request.query;
      let farmers = [];

      if (mobile) {
        farmers = await farmerRepository.findByMobile(mobile);
      } else if (email) {
        farmers = await farmerRepository.findByEmail(email);
      } else if (cluster) {
        farmers = await farmerRepository.findByCluster(cluster);
      } else if (village) {
        farmers = await farmerRepository.findByVillage(village);
      } else {        
        return reply.code(400).send({ message: 'At least one query parameter is required' });
      }

      return reply.code(200).send(farmers);
    }
  );
  
  
  fastify.get(
    '/social-status/:status',
    async (request: FastifyRequest<{ Params: { status: string }; Querystring: { village?: string } }>, reply: FastifyReply) => {
      const { status } = request.params;
      const { village } = request.query;
      
      const farmers = await farmerRepository.findBySocialStatus(status, village);
      return reply.code(200).send(farmers);
    }
  );
  
  fastify.get(
    '/nf-start-year/:year',
    async (request: FastifyRequest<{ Params: { year: string }; Querystring: { village?: string } }>, reply: FastifyReply) => {
      const { year } = request.params;
      const { village } = request.query;
      
      const farmers = await farmerRepository.findByNFStartYear(year, village);
      return reply.code(200).send(farmers);
    }
  );
  
  fastify.get(
    '/village/:village',
    async (request: FastifyRequest<{ Params: { village: string }; Querystring: { category?: string } }>, reply: FastifyReply) => {
      const { village } = request.params;
      const { category } = request.query;
      
      const farmers = await farmerRepository.findByVillage(village, category);
      return reply.code(200).send(farmers);
    }
  );
}