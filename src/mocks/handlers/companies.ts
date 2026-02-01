import { http, HttpResponse } from "msw";
import type { Company } from "../../pages/dashboard/types";
import { companies } from "../mocks";

export const companiesHandlers = [
    // Get companies with pagination and filtering
    http.get("/api/companies", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
        const search = url.searchParams.get("search")?.toLowerCase() || "";

        let filteredCompanies = companies;

        if (search) {
            filteredCompanies = companies.filter(
                (company) =>
                    company.legalName.toLowerCase().includes(search) ||
                    company.vatNumber.toLowerCase().includes(search) ||
                    company.registrationNumber.toLowerCase().includes(search) ||
                    company.brandName.toLowerCase().includes(search)
            );
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedCompanies = filteredCompanies.slice(start, end);

        return HttpResponse.json({
            data: paginatedCompanies,
            totalCount: filteredCompanies.length,
        });
    }),

    http.get("/api/companies/:id", ({ request }) => {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        const company = {
            id,
            legalName: `Legal Name 1`,
            brandName: `Brand Name 1`,
            registrationNumber: `REG-1`,
            taxId: `TAX-1`,
            vatNumber: `VAT-1`,
            currency: "TND",
            timezone: "Europe/Paris",
            organizationId: crypto.randomUUID(),
        }
        return HttpResponse.json(company);
    }),

    // Create a new company
    http.post("/api/companies", async ({ request }) => {
        const newCompany = (await request.json()) as Company;
        const uuid = crypto.randomUUID();
        newCompany.id = uuid;
        companies.push(newCompany);

        return HttpResponse.json(newCompany, { status: 201 });
    }),

    // Update an existing company
    http.put<{ id: string }>("/api/companies/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedCompany = (await request.json()) as Partial<Company>;
        const companyIndex = companies.findIndex((company) => company.id === id);

        if (companyIndex === -1) {
            return HttpResponse.json({ message: "Company not found" }, { status: 404 });
        }

        companies[companyIndex] = { ...companies[companyIndex], ...updatedCompany };
        return HttpResponse.json(companies[companyIndex]);
    }),

    // Delete a company
    http.delete<{ id: string }>("/api/companies/:id", ({ params }) => {
        const { id } = params;
        const companyIndex = companies.findIndex((company) => company.id === id);

        if (companyIndex === -1) {
            return HttpResponse.json({ message: "Company not found" }, { status: 404 });
        }

        companies.splice(companyIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
