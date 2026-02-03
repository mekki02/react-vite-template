import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useCreateLotMutation } from '@pages/dashboard/redux/slices/lots/lotSlice';
import PageContainer from '@pages/dashboard/shared/page-container';
import LotForm from '../lot-form';
import useNotifications from '@hooks/context/notification';
import type { Lot } from '@pages/dashboard/types';

const CreateLot: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const notifications = useNotifications();

    const [createLot, { isLoading }] = useCreateLotMutation();

    const productId = searchParams.get('productId') || undefined;

    const handleSubmit = async (data: Partial<Lot>) => {
        try {
            await createLot({
                ...data,
                organizationId: 'org-123', // This should come from context/auth
            }).unwrap();

            notifications.show('Lot created successfully', {
                severity: 'success',
                autoHideDuration: 3000,
            });

            navigate('/dashboard/products/lots');
        } catch (error) {
            notifications.show('Failed to create lot', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <PageContainer
            title="Create Lot"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Lots', path: '/dashboard/products/lots' },
                { title: 'Create Lot' },
            ]}
            actions={
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/dashboard/products/lots')}
                >
                    Back
                </Button>
            }
        >
            <LotForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                productId={productId}
            />
        </PageContainer>
    );
};

export default CreateLot;
