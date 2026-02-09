import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import type { OrganizationFormState } from '../organization-form';
import OrganizationForm from '../organization-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useCreateOrganizationMutation } from '../../../redux/slices/organizations/organizationSlice';

export const OrganizationCreate: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [createOrganization, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError, error }] = useCreateOrganizationMutation();
    
    useEffect(() => {
        if (isCreateSuccess) {
            notifications.show('Organization created successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/organizations');
        }
    }, [isCreateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isCreateError) {
            notifications.show('Error creating the organization.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isCreateError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<OrganizationFormState['values']>) => {
            const organizationData = {
                ...formValues,
                isActive: formValues.isActive ?? true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            await createOrganization(organizationData);
        },
        [createOrganization],
    );

    const renderCreate = useMemo(() => {
        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">Error creating organization</Alert>
                </Box>
            );
        }

        return (
            <OrganizationForm
                isSubmitting={isCreating}
                onSubmit={handleSubmit}
                submitButtonLabel="Create Organization"
                backButtonPath="/dashboard/organizations"
            />
        );
    }, [error, isCreating, handleSubmit]);

    return (
        <PageContainer
            title="Create Organization"
            breadcrumbs={[
                { title: 'Organizations', path: '/dashboard/organizations' },
                { title: 'Create Organization' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderCreate}</Box>
        </PageContainer>
    );
}

export default OrganizationCreate;
