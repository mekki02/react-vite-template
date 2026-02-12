import { type FC, useState, type JSX } from "react";
import { Button, Card, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateField, type IFieldSchema } from "../../utils/forms";
import DebbouLogo from '../../assets/debbou_logo.png';
import { useForgotPasswordMutation } from "../dashboard/redux/slices/auth/authSlice";
import useNotifications from "../../hooks/context/notification";
import type { ForgotPasswordData } from "../dashboard/types";

const ForgotPassword: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const notifications = useNotifications();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const methods = useForm();
    const { handleSubmit, control, formState: { errors } } = methods;

    const forgotPasswordSchema: Array<IFieldSchema> = [
        {
            name: 'email',
            component: TextField,
            rules: {
                required: "Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                }
            },
            label: "Email Address",
            variant: "outlined",
            type: "email",
            disabled: isLoading,
            control,
            error: !!errors.email,
            helperText: errors.email ? String(errors.email.message) : ''
        }
    ];

    const onSubmit = async (data: any) => {
        try {
            const forgotPasswordData: ForgotPasswordData = {
                email: data.email
            };
            await forgotPassword(forgotPasswordData).unwrap();
            setIsSubmitted(true);
            notifications.show('Password reset instructions sent to your email!', {
                severity: 'success',
                autoHideDuration: 5000,
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send reset instructions. Please try again.';
            notifications.show(errorMessage, {
                severity: 'error',
                autoHideDuration: 5000,
            });
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    if (isSubmitted) {
        return (
            <div className="login-screen">
                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Card variant="outlined" sx={{ padding: 8, borderRadius: 2, maxWidth: 400, textAlign: 'center' }}>
                        <Grid container justifyContent='center' direction={'column'} alignItems='center' gap={2}>
                            <img src={DebbouLogo} alt="debbou-logo" style={{ width: 200 }} />
                            <Typography variant="h5" component="h1" gutterBottom>
                                Check Your Email
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                We've sent password reset instructions to your email address. 
                                Please check your inbox and follow the link to reset your password.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBackToLogin}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Back to Login
                            </Button>
                        </Grid>
                    </Card>
                </Grid>
            </div>
        );
    }

    return (
        <div className="login-screen">
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Card variant="outlined" sx={{ padding: 8, borderRadius: 2, maxWidth: 400 }}>
                    <Grid container justifyContent='center' direction={'column'} alignItems='center' gap={2}>
                        <img src={DebbouLogo} alt="debbou-logo" style={{ width: 200 }} />
                        <Typography variant="h5" component="h1" gutterBottom>
                            Forgot Password
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                            Enter your email address and we'll send you instructions to reset your password.
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                            {forgotPasswordSchema.map(generateField)}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                            </Button>
                            <Button
                                type="button"
                                variant="text"
                                color="primary"
                                sx={{ mt: 1 }}
                                onClick={handleBackToLogin}
                                disabled={isLoading}
                            >
                                Back to Login
                            </Button>
                        </form>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
};

export default ForgotPassword;
