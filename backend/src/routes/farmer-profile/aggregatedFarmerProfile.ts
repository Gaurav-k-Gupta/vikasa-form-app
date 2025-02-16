import { FastifyReply, FastifyRequest } from "fastify";

/**
 * This is handler for aggregated form submit.
 * Currently, VIKASA records the entire farmer profile in a single form.
 * Ideally, the farmer profile should be disaggregated into multiple profile sections, each associated with the farmer's id.
 * But for now, we will keep the aggregated form to keep the current process.
 */

export async function handleAggregatedFarmerProfileSubmit(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return "this is an example";
}
