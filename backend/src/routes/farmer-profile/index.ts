import { FastifyPluginAsync } from "fastify";
import { handleAggregatedFarmerProfileSubmit } from "./aggregatedFarmerProfile";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // TODO: change the aggregated route to POST
  fastify.get(
    "/farmer-profile/aggregated",
    handleAggregatedFarmerProfileSubmit
  );
};

export default example;
