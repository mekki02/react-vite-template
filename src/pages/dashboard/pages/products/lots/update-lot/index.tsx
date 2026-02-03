import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useGetLotByIdQuery, useUpdateLotMutation } from '../../../../redux/slices/lots/lotSlice';
import PageContainer from '@pages/dashboard/shared/page-container';
import LotForm from '../lot-form';
import useNotifications from '@hooks/context/notification';
import type { Lot } from '../../../../types';


const UpdateLot: React.FC = () => {
    const navigate = useNavigate();
    const { lotId } = useParams<{ lotId: string }>();
    const notifications = useNotifications();

    const { data: lot, isLoading: isLoadingLot } = useGetLotByIdQuery(lotId!, {
        skip: !lotId,
    });

    const [updateLot, { isLoading }] = useUpdateLotMutation();

    const handleSubmit = async (data: Partial<Lot>) => {
        if (!lotId) return;

        try {
            await updateLot({
                id: lotId,
                ...data,
            }).unwrap();

            notifications.show('Lot updated successfully', {
                severity: 'success',
                autoHideDuration: 3000,
            });

            navigate('/dashboard/products/lots');
        } catch (error) {
            notifications.show('Failed to update lot', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    if (isLoadingLot) {
        return (
            <PageContainer title="Update Lot">
                <div>Loading lot data...</div>
            </PageContainer>
        );
    }

    if (!lot) {
        return (
            <PageContainer title="Update Lot">
                <div>Lot not found</div>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title="Update Lot"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Lots', path: '/dashboard/products/lots' },
                { title: 'Update Lot' },
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
                defaultValues={lot}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </PageContainer>
    );
};

export default UpdateLot;
