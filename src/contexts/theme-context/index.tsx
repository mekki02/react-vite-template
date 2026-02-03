import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useMemo, useState, type ReactNode } from "react";

export const ThemeContext = createContext({
    toggleTheme: () => { },
    mode: "light" as "light" | "dark",
});

// Enhanced color ramps based on your brand colors
const primaryRed = {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#C93A3A', // Your original primary color
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
};

const secondaryBlueGray = {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#607D8B', // Your original secondary color
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
};

const successGreen = {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
};

const warningOrange = {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
};

const errorRed = {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
};

const neutralGray = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
};

const createEnhancedTheme = (mode: "light" | "dark") => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: primaryRed[500],
                light: primaryRed[300],
                dark: primaryRed[700],
                contrastText: '#ffffff',
                50: primaryRed[50],
                100: primaryRed[100],
                200: primaryRed[200],
                300: primaryRed[300],
                400: primaryRed[400],
                500: primaryRed[500],
                600: primaryRed[600],
                700: primaryRed[700],
                800: primaryRed[800],
                900: primaryRed[900],
            },
            secondary: {
                main: secondaryBlueGray[500],
                light: secondaryBlueGray[300],
                dark: secondaryBlueGray[700],
                contrastText: '#ffffff',
                50: secondaryBlueGray[50],
                100: secondaryBlueGray[100],
                200: secondaryBlueGray[200],
                300: secondaryBlueGray[300],
                400: secondaryBlueGray[400],
                500: secondaryBlueGray[500],
                600: secondaryBlueGray[600],
                700: secondaryBlueGray[700],
                800: secondaryBlueGray[800],
                900: secondaryBlueGray[900],
            },
            success: {
                main: successGreen[500],
                light: successGreen[300],
                dark: successGreen[700],
                contrastText: '#ffffff',
            },
            warning: {
                main: warningOrange[500],
                light: warningOrange[300],
                dark: warningOrange[700],
                contrastText: '#ffffff',
            },
            error: {
                main: errorRed[500],
                light: errorRed[300],
                dark: errorRed[700],
                contrastText: '#ffffff',
            },
            info: {
                main: secondaryBlueGray[500],
                light: secondaryBlueGray[300],
                dark: secondaryBlueGray[700],
                contrastText: '#ffffff',
            },
            grey: neutralGray,
            background: {
                default: mode === "light" ? '#ffffff' : '#0a0a0a',
                paper: mode === "light" ? '#ffffff' : '#1a1a1a',
            },
            divider: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
            text: {
                primary: mode === "light" ? '#1c1c1c' : '#ededed',
                secondary: mode === "light" ? '#555555' : '#a0a0a0',
                disabled: mode === "light" ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.38)',
            },
            action: {
                hover: mode === "dark" ? "rgba(201, 58, 58, 0.08)" : "rgba(201, 58, 58, 0.04)",
                selected: mode === "dark" ? "rgba(201, 58, 58, 0.16)" : "rgba(201, 58, 58, 0.08)",
                disabled: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.26)",
                disabledBackground: mode === "dark" ? "rgba(188, 184, 184, 0.08)" : "rgba(0, 0, 0, 0.06)",
                active: mode === "dark" ? "rgba(201, 58, 58, 0.24)" : "rgba(201, 58, 58, 0.12)",
            },
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h4: {
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h5: {
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h6: {
                fontSize: '1.125rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.5,
            },
            subtitle2: {
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.5,
            },
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.6,
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.6,
            },
            button: {
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.4,
                textTransform: 'none' as const,
            },
            caption: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.4,
            },
            overline: {
                fontSize: '0.75rem',
                fontWeight: 600,
                lineHeight: 1.4,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
            },
        },
        shape: {
            borderRadius: 8,
        },
        shadows: [
            'none',
            '0px 2px 1px -1px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 1px 3px 0px rgba(0,0,0,0.06)',
            '0px 3px 1px -2px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.07), 0px 1px 5px 0px rgba(0,0,0,0.06)',
            '0px 3px 3px -2px rgba(0,0,0,0.1), 0px 3px 4px 0px rgba(0,0,0,0.07), 0px 1px 8px 0px rgba(0,0,0,0.06)',
            '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
            '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 5px 8px 0px rgba(0,0,0,0.07), 0px 1px 14px 0px rgba(0,0,0,0.06)',
            '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.07), 0px 1px 18px 0px rgba(0,0,0,0.06)',
            '0px 4px 7px -1px rgba(0,0,0,0.1), 0px 7px 12px 0px rgba(0,0,0,0.07), 0px 2px 20px 0px rgba(0,0,0,0.06)',
            '0px 5px 8px -1px rgba(0,0,0,0.1), 0px 8px 16px 0px rgba(0,0,0,0.07), 0px 3px 24px 0px rgba(0,0,0,0.06)',
            '0px 5px 8px -1px rgba(0,0,0,0.1), 0px 9px 20px 0px rgba(0,0,0,0.07), 0px 3px 28px 0px rgba(0,0,0,0.06)',
            '0px 6px 10px -1px rgba(0,0,0,0.1), 0px 10px 24px 0px rgba(0,0,0,0.07), 0px 4px 32px 0px rgba(0,0,0,0.06)',
            '0px 6px 11px -1px rgba(0,0,0,0.1), 0px 11px 28px 0px rgba(0,0,0,0.07), 0px 4px 36px 0px rgba(0,0,0,0.06)',
            '0px 7px 12px -1px rgba(0,0,0,0.1), 0px 12px 32px 0px rgba(0,0,0,0.07), 0px 5px 40px 0px rgba(0,0,0,0.06)',
            '0px 7px 13px -1px rgba(0,0,0,0.1), 0px 13px 36px 0px rgba(0,0,0,0.07), 0px 5px 44px 0px rgba(0,0,0,0.06)',
            '0px 7px 14px -1px rgba(0,0,0,0.1), 0px 14px 40px 0px rgba(0,0,0,0.07), 0px 5px 48px 0px rgba(0,0,0,0.06)',
            '0px 8px 15px -1px rgba(0,0,0,0.1), 0px 15px 44px 0px rgba(0,0,0,0.07), 0px 6px 52px 0px rgba(0,0,0,0.06)',
            '0px 8px 16px -1px rgba(0,0,0,0.1), 0px 16px 48px 0px rgba(0,0,0,0.07), 0px 6px 56px 0px rgba(0,0,0,0.06)',
            '0px 8px 17px -1px rgba(0,0,0,0.1), 0px 17px 52px 0px rgba(0,0,0,0.07), 0px 6px 60px 0px rgba(0,0,0,0.06)',
            '0px 9px 18px -1px rgba(0,0,0,0.1), 0px 18px 56px 0px rgba(0,0,0,0.07), 0px 7px 64px 0px rgba(0,0,0,0.06)',
            '0px 9px 19px -1px rgba(0,0,0,0.1), 0px 19px 60px 0px rgba(0,0,0,0.07), 0px 7px 68px 0px rgba(0,0,0,0.06)',
            '0px 10px 20px -1px rgba(0,0,0,0.1), 0px 20px 64px 0px rgba(0,0,0,0.07), 0px 8px 72px 0px rgba(0,0,0,0.06)',
            '0px 10px 21px -1px rgba(0,0,0,0.1), 0px 21px 68px 0px rgba(0,0,0,0.07), 0px 8px 76px 0px rgba(0,0,0,0.06)',
            '0px 10px 22px -1px rgba(0,0,0,0.1), 0px 22px 72px 0px rgba(0,0,0,0.07), 0px 8px 80px 0px rgba(0,0,0,0.06)',
            '0px 11px 23px -1px rgba(0,0,0,0.1), 0px 23px 76px 0px rgba(0,0,0,0.07), 0px 9px 84px 0px rgba(0,0,0,0.06)',
            '0px 11px 24px -1px rgba(0,0,0,0.1), 0px 24px 80px 0px rgba(0,0,0,0.07), 0px 9px 88px 0px rgba(0,0,0,0.06)',
        ],
        transitions: {
            duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                standard: 300,
                complex: 375,
                enteringScreen: 225,
                leavingScreen: 195,
            },
            easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 500,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(201, 58, 58, 0.15)',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.25rem',
                            color: 'inherit',
                        },
                    },
                    contained: {
                        background: 'linear-gradient(135deg, #f87171 0%, #C93A3A 100%)',
                        boxShadow: '0 2px 8px rgba(201, 58, 58, 0.2)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #fca5a5 0%, #dc2626 100%)',
                            boxShadow: '0 4px 16px rgba(201, 58, 58, 0.3)',
                        },
                        '&:disabled': {
                            background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            boxShadow: 'none',
                            opacity: 0.7,
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#ffffff',
                        },
                    },
                    outlined: {
                        borderWidth: 2,
                        '&:hover': {
                            borderWidth: 2,
                            backgroundColor: 'rgba(201, 58, 58, 0.04)',
                        },
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[300] : primaryRed[600],
                        },
                    },
                    text: {
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[300] : primaryRed[600],
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? 'rgba(201, 58, 58, 0.12)' : 'rgba(201, 58, 58, 0.08)',
                            transform: 'scale(1.05)',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.25rem',
                            color: mode === 'dark' ? primaryRed[300] : primaryRed[600],
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                        },
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[400] : primaryRed[600],
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                    elevation1: {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    },
                    elevation2: {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    },
                    elevation3: {
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 8,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: mode === 'dark' ? primaryRed[400] : primaryRed[300],
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: primaryRed[500],
                                borderWidth: 2,
                            },
                            '& .MuiSvgIcon-root': {
                                color: mode === 'dark' ? primaryRed[400] : primaryRed[600],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                                color: primaryRed[500],
                            },
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        fontWeight: 500,
                        '& .MuiSvgIcon-root': {
                            fontSize: '1rem',
                            color: 'inherit',
                        },
                    },
                    colorPrimary: {
                        backgroundColor: mode === 'dark' ? primaryRed[900] : primaryRed[100],
                        color: primaryRed[500],
                        '& .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                    },
                    colorSecondary: {
                        backgroundColor: mode === 'dark' ? secondaryBlueGray[900] : secondaryBlueGray[100],
                        color: secondaryBlueGray[500],
                        '& .MuiSvgIcon-root': {
                            color: secondaryBlueGray[500],
                        },
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[300] : primaryRed[600],
                        },
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRight: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[300] : primaryRed[600],
                        },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[400] : primaryRed[600],
                        },
                    },
                    head: {
                        fontWeight: 600,
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[300] : primaryRed[600],
                        },
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[400] : primaryRed[600],
                            fontSize: '1.25rem',
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                        '&.Mui-selected .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[400] : primaryRed[600],
                            fontSize: '1.25rem',
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                        '&.Mui-selected .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        '& .MuiSvgIcon-root': {
                            color: mode === 'dark' ? primaryRed[400] : primaryRed[600],
                            fontSize: '1.25rem',
                        },
                        '&.Mui-selected .MuiSvgIcon-root': {
                            color: primaryRed[500],
                        },
                    },
                },
            },
        },
    });
};

export const darkTheme = createEnhancedTheme("dark");
export const lightTheme = createEnhancedTheme("light");

type ThemeProviderProps = {
    children: ReactNode;
};

export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};