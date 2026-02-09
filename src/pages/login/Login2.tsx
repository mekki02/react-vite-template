import { type FC, startTransition, useState, type JSX } from "react";
import './index.css';
import { Button, Card, Divider, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { generateField, type IFieldSchema } from "../../utils/forms";
import { Navigate, useNavigate } from "react-router-dom";
import DebbouLogo from '../../assets/debbou_logo.png';
import { useLoginMutation } from "../dashboard/redux/slices/auth/authSlice";
import useNotifications from "../../hooks/context/notification";
import type { LoginCredentials } from "../dashboard/types";
import { useAuthWithNavigation } from "../../hooks/useAuthWithNavigation";

const Login: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, login } = useAuthWithNavigation();
    const [loginMutation] = useLoginMutation();
    const notifications = useNotifications();
    const methods = useForm();
    const { handleSubmit, control, formState: { errors } } = methods;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const onSubmit = async (data: any) => {
        try {
            const loginData: LoginCredentials = {
                username: data.username,
                password: data.password
            };
            const { result } = await loginMutation(loginData).unwrap();
            if (result) {
                login(result.accessToken, result.refreshToken);
                notifications.show('Login successful!', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
            notifications.show(errorMessage, {
                severity: 'error',
                autoHideDuration: 5000,
            });
        }
    };

    const loginSchema: Array<IFieldSchema> = [
        {
            name: 'username',
            component: TextField,
            rules: {
                required: "Username is required",
                // pattern: {
                //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                //     message: "Please enter a valid email address",
                // }
            },
            label: "Username",
            variant: "outlined",
            control,
            error: !!errors.username,
            helperText: errors.username ? String(errors.username.message) : ''
        },
        {
            name: 'password',
            component: TextField,
            label: "Password",
            variant: "outlined",
            type: showPassword ? 'text' : 'password',
            rules: {
                required: "Password is required",
            },
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
            error: !!errors.password,
            helperText: errors.password ? String(errors.password.message) : ''
        }
    ]

    // If session is already valid (OIDC cookie), skip login page
    if (!isLoading && isAuthenticated) {
        return <Navigate to="/" replace />
    }

    // Optionally, you can render null or a small loader while checking auth
    if (isLoading) return <></>;

    return (
        <div className="login-screen">
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Card variant="outlined" sx={{ padding: 8, borderRadius: 2 }}>
                    <Grid container justifyContent='center' direction={'column'} alignItems='center' gap={2}>
                        <img src={DebbouLogo} alt="debbou-logo" style={{ width: 200 }} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {loginSchema.map(generateField)}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="text"
                                color="primary"
                                sx={{ mt: 1 }}
                                onClick={() => startTransition(() => navigate('/forgot-password'))}
                            >
                                Forgot Password?
                            </Button>
                            <Divider sx={{ mt: 2, mb: 2 }}>OR</Divider>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 1, mb: 1 }}
                                startIcon={
                                    <svg width="18" height="18" viewBox="0 0 18 18">
                                        <path fill="#4285F4" d="M16.51 9.176c0-.29-.02-.571-.06-.85H9v1.91h4.17a3.565 3.565 0 0 1-1.543 2.342v1.242h2.48c1.449-1.335 2.283-3.304 2.283-5.642z" />
                                        <path fill="#34A853" d="M9 16.5c2.07 0 3.804-.685 5.074-1.857l-2.48-1.242A4.77 4.77 0 0 1 9 14.29a4.523 4.523 0 0 1-4.25-3.114H2.18v1.283A7.5 7.5 0 0 0 9 16.5z" />
                                        <path fill="#FBBC05" d="M4.75 11.176a4.523 4.523 0 0 1 0-2.852V6.99H2.18A7.5 7.5 0 0 0 2.18 13.5l2.57-1.324z" />
                                        <path fill="#EA4335" d="M9 6.71a4.5 4.5 0 0 1 3.178 1.242l2.198-2.198A7.493 7.493 0 0 0 9 1.5 7.5 7.5 0 0 0 2.18 6.99l2.57 1.335A4.477 4.477 0 0 1 9 6.71z" />
                                    </svg>
                                }
                                onClick={() => window.location.href = '/api/auth/google'}
                            >
                                Continue with Google
                            </Button>
                            <Divider sx={{ mt: 2, mb: 2 }}>OR</Divider>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => startTransition(() => navigate('/register'))}
                            >
                                Register
                            </Button>
                        </form>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
};

export default Login;