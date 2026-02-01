import { useState, type FC, type JSX } from "react";
import type { Header } from "../../shared/datatable";
import { DataTable } from "../../shared/datatable";
import type { User } from "../../../dashboard/types";
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../../dashboard/redux/slices/users/userSlice";

const headers: Header<User>[] = [
    { columnKey: "id", label: "ID" },
    { columnKey: "name", label: "Name" },
    { columnKey: "email", label: "Email" },
    { columnKey: "role", label: "Role" },
];

export const UserManagement: FC = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { data, isLoading, error, refetch } = useGetUsersQuery({
        page,
        pageSize,
        search,
    });

    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const { data: users, totalCount } = data || { data: [] };

    const handleCreate = async () => {
        await createUser({
            name: "New User",
            email: "new@user.com",
        });
        refetch(); // Ensure data is updated after creation
    };

    const handleUpdate = async () => {
        if (!editingUser) return;
        await updateUser(editingUser);
        setEditingUser(null);
        refetch(); // Ensure data is updated after update
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete user?")) {
            await deleteUser(id);
            refetch(); // Ensure data is updated after deletion
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <>
            <DataTable
                headers={headers}
                data={users}
                page={page}
                rowsPerPage={pageSize}
                totalCount={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
                handleRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
            />
        </>
    );
};

export default UserManagement;