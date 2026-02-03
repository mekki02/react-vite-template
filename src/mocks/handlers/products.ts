import { http, HttpResponse } from "msw";
import { products } from "../mocks";
import type { Product } from "../../pages/dashboard/types";

export const productHandlers = [
    http.get("/api/products", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedProducts = products.slice(start, end);

        return HttpResponse.json({
            data: paginatedProducts,
            totalCount: products.length,
        });
    }),

    http.get("/api/products/:id", ({ params }) => {
        const { id } = params;
        const product = products.find(p => p.id === id);
        
        if (!product) {
            return HttpResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return HttpResponse.json(product);
    }),

    http.post("/api/products", async ({ request }) => {
        const newProduct = await request.json() as Product;
        const uuid = crypto.randomUUID();
        const product: Product = {
            ...newProduct,
            id: uuid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        products.push(product);

        return HttpResponse.json(product, { status: 201 });
    }),

    http.put<{ id: string }>("/api/products/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedProduct = await request.json() as Product;
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            return HttpResponse.json({ message: "Product not found" }, { status: 404 });
        }

        products[productIndex] = { 
            ...products[productIndex], 
            ...updatedProduct,
            updatedAt: new Date().toISOString(),
        };

        return HttpResponse.json(products[productIndex]);
    }),

    http.delete<{ id: string }>("/api/products/:id", ({ params }) => {
        const { id } = params;
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            return HttpResponse.json({ message: "Product not found" }, { status: 404 });
        }

        products.splice(productIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
