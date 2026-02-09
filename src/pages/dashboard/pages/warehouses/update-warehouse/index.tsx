import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import type { WarehouseFormState } from '../warehouse-form';
import WarehouseForm from '../warehouse-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { getErrorMessage } from '../../../../../utils/toolkit-query';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetWarehouseByIdQuery, useUpdateWarehouseMutation } from '../../../redux/slices/warehouses/warehousesSlice';

export const WarehouseUpdate: FC = (): JSX.Element => {
    const { warehouseId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();
    const {
        data,
        isLoading,
        isError: isFetchError,
        isSuccess: isFetchSuccess,
        error,
    } = useGetWarehouseByIdQuery(warehouseId!, {
        skip: !warehouseId,
    });

    const { result: warehouse } = data || {};

    const [updateWarehouse, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateWarehouseMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('Warehouse edited successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/warehouses');
        }
    }, [isUpdateSuccess])

    useEffect(() => {
        if (isUpdateError || isFetchError)
            notifications.show('Error updating the warehouse.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
    }, [isUpdateError, isFetchError])

    useEffect(() => {
        if (isFetchSuccess && !warehouse) {
            notifications.show('Warehouse not found.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/warehouses');
        }
    }, [isFetchSuccess, warehouse]);

    const handleSubmit = useCallback(
        async (formValues: Partial<WarehouseFormState['values']>) => {
            updateWarehouse({ id: warehouseId!, ...formValues });
        },
        [warehouseId],
    );

    const renderEdit = useMemo(() => {
        if (isLoading) {
            return (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        m: 1,
                    }}
                >
                    <CircularProgress />
                </Box>
            );
        }
        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">{getErrorMessage(error)}</Alert>
                </Box>
            );
        }

        return warehouse ? (
            <WarehouseForm
                defaultValues={warehouse}
                isSubmitting={isUpdating}
                onSubmit={handleSubmit}
                submitButtonLabel="Save"
                backButtonPath={`/dashboard/warehouses/${warehouseId}`}
            />
        ) : null;
    }, [isLoading, error, warehouse, handleSubmit]);

    return (
        <PageContainer
            title={`Edit ${warehouse?.name || ''}`}
            breadcrumbs={[
                { title: 'Warehouses', path: '/dashboard/warehouses' },
                { title: `Warehouse ${warehouse?.name || ''}`, path: `/dashboard/warehouses/${warehouseId}` },
                { title: 'Edit Warehouse' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
        </PageContainer>
    );
}

export default WarehouseUpdate;