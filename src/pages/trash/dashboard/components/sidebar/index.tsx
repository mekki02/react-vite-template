import { startTransition, type FC, type JSX } from "react";
import { IconButton, useTheme, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Drawer } from "./../../shared/drawer";
import { DrawerHeader } from "./../../shared/drawer/drawer-header";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessIcon from '@mui/icons-material/Business';
import { useDashboardContext } from "../../../../../hooks/context/context";

type Page = {
    icon: JSX.Element;
    title: string;
    path: string;
}

const pages: Page[] = [
    {
        icon: <InboxIcon />,
        title: "Overview",
        path: "/dashboard"
    },
    {
        icon: <ManageAccountsIcon />,
        title: "User management",
        path: "/dashboard/user-management"
    },
    {
        icon: <BusinessIcon />,
        title: "Company management",
        path: "/dashboard/company-management"
    },
    {
        icon: <BusinessIcon />,
        title: "Warehouse management",
        path: "/dashboard/warehouse-management"
    },
    {
        icon: <BusinessIcon />,
        title: "Resource management",
        path: "/dashboard/resource-management"
    },
];

export const Sidebar: FC = (): JSX.Element => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { drawerOpen: open, setDrawerOpen: setOpen } = useDashboardContext();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNavigate = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {pages.map(({ icon, title, path }) => (
                    <ListItem key={title} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => handleNavigate(path)}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={title}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}