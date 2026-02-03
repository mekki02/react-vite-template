import { useEffect } from "react";
import { Card, CircularProgress, Typography, Box, Button } from "@mui/material";
import { CheckCircle, Error as ErrorIcon } from "@mui/icons-material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../dashboard/redux/slices/auth/authSlice";
import useNotifications from "../../hooks/context/notification";

const EmailVerification: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const notifications = useNotifications();
    
    const [verifyEmail, { isLoading, isSuccess, isError, error }] = useVerifyEmailMutation();

    const token = searchParams.get('token');

    useEffect(() => {
        const verifyEmailToken = async () => {
            if (!token) {
                notifications.show('Verification token is missing. Please check your email link.', {
                    severity: 'error',
                    autoHideDuration: 5000,
                });
                return;
            }

            try {
                await verifyEmail({ token }).unwrap();
            } catch (error: unknown) {
                // Error is handled by the RTK Query error state
            }
        };

        verifyEmailToken();
    }, [token, verifyEmail, notifications]);

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 500,
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                {isLoading && (
                    <>
                        <CircularProgress size={60} sx={{ mb: 2, color: 'primary.main' }} />
                        <Typography variant="h6" component="h1" gutterBottom>
                            Verifying Email
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Verifying your email...
                        </Typography>
                    </>
                )}

                {isSuccess && (
                    <>
                        <CheckCircle
                            sx={{
                                fontSize: 60,
                                color: 'success.main',
                                mb: 2
                            }}
                        />
                        <Typography variant="h6" component="h1" gutterBottom>
                            Email Verified!
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Your email has been successfully verified! You can now log in to your account.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGoToLogin}
                            fullWidth
                        >
                            Go to Login
                        </Button>
                    </>
                )}

                {isError && (
                    <>
                        <ErrorIcon
                            sx={{
                                fontSize: 60,
                                color: 'error.main',
                                mb: 2
                            }}
                        />
                        <Typography variant="h6" component="h1" gutterBottom>
                            Verification Failed
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            {error instanceof Error ? error.message : 'Email verification failed. The token may be expired or invalid.'}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleGoToLogin}
                            fullWidth
                        >
                            Back to Login
                        </Button>
                    </>
                )}
            </Card>
        </Box>
    );
};

export default EmailVerification;
