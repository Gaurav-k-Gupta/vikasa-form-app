export interface FarmerMetadata {
    CreatedBy: string;
    CreatedAt: string; 
    UpdatedBy?: string;
    UpdatedAt?: string;
    IsActive: boolean;
}

export type RelationType = "W/O" | "D/O" | "S/O";
export type FarmerCategory = "Marginal" | "Small" | "Medium" | "Large";
export type SocialStatus = "SC" | "ST" | "BC" | "OC";

export interface Farmer {
    FarmerId: string;
    Name: string;
    RelationType: RelationType;
    RelativeName: string;
    Cluster: string;
    Village: string;
    MobileNumber: string;
    SHGName: string;
    VOName: string;
    FarmerCategory: FarmerCategory;
    SocialStatus: SocialStatus;
    MetaData: FarmerMetadata;
}

export interface CreateFarmerDto {
    Name: string;
    RelationType: RelationType;
    RelativeName: string;
    Cluster: string;
    Village: string;
    MobileNumber: string;
    SHGName: string;
    VOName: string;
    FarmerCategory: FarmerCategory;
    SocialStatus: SocialStatus;
}

export interface UpdateFarmerDto {
    Name?: string;
    RelationType?: RelationType;
    RelativeName?: string;
    Cluster?: string;
    Village?: string;
    MobileNumber?: string;
    SHGName?: string;
    VOName?: string;
    FarmerCategory?: FarmerCategory;
    SocialStatus?: SocialStatus;
}