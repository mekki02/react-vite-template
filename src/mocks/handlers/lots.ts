import { http, HttpResponse } from "msw";
import { lots } from "@mocks/mocks";
import type { Lot } from "@pages/dashboard/types";

export const lotHandlers = [
    http.get("/api/lots", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
        const search = url.searchParams.get("search") || "";
        const productId = url.searchParams.get("productId");

        let filteredLots = lots;

        // Filter by product ID if provided
        if (productId) {
            filteredLots = filteredLots.filter(lot => lot.productId === productId);
        }

        // Filter by search term (lot number)
        if (search) {
            filteredLots = filteredLots.filter(lot => 
                lot.lotNumber.toLowerCase().includes(search.toLowerCase())
            );
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedLots = filteredLots.slice(start, end);

        return HttpResponse.json({
            data: paginatedLots,
            totalCount: filteredLots.length,
        });
    }),

    http.get("/api/lots/:id", ({ params }) => {
        const { id } = params;
        const lot = lots.find(l => l.id === id);
        
        if (!lot) {
            return HttpResponse.json({ message: "Lot not found" }, { status: 404 });
        }

        return HttpResponse.json(lot);
    }),

    http.post("/api/lots", async ({ request }) => {
        const newLot = await request.json() as Lot;
        const uuid = crypto.randomUUID();
        const lot: Lot = {
            ...newLot,
            id: uuid,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        };
        lots.push(lot);

        return HttpResponse.json(lot, { status: 201 });
    }),

    http.put<{ id: string }>("/api/lots/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedLot = await request.json() as Lot;
        const lotIndex = lots.findIndex((lot) => lot.id === id);

        if (lotIndex === -1) {
            return HttpResponse.json({ message: "Lot not found" }, { status: 404 });
        }

        lots[lotIndex] = { 
            ...lots[lotIndex], 
            ...updatedLot,
            updatedAt: new Date().toString(),
        };

        return HttpResponse.json(lots[lotIndex]);
    }),

    http.delete<{ id: string }>("/api/lots/:id", ({ params }) => {
        const { id } = params;
        const lotIndex = lots.findIndex((lot) => lot.id === id);

        if (lotIndex === -1) {
            return HttpResponse.json({ message: "Lot not found" }, { status: 404 });
        }

        lots.splice(lotIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
