import { FromSchema } from 'json-schema-to-ts';

const farmerProperties = {
  FarmerId: { type: 'string', format: 'uuid' },
  Name: { type: 'string' },
  RelationType: { type: 'string', enum: ['W/O', 'D/O', 'S/O'] },
  RelativeName: { type: 'string' },
  Cluster: { type: 'string' },
  Village: { type: 'string' },
  MobileNumber: { type: 'string', pattern: '^[0-9]{10}$' },
  SHGName: { type: 'string' },
  VOName: { type: 'string' },
  FarmerCategory: { type: 'string', enum: ['Marginal', 'Small', 'Medium', 'Large'] },
  SocialStatus: { type: 'string', enum: ['SC', 'ST', 'BC', 'OC'] },
  MetaData: {
    type: 'object',
    properties: {
      CreatedBy: { type: 'string' },
      CreatedAt: { type: 'string', format: 'date-time' },
      UpdatedBy: { type: 'string' },
      UpdatedAt: { type: 'string', format: 'date-time' },
      IsActive: { type: 'boolean' },
    },
    required: ['CreatedBy', 'CreatedAt', 'IsActive'],
  },
};

const createFarmerSchema = {
  body: {
    type: 'object',
    properties: {
      Name: { type: 'string' },
      RelationType: { type: 'string', enum: ['W/O', 'D/O', 'S/O'] },
      RelativeName: { type: 'string' },
      Cluster: { type: 'string' },
      Village: { type: 'string' },
      MobileNumber: { type: 'string', pattern: '^[0-9]{10}$' },
      SHGName: { type: 'string' },
      VOName: { type: 'string' },
      FarmerCategory: { type: 'string', enum: ['Marginal', 'Small', 'Medium', 'Large'] },
      SocialStatus: { type: 'string', enum: ['SC', 'ST', 'BC', 'OC'] },
    },
    required: [
      'Name',
      'RelationType',
      'RelativeName',
      'Cluster',
      'Village',
      'MobileNumber',
      'SHGName',
      'VOName',
      'FarmerCategory',
      'SocialStatus',
    ],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: farmerProperties,
      required: [
        'FarmerId',
        'Name',
        'RelationType',
        'RelativeName',
        'Cluster',
        'Village',
        'MobileNumber',
        'SHGName',
        'VOName',
        'FarmerCategory',
        'SocialStatus',
        'MetaData',
      ],
    },
  },
} as const;

const getFarmerSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: farmerProperties,
      required: [
        'FarmerId',
        'Name',
        'RelationType',
        'RelativeName',
        'Cluster',
        'Village',
        'MobileNumber',
        'SHGName',
        'VOName',
        'FarmerCategory',
        'SocialStatus',
        'MetaData',
      ],
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;

const updateFarmerSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      Name: { type: 'string' },
      RelationType: { type: 'string', enum: ['W/O', 'D/O', 'S/O'] },
      RelativeName: { type: 'string' },
      Cluster: { type: 'string' },
      Village: { type: 'string' },
      MobileNumber: { type: 'string', pattern: '^[0-9]{10}$' },
      SHGName: { type: 'string' },
      VOName: { type: 'string' },
      FarmerCategory: { type: 'string', enum: ['Marginal', 'Small', 'Medium', 'Large'] },
      SocialStatus: { type: 'string', enum: ['SC', 'ST', 'BC', 'OC'] },
    },
    minProperties: 1,
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: farmerProperties,
      required: [
        'FarmerId',
        'Name',
        'RelationType',
        'RelativeName',
        'Cluster',
        'Village',
        'MobileNumber',
        'SHGName',
        'VOName',
        'FarmerCategory',
        'SocialStatus',
        'MetaData',
      ],
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;

const deleteFarmerSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
      required: ['success'],
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;

const getFarmersByQuerySchema = {
  querystring: {
    type: 'object',
    properties: {
      mobile: { type: 'string', pattern: '^[0-9]{10}$' },
      email: { type: 'string', format: 'email' },
      cluster: { type: 'string' },
      village: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: farmerProperties,
        required: [
          'FarmerId',
          'Name',
          'RelationType',
          'RelativeName',
          'Cluster',
          'Village',
          'MobileNumber',
          'SHGName',
          'VOName',
          'FarmerCategory',
          'SocialStatus',
          'MetaData',
        ],
      },
    },
  },
} as const;

export type CreateFarmerRequest = FromSchema<typeof createFarmerSchema.body>;
export type GetFarmerParams = FromSchema<typeof getFarmerSchema.params>;
export type UpdateFarmerParams = FromSchema<typeof updateFarmerSchema.params>;
export type UpdateFarmerRequest = FromSchema<typeof updateFarmerSchema.body>;
export type DeleteFarmerParams = FromSchema<typeof deleteFarmerSchema.params>;
export type GetFarmersByQueryParams = FromSchema<typeof getFarmersByQuerySchema.querystring>;

export const schemas = {
  createFarmerSchema,
  getFarmerSchema,
  updateFarmerSchema,
  deleteFarmerSchema,
  getFarmersByQuerySchema,
};