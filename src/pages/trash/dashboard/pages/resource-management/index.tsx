import { useState, type FC, type JSX } from "react";
import type { Header } from "../../shared/datatable";
import { DataTable } from "../../shared/datatable";
import type { Resource } from "../../../dashboard/types";
import { useCreateResourceMutation, useDeleteResourceMutation, useGetResourcesQuery, useUpdateResourceMutation } from "../../../dashboard/redux/slices/resources/resourcesSlice";

const headers: Header<Resource>[] = [
    { columnKey: "id", label: "ID" },
    { columnKey: "title", label: "Title" },
    { columnKey: "type", label: "Type" },
    { columnKey: "owner", label: "Owner" },
];

export const ResourceManagement: FC = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [editingResource, setEditingResource] = useState<Resource | null>(null);

    const { data, isLoading, error, refetch } = useGetResourcesQuery({
        page,
        pageSize: 10,
        search,
    });

    const [createResource, { isLoading: isCreating }] = useCreateResourceMutation();
    const [updateResource, { isLoading: isUpdating }] = useUpdateResourceMutation();
    const [deleteResource] = useDeleteResourceMutation();

    const { data: resources, totalCount } = data || { data: [] };

    const handleCreate = async () => {
        await createResource({
            title: "New Resource",
            type: "Document",
            owner: "Admin",
        });
        refetch(); // Ensure data is updated after creation
    };

    const handleUpdate = async () => {
        if (!editingResource) return;
        await updateResource(editingResource);
        setEditingResource(null);
        refetch(); // Ensure data is updated after update
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete resource?")) {
            await deleteResource(id);
            refetch(); // Ensure data is updated after deletion
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <>
            <DataTable
                headers={headers}
                data={resources}
                page={page}
                rowsPerPage={10}
                totalCount={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    );
};

export default ResourceManagement;