import { useEffect, useState, type FC, type JSX } from "react";
import { Button, Card, CircularProgress, Grid, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { generateField, type IFieldSchema } from "../../utils/forms";
import DebbouLogo from '../../assets/debbou_logo.png';
import { useResetPasswordMutation } from "../dashboard/redux/slices/auth/authSlice";
import useNotifications from "../../hooks/context/notification";
import type { ResetPasswordData } from "../dashboard/types";

const ResetPassword: FC = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const notifications = useNotifications();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const methods = useForm();
    const { handleSubmit, control, formState: { errors }, watch } = methods;

    const token = searchParams.get('token');
    const newPassword = watch('newPassword');

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const resetPasswordSchema: Array<IFieldSchema> = [
        {
            name: 'newPassword',
            component: TextField,
            rules: {
                required: "New password is required",
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                }
            },
            label: "New Password",
            variant: "outlined",
            type: showPassword ? 'text' : 'password',
            disabled: isLoading,
            slotProps: {
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            },
            control,
            error: !!errors.newPassword,
            helperText: errors.newPassword ? String(errors.newPassword.message) : ''
        },
        {
            name: 'confirmPassword',
            component: TextField,
            rules: {
                required: "Please confirm your password",
                validate: (value) => value === newPassword || "Passwords do not match"
            },
            label: "Confirm New Password",
            variant: "outlined",
            type: showConfirmPassword ? 'text' : 'password',
            disabled: isLoading,
            slotProps: {
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            },
            control,
            error: !!errors.confirmPassword,
            helperText: errors.confirmPassword ? String(errors.confirmPassword.message) : ''
        }
    ];

    useEffect(() => {
        if (!token) {
            notifications.show('Reset token is missing. Please check your email link or request a new password reset.', {
                severity: 'error',
                autoHideDuration: 5000,
            });
            navigate('/forgot-password');
        }
    }, [token, navigate, notifications]);

    const onSubmit = async (data: any) => {
        if (!token) {
            notifications.show('Reset token is missing. Please request a new password reset.', {
                severity: 'error',
                autoHideDuration: 5000,
            });
            return;
        }

        try {
            const resetPasswordData: ResetPasswordData = {
                token,
                newPassword: data.newPassword
            };
            await resetPassword(resetPasswordData).unwrap();
            setIsSubmitted(true);
            notifications.show('Password reset successfully! You can now log in with your new password.', {
                severity: 'success',
                autoHideDuration: 5000,
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to reset password. The token may be expired or invalid.';
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
                                Password Reset Successful
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                Your password has been successfully reset. You can now log in with your new password.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBackToLogin}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Go to Login
                            </Button>
                        </Grid>
                    </Card>
                </Grid>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="login-screen">
                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Card variant="outlined" sx={{ padding: 8, borderRadius: 2, maxWidth: 400, textAlign: 'center' }}>
                        <Grid container justifyContent='center' direction={'column'} alignItems='center' gap={2}>
                            <img src={DebbouLogo} alt="debbou-logo" style={{ width: 200 }} />
                            <Typography variant="h5" component="h1" gutterBottom>
                                Invalid Reset Link
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                The password reset link is invalid or has expired. Please request a new password reset.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/forgot-password')}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Request New Reset
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
                            Reset Password
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                            Enter your new password below.
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                            {resetPasswordSchema.map(generateField)}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
