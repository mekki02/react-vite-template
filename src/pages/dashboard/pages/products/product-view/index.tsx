import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { getErrorMessage } from '../../../../../utils/toolkit-query';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetProductByIdQuery } from '../../../redux/slices/products/productSlice';

export const ProductView: FC = (): JSX.Element => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetProductByIdQuery(productId!, {
        skip: !productId,
    });

    const { result: product } = data || {};

    useEffect(() => {
        if (isError) {
            notifications.show('Error loading product.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isError, notifications]);

    const handleEdit = useCallback(() => {
        navigate(`/dashboard/products/${productId}/edit`);
    }, [navigate, productId]);

    const handleBack = useCallback(() => {
        navigate('/dashboard/products');
    }, [navigate]);

    const renderContent = useMemo(() => {
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

        if (!product) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="warning">Product not found</Alert>
                </Box>
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Basic Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        SKU
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.sku}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Product Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.name}
                                    </Typography>
                                </Box>
                                {product.description && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Description
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.description}
                                        </Typography>
                                    </Box>
                                )}
                                {product.barcodeMain && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Barcode
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.barcodeMain}
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Inventory & Tracking
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Tracking
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.tracking.toUpperCase()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Base UOM
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.baseUomId}
                                    </Typography>
                                </Box>
                                {product.packUomId && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Pack UOM
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.packUomId}
                                        </Typography>
                                    </Box>
                                )}
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.active ? 'Active' : 'Inactive'}
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
                                Physical Properties
                            </Typography>
                            <Stack spacing={2}>
                                {product.weight && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Weight
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.weight} kg
                                        </Typography>
                                    </Box>
                                )}
                                {product.volume && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Volume
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.volume} m³
                                        </Typography>
                                    </Box>
                                )}
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Perishable
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.perishable ? 'Yes' : 'No'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Hazardous
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.hazardous ? 'Yes' : 'No'}
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
                                Cost & Classification
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Standard Cost
                                    </Typography>
                                    <Typography variant="body1">
                                        ${product.standardCost.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Default Cost Method
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.defaultCostMethod.toUpperCase()}
                                    </Typography>
                                </Box>
                                {product.abcClass && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            ABC Class
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.abcClass}
                                        </Typography>
                                    </Box>
                                )}
                                {product.leadTimeDays && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Lead Time
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.leadTimeDays} days
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                System Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Product ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {product.id}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Organization ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                        {product.organizationId}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(product.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Updated At
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(product.updatedAt).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }, [isLoading, error, product]);

    return (
        <PageContainer
            title={product?.name || 'Product Details'}
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: product?.name || 'Product' },
            ]}
            actions={
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Back to Products
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                    >
                        Edit Product
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ display: 'flex', flex: 1 }}>
                {renderContent}
            </Box>
        </PageContainer>
    );
}

export default ProductView;
