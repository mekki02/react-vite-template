import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router';
import type { UOMFormState } from '../uom-form';
import UOMForm from '../uom-form';
import useNotifications from '../../../../../../hooks/context/notification';
import PageContainer from '../../../../shared/page-container';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetUOMByIdQuery, useUpdateUOMMutation } from '../../../../redux/slices/uom/uomSlice';

export const UOMUpdate: FC = (): JSX.Element => {
    const { uomId } = useParams<{ uomId: string }>();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const {
        data: uom,
        isLoading: isLoadingUOM,
        isError: isUOMError,
        error: uomError,
    } = useGetUOMByIdQuery(uomId || '', {
        skip: !uomId,
    });

    const [updateUOM, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error }] = useUpdateUOMMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('UOM updated successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/products/uom');
        }
    }, [isUpdateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isUpdateError) {
            notifications.show('Error updating the UOM.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isUpdateError, notifications]);

    useEffect(() => {
        if (isUOMError) {
            notifications.show('Error loading UOM details.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isUOMError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<UOMFormState['values']>) => {
            if (!uomId) return;
            
            const uomData = {
                ...formValues,
                id: uomId,
                organizationId: uom?.organizationId || 'org-123',
                ratioToBase: formValues.isBase ? 1 : formValues.ratioToBase,
                updatedAt: new Date().toISOString(),
            };
            await updateUOM(uomData);
        },
        [updateUOM, uomId, uom],
    );

    const renderUpdate = useMemo(() => {
        if (isLoadingUOM) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Box>Loading UOM details...</Box>
                </Box>
            );
        }

        if (isUOMError || !uom) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">
                        {uomError ? 'Error loading UOM details' : 'UOM not found'}
                    </Alert>
                </Box>
            );
        }

        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">Error updating UOM</Alert>
                </Box>
            );
        }

        return (
            <UOMForm
                isSubmitting={isUpdating}
                onSubmit={handleSubmit}
                submitButtonLabel="Update UOM"
                backButtonPath="/dashboard/products/uom"
                defaultValues={uom}
            />
        );
    }, [isLoadingUOM, isUOMError, uom, uomError, error, isUpdating, handleSubmit]);

    return (
        <PageContainer
            title="Update Unit of Measure"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Units of Measure', path: '/dashboard/products/uom' },
                { title: uom?.name || 'Update UOM' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderUpdate}</Box>
        </PageContainer>
    );
}

export default UOMUpdate;
