import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import type { Invitation } from '@pages/dashboard/types';
import { getSchema } from '@pages/dashboard/shared/schemas';
import { generateField, type IFieldSchema } from '@utils/forms';

export interface InvitationFormState {
    values: Partial<Omit<Invitation, 'id' | 'createdAt' | 'updatedAt' | 'senderId' | 'senderEmail' | 'usedAt' | 'usedByUserId' | 'status'>>;
    errors: Partial<Record<keyof InvitationFormState['values'], string>>;
}

export type FormFieldValue = string | string[] | number | boolean | File | null;

export interface InvitationFormProps {
    onSubmit: (formValues: Partial<InvitationFormState['values']>) => Promise<void>;
    onReset?: (formValues: Partial<InvitationFormState['values']>) => void;
    submitButtonLabel: string;
    backButtonPath?: string;
    isSubmitting?: boolean;
    defaultValues?: Partial<Invitation>;
}

export default function InvitationForm(props: InvitationFormProps) {
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

    const invitationSchema = getSchema('invitation', control, errors) as IFieldSchema[];
    const invitationFormFields = invitationSchema.map(generateField);

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
                        invitationFormFields.map((field, index) => (
                            <Grid key={`invitation-form-field-${index}`} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
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
