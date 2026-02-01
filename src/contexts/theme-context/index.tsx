import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useMemo, useState, type ReactNode } from "react";

export const ThemeContext = createContext({
    toggleTheme: () => { },
    mode: "light" as "light" | "dark",
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#C93A3A",
      light: "#E06161",
      dark: "#9F2D2D",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#607D8B",
      light: "#8FA3AD",
      dark: "#455A64",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#121212",
      paper: "#1A1A1A",
    },

    divider: "rgba(255, 255, 255, 0.08)",

    text: {
      primary: "#EDEDED",
      secondary: "#A0A0A0",
    },

    action: {
      hover: "rgba(201, 58, 58, 0.08)",
      selected: "rgba(201, 58, 58, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.08)",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#C93A3A",
      light: "#E06161",
      dark: "#9F2D2D",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#607D8B",
      light: "#8FA3AD",
      dark: "#455A64",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F5F6F7",
      paper: "#FFFFFF",
    },

    divider: "rgba(0, 0, 0, 0.08)",

    text: {
      primary: "#1C1C1C",
      secondary: "#555555",
    },

    action: {
      hover: "rgba(201, 58, 58, 0.08)",
      selected: "rgba(201, 58, 58, 0.16)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.06)",
    },
  },
});

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