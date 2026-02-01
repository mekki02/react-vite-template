import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import { useDialogs } from '../../../../../hooks/context/dialog';
import useNotifications from '../../../../../hooks/context/notification';
import { getErrorMessage } from '../../../../../utils/toolkit-query';
import PageContainer from '../../../shared/page-container';
import type { FC, JSX } from 'react';
import { useDeleteUserMutation, useGetUserByIdQuery } from '../../../redux/slices/users/userSlice';

export const UserView: FC = (): JSX.Element => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const dialogs = useDialogs();
    const notifications = useNotifications();

    const {
        data: user,
        isLoading,
        error,
    } = useGetUserByIdQuery(userId!, {
        skip: !userId,
    });
    const [deleteUser, { isLoading: isDeleting}] = useDeleteUserMutation();

    const handleUserEdit = React.useCallback(() => {
        navigate(`/dashboard/users/${userId}/edit`);
    }, [navigate, userId]);

    const handleUserDelete = React.useCallback(async () => {
        if (!user) {
            return;
        }

        const confirmed = await dialogs.confirm(
            `Do you wish to delete ${user.firstName} ${user.lastName}?`,
            {
                title: `Delete user?`,
                severity: 'error',
                okText: 'Delete',
                cancelText: 'Cancel',
            },
        );

        if (confirmed) {
            try {
                await deleteUser(userId!);

                navigate('/dashboard/users');

                notifications.show('User deleted successfully.', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
            } catch (deleteError) {
                notifications.show(
                    `Failed to delete user. Reason:' ${(deleteError as Error).message}`,
                    {
                        severity: 'error',
                        autoHideDuration: 3000,
                    },
                );
            }
        }
    }, [user, dialogs, userId, navigate, notifications]);

    const handleBack = React.useCallback(() => {
        navigate('/dashboard/users');
    }, [navigate]);

    const renderShow = React.useMemo(() => {
        if (isLoading || isDeleting) {
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
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Name</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {user.firstName + ' ' + user.lastName}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Email</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {user.email}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Role</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {user.role}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleUserEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleUserDelete}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        ) : null;
    }, [
        isLoading,
        error,
        user,
        handleBack,
        handleUserEdit,
        handleUserDelete,
    ]);

    const pageTitle = `User ${userId}`;

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: 'Users', path: '/dashboard/users' },
                { title: pageTitle },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
        </PageContainer>
    );
}

export default UserView;