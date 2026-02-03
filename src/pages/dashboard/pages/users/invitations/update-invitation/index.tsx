import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router';
import type { InvitationFormState } from '../invitation-form';
import InvitationForm from '../invitation-form';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import useNotifications from '@hooks/context/notification';
import PageContainer from '@pages/dashboard/shared/page-container';
import { useGetInvitationByIdQuery , useUpdateInvitationMutation } from '@pages/dashboard/redux/slices/invitations/invitationSlice';

export const InvitationUpdate: FC = (): JSX.Element => {
    const { invitationId } = useParams<{ invitationId: string }>();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const {
        data: invitation,
        isLoading: isLoadingInvitation,
        isError: isInvitationError,
        error: invitationError,
    } = useGetInvitationByIdQuery(invitationId!, {
        skip: !invitationId,
    });

    const [updateInvitation, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error }] = useUpdateInvitationMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('Invitation updated successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate(`/dashboard/users/invitations/${invitationId}`);
        }
    }, [isUpdateSuccess, navigate, notifications, invitationId]);

    useEffect(() => {
        if (isUpdateError) {
            notifications.show('Error updating invitation.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isUpdateError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<InvitationFormState['values']>) => {
            if (!invitationId) return;
            
            const invitationData = {
                ...formValues,
                updatedAt: new Date().toISOString(),
            };
            await updateInvitation({ id: invitationId, ...invitationData });
        },
        [updateInvitation, invitationId],
    );

    const renderUpdate = useMemo(() => {
        if (isLoadingInvitation) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <Box>Loading invitation...</Box>
                </Box>
            );
        }

        if (isInvitationError && invitationError) {
            return (
                <Box sx={{ mb: 2 }}>
                    <Alert severity="error">
                        {typeof invitationError === 'string' ? invitationError : 'Error loading invitation'}
                    </Alert>
                </Box>
            );
        }

        if (isUpdateError && error) {
            return (
                <Box sx={{ mb: 2 }}>
                    <Alert severity="error">
                        {typeof error === 'string' ? error : 'Error updating invitation'}
                    </Alert>
                </Box>
            );
        }

        return null;
    }, [isLoadingInvitation, isInvitationError, invitationError, isUpdateError, error]);

    if (invitation && invitation.status !== 'pending') {
        return (
            <PageContainer
                title="Edit Invitation"
                breadcrumbs={[
                    { title: 'Users', path: '/dashboard/users' },
                    { title: 'Invitations', path: '/dashboard/users/invitations' },
                    { title: 'Edit Invitation', path: `/dashboard/users/invitations/${invitationId}/edit` },
                ]}
            >
                <Alert severity="warning">
                    This invitation cannot be edited because it is {invitation.status}.
                </Alert>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title="Edit Invitation"
            breadcrumbs={[
                { title: 'Users', path: '/dashboard/users' },
                { title: 'Invitations', path: '/dashboard/users/invitations' },
                { title: 'Edit Invitation', path: `/dashboard/users/invitations/${invitationId}/edit` },
            ]}
        >
            <Box>
                {renderUpdate}
                {invitation && (
                    <InvitationForm
                        onSubmit={handleSubmit}
                        submitButtonLabel="Update Invitation"
                        backButtonPath={`/dashboard/users/invitations/${invitationId}`}
                        isSubmitting={isUpdating}
                        defaultValues={invitation}
                    />
                )}
            </Box>
        </PageContainer>
    );
};

export default InvitationUpdate;

