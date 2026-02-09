import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StraightenIcon from '@mui/icons-material/Straighten';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { matchPath, useLocation } from 'react-router';
import DashboardSidebarPageItem from './DashboardSidebarPageItem';
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from './mixins';
import { SidebarContext } from "@contexts/sidebar-context";
import DashboardSidebarDividerItem from './DashboardSidebarDividerItem';
import DashboardSidebarHeaderItem from './DashboardSidebarHeaderItem';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "@constants/sidebar";

export interface DashboardSidebarProps {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  disableCollapsibleSidebar?: boolean;
  container?: Element;
}

export default function DashboardSidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
}: DashboardSidebarProps) {
  const theme = useTheme();

  const { pathname } = useLocation();

  const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>([]);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  React.useEffect(() => {
    if (expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return () => { };
  }, [expanded, theme.transitions.duration.enteringScreen]);

  React.useEffect(() => {
    if (!expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);

    return () => { };
  }, [expanded, theme.transitions.duration.leavingScreen]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded: boolean) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded],
  );

  const handlePageItemClick = React.useCallback(
    (itemId: string, hasNestedNavigation: boolean) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
              (previousValueItemId) => previousValueItemId !== itemId,
            )
            : [...previousValue, itemId],
        );
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [mini, setExpanded, isOverSmViewport],
  );

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = React.useCallback(
    (viewport: 'phone' | 'tablet' | 'desktop') => (
      <React.Fragment>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            scrollbarGutter: mini ? 'stable' : 'auto',
            overflowX: 'hidden',
            pt: !mini ? 0 : 2,
            ...(hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
              : {}),
          }}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? MINI_DRAWER_WIDTH : 'auto',
            }}
          >
            <DashboardSidebarHeaderItem>Home</DashboardSidebarHeaderItem>
            <DashboardSidebarPageItem
              id="overview"
              title="Overview"
              icon={<DashboardIcon />}
              href="/dashboard"
              selected={!!matchPath('/dashboard', pathname) || pathname === '/'}
            />
            <DashboardSidebarDividerItem />
            <DashboardSidebarHeaderItem>Management</DashboardSidebarHeaderItem>
            <DashboardSidebarPageItem
              id="organizations"
              title="Organizations"
              icon={<AccountBalanceIcon />}
              href="/dashboard/organizations"
              selected={!!matchPath('/dashboard/organizations/*', pathname)}
            />
            <DashboardSidebarPageItem
              id="users"
              title="Users"
              icon={<PersonIcon />}
              href="/dashboard/users"
              selected={!!matchPath('/dashboard/users/*', pathname)}
              defaultExpanded={!!(matchPath('/dashboard/users', pathname))}
              expanded={expandedItemIds.includes('users')}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  <DashboardSidebarPageItem
                    id="list"
                    title="List"
                    icon={<PeopleIcon />}
                    href="/dashboard/users"
                    selected={!!matchPath('/dashboard/users', pathname)}
                  />
                  <DashboardSidebarPageItem
                    id="invitations"
                    title="Invitations"
                    icon={<MailIcon />}
                    href="/dashboard/users/invitations"
                    selected={!!matchPath('/dashboard/users/invitations', pathname)}
                  />
                </List>
              }
            />
            <DashboardSidebarPageItem
              id="companies"
              title="Companies"
              icon={<BusinessIcon />}
              href="/dashboard/companies"
              selected={!!matchPath('/dashboard/companies/*', pathname) || pathname === '/'}
            />
            <DashboardSidebarPageItem
              id="warehouses"
              title="Warehouses"
              icon={<WarehouseIcon />}
              href="/dashboard/warehouses"
              selected={!!matchPath('/dashboard/warehouses/*', pathname) || pathname === '/'}
            />
            <DashboardSidebarPageItem
              id="products"
              title="Products"
              icon={<InventoryIcon />}
              href="/dashboard/products"
              selected={!!matchPath('/dashboard/products/*', pathname)}
              defaultExpanded={!!(matchPath('/dashboard/products', pathname))}
              expanded={expandedItemIds.includes('products')}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  <DashboardSidebarPageItem
                    id="products-list"
                    title="Products"
                    icon={<CategoryIcon />}
                    href="/dashboard/products"
                    selected={!!matchPath('/dashboard/products', pathname)}
                  />
                  <DashboardSidebarPageItem
                    id="lots"
                    title="Lots"
                    icon={<LocalOfferIcon />}
                    href="/dashboard/products/lots"
                    selected={!!matchPath('/dashboard/products/lots/*', pathname)}
                  />
                  <DashboardSidebarPageItem
                    id="uom"
                    title="Units of Measure"
                    icon={<StraightenIcon />}
                    href="/dashboard/products/uom"
                    selected={!!matchPath('/dashboard/products/uom/*', pathname)}
                  />
                </List>
              }
            />
          </List>
        </Box>
      </React.Fragment>
    ),
    [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds, pathname],
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary: boolean) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

      return {
        displayPrint: 'none',
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'none',
          ...getDrawerWidthTransitionMixin(expanded),
        },
      };
    },
    [expanded, mini],
  );

  const sidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    };
  }, [
    handlePageItemClick,
    mini,
    isFullyExpanded,
    isFullyCollapsed,
    hasDrawerTransitions,
  ]);

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: 'block',
            sm: disableCollapsibleSidebar ? 'block' : 'none',
            md: 'none',
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent('phone')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: disableCollapsibleSidebar ? 'none' : 'block',
            md: 'none',
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('tablet')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('desktop')}
      </Drawer>
    </SidebarContext.Provider>
  );
}
