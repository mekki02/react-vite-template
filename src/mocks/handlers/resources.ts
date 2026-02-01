import { http, HttpResponse } from "msw";
import type { Resource } from "../../pages/dashboard/types";
import { resources } from "../mocks";

export const resourceHandlers = [
    // Get resources with pagination and filtering
    http.get("/api/resources", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
        const search = url.searchParams.get("search")?.toLowerCase() || "";

        let filteredResources = resources;

        if (search) {
            filteredResources = resources.filter(
                (resource) =>
                    resource.type.toLowerCase().includes(search) ||
                    resource.title.toLowerCase().includes(search) ||
                    resource.owner.toLowerCase().includes(search)
            );
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedResources = filteredResources.slice(start, end);

        return HttpResponse.json({
            data: paginatedResources,
            totalCount: filteredResources.length,
        });
    }),

    // Create a new resource
    http.post("/api/resources", async ({ request }) => {
        const newResource = (await request.json()) as Resource; 
        const uuid = crypto.randomUUID();
        newResource.id = uuid;
        resources.push(newResource);

        return HttpResponse.json(newResource, { status: 201 });
    }),

    // Update an existing resource
    http.put<{ id: string }>("/api/resources/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedResource = (await request.json()) as Partial<Resource>;
        const resourceIndex = resources.findIndex((resource) => resource.id === id);

        if (resourceIndex === -1) {
            return HttpResponse.json({ message: "Resource not found" }, { status: 404 });
        }

        resources[resourceIndex] = { ...resources[resourceIndex], ...updatedResource };

        return HttpResponse.json(resources[resourceIndex]);
    }),

    // Delete a resource
    http.delete<{ id: string }>("/api/resources/:id", ({ params }) => {
        const { id } = params;
        const resourceIndex = resources.findIndex((resource) => resource.id === id);

        if (resourceIndex === -1) {
            return HttpResponse.json({ message: "Resource not found" }, { status: 404 });
        }

        resources.splice(resourceIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
