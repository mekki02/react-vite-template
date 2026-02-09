import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import type { UOMFormState } from '../uom-form';
import UOMForm from '../uom-form';
import useNotifications from '../../../../../../hooks/context/notification';
import PageContainer from '../../../../shared/page-container';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useCreateUOMMutation } from '../../../../redux/slices/uom/uomSlice';
import { parseJwt } from '@utils/jwt';

export const UOMCreate: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [createUOM, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError, error }] = useCreateUOMMutation();
    const token = sessionStorage.getItem('token');
    const organizationId = parseJwt(token || '')?.organizationID;

    useEffect(() => {
        if (isCreateSuccess) {
            notifications.show('UOM created successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/products/uom');
        }
    }, [isCreateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isCreateError) {
            notifications.show('Error creating the UOM.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isCreateError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<UOMFormState['values']>) => {
            const uomData = {
                ...formValues,
                organizationId,
                ratioToBase: formValues.isBase ? 1 : formValues.ratioToBase,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            await createUOM(uomData);
        },
        [createUOM],
    );

    const renderCreate = useMemo(() => {
        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">Error creating UOM</Alert>
                </Box>
            );
        }

        return (
            <UOMForm
                defaultValues={{
                    name: '',
                    category: '',
                    isBase: false,
                    ratioToBase: 1.1,
                }}
                isSubmitting={isCreating}
                onSubmit={handleSubmit}
                submitButtonLabel="Create UOM"
                backButtonPath="/dashboard/products/uom"
            />
        );
    }, [error, isCreating, handleSubmit]);

    return (
        <PageContainer
            title="Create Unit of Measure"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Units of Measure', path: '/dashboard/products/uom' },
                { title: 'Create UOM' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderCreate}</Box>
        </PageContainer>
    );
}

export default UOMCreate;
