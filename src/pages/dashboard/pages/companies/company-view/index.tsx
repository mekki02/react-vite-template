import React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCompanyByIdQuery } from '../../../redux/slices/companies/companiesSlice';
import PageContainer from '../../../shared/page-container';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CompanyView: React.FC = () => {
    const navigate = useNavigate();
    const { companyId } = useParams<{ companyId: string }>();

    const { data, isLoading, error } = useGetCompanyByIdQuery(companyId!, {
        skip: !companyId,
    });

    const { result: company } = data ?? {};

    const handleEditCompany = () => {
        navigate(`/dashboard/companies/${companyId}/edit`);
    };

    const handleBack = () => {
        navigate('/dashboard/companies');
    };

    if (isLoading) {
        return (
            <PageContainer title="Company Details">
                <Box sx={{ flexGrow: 1 }}>
                    <div>Loading company details...</div>
                </Box>
            </PageContainer>
        );
    }

    if (error || !company) {
        return (
            <PageContainer title="Company Details">
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="warning">Company not found</Alert>
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title="Company Details"
            breadcrumbs={[
                { title: 'Companies', path: '/dashboard/companies' },
                { title: 'Company Details' },
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
                        onClick={handleEditCompany}
                    >
                        Edit Company
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
                                        Legal Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.legalName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Brand Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.brandName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Registration Number
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.registrationNumber}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Tax ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.taxId}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        VAT Number
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.vatNumber}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Currency
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.currency}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Timezone
                                    </Typography>
                                    <Typography variant="body1">
                                        {company.timezone}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Company ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {company.id}
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

export default CompanyView;