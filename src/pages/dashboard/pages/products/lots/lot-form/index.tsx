import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, FormGroup, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSchema } from '@pages/dashboard/shared/schemas';
import { generateField, type IFieldSchema } from '@utils/forms';
import type { Lot } from '@pages/dashboard/types';

interface LotFormProps {
    defaultValues?: Partial<Lot>;
    onSubmit: (data: Partial<Lot>) => void;
    isLoading?: boolean;
    productId?: string;
}

const LotForm: React.FC<LotFormProps> = ({
    defaultValues,
    onSubmit,
    isLoading = false,
    productId,
}) => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Partial<Lot>>({
        defaultValues: {
            ...defaultValues,
            productId: productId || defaultValues?.productId || '',
            lotNumber: defaultValues?.lotNumber || '',
            manufactureDate: defaultValues?.manufactureDate || undefined,
            expirationDate: defaultValues?.expirationDate || undefined,
            status: defaultValues?.status || 'released',
            qcState: defaultValues?.qcState || 'pending',
        },
    });

    const handleFormSubmit = (data: Partial<Lot>) => {
        onSubmit(data);
    };

    const handleCancel = () => {
        navigate('/dashboard/products/lots');
    };

    const lotFormFields = getSchema('lot', control, errors) as IFieldSchema[];
    const lotFields = lotFormFields.map(generateField);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    {
                        lotFields.map((field, index) => (
                            <Grid key={`lot-form-field-${index}`} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                {field}
                            </Grid>
                        ))
                    }
                </Grid>
            </FormGroup>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : defaultValues?.id ? 'Update Lot' : 'Create Lot'}
                </Button>
            </Stack>
        </Box>
    );
};

export default LotForm;
