// src/repositories/dynamodb/farmer.repository.ts

import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { IFarmerRepository } from '../farmer.repository.interface';
import { Farmer, CreateFarmerDto, UpdateFarmerDto } from '../../models/farmer.model';
import { TABLES, GSI } from '../../config/dynamodb.config';

export class DynamoDBFarmerRepository implements IFarmerRepository {
  constructor(private readonly docClient: DynamoDBDocumentClient) {}

  async create(data: CreateFarmerDto, userId: string): Promise<Farmer> {
    const now = new Date().toISOString();
    const farmerId = uuidv4();
    
    const farmer: Farmer = {
      FarmerId: farmerId,
      ...data,
      MetaData: {
        CreatedBy: userId,
        CreatedAt: now,
        IsActive: true,
      },
    };

    await this.docClient.send(
      new PutCommand({
        TableName: TABLES.FARMER,
        Item: farmer,
      })
    );

    return farmer;
  }

  async findById(id: string): Promise<Farmer | null> {
    const response = await this.docClient.send(
      new GetCommand({
        TableName: TABLES.FARMER,
        Key: { FarmerId: id },
      })
    );

    return (response.Item as Farmer) || null;
  }

  async update(id: string, data: UpdateFarmerDto, userId: string): Promise<Farmer | null> {
    const existingFarmer = await this.findById(id);
    if (!existingFarmer) {
      return null;
    }

    const now = new Date().toISOString();
    const updateExpression = this.buildUpdateExpression(data);
    
    if (!updateExpression.updateExpression) {
      return existingFarmer;
    }

    // Add metadata update
    updateExpression.updateExpression += ', SET MetaData.UpdatedBy = :updatedBy, MetaData.UpdatedAt = :updatedAt';
    updateExpression.expressionAttributeValues[':updatedBy'] = userId;
    updateExpression.expressionAttributeValues[':updatedAt'] = now;

    const response = await this.docClient.send(
      new UpdateCommand({
        TableName: TABLES.FARMER,
        Key: { FarmerId: id },
        UpdateExpression: updateExpression.updateExpression,
        ExpressionAttributeNames: updateExpression.expressionAttributeNames,
        ExpressionAttributeValues: updateExpression.expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      })
    );

    return response.Attributes as Farmer;
  }

  async delete(id: string): Promise<boolean> {
    try {
      // Soft delete - set IsActive to false
      const response = await this.docClient.send(
        new UpdateCommand({
          TableName: TABLES.FARMER,
          Key: { FarmerId: id },
          UpdateExpression: 'SET MetaData.IsActive = :isActive',
          ExpressionAttributeValues: {
            ':isActive': false,
          },
          ReturnValues: 'ALL_NEW',
        })
      );

      return !!response.Attributes;
    } catch (error) {
      console.error('Error deleting farmer:', error);
      return false;
    }
  }

  async findByMobile(mobileNumber: string): Promise<Farmer[]> {
    const response = await this.docClient.send(
      new QueryCommand({
        TableName: TABLES.FARMER,
        IndexName: GSI.FARMER_BY_MOBILE,
        KeyConditionExpression: 'MobileNumber = :mobileNumber',
        ExpressionAttributeValues: {
          ':mobileNumber': mobileNumber,
        },
      })
    );

    return (response.Items as Farmer[]) || [];
  }

  async findByEmail(email: string): Promise<Farmer[]> {
    // Since there's no direct GSI for email, we'll use a scan operation with a filter
    // Note: In a production environment, you should consider adding a GSI for frequently queried fields
    const response = await this.docClient.send(
      new QueryCommand({
        TableName: TABLES.FARMER,
        FilterExpression: 'Email = :email',
        ExpressionAttributeValues: {
          ':email': email,
        },
      })
    );

    return (response.Items as Farmer[]) || [];
  }

