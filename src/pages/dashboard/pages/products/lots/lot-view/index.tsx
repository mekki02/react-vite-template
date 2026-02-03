import React from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLotByIdQuery } from '../../../../redux/slices/lots/lotSlice';
import PageContainer from '../../../../shared/page-container';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LotView: React.FC = () => {
    const navigate = useNavigate();
    const { lotId } = useParams<{ lotId: string }>();

    const { data: lot, isLoading, error } = useGetLotByIdQuery(lotId!, {
        skip: !lotId,
    });

    const handleEditLot = () => {
        navigate(`/dashboard/products/lots/${lotId}/edit`);
    };

    const handleBack = () => {
        navigate('/dashboard/products/lots');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'released':
                return 'success';
            case 'quarantined':
                return 'warning';
            case 'expired':
                return 'error';
            default:
                return 'default';
        }
    };

    const getQcStateColor = (qcState: string) => {
        switch (qcState) {
            case 'passed':
                return 'success';
            case 'failed':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    if (isLoading) {
        return (
            <PageContainer title="Lot Details">
                <Box sx={{ flexGrow: 1 }}>
                    <div>Loading lot details...</div>
                </Box>
            </PageContainer>
        );
    }

    if (error || !lot) {
        return (
            <PageContainer title="Lot Details">
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="warning">Lot not found</Alert>
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title="Lot Details"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Lots', path: '/dashboard/products/lots' },
                { title: 'Lot Details' },
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
                        onClick={handleEditLot}
                    >
                        Edit Lot
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
                                        Lot Number
                                    </Typography>
                                    <Typography variant="body1">
                                        {lot.lotNumber}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Product ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {lot.productId}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Organization ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {lot.organizationId}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Dates
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Manufacture Date
                                    </Typography>
                                    <Typography variant="body1">
                                        {lot.manufactureDate 
                                            ? new Date(lot.manufactureDate).toLocaleDateString()
                                            : 'Not specified'
                                        }
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Expiration Date
                                    </Typography>
                                    <Typography variant="body1">
                                        {lot.expirationDate 
                                            ? new Date(lot.expirationDate).toLocaleDateString()
                                            : 'Not specified'
                                        }
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Status & Quality Control
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Chip
                                        label={lot.status}
                                        color={getStatusColor(lot.status) as any}
                                        size="small"
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        QC State
                                    </Typography>
                                    <Chip
                                        label={lot.qcState}
                                        color={getQcStateColor(lot.qcState) as any}
                                        size="small"
                                    />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                System Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Lot ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {lot.id}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(lot.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Updated At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(lot.updatedAt).toLocaleString()}
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

export default LotView;
