export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  profileCompleted: boolean;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  phoneNumber: string;
  dateOfBirth?: string | null;
  gender: string;
  locale: string;
  organizationId: string;
}

export interface Company {
    id: string;
    legalName: string;
    brandName: string;
    registrationNumber: string;
    taxId: string;
    vatNumber: string;
    currency: string;
    timezone: string;
    organizationId: string;
}

export interface Warehouse {
    id: string;
    name: string;
    code: string;
    isActive: boolean;
    companyId: string;
    organizationId: string;
    address: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

export interface Resource {
    id: string;
    title: string;
    type: string;
    owner: string;
}

export interface Product {
  id: string;
  organizationId: string;
  sku: string;
  name: string;
  description?: string | null;
  barcodeMain?: string | null;
  tracking: 'none' | 'lot' | 'serial';
  baseUomId: string;
  packUomId?: string | null;
  weight?: number | null;
  volume?: number | null;
  abcClass?: 'A' | 'B' | 'C' | null;
  perishable: boolean;
  hazardous: boolean;
  leadTimeDays?: number | null;
  defaultCostMethod: 'fifo' | 'lifo' | 'avg' | 'standard';
  standardCost: number;
  active: boolean;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Lot {
  id: string;
  organizationId: string;
  productId: string;
  lotNumber: string;
  manufactureDate: string | undefined ;
  expirationDate: string | undefined;
  status: 'released' | 'quarantined' | 'expired';
  qcState: 'pending' | 'passed' | 'failed';
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  senderId: string;
  senderEmail: string;
  status: 'pending' | 'accepted' | 'expired';
  usedAt: string | undefined;
  usedByUserId: string | null;
  createdAt: string;
  expiresAt: string;
}

export interface UOM {
  id: string;
  organizationId: string;
  name: string;
  category: string;
  isBase: boolean;
  ratioToBase: number;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  organizationId?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
