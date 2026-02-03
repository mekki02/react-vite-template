import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router';
import { useCallback,useMemo, type FC } from 'react';
import { useGetInvitationByIdQuery } from '@pages/dashboard/redux/slices/invitations/invitationSlice';
import PageContainer from '@pages/dashboard/shared/page-container';

export const InvitationView: FC = () => {
    const { invitationId } = useParams<{ invitationId: string }>();
    const navigate = useNavigate();

    const {
        data: invitation,
        isLoading,
        isError,
        error,
    } = useGetInvitationByIdQuery(invitationId!, {
        skip: !invitationId,
    });

    const handleEdit = useCallback(() => {
        navigate(`/dashboard/users/invitations/${invitationId}/edit`);
    }, [navigate, invitationId]);

    const handleBack = useCallback(() => {
        navigate('/dashboard/users/invitations');
    }, [navigate]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'accepted':
                return 'success';
            case 'expired':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderContent = useMemo(() => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <Typography>Loading invitation...</Typography>
                </Box>
            );
        }

        if (isError || !invitation) {
            return (
                <Alert severity="error">
                    {error ? String(error) : 'Invitation not found'}
                </Alert>
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Invitation Details
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email Address
                                    </Typography>
                                    <Typography variant="body1">
                                        {invitation.email}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Role
                                    </Typography>
                                    <Typography variant="body1">
                                        {invitation.role}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Chip
                                        label={invitation.status}
                                        color={getStatusColor(invitation.status)}
                                        size="small"
                                    />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Timestamp Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Sent By
                                    </Typography>
                                    <Typography variant="body1">
                                        {invitation.senderEmail}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created Date
                                    </Typography>
                                    <Typography variant="body1">
                                        {formatDate(invitation.createdAt)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Expires Date
                                    </Typography>
                                    <Typography variant="body1">
                                        {formatDate(invitation.expiresAt)}
                                    </Typography>
                                </Box>
                                {invitation.usedAt && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Used Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(invitation.usedAt)}
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }, [isLoading, isError, error, invitation]);

    return (
        <PageContainer
            title="Invitation Details"
            breadcrumbs={[
                { title: 'Users', path: '/dashboard/users' },
                { title: 'Invitations', path: '/dashboard/users/invitations' },
                { title: 'Invitation Details', path: `/dashboard/users/invitations/${invitationId}` },
            ]}
            actions={
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {invitation?.status === 'pending' && (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                    )}
                </Stack>
            }
        >
            <Box>
                {renderContent}
            </Box>
        </PageContainer>
    );
};

export default InvitationView;
