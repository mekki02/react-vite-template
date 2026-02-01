import { useState, type FC, type JSX } from "react";
import type { Header } from "../../shared/datatable";
import { DataTable } from "../../shared/datatable";
import { Warehouse } from "../../../../dashboard/types";
import { useCreateWarehouseMutation, useDeleteWarehouseMutation, useGetWarehousesQuery, useUpdateWarehouseMutation } from "../../../../dashboard/redux/slices/warehouses/warehousesSlice";

const headers: Header<Warehouse>[] = [
    { columnKey: "id", label: "ID" },
    { columnKey: "name", label: "Name" },
    { columnKey: "code", label: "Code" },
    { columnKey: "isActive", label: "Active" },
    { columnKey: "companyId", label: "Company ID" },
    { columnKey: "organizationId", label: "Organization ID" },
];

export const WarehouseManagement: FC = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);

    const { data, isLoading, error, refetch } = useGetWarehousesQuery({
        page,
        pageSize: 10,
        search,
    });

    const [createWarehouse, { isLoading: isCreating }] = useCreateWarehouseMutation();
    const [updateWarehouse, { isLoading: isUpdating }] = useUpdateWarehouseMutation();
    const [deleteWarehouse] = useDeleteWarehouseMutation();

    const { data: warehouses, totalCount } = data || { data: [] };
    const handleCreate = async () => {
        await createWarehouse({
            name: "New Warehouse",
            code: "NEWWH",
            isActive: true,
            companyId: "comp-123",
            organizationId: "org-123",
            address: {},
        });
        refetch(); // Ensure data is updated after creation
    };

    const handleUpdate = async () => {
        if (!editingWarehouse) return;
        await updateWarehouse(editingWarehouse);
        setEditingWarehouse(null);
        refetch(); // Ensure data is updated after update
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete resource?")) {
            await deleteWarehouse(id);
            refetch(); // Ensure data is updated after deletion
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <>
            <DataTable
                headers={headers}
                data={warehouses}
                page={page}
                rowsPerPage={10}
                totalCount={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    );
};

export default WarehouseManagement;