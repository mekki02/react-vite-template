import { type FC, type JSX } from "react";
import { Button, Card, TextField, Typography, Container, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../dashboard/redux/slices/auth/authSlice";
import useNotifications from "../../hooks/context/notification";
import type { RegisterData } from "../dashboard/types";
import { useAuthWithNavigation } from "../../hooks/useAuthWithNavigation";

const RegisterExample: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { login } = useAuthWithNavigation();
    const [registerMutation] = useRegisterMutation();
    const notifications = useNotifications();
    const { handleSubmit, register, formState: { errors } } = useForm<RegisterData>();

    const onSubmit = async (data: RegisterData) => {
        try {
            const result = await registerMutation(data).unwrap();
            login(result.token, result.refreshToken);
            notifications.show('Registration successful! Please check your email to verify your account.', {
                severity: 'success',
                autoHideDuration: 5000,
            });
            navigate('/dashboard');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
            notifications.show(errorMessage, {
                severity: 'error',
                autoHideDuration: 5000,
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Box display="flex" gap={2}>
                            <Box flex={1}>
                                <TextField
                                    {...register('firstName', { required: 'First name is required' })}
                                    label="First Name"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Box>
                            <Box flex={1}>
                                <TextField
                                    {...register('lastName', { required: 'Last name is required' })}
                                    label="Last Name"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <TextField
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address'
                                    }
                                })}
                                label="Email"
                                type="email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Box>
                        <Box>
                            <TextField
                                {...register('phoneNumber')}
                                label="Phone Number (Optional)"
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <TextField
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                label="Password"
                                type="password"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Box>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                Register
                            </Button>
                        </Box>
                        <Box>
                            <Typography textAlign="center">
                                Already have an account? <Link to="/login">Login here</Link>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </Card>
        </Container>
    );
};

export default RegisterExample;
