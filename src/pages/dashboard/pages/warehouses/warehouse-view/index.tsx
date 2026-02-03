import React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWarehouseByIdQuery } from '@pages/dashboard/redux/slices/warehouses/warehousesSlice';
import PageContainer from '@pages/dashboard/shared/page-container';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WarehouseView: React.FC = () => {
    const navigate = useNavigate();
    const { warehouseId } = useParams<{ warehouseId: string }>();

    const { data: warehouse, isLoading, error } = useGetWarehouseByIdQuery(warehouseId!, {
        skip: !warehouseId,
    });

    const handleEditWarehouse = () => {
        navigate(`/dashboard/warehouses/${warehouseId}/edit`);
    };

    const handleBack = () => {
        navigate('/dashboard/warehouses');
    };

    if (isLoading) {
        return (
            <PageContainer title="Warehouse Details">
                <Box sx={{ flexGrow: 1 }}>
                    <div>Loading warehouse details...</div>
                </Box>
            </PageContainer>
        );
    }

    if (error || !warehouse) {
        return (
            <PageContainer title="Warehouse Details">
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="warning">Warehouse not found</Alert>
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title="Warehouse Details"
            breadcrumbs={[
                { title: 'Warehouses', path: '/dashboard/warehouses' },
                { title: 'Warehouse Details' },
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
                        onClick={handleEditWarehouse}
                    >
                        Edit Warehouse
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
                                        {warehouse.name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Typography variant="body1">
                                        {warehouse.isActive ? 'Active' : 'Inactive'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Company ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {warehouse.companyId}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Organization ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {warehouse.organizationId}
                                    </Typography>
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
                                        Warehouse ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {warehouse.id}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(warehouse.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Updated At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(warehouse.updatedAt).toLocaleString()}
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

export default WarehouseView;