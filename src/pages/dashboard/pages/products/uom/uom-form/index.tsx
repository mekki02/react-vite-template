import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import type { UOM } from '../../../../types';
import { useForm } from 'react-hook-form';
import { getSchema } from '../../../../shared/schemas';
import { generateField, type IFieldSchema } from '../../../../../../utils/forms';

export interface UOMFormState {
    values: Partial<Omit<UOM, 'id' | 'createdAt' | 'updatedAt'>>;
    errors: Partial<Record<keyof UOMFormState['values'], string>>;
}

export type FormFieldValue = string | string[] | number | boolean | File | null;

export interface UOMFormProps {
    onSubmit: (formValues: Partial<UOMFormState['values']>) => Promise<void>;
    onReset?: (formValues: Partial<UOMFormState['values']>) => void;
    submitButtonLabel: string;
    backButtonPath?: string;
    isSubmitting?: boolean;
    defaultValues?: Partial<UOM>;
}

export default function UOMForm(props: UOMFormProps) {
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

    const handleReset = React.useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (props.onReset) {
                props.onReset(formValues);
            }
        },
        [formValues, props.onReset],
    );

    const handleBack = React.useCallback(() => {
        if (backButtonPath) {
            navigate(backButtonPath);
        } else {
            navigate(-1);
        }
    }, [navigate, backButtonPath]);

    const uomSchema = getSchema('uom', control, errors) as IFieldSchema[];
    const uomFormFields = uomSchema.map(generateField);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    {
                        uomFormFields.map((field, index) => (
                            <Grid key={`uom-form-field-${index}`} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                {field}
                            </Grid>
                        ))
                    }
                </Grid>
            </FormGroup>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {backButtonPath && (
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                        disabled={isSubmitting}
                    >
                        Back
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || !isValid || !isDirty}
                >
                    {isSubmitting ? 'Saving...' : submitButtonLabel}
                </Button>
            </Stack>
        </Box>
    );
}
