import { http, HttpResponse } from "msw";
import { uom } from "../mocks";
import type { UOM } from "../../pages/dashboard/types";

export const uomHandlers = [
    http.get("/api/uom", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedUOM = uom.slice(start, end);

        return HttpResponse.json({
            data: paginatedUOM,
            totalCount: uom.length,
        });
    }),

    http.get("/api/uom/:id", ({ params }) => {
        const { id } = params;
        const uomItem = uom.find(u => u.id === id);
        
        if (!uomItem) {
            return HttpResponse.json({ message: "UOM not found" }, { status: 404 });
        }

        return HttpResponse.json(uomItem);
    }),

    http.post("/api/uom", async ({ request }) => {
        const newUOM = await request.json() as UOM;
        const uuid = crypto.randomUUID();
        const uomItem: UOM = {
            ...newUOM,
            id: uuid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        uom.push(uomItem);

        return HttpResponse.json(uomItem, { status: 201 });
    }),

    http.put<{ id: string }>("/api/uom/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedUOM = await request.json() as UOM;
        const uomIndex = uom.findIndex((uomItem) => uomItem.id === id);

        if (uomIndex === -1) {
            return HttpResponse.json({ message: "UOM not found" }, { status: 404 });
        }

        uom[uomIndex] = { 
            ...uom[uomIndex], 
            ...updatedUOM,
            updatedAt: new Date().toISOString(),
        };

        return HttpResponse.json(uom[uomIndex]);
    }),

    http.delete<{ id: string }>("/api/uom/:id", ({ params }) => {
        const { id } = params;
        const uomIndex = uom.findIndex((uomItem) => uomItem.id === id);

        if (uomIndex === -1) {
            return HttpResponse.json({ message: "UOM not found" }, { status: 404 });
        }

        uom.splice(uomIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
