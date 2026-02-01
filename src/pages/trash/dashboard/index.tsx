import { Box, CssBaseline } from "@mui/material";
import { type FC, type JSX } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./components/topbar";
import { Sidebar } from "./components/sidebar";
import { Provider as DashboardReduxProvider } from 'react-redux'
import { store } from "../../dashboard/redux/store";
import { DashboardProvider } from "../../../contexts/dashboard-context";

export const Dashboard: FC = (): JSX.Element => {
    return (
        <DashboardReduxProvider store={store}>
            <DashboardProvider >
                <Box sx={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
                    <CssBaseline />
                    <TopBar />
                    <Sidebar />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            mt: 8,
                            overflow: "auto",
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </DashboardProvider>
        </DashboardReduxProvider>
    );
};

export default Dashboard;