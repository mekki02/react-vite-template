import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import type { ProductFormState } from '../product-form';
import ProductForm from '../product-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { getErrorMessage } from '../../../../../utils/toolkit-query';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../redux/slices/products/productSlice';

export const ProductUpdate: FC = (): JSX.Element => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();
    const {
        data: product,
        isLoading,
        isError: isFetchError,
        isSuccess: isFetchSuccess,
        error,
    } = useGetProductByIdQuery(productId!, {
        skip: !productId,
    });

    const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateProductMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('Product updated successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/products');
        }
    }, [isUpdateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isUpdateError || isFetchError) {
            notifications.show('Error updating the product.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isUpdateError, isFetchError, notifications]);

    useEffect(() => {
        if (isFetchSuccess && !product) {
            notifications.show('Product not found.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/products');
        }
    }, [isFetchSuccess, product, navigate, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<ProductFormState['values']>) => {
            const updateData = {
                ...formValues,
                updatedAt: new Date().toISOString(),
            };
            await updateProduct({ id: productId!, ...updateData });
        },
        [productId, updateProduct],
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

        return product ? (
            <ProductForm
                defaultValues={product}
                isSubmitting={isUpdating}
                onSubmit={handleSubmit}
                submitButtonLabel="Save Changes"
                backButtonPath={`/dashboard/products/${productId}`}
            />
        ) : null;
    }, [isLoading, error, product, handleSubmit, isUpdating, productId]);

    return (
        <PageContainer
            title={`Edit ${product?.name || 'Product'}`}
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: product?.name || 'Product', path: `/dashboard/products/${productId}` },
                { title: 'Edit Product' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
        </PageContainer>
    );
}

export default ProductUpdate;
