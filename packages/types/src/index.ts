export type UserType = 'SUPER_ADMIN' | 'HQ_STAFF' | 'FIELD_OFFICER' | 'PARTNER' | 'VOLUNTEER';
export type OfficeType = 'GLOBAL_HQ' | 'REGIONAL' | 'COUNTRY' | 'FIELD';
export type ProjectStatus = 'DRAFT' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
export type AvailabilityStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'DEPLOYED';
export type SyncStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type SyncOperation = 'CREATE' | 'UPDATE' | 'DELETE';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface Country extends BaseEntity {
  code: string;
  name: string;
  defaultCurrency: string;
}

export interface Office extends BaseEntity {
  countryId: string;
  name: string;
  code: string;
  officeType: OfficeType;
}

export interface User extends BaseEntity {
  officeId: string;
  email: string;
  fullName: string;
  userType: UserType;
  isActive: boolean;
}

export interface Programme extends BaseEntity {
  countryId: string;
  title: string;
  code: string;
  thematicArea: string;
  description?: string;
}

export interface Project extends BaseEntity {
  programmeId: string;
  officeId: string;
  title: string;
  code: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  totalBudget: number;
  currency: string;
}

export interface Beneficiary extends BaseEntity {
  officeId: string;
  beneficiaryCode: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth?: Date;
  vulnerabilityStatus?: string;
  latitude?: number;
  longitude?: number;
  isEncrypted: boolean;
  createdBy: string;
}

export interface Volunteer extends BaseEntity {
  userId: string;
  registrationCode: string;
  skills: string[];
  qualifications: string[];
  availabilityStatus: AvailabilityStatus;
  gpsHomeLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface SystemAuditLog extends BaseEntity {
  userId: string;
  action: string;
  entityName: string;
  entityId: string;
  changes: Record<string, any>;
  ipAddress?: string;
}

export interface SyncTransaction {
  clientTxId: string;
  entity: string;
  operation: SyncOperation;
  payload: Record<string, any>;
  syncStatus: SyncStatus;
  timestamp: Date;
}

export interface SyncPayload {
  deviceId: string;
  userId: string;
  timestamp: string;
  transactions: SyncTransaction[];
}
