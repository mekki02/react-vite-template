import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router';
import type { OrganizationFormState } from '../organization-form';
import OrganizationForm from '../organization-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useUpdateOrganizationMutation, useGetOrganizationByIdQuery } from '../../../redux/slices/organizations/organizationSlice';

export const OrganizationUpdate: FC = (): JSX.Element => {
    const { organizationId } = useParams<{ organizationId: string }>();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const {
        data: organization,
        isLoading: isLoadingOrganization,
        isError: isOrganizationError,
        error: organizationError,
    } = useGetOrganizationByIdQuery(organizationId!, {
        skip: !organizationId,
    });

    const [updateOrganization, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error }] = useUpdateOrganizationMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('Organization updated successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/organizations');
        }
    }, [isUpdateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isUpdateError) {
            notifications.show('Error updating the organization.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isUpdateError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<OrganizationFormState['values']>) => {
            if (!organizationId) return;
            
            const organizationData = {
                ...formValues,
                id: organizationId,
                updatedAt: new Date().toISOString(),
            };
            await updateOrganization(organizationData);
        },
        [updateOrganization, organizationId],
    );

    const renderUpdate = useMemo(() => {
        if (isLoadingOrganization) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Box>Loading organization...</Box>
                </Box>
            );
        }

        if (isOrganizationError || !organization) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">
                        {organizationError ? (organizationError as Error).message : 'Organization not found'}
                    </Alert>
                </Box>
            );
        }

        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">Error updating organization</Alert>
                </Box>
            );
        }

        return (
            <OrganizationForm
                isSubmitting={isUpdating}
                onSubmit={handleSubmit}
                submitButtonLabel="Update Organization"
                backButtonPath="/dashboard/organizations"
                defaultValues={organization}
            />
        );
    }, [isLoadingOrganization, isOrganizationError, organization, organizationError, error, isUpdating, handleSubmit]);

    return (
        <PageContainer
            title="Update Organization"
            breadcrumbs={[
                { title: 'Organizations', path: '/dashboard/organizations' },
                { title: 'Update Organization' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderUpdate}</Box>
        </PageContainer>
    );
}

export default OrganizationUpdate;
