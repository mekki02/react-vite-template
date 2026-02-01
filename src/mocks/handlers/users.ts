import { http, HttpResponse } from "msw";
import { users } from "../mocks";
import type { User } from "../../pages/dashboard/types";

export const userHandlers = [
    http.get("/api/users", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedUsers = users.slice(start, end);

        return HttpResponse.json({
            data: paginatedUsers,
            totalCount: users.length,
        });
    }),

    http.get("/api/users/:id", ({ request }) => {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        const user = {
            id,
            first_name: 'User firstname',
            last_name: 'User lastname',
            username: `username 1`,
            email: `useremail+1@gmail`,
            role: 'Admin',
            is_active: true,
            locale: 'en',
            organization_id: crypto.randomUUID(),
            gender: 'M',
            date_of_birth: new Date().toString(),
            phone_number: "123123123",
            avatar_url: 'URL',
            profile_completed: true
        }
        return HttpResponse.json(user);
    }),

    http.post("/api/users", async ({ request }) => {
        const newUser = await request.json() as User;
        const uuid = crypto.randomUUID();
        newUser.id = uuid;
        users.push(newUser);

        return HttpResponse.json(newUser, { status: 201 });
    }),

    http.put<{ id: string }>("/api/users/:id", async ({ request, params },) => {
        const { id } = params;
        const updatedUser = await request.json() as User;
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return HttpResponse.json({ message: "User not found" }, { status: 404 });
        }

        users[userIndex] = { ...users[userIndex], ...updatedUser };

        return HttpResponse.json(users[userIndex]);
    }),

    http.delete<{ id: string }>("/api/users/:id", ({ params }) => {
        const { id } = params;
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return HttpResponse.json({ message: "User not found" }, { status: 404 });
        }

        users.splice(userIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
