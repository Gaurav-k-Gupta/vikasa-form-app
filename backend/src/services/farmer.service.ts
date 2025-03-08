// src/services/farmer.service.ts

import { Farmer, CreateFarmerDto, UpdateFarmerDto } from '../models/farmer.model';
import { IFarmerRepository } from '../repositories/farmer.repository.interface';

export class FarmerService {
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  async createFarmer(data: CreateFarmerDto, userId: string): Promise<Farmer> {
    return this.farmerRepository.create(data, userId);
  }

  async getFarmerById(id: string): Promise<Farmer | null> {
    return this.farmerRepository.findById(id);
  }

  async updateFarmer(id: string, data: UpdateFarmerDto, userId: string): Promise<Farmer | null> {
    return this.farmerRepository.update(id, data, userId);
  }

  async deleteFarmer(id: string): Promise<boolean> {
    return this.farmerRepository.delete(id);
  }

  async getFarmersByMobile(mobileNumber: string): Promise<Farmer[]> {
    return this.farmerRepository.findByMobile(mobileNumber);
  }

  async getFarmersByEmail(email: string): Promise<Farmer[]> {
    return this.farmerRepository.findByEmail(email);
  }

  async getFarmersByCluster(cluster: string): Promise<Farmer[]> {
    return this.farmerRepository.findByCluster(cluster);
  }

  async getFarmersByVillage(village: string): Promise<Farmer[]> {
    return this.farmerRepository.findByVillage(village);
  }
}