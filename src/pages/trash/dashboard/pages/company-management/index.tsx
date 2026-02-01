import { useState, type FC, type JSX } from "react";
import type { Header } from "../../shared/datatable";
import { DataTable } from "../../shared/datatable";
import type { Company } from "../../../dashboard/types";
import { useCreateCompanyMutation, useDeleteCompanyMutation, useGetCompaniesQuery, useUpdateCompanyMutation } from "../../../dashboard/redux/slices/companies/companiesSlice";

const headers: Header<Company>[] = [
    { columnKey: "id", label: "ID" },
    { columnKey: "legalName", label: "Legal Name" },
    { columnKey: "brandName", label: "Brand Name" },
    { columnKey: "registrationNumber", label: "Registration Number" },
    { columnKey: "taxId", label: "Tax ID" },
    { columnKey: "vatNumber", label: "VAT Number" },
    { columnKey: "currency", label: "Currency" },
    { columnKey: "timezone", label: "Timezone" },
    { columnKey: "organizationId", label: "Organization ID" },
];

export const CompanyManagement: FC = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);
    const { data, isLoading, error, refetch } = useGetCompaniesQuery({
        page,
        pageSize: 10,
        search,
    });
    const { data: companies, totalCount } = data || { data: [] };
    const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
    const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
    const [deleteCompany] = useDeleteCompanyMutation();

    const handleCreate = async () => {
        await createCompany({
            legalName: "New Company",
            brandName: "New Brand",
            registrationNumber: "123456",
            taxId: "TAX123456",
            vatNumber: "VAT123456",
            currency: "USD",
            timezone: "UTC",
            organizationId: "org-123",
        });
        refetch(); // Ensure data is updated after creation
    };

    const handleUpdate = async () => {
        if (!editingCompany) return;
        await updateCompany(editingCompany);
        setEditingCompany(null);
        refetch(); // Ensure data is updated after update
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete resource?")) {
            await deleteCompany(id);
            refetch(); // Ensure data is updated after deletion
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <>
            <DataTable
                headers={headers}
                data={companies}
                page={page}
                rowsPerPage={10}
                totalCount={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    );
};

export default CompanyManagement;