import { type FC, startTransition, type JSX } from "react";
import './index.css';
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { generateField, type IFieldSchema } from "../../utils/forms";
import { Navigate, useNavigate } from "react-router-dom";
import DebbouLogo from '../../assets/debbou_logo.png';
import { useUpdateUserMutation } from "../dashboard/redux/slices/users/userSlice";
import useNotifications from "../../hooks/context/notification";
import { useAuthWithNavigation } from "../../hooks/useAuthWithNavigation";
import { completeUserProfileSchema } from "../dashboard/shared/schemas/user-schema";

const CompleteUserInformation: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { isAuthenticated, activeUser, setActiveUser } = useAuthWithNavigation();
    const [updateUser] = useUpdateUserMutation();
    const notifications = useNotifications();
    const methods = useForm();
    const { handleSubmit, control, formState: { errors } } = methods;

    const onSubmit = async (data: any) => {
        try {
            // Get user ID from activeUser context
            const userId = activeUser?.sub || activeUser?.id || '';
            if (!userId) {
                throw new Error('User ID not found');
            }

            const { success } = await updateUser({ id: userId, ...data }).unwrap();
            if (success) {
                notifications.show('Profile updated successfully!', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
                setActiveUser({ ...activeUser, ...data });
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile. Please try again.';
            notifications.show(errorMessage, {
                severity: 'error',
                autoHideDuration: 5000,
            });
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="login-screen">
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Card variant="outlined" sx={{ padding: 8, borderRadius: 2 }} >
                    <Grid container justifyContent='center' direction={'column'} alignItems='center' gap={2}>
                        <img src={DebbouLogo} alt="debbou-logo" style={{ width: 200 }} />
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: 'primary.main',
                                textAlign: 'center',
                                mb: 1
                            }}
                        >
                            Complete Your Profile
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: { xs: '100%', sm: 500, md: 600 } }}>
                            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                                {completeUserProfileSchema.map((field: IFieldSchema) => ({
                                    ...field,
                                    control,
                                    error: !!(errors as any)[field.name],
                                    helperText: (errors as any)[field.name] ? String((errors as any)[field.name].message) : ''
                                })).map(generateField).map((field: JSX.Element) => (
                                    <Grid key={field.key} size={{ xs: 12, sm: 6 }}>
                                        {field}
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Complete Profile
                            </Button>
                            <Button
                                type="button"
                                variant="text"
                                color="primary"
                                sx={{ mt: 1 }}
                                onClick={() => startTransition(() => navigate('/dashboard'))}
                            >
                                Skip for Now
                            </Button>
                        </Box>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
};

export default CompleteUserInformation;
