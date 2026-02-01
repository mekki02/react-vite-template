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
import { useDeleteCompanyMutation, useGetCompanyByIdQuery } from '../../../redux/slices/companies/companiesSlice';

export const CompanyView: FC = (): JSX.Element => {
    const { companyId } = useParams();
    const navigate = useNavigate();

    const dialogs = useDialogs();
    const notifications = useNotifications();

    const {
        data: company,
        isLoading,
        error,
    } = useGetCompanyByIdQuery(companyId!, {
        skip: !companyId,
    });
    const [deleteCompany, { isLoading: isDeleting}] = useDeleteCompanyMutation();

    const handleCompanyEdit = React.useCallback(() => {
        navigate(`/dashboard/companies/${companyId}/edit`);
    }, [navigate, companyId]);

    const handleCompanyDelete = React.useCallback(async () => {
        if (!company) {
            return;
        }

        const confirmed = await dialogs.confirm(
            `Do you wish to delete ${company.legalName}?`,
            {
                title: `Delete company?`,
                severity: 'error',
                okText: 'Delete',
                cancelText: 'Cancel',
            },
        );

        if (confirmed) {
            try {
                await deleteCompany(companyId!);

                navigate('/dashboard/companies');

                notifications.show('Company deleted successfully.', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
            } catch (deleteError) {
                notifications.show(
                    `Failed to delete company. Reason:' ${(deleteError as Error).message}`,
                    {
                        severity: 'error',
                        autoHideDuration: 3000,
                    },
                );
            }
        }
    }, [company, dialogs, companyId, navigate, notifications]);

    const handleBack = React.useCallback(() => {
        navigate('/dashboard/companies');
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

        return company ? (
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Name</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.legalName}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Code</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.brandName}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Active state</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.registrationNumber}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Name</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.taxId}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Code</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.vatNumber}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Active state</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.currency}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Active state</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {company.timezone}
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
                            onClick={handleCompanyEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleCompanyDelete}
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
        company,
        handleBack,
        handleCompanyEdit,
        handleCompanyDelete,
    ]);

    const pageTitle = `Company ${companyId}`;

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: 'Companies', path: '/dashboard/companies' },
                { title: pageTitle },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
        </PageContainer>
    );
}

export default CompanyView;