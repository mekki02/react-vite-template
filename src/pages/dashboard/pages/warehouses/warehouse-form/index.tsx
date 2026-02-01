import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import type { Warehouse } from '../../../types';
import { useForm } from 'react-hook-form';
import { getSchema } from '../../../shared/schemas';
import { generateField, type IFieldSchema } from '../../../../../utils/forms';

export interface WarehouseFormState {
    values: Partial<Omit<Warehouse, 'id'>>;
    errors: Partial<Record<keyof WarehouseFormState['values'], string>>;
}

export type FormFieldValue = string | string[] | number | boolean | File | null;

export interface WarehouseFormProps {
    onSubmit: (formValues: Partial<WarehouseFormState['values']>) => Promise<void>;
    onReset?: (formValues: Partial<WarehouseFormState['values']>) => void;
    submitButtonLabel: string;
    backButtonPath?: string;
    isSubmitting?: boolean;
    defaultValues?: Partial<Warehouse>;
}

export default function WarehouseForm(props: WarehouseFormProps) {
    const { control, formState: { errors, isValid, isDirty }, watch } = useForm({
        defaultValues: props.defaultValues || {},
    });
    const {
        onSubmit,
        submitButtonLabel,
        backButtonPath,
        isSubmitting = false,
    } = props;

    const formValues = watch()

    const navigate = useNavigate();

    const handleSubmit = React.useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await onSubmit(formValues);
        },
        [formValues, onSubmit],
    );

    const handleBack = React.useCallback(() => {
        navigate(backButtonPath ?? '/dashboard/warehouses');
    }, [navigate, backButtonPath]);

    const warehouseSchema = getSchema('warehouse', control, errors) as IFieldSchema[];
    const warehouseFormfields = warehouseSchema.map(generateField);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ width: '100%' }}
        >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    {
                        warehouseFormfields.map((field, index) => (
                            <Grid key={`warehouse-form-field-${index}`} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                {field}
                            </Grid>
                        ))
                    }
                </Grid>
            </FormGroup>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!isDirty || !isValid || isSubmitting}
                >
                    {submitButtonLabel}
                </Button>
            </Stack>
        </Box>
    );
}
