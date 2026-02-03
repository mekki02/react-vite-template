import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import type { InvitationFormState } from '../invitation-form';
import InvitationForm from '../invitation-form';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import useNotifications from '@hooks/context/notification';
import PageContainer from '@pages/dashboard/shared/page-container';
import { useCreateInvitationMutation } from '@pages/dashboard/redux/slices/invitations/invitationSlice';

export const InvitationCreate: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [createInvitation, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError, error }] = useCreateInvitationMutation();
    
    useEffect(() => {
        if (isCreateSuccess) {
            notifications.show('Invitation sent successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/users/invitations');
        }
    }, [isCreateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isCreateError) {
            notifications.show('Error sending invitation.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isCreateError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<InvitationFormState['values']>) => {
            const invitationData = {
                ...formValues,
                organizationId: 'org-123', // This would come from user context
                senderId: 'current-user-id', // This would come from user context
                senderEmail: 'current-user@example.com', // This would come from user context
                status: 'pending' as 'pending' | 'accepted' | 'expired' | undefined,
                createdAt: new Date().toISOString(),
            };
            await createInvitation(invitationData);
        },
        [createInvitation],
    );

    const renderCreate = useMemo(() => {
        if (isCreateError && error) {
            return (
                <Box sx={{ mb: 2 }}>
                    <Alert severity="error">
                        {typeof error === 'string' ? error : 'Error creating invitation'}
                    </Alert>
                </Box>
            );
        }

        return null;
    }, [isCreateError, error]);

    return (
        <PageContainer
            title="Send Invitation"
            breadcrumbs={[
                { title: 'Users', path: '/dashboard/users' },
                { title: 'Invitations', path: '/dashboard/users/invitations' },
                { title: 'Send Invitation', path: '/dashboard/users/invitations/create' },
            ]}
        >
            <Box>
                {renderCreate}
                <InvitationForm
                    onSubmit={handleSubmit}
                    submitButtonLabel="Send Invitation"
                    backButtonPath="/dashboard/users/invitations"
                    isSubmitting={isCreating}
                />
            </Box>
        </PageContainer>
    );
};

export default InvitationCreate;
