import React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../../redux/slices/users/userSlice';
import PageContainer from '../../../shared/page-container';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserView: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const { data, isLoading, error } = useGetUserByIdQuery(userId!, {
        skip: !userId,
    });

    const { result: user } = data ?? {};

    const handleEditUser = () => {
        navigate(`/dashboard/users/${userId}/edit`);
    };

    const handleBack = () => {
        navigate('/dashboard/users');
    };

    if (isLoading) {
        return (
            <PageContainer title="User Details">
                <Box sx={{ flexGrow: 1 }}>
                    <div>Loading user details...</div>
                </Box>
            </PageContainer>
        );
    }

    if (error || !user) {
        return (
            <PageContainer title="User Details">
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="warning">User not found</Alert>
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title="User Details"
            breadcrumbs={[
                { title: 'Users', path: '/dashboard/users' },
                { title: 'User Details' },
            ]}
            actions={
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEditUser}
                    >
                        Edit User
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ flexGrow: 1 }}>
                <Stack spacing={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Basic Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.email}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Username
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.username}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Role
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.role}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Locale
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.locale}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Profile Completed
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.profileCompleted ? 'Yes' : 'No'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.phoneNumber}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Gender
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.gender}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Organization ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {user.organizationId}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </PageContainer>
    );
};

export default UserView;