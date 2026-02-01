import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import type { UserFormState } from '../user-form';
import UserForm from '../user-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { getErrorMessage } from '../../../../../utils/toolkit-query';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../../redux/slices/users/userSlice';

export const UserUpdate: FC = (): JSX.Element => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();
    const {
        data: user,
        isLoading,
        isError: isFetchError,
        isSuccess: isFetchSuccess,
        error,
    } = useGetUserByIdQuery(userId!, {
        skip: !userId,
    });

    const [updateUser, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateUserMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('User edited successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/users');
        }
    }, [isUpdateSuccess])

    useEffect(() => {
        if (isUpdateError || isFetchError)
            notifications.show('Error updating the user.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
    }, [isUpdateError, isFetchError])

    useEffect(() => {
        if (isFetchSuccess && !user) {
            notifications.show('User not found.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/users');
        }
    }, [isFetchSuccess, user]);

    const handleSubmit = useCallback(
        async (formValues: Partial<UserFormState['values']>) => {
            updateUser({ id: userId!, ...formValues });
        },
        [userId],
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

        return user ? (
            <UserForm
                defaultValues={user}
                isSubmitting={isUpdating}
                onSubmit={handleSubmit}
                submitButtonLabel="Save"
                backButtonPath={`/dashboard/users/${userId}`}
            />
        ) : null;
    }, [isLoading, error, user, handleSubmit]);

    return (
        <PageContainer
            title={`Edit ${user?.firstName + ' ' + user?.lastName || ''}`}
            breadcrumbs={[
                { title: 'Users', path: '/dashboard/users' },
                { title: `User ${user?.firstName + ' ' + user?.lastName || ''}`, path: `/dashboard/users/${userId}` },
                { title: 'Edit' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
        </PageContainer>
    );
}

export default UserUpdate;