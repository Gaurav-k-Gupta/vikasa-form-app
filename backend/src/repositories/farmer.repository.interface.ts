import { Farmer, CreateFarmerDto, UpdateFarmerDto } from '../models/farmer.model';

export interface IFarmerRepository {
  // CRUD operations
  create(data: CreateFarmerDto, userId: string): Promise<Farmer>;
  findById(id: string): Promise<Farmer | null>;
  update(id: string, data: UpdateFarmerDto, userId: string): Promise<Farmer | null>;
  delete(id: string): Promise<boolean>;
  
  // GSI specific methods
  findByMobile(mobileNumber: string): Promise<Farmer[]>;
  findByEmail(email: string): Promise<Farmer[]>;
  findByCluster(cluster: string): Promise<Farmer[]>;
  findByVillage(village: string): Promise<Farmer[]>;
  findBySocialStatus(socialStatus: string, village?: string): Promise<Farmer[]>;
  findByNFStartYear(startYear: string, village?: string): Promise<Farmer[]>;

}