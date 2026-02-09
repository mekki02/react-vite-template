import { http, HttpResponse } from "msw";
import { organizations } from "../mocks";
import type { Organization } from "../../pages/dashboard/types";

export const organizationHandlers = [
    http.get("/api/organizations", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedOrganizations = organizations.slice(start, end);

        return HttpResponse.json({
            data: paginatedOrganizations,
            totalCount: organizations.length,
        });
    }),

    http.get("/api/organizations/:id", ({ params }) => {
        const { id } = params;
        const organization = organizations.find(o => o.id === id);
        
        if (!organization) {
            return HttpResponse.json({ message: "Organization not found" }, { status: 404 });
        }

        return HttpResponse.json(organization);
    }),

    http.post("/api/organizations", async ({ request }) => {
        const newOrganization = await request.json() as Organization;
        const uuid = crypto.randomUUID();
        const organization: Organization = {
            ...newOrganization,
            id: uuid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        organizations.push(organization);

        return HttpResponse.json(organization, { status: 201 });
    }),

    http.put<{ id: string }>("/api/organizations/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedOrganization = await request.json() as Organization;
        const organizationIndex = organizations.findIndex((organization) => organization.id === id);

        if (organizationIndex === -1) {
            return HttpResponse.json({ message: "Organization not found" }, { status: 404 });
        }

        organizations[organizationIndex] = { 
            ...organizations[organizationIndex], 
            ...updatedOrganization,
            updatedAt: new Date().toISOString(),
        };

        return HttpResponse.json(organizations[organizationIndex]);
    }),

    http.delete<{ id: string }>("/api/organizations/:id", ({ params }) => {
        const { id } = params;
        const organizationIndex = organizations.findIndex((organization) => organization.id === id);

        if (organizationIndex === -1) {
            return HttpResponse.json({ message: "Organization not found" }, { status: 404 });
        }

        organizations.splice(organizationIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
