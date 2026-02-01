import { useNavigate } from 'react-router';
import useNotifications from '../../../../../hooks/context/notification';
import { useCreateWarehouseMutation } from '../../../redux/slices/warehouses/warehousesSlice';
import PageContainer from '../../../shared/page-container';
import WarehouseForm, { type WarehouseFormState } from '../warehouse-form';
import { useCallback, useEffect } from 'react';

const defaultWarehouseValues = {
    name: "",
    code: "",
    address: {
        street: "",
        city: "",
        country: "",
        postalCode: "",
        buildingNumber: ""
    },
    isActive: true,
    companyId: "",
    organizationId: "",
};

export default function WarehouseCreate() {
    const navigate = useNavigate();

    const notifications = useNotifications();

    const [createWarehouse, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError }] = useCreateWarehouseMutation();

    useEffect(() => {
        if (isCreateSuccess) {
            notifications.show('Warehouse created successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/warehouses');
        }
    }, [isCreateSuccess])

    useEffect(() => {
        if (isCreateError)
            notifications.show('Error creating the warehouse.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
    }, [isCreateError]);

    const handleSubmit = useCallback(async (formValues: Partial<WarehouseFormState['values']>) => {
        createWarehouse({ ...formValues });
    }, []);

    return (
        <PageContainer
            title="New Warehouse"
            breadcrumbs={[{ title: 'Warehouses', path: '/warehouses' }, { title: 'New' }]}
        >
            <WarehouseForm
                defaultValues={defaultWarehouseValues}
                isSubmitting={isCreating}
                onSubmit={handleSubmit}
                submitButtonLabel="Save"
                backButtonPath={`/dashboard/warehouses`}
            />
        </PageContainer>
    );
}
