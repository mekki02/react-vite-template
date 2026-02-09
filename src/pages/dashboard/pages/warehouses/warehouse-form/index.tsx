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
import { useGetCompaniesQuery } from '@utils/redux';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { forwardRef } from 'react';

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

    const { data } = useGetCompaniesQuery({
        page: 1,
        pageSize: 100,
        search: '',
    });

    const { result: companies } = data ?? {};

    const warehouseSchema = getSchema('warehouse', control, errors, [{
        name: 'companyId',
        options: (companies) ? companies.map(company => ({
            label: company.legalName,
            value: company.id,
        })) : [],
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string; disabled?: boolean }> }, ref) => (
            <>
                <InputLabel id="demo-simple-select-label" > Company </InputLabel>
                <Select label="Company" {...props} ref={ref} >
                    {
                        options.map(option => (
                            <MenuItem key={option.value} value={option.value} disabled={option.disabled} >
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
            </>
        )),
    }]) as IFieldSchema[];
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
