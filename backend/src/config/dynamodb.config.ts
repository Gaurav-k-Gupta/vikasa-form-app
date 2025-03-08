// src/config/dynamodb.config.ts

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

interface DynamoDBConfig {
  region: string;
  endpoint?: string;
}

export const createDynamoDBClient = (config: DynamoDBConfig): DynamoDBDocumentClient => {
  const client = new DynamoDBClient({
    region: config.region,
    endpoint: config.endpoint, // For local development
  });

  return DynamoDBDocumentClient.from(client);
};

export const TABLES = {
  FARMER: process.env.FARMER_TABLE_NAME || 'Farmer',
};

export const GSI = {
  FARMER_BY_MOBILE: process.env.FARMER_BY_MOBILE_INDEX || 'MobileNumber-index',
  FARMER_BY_CLUSTER: process.env.FARMER_BY_CLUSTER_INDEX || 'Cluster-index',
  FARMER_BY_VILLAGE: process.env.FARMER_BY_VILLAGE_INDEX || 'Village-index',
  FARMER_BY_SOCIAL_STATUS_INDEX: process.env.FARMER_BY_SOCIAL_STATUS_INDEX || 'social-status-index',
  FARMER_BY_NF_START_YEAR_INDEX: process.env.FARMER_BY_NF_START_YEAR_INDEX || 'start-year-index',
};


