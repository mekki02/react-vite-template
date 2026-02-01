import { countries } from "../../constants/countries";
import type { User, Resource, Warehouse, Company } from "../../pages/dashboard/types";

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
    currency: "USD",
    timezone: "America/New_York",
    organizationId: crypto.randomUUID(),
}));