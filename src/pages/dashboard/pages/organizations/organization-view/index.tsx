import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import PageContainer from '../../../shared/page-container';
import { useCallback, useMemo, type FC, type JSX } from 'react';
import { useGetOrganizationByIdQuery } from '../../../redux/slices/organizations/organizationSlice';

export const OrganizationView: FC = (): JSX.Element => {
    const { organizationId } = useParams<{ organizationId: string }>();
    const navigate = useNavigate();

    const {
        data: organization,
        isLoading,
        isError,
        error,
    } = useGetOrganizationByIdQuery(organizationId!, {
        skip: !organizationId,
    });

    const handleEdit = useCallback(() => {
        navigate(`/dashboard/organizations/${organizationId}/edit`);
    }, [navigate, organizationId]);

    const handleBack = useCallback(() => {
        navigate('/dashboard/organizations');
    }, [navigate]);

    const renderOrganization = useMemo(() => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Typography>Loading organization...</Typography>
                </Box>
            );
        }

        if (isError || !organization) {
            return (
                <Alert severity="error">
                    {error ? (error as Error).message : 'Organization not found'}
                </Alert>
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Organization Details
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {organization.name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Plan
                                    </Typography>
                                    <Typography variant="body1">
                                        {organization.plan}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Typography variant="body1">
                                        {organization.isActive ? 'Active' : 'Inactive'}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Timestamps
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(organization.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Updated At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(organization.updatedAt).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }, [isLoading, isError, error, organization]);

    return (
        <PageContainer
            title="Organization Details"
            breadcrumbs={[
                { title: 'Organizations', path: '/dashboard/organizations' },
                { title: 'Details' },
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
                        onClick={handleEdit}
                        disabled={!organization}
                    >
                        Edit
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ display: 'flex', flex: 1 }}>
                {renderOrganization}
            </Box>
        </PageContainer>
    );
};

export default OrganizationView;