  async findBySocialStatus(socialStatus: string, village?: string): Promise<Farmer[]> {
    const keyConditionExpression = village 
      ? 'BasicInfo.SocialStatus = :status AND BasicInfo.Village = :village'
      : 'BasicInfo.SocialStatus = :status';
      
    const expressionAttributeValues: Record<string, any> = {
      ':status': socialStatus
    };
    
    if (village) {
      expressionAttributeValues[':village'] = village;
    }
    
    const response = await this.docClient.send(
      new QueryCommand({
        TableName: TABLES.FARMER,
        IndexName: GSI.FARMER_BY_SOCIAL_STATUS_INDEX, // Updated to match your schema's GSI name
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
      })
    );

    return (response.Items as Farmer[]) || [];
  }

  async findByNFStartYear(startYear: string, village?: string): Promise<Farmer[]> {
    const keyConditionExpression = village 
      ? 'LandDetails.NFStartYear = :startYear AND BasicInfo.Village = :village'
      : 'LandDetails.NFStartYear = :startYear';
      
    const expressionAttributeValues: Record<string, any> = {
      ':startYear': startYear
    };
    
    if (village) {
      expressionAttributeValues[':village'] = village;
    }
    
    const response = await this.docClient.send(
      new QueryCommand({
        TableName: TABLES.FARMER,
        IndexName: GSI.FARMER_BY_NF_START_YEAR_INDEX, // Updated to match your schema's GSI name
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
      })
    );

    return (response.Items as Farmer[]) || [];
  }

  async findByCluster(cluster: string): Promise<Farmer[]> {
    const response = await this.docClient.send(
      new QueryCommand({
        TableName: TABLES.FARMER,
        IndexName: GSI.FARMER_BY_CLUSTER,
        KeyConditionExpression: 'Cluster = :cluster',
        ExpressionAttributeValues: {
          ':cluster': cluster,
        },
      })
    );

    return (response.Items as Farmer[]) || [];
  }

  async findByVillage(village: string, farmerCategory?: string): Promise<Farmer[]> {
    const keyConditionExpression = farmerCategory 
      ? 'BasicInfo.Village = :village AND BasicInfo.FarmerCategory = :category'
      : 'BasicInfo.Village = :village';
      
    const expressionAttributeValues: Record<string, any> = {
      ':village': village
    };
    
    if (farmerCategory) {
      expressionAttributeValues[':category'] = farmerCategory;
    }
    
    const response = await this.docClient.send(
      new QueryCommand({
        TableName: TABLES.FARMER,
        IndexName: GSI.FARMER_BY_VILLAGE, // Updated to match your schema's GSI name
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
      })
    );

    return (response.Items as Farmer[]) || [];
  }

  private buildUpdateExpression(data: UpdateFarmerDto): { 
    updateExpression: string; 
    expressionAttributeNames: Record<string, string>; 
    expressionAttributeValues: Record<string, any>;
  } {
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};
    
    let updateExpression = 'SET';
    let isFirst = true;

    // Handle BasicInfo fields
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        // Skip metadata fields
        if (key === 'MetaData') continue;
        
        const attributeName = `#${key}`;
        const attributeValue = `:${key.toLowerCase()}`;
        
        if (!isFirst) {
          updateExpression += ',';
        }
        
        // Map to the correct schema path based on the field
        if (['Name', 'RelationType', 'RelativeName', 'Cluster', 'Village', 
             'MobileNumber', 'SHGName', 'VOName', 'FarmerCategory', 'SocialStatus'].includes(key)) {
          updateExpression += ` BasicInfo.${attributeName} = ${attributeValue}`;
        } else {
          // For other fields, update directly
          updateExpression += ` ${attributeName} = ${attributeValue}`;
        }
        
        expressionAttributeNames[attributeName] = key;
        expressionAttributeValues[attributeValue] = value;
        
        isFirst = false;
      }
    }

    if (isFirst) {
      // No fields to update
      return {
        updateExpression: '',
        expressionAttributeNames: {},
        expressionAttributeValues: {},
      };
    }

    return {
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    };
  }
}