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
import { useDialogs } from '../../../../hooks/context/dialog';
import useNotifications from '../../../../hooks/context/notification';
import PageContainer from '../../shared/page-container';
import { useCallback, useMemo, useState, type FC } from 'react';
import type { Warehouse } from '../../types';
import { getErrorMessage } from '../../../../utils/toolkit-query';
import { useDeleteWarehouseMutation, useGetWarehousesQuery } from '../../redux/slices/warehouses/warehousesSlice';
import { useTranslation } from 'react-i18next';

const INITIAL_PAGE_SIZE = 10;

export const WarehousesList: FC = () => {
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
        searchParams.get('sort') ? JSON.parse(searchParams.get('sort') ?? '') : [],
    );

    const { data, isLoading, error, refetch } = useGetWarehousesQuery({
        page: paginationModel.page + 1, // Convert to 1-based index for the API
        pageSize: paginationModel.pageSize,
        search: filterModel.quickFilterValues
            ? filterModel.quickFilterValues.join(' ')
            : '',
    });
    const [deleteWarehouse] = useDeleteWarehouseMutation();

    const handlePaginationModelChange = useCallback(
        (model: GridPaginationModel) => {
            setPaginationModel(model);

            searchParams.set('page', String(model.page));
            searchParams.set('pageSize', String(model.pageSize));

            const newSearchParamsString = searchParams.toString();

            navigate(
                `${pathname}${newSearchParamsString ? '?' : ''}${newSearchParamsString}`,
            );
        },
        [navigate, pathname, searchParams],
    );

    const handleFilterModelChange = useCallback(
        (model: GridFilterModel) => {
            setFilterModel(model);

            if (
                model.items.length > 0 ||
                (model.quickFilterValues && model.quickFilterValues.length > 0)
            ) {
                searchParams.set('filter', JSON.stringify(model));
            } else {
                searchParams.delete('filter');
            }

            const newSearchParamsString = searchParams.toString();

            navigate(
                `${pathname}${newSearchParamsString ? '?' : ''}${newSearchParamsString}`,
            );
        },
        [navigate, pathname, searchParams],
    );

    const handleSortModelChange = useCallback(
        (model: GridSortModel) => {
            setSortModel(model);

            if (model.length > 0) {
                searchParams.set('sort', JSON.stringify(model));
            } else {
                searchParams.delete('sort');
            }

            const newSearchParamsString = searchParams.toString();

            navigate(
                `${pathname}${newSearchParamsString ? '?' : ''}${newSearchParamsString}`,
            );
        },
        [navigate, pathname, searchParams],
    );

    const handleRefresh = useCallback(() => {
        if (!isLoading) {
            refetch();
        }
    }, [isLoading, refetch]);

    const handleRowClick = useCallback<GridEventListener<'rowClick'>>(
        ({ row }) => {
            navigate(`/dashboard/warehouses/${row.id}`);
        },
        [navigate],
    );

    const handleCreateClick = useCallback(() => {
        navigate('/dashboard/warehouses/new');
    }, [navigate]);

    const handleRowEdit = useCallback(
        (warehouse: Warehouse) => () => {
            navigate(`/dashboard/warehouses/${warehouse.id}/edit`);
        },
        [navigate],
    );

    const handleRowDelete = useCallback(
        (warehouse: Warehouse) => async () => {
            const confirmed = await dialogs.confirm(
                t('common.messages.deleteConfirm', { item: warehouse.name }),
                {
                    title: t('common.actions.delete') + ' warehouse?',
                    severity: 'error',
                    okText: t('common.actions.delete'),
                    cancelText: t('common.actions.cancel'),
                },
            );

            if (confirmed) {
                try {
                    await deleteWarehouse(warehouse.id);

                    notifications.show(t('common.messages.deleteSuccess', { item: 'Warehouse' }), {
                        severity: 'success',
                        autoHideDuration: 3000,
                    });
                    refetch();
                } catch (deleteError) {
                    const errorMessage = `Failed to delete warehouse. Reason: ${(deleteError as Error).message}`;
                    notifications.show(
                        t('common.messages.errorOccurred', { error: errorMessage }),
                        {
                            severity: 'error',
                            autoHideDuration: 3000,
                        },
                    );
                }
            }
        },
        [dialogs, notifications, deleteWarehouse, refetch, t],
    );

    const initialState = useMemo(
        () => ({
            pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
        }),
        [],
    );

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: t('pages.dashboard.warehouses.columns.id') },
            { field: 'name', headerName: t('pages.dashboard.warehouses.columns.name'), width: 140 },
            { field: 'isActive', headerName: t('pages.dashboard.warehouses.columns.active') },
            { field: 'companyId', headerName: t('pages.dashboard.warehouses.columns.companyId') },
            { field: 'organizationId', headerName: t('pages.dashboard.warehouses.columns.organizationId') },
            { field: 'createdAt', headerName: t('pages.dashboard.warehouses.columns.createdAt') },
            { field: 'updatedAt', headerName: t('pages.dashboard.warehouses.columns.updatedAt') },
            {
                field: 'actions',
                type: 'actions',
                headerName: t('common.actions.actions'),
                flex: 1,
                align: 'right',
                getActions: ({ row }) => [
                    <GridActionsCellItem
                        key="edit-item"
                        icon={<EditIcon />}
                        label={t('common.actions.edit')}
                        onClick={handleRowEdit(row)}
                    />,
                    <GridActionsCellItem
                        key="delete-item"
                        icon={<DeleteIcon />}
                        label={t('common.actions.delete')}
                        onClick={handleRowDelete(row)}
                    />,
                ],
            },
        ],
        [handleRowEdit, handleRowDelete, t],
    );

    const pageTitle = t('pages.dashboard.warehouses.title');

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: pageTitle, path: '/dashboard/warehouses' },
            ]}
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title={t('common.actions.refresh')} placement="right" enterDelay={1000}>
                        <div>
                            <IconButton size="small" aria-label="refresh" onClick={handleRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Button
                        variant="contained"
                        onClick={handleCreateClick}
                        startIcon={<AddIcon />}
                    >
                        {t('pages.dashboard.warehouses.addWarehouse')}
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ flex: 1, width: '100%' }}>
                {error ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Alert severity="error">{getErrorMessage(error)}</Alert>
                    </Box>
                ) : (
                    <DataGrid
                        rows={data?.data ?? []}
                        rowCount={data?.totalCount ?? 0}
                        columns={columns}
                        pagination
                        sortingMode="server"
                        filterMode="server"
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationModelChange}
                        sortModel={sortModel}
                        onSortModelChange={handleSortModelChange}
                        filterModel={filterModel}
                        onFilterModelChange={handleFilterModelChange}
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
                        loading={isLoading}
                        initialState={initialState}
                        showToolbar
                        pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
                        sx={{
                            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                                outline: 'transparent',
                            },
                            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                            {
                                outline: 'none',
                            },
                            [`& .${gridClasses.row}:hover`]: {
                                cursor: 'pointer',
                            },
                        }}
                        slotProps={{
                            loadingOverlay: {
                                variant: 'circular-progress',
                                noRowsVariant: 'circular-progress',
                            },
                            baseIconButton: {
                                size: 'small',
                            },
                        }}
                    />
                )}
            </Box>
        </PageContainer>
    );
}


export default WarehousesList;