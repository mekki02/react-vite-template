import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridFilterModel,
    type GridPaginationModel,
    type GridSortModel,
    type GridEventListener,
    gridClasses,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate, } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useDialogs } from '@hooks/context/dialog';
import useNotifications from '@hooks/context/notification';
import PageContainer from '@pages/dashboard/shared/page-container';
import { useCallback, useMemo, useState, type FC } from 'react';
import type { Organization } from '@pages/dashboard/types';
import { getErrorMessage } from '@utils/toolkit-query';
import { useDeleteOrganizationMutation, useGetOrganizationsQuery } from '@pages/dashboard/redux/slices/organizations/organizationSlice';
import { useTranslation } from 'react-i18next';

const INITIAL_PAGE_SIZE = 10;

export const OrganizationsList: FC = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const dialogs = useDialogs();
    const notifications = useNotifications();

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
        pageSize: searchParams.get('pageSize')
            ? Number(searchParams.get('pageSize'))
            : INITIAL_PAGE_SIZE,
    });
    const [filterModel, setFilterModel] = useState<GridFilterModel>(
        searchParams.get('filter')
            ? JSON.parse(searchParams.get('filter') ?? '')
            : { items: [] },
    );
    const [sortModel, setSortModel] = useState<GridSortModel>(
        searchParams.get('sort')
            ? JSON.parse(searchParams.get('sort') ?? '')
            : [],
    );

    const {
        data: organizationsData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetOrganizationsQuery({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        search: '',
    });

    const [deleteOrganization, { isLoading: isDeleting }] = useDeleteOrganizationMutation();

    const handleRowClick = useCallback<GridEventListener<'rowClick'>>(
        ({ row }) => {
            navigate(`/dashboard/organizations/${row.id}`);
        },
        [navigate],
    );

    const handleDeleteOrganization = useCallback(
        async (organizationId: string) => {
            const confirmed = await dialogs.confirm(
                t('pages.dashboard.organizations.messages.deleteConfirm'),
                {
                    title: t('common.actions.delete'),
                    severity: 'error',
                    okText: t('common.actions.delete'),
                    cancelText: t('common.actions.cancel'),
                },
            );

            if (confirmed) {
                try {
                    await deleteOrganization(organizationId).unwrap();
                    notifications.show(t('pages.dashboard.organizations.messages.deleteSuccess'), {
                        severity: 'success',
                        autoHideDuration: 3000,
                    });
                } catch (err) {
                    notifications.show(t('pages.dashboard.organizations.messages.deleteFailed', { error: (err as Error).message }), {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        },
        [deleteOrganization, dialogs, notifications, t],
    );

    const columns = useMemo<GridColDef<Organization>[]>(
        () => [
            {
                field: 'name',
                headerName: t('pages.dashboard.organizations.columns.name'),
                flex: 2,
                minWidth: 200,
            },
            {
                field: 'plan',
                headerName: t('pages.dashboard.organizations.columns.plan'),
                flex: 1,
                minWidth: 120,
            },
            {
                field: 'isActive',
                headerName: t('pages.dashboard.organizations.columns.isActive'),
                flex: 1,
                minWidth: 80,
                renderCell: (params) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: params.value ? 'success.main' : 'error.main',
                            }}
                        />
                    </Box>
                ),
            },
            {
                field: 'createdAt',
                headerName: t('pages.dashboard.organizations.columns.createdAt'),
                flex: 1,
                minWidth: 150,
                valueFormatter: (value) => new Date(value as string).toLocaleDateString(),
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: t('common.actions.actions'),
                flex: 1,
                minWidth: 120,
                getActions: (params) => [
                    <GridActionsCellItem
                        key="view"
                        icon={<EditIcon />}
                        label={t('common.actions.edit')}
                        onClick={() => navigate(`/dashboard/organizations/${params.id}/edit`)}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label={t('common.actions.delete')}
                        onClick={() => handleDeleteOrganization(params.id as string)}
                        disabled={isDeleting}
                    />,
                ],
            },
        ],
        [navigate, handleDeleteOrganization, isDeleting, t],
    );

    const handlePaginationModelChange = useCallback(
        (newModel: GridPaginationModel) => {
            setPaginationModel(newModel);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', newModel.page.toString());
            newSearchParams.set('pageSize', newModel.pageSize.toString());
            navigate(`${pathname}?${newSearchParams.toString()}`, { replace: true });
        },
        [navigate, pathname, searchParams],
    );

    const handleFilterModelChange = useCallback(
        (newModel: GridFilterModel) => {
            setFilterModel(newModel);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('filter', JSON.stringify(newModel));
            navigate(`${pathname}?${newSearchParams.toString()}`, { replace: true });
        },
        [navigate, pathname, searchParams],
    );

    const handleSortModelChange = useCallback(
        (newModel: GridSortModel) => {
            setSortModel(newModel);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('sort', JSON.stringify(newModel));
            navigate(`${pathname}?${newSearchParams.toString()}`, { replace: true });
        },
        [navigate, pathname, searchParams],
    );

    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    const renderContent = useMemo(() => {
        if (isLoading) {
            return (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        m: 1,
                    }}
                >
                    <Box>Loading organizations...</Box>
                </Box>
            );
        }

        if (isError) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">{getErrorMessage(error)}</Alert>
                </Box>
            );
        }

        return (
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={organizationsData?.data || []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    filterModel={filterModel}
                    onFilterModelChange={handleFilterModelChange}
                    sortModel={sortModel}
                    onSortModelChange={handleSortModelChange}
                    rowCount={organizationsData?.totalCount || 0}
                    paginationMode="server"
                    filterMode="server"
                    sortingMode="server"
                    loading={isLoading}
                    pageSizeOptions={[5, 10, 25, 50]}
                    disableRowSelectionOnClick
                    onRowClick={handleRowClick}
                    getRowId={(row) => row.id}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            py: 1,
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                />
            </Box>
        );
    }, [
        isLoading,
        isError,
        error,
        organizationsData,
        columns,
        paginationModel,
        handlePaginationModelChange,
        filterModel,
        handleFilterModelChange,
        sortModel,
        handleSortModelChange,
    ]);

    const pageTitle = t('pages.dashboard.organizations.title');

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: pageTitle, path: '/dashboard/organizations' },
            ]}
            actions={
                <Stack direction="row" spacing={1}>
                    <Tooltip title={t('common.actions.refresh')}>
                        <IconButton onClick={handleRefresh} disabled={isLoading}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/dashboard/organizations/create')}
                    >
                        {t('pages.dashboard.organizations.addOrganization')}
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                {renderContent}
            </Box>
        </PageContainer>
    );
};

export default OrganizationsList;
