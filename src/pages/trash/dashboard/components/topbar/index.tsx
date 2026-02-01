import { startTransition, useState, type FC } from "react";
import { Box, IconButton, Toolbar, Avatar, Menu, MenuItem } from "@mui/material";
import { AppBar } from "./../../shared/top-bar";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "../../../../../hooks/context/context";

export const TopBar: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { drawerOpen, setDrawerOpen } = useDashboardContext();
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        handleNavigate('/login');
    };

    const handleNavigate = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

    return (

        <AppBar position="fixed" open={drawerOpen}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                        {
                            marginRight: 5,
                        },
                        drawerOpen && { display: 'none' },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
                {/* Push profile to right */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Profile Avatar */}
                <Box>
                    <IconButton
                        onClick={handleMenuOpen}
                    >
                        <Avatar alt="User Name" src="" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => handleNavigate('/dashboard/profile')}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigate('/dashboard/settings')}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={() => handleLogout()}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
};