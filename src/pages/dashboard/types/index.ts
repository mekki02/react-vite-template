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

export interface Invitation {
    email: string;
    role: string;
    sender_id: string;
    sender_email: string;
    status: 'pending' | 'accepted' | 'expired';
    created_at: string;
    expires_at: string;
    id: string;
}

export interface Resource {
    id: string;
    title: string;
    type: string;
    owner: string;
}