import { http, HttpResponse } from "msw";
import type { Warehouse } from "../../pages/dashboard/types";
import { warehouses } from "../mocks";

export const warehousesHandlers = [
    // Get warehouses with pagination and filtering
    http.get("/api/warehouses", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
        const search = url.searchParams.get("search")?.toLowerCase() || "";

        let filteredWarehouses = warehouses;

        if (search) {
            filteredWarehouses = warehouses.filter(
                (warehouse) =>
                    warehouse.name.toLowerCase().includes(search) ||
                    warehouse.code.toLowerCase().includes(search)
            );
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedWarehouses = filteredWarehouses.slice(start, end);

        return HttpResponse.json({
            data: paginatedWarehouses,
            totalCount: filteredWarehouses.length,
        });
    }),

    http.get("/api/warehouses/:id", ({ request }) => {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        const warehouse = {
            id,
            name: `Warehouse 1`,
            code: `WH-1`,
            address: {
                street: `Street 1`,
                city: `City 1`,
                country: `TN`,
                postalCode: `00001`,
                buildingNumber: `1`,
            },
            isActive: true,
            companyId: `comp-123`,
            organizationId: `org-123`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            }
        return HttpResponse.json(warehouse);
    }),

    // Create a new warehouse
    http.post("/api/warehouses", async ({ request }) => {
        const newWarehouse = (await request.json()) as Warehouse;
        const uuid = crypto.randomUUID();
        newWarehouse.id = uuid;
        warehouses.push(newWarehouse);

        return HttpResponse.json(newWarehouse, { status: 201 });
    }),

    // Update an existing warehouse
    http.put<{ id: string }>("/api/warehouses/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedWarehouse = (await request.json()) as Partial<Warehouse>;
        const warehouseIndex = warehouses.findIndex((warehouse) => warehouse.id === id);

        if (warehouseIndex === -1) {
            return HttpResponse.json({ message: "Warehouse not found" }, { status: 404 });
        }

        warehouses[warehouseIndex] = { ...warehouses[warehouseIndex], ...updatedWarehouse };
        return HttpResponse.json(warehouses[warehouseIndex]);
    }),

    // Delete a warehouse
    http.delete<{ id: string }>("/api/warehouses/:id", ({ params }) => {
        const { id } = params;
        const warehouseIndex = warehouses.findIndex((warehouse) => warehouse.id === id);

        if (warehouseIndex === -1) {
            return HttpResponse.json({ message: "Warehouse not found" }, { status: 404 });
        }

        warehouses.splice(warehouseIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
