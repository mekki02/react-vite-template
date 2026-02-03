import { http, HttpResponse } from "msw";
import { invitations } from "../mocks";
import type { Invitation } from "../../pages/dashboard/types";

export const invitationHandlers = [
    http.get("/api/invitations", ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedInvitations = invitations.slice(start, end);

        return HttpResponse.json({
            data: paginatedInvitations,
            totalCount: invitations.length,
        });
    }),

    http.get("/api/invitations/:id", ({ params }) => {
        const { id } = params;
        const invitation = invitations.find((inv) => inv.id === id);

        if (!invitation) {
            return HttpResponse.json({ message: "Invitation not found" }, { status: 404 });
        }

        return HttpResponse.json(invitation);
    }),

    http.post("/api/invitations", async ({ request }) => {
        const newInvitation = await request.json() as Invitation;
        const uuid = crypto.randomUUID();
        newInvitation.id = uuid;
        invitations.push(newInvitation);

        return HttpResponse.json(newInvitation, { status: 201 });
    }),

    http.put<{ id: string }>("/api/invitations/:id", async ({ request, params }) => {
        const { id } = params;
        const updatedInvitation = await request.json() as Invitation;
        const invitationIndex = invitations.findIndex((inv) => inv.id === id);

        if (invitationIndex === -1) {
            return HttpResponse.json({ message: "Invitation not found" }, { status: 404 });
        }

        // Only allow updating pending invitations
        if (invitations[invitationIndex].status !== 'pending') {
            return HttpResponse.json({ message: "Cannot update invitation that is not pending" }, { status: 400 });
        }

        invitations[invitationIndex] = { ...invitations[invitationIndex], ...updatedInvitation };

        return HttpResponse.json(invitations[invitationIndex]);
    }),

    http.delete<{ id: string }>("/api/invitations/:id", ({ params }) => {
        const { id } = params;
        const invitationIndex = invitations.findIndex((inv) => inv.id === id);

        if (invitationIndex === -1) {
            return HttpResponse.json({ message: "Invitation not found" }, { status: 404 });
        }

        // Only allow deleting pending invitations
        if (invitations[invitationIndex].status !== 'pending') {
            return HttpResponse.json({ message: "Cannot delete invitation that is not pending" }, { status: 400 });
        }

        invitations.splice(invitationIndex, 1);

        return HttpResponse.json({}, { status: 204 });
    }),
];
