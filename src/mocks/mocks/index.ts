import { countries } from "@constants/countries";
import type { User, Resource, Warehouse, Company, Product, Lot, Invitation, UOM } from "@pages/dashboard/types";

export const users: User[] = Array.from({ length: 100 }, (_, index) => ({
    id: crypto.randomUUID(),
    firstName: 'User firstname',
    lastName: 'User lastname',
    username: `username ${index}`,
    email: `useremail+${index}@gmail`,
    role: index % 2 === 0 ? 'Admin' : 'Owner',
    isActive: index % 3 === 0 ? true : false,
    locale: index % 2 ? 'fr' : 'en',
    organizationId: crypto.randomUUID(),
    gender: 'M',
    dateOfBirth: new Date().toString(),
    phoneNumber: "123123123",
    avatarUrl: 'URL',
    profileCompleted: true
}));

export const resources: Resource[] = Array.from({ length: 50 }, (_, index) => ({
    id: crypto.randomUUID(),
    title: `Resource ${index + 1}`,
    owner: `Owner ${index + 1}`,
    type: index % 2 === 0 ? "Type A" : "Type B",
}));

export const warehouses: Warehouse[] = Array.from({ length: 30 }, (_, index) => ({
    id: crypto.randomUUID(),
    name: `Warehouse ${index + 1}`,
    code: `WH-${index + 1}`,
    isActive: index % 2 === 0,
    companyId: crypto.randomUUID(),
    organizationId: crypto.randomUUID(),
    address: {
        street: `Street ${index + 1}`,
        city: `City ${index + 1}`,
        country: countries[index % countries.length].code,
        postalCode: `0000${index + 1}`,
        buildingNumber: `${index + 1}`,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}));

export const companies: Company[] = Array.from({ length: 20 }, (_, index) => ({
    id: crypto.randomUUID(),
    legalName: `Legal Name ${index + 1}`,
    brandName: `Brand Name ${index + 1}`,
    registrationNumber: `REG-${index + 1}`,
    taxId: `TAX-${index + 1}`,
    vatNumber: `VAT-${index + 1}`,
    currency: 'USD',
    timezone: 'America/New_York',
    organizationId: crypto.randomUUID(),
}));

export const products: Product[] = Array.from({ length: 50 }, (_, index) => ({
    id: crypto.randomUUID(),
    organizationId: 'org-123',
    sku: `SKU-${String(index + 1).padStart(5, '0')}`,
    name: `Product ${index + 1}`,
    description: `Description for product ${index + 1}`,
    barcodeMain: `BAR-${String(index + 1).padStart(8, '0')}`,
    tracking: ['none', 'lot', 'serial'][index % 3] as 'none' | 'lot' | 'serial',
    baseUomId: ['PCS', 'KG', 'L', 'M'][index % 4],
    packUomId: index % 2 === 0 ? ['BOX', 'CASE', 'PALLET'][index % 3] : null,
    weight: index % 3 === 0 ? Math.round((Math.random() * 100 + 1) * 100) / 100 : null,
    volume: index % 4 === 0 ? Math.round((Math.random() * 10 + 0.1) * 100) / 100 : null,
    abcClass: ['A', 'B', 'C', null][index % 4] as 'A' | 'B' | 'C' | null,
    perishable: index % 5 === 0,
    hazardous: index % 7 === 0,
    leadTimeDays: index % 3 === 0 ? Math.floor(Math.random() * 30 + 1) : null,
    defaultCostMethod: ['fifo', 'lifo', 'avg', 'standard'][index % 4] as 'fifo' | 'lifo' | 'avg' | 'standard',
    standardCost: Math.round((Math.random() * 1000 + 10) * 100) / 100,
    active: index % 10 !== 0, // 90% active
    metadata: {
        category: ['Electronics', 'Clothing', 'Food', 'Hardware'][index % 4],
        supplier: `Supplier ${index % 5 + 1}`,
    },
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

export const lots: Lot[] = Array.from({ length: 100 }, (_, index) => {
    const manufactureDate = index % 3 === 0 ? new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000) : null;
    const expirationDate = manufactureDate && index % 2 === 0 
        ? new Date(manufactureDate.getTime() + Math.random() * 365 * 24 * 60 * 60 * 1000)
        : null;
    
    return {
        id: crypto.randomUUID(),
        organizationId: 'org-123',
        productId: `product-${Math.floor(index / 2) + 1}`,
        lotNumber: `LOT-${String(index + 1).padStart(6, '0')}`,
        manufactureDate: manufactureDate?.toString() || undefined,
        expirationDate: expirationDate?.toString() || undefined,
        status: ['released', 'quarantined', 'expired'][index % 3] as 'released' | 'quarantined' | 'expired',
        qcState: ['pending', 'passed', 'failed'][index % 3] as 'pending' | 'passed' | 'failed',
        metadata: {
            batchNumber: `BATCH-${Math.floor(index / 5) + 1}`,
            location: `Warehouse ${index % 3 + 1}`,
            notes: `Notes for lot ${index + 1}`,
        },
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toString(),
        updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toString(),
    };
});

export const invitations: Invitation[] = Array.from({ length: 30 }, (_, index) => {
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const expiresAt = new Date(createdAt.getTime() + (7 + Math.random() * 14) * 24 * 60 * 60 * 1000);
    const statuses = ['pending', 'accepted', 'expired'] as const;
    const roles = ['Admin', 'User', 'Manager', 'Viewer'] as const;
    const status = statuses[index % statuses.length];
    
    return {
        id: crypto.randomUUID(),
        email: `invitee${index + 1}@example.com`,
        role: roles[index % roles.length],
        organizationId: 'org-123',
        senderId: 'sender-123',
        senderEmail: `sender${index % 5 + 1}@company.com`,
        status,
        usedAt: status === 'accepted' ? new Date(createdAt.getTime() + Math.random() * (expiresAt.getTime() - createdAt.getTime())).toISOString() : undefined,
        usedByUserId: status === 'accepted' ? `user-${Math.floor(index / 3) + 1}` : null,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
    };
});

export const uom: UOM[] = Array.from({ length: 25 }, (_, index) => {
    const categories = ['Weight', 'Volume', 'Length', 'Area', 'Count', 'Time', 'Temperature'];
    const category = categories[index % categories.length];
    const isBase = index % 5 === 0; // Every 5th item is a base unit
    
    return {
        id: crypto.randomUUID(),
        organizationId: 'org-123',
        name: isBase 
            ? `${category} Base` 
            : `${category} Unit ${index + 1}`,
        category,
        isBase,
        ratioToBase: isBase ? 1 : (index % 3 === 0 ? 0.001 : index % 2 === 0 ? 1000 : (index + 1)),
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
});