import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import type { ProductFormState } from '../product-form';
import ProductForm from '../product-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useCreateProductMutation } from '../../../redux/slices/products/productSlice';

export const ProductCreate: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [createProduct, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError, error }] = useCreateProductMutation();
    
    useEffect(() => {
        if (isCreateSuccess) {
            notifications.show('Product created successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/products');
        }
    }, [isCreateSuccess, navigate, notifications]);

    useEffect(() => {
        if (isCreateError) {
            notifications.show('Error creating the product.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isCreateError, notifications]);

    const handleSubmit = useCallback(
        async (formValues: Partial<ProductFormState['values']>) => {
            const productData = {
                ...formValues,
                organizationId: 'org-123', // This would come from user context
                active: formValues.active ?? true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            await createProduct(productData);
        },
        [createProduct],
    );

    const renderCreate = useMemo(() => {
        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">Error creating product</Alert>
                </Box>
            );
        }

        return (
            <ProductForm
                isSubmitting={isCreating}
                onSubmit={handleSubmit}
                submitButtonLabel="Create Product"
                backButtonPath="/dashboard/products"
            />
        );
    }, [error, isCreating, handleSubmit]);

    return (
        <PageContainer
            title="Create Product"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Create Product' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderCreate}</Box>
        </PageContainer>
    );
}

export default ProductCreate;
