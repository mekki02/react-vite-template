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
import PageContainer from '../../../shared/page-container';
import { useCallback, useMemo, useState, type FC } from 'react';
import type { UOM } from '../../../types';
import { getErrorMessage } from '@utils/toolkit-query';
import { useDeleteUOMMutation, useGetUOMsQuery } from '../../../redux/slices/uom/uomSlice';
import { useTranslation } from 'react-i18next';
import { parseJwt } from '@utils/jwt';

const INITIAL_PAGE_SIZE = 10;

export const UOMList: FC = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const token = sessionStorage.getItem('token') ?? '';
    const decodedToken = parseJwt(token);
    const { organizationID: organizationId } = decodedToken

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
        data: uomData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetUOMsQuery({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        search: '',
        organizationId,
    });

    const [deleteUOM, { isLoading: isDeleting }] = useDeleteUOMMutation();

    const handleRowClick = useCallback<GridEventListener<'rowClick'>>(
        ({ row }) => {
            navigate(`/dashboard/products/uom/${row.id}`);
        },
        [navigate],
    );

    const handleDeleteUOM = useCallback(
        async (uomId: string) => {
            const confirmed = await dialogs.confirm(
                t('pages.dashboard.uom.messages.deleteConfirm'),
                {
                    title: t('pages.dashboard.uom.messages.deleteTitle'),
                    severity: 'error',
                    okText: t('common.actions.delete'),
                    cancelText: t('common.actions.cancel'),
                },
            );

            if (confirmed) {
                try {
                    await deleteUOM(uomId).unwrap();
                    notifications.show(t('pages.dashboard.uom.messages.deleteSuccess'), {
                        severity: 'success',
                        autoHideDuration: 3000,
                    });
                } catch (err) {
                    notifications.show(t('pages.dashboard.uom.messages.deleteError'), {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        },
        [deleteUOM, dialogs, notifications, t],
    );

    const columns = useMemo<GridColDef<UOM>[]>(
        () => [
            {
                field: 'name',
                headerName: t('pages.dashboard.uom.columns.name'),
                flex: 2,
                minWidth: 150,
            },
            {
                field: 'category',
                headerName: t('pages.dashboard.uom.columns.category'),
                flex: 1,
                minWidth: 120,
            },
            {
                field: 'isBase',
                headerName: t('pages.dashboard.uom.columns.baseUnit'),
                flex: 1,
                minWidth: 100,
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
                                backgroundColor: params.value ? 'success.main' : 'warning.main',
                            }}
                        />
                    </Box>
                ),
            },
            {
                field: 'ratioToBase',
                headerName: t('pages.dashboard.uom.columns.ratioToBase'),
                flex: 1,
                minWidth: 120,
                valueFormatter: (value) => Number(value).toFixed(3),
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
                        onClick={() => navigate(`/dashboard/products/uom/${params.id}/edit`)}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label={t('common.actions.delete')}
                        onClick={() => handleDeleteUOM(params.id as string)}
                        disabled={isDeleting}
                    />,
                ],
            },
        ],
        [navigate, handleDeleteUOM, isDeleting, t],
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
                    <Box>{t('common.status.loading')} UOMs...</Box>
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
                    rows={uomData?.result || []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    filterModel={filterModel}
                    onFilterModelChange={handleFilterModelChange}
                    sortModel={sortModel}
                    onSortModelChange={handleSortModelChange}
                    rowCount={uomData?.totalCount || 0}
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
        uomData,
        columns,
        paginationModel,
        handlePaginationModelChange,
        filterModel,
        handleFilterModelChange,
        sortModel,
        handleSortModelChange,
    ]);

    const pageTitle = t('pages.dashboard.uom.title');
    const productsTitle = t('pages.dashboard.products.title');

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: productsTitle, path: '/dashboard/products' },
                { title: pageTitle, path: '/dashboard/products/uom' },
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
                        onClick={() => navigate('/dashboard/products/uom/create')}
                    >
                        {t('pages.dashboard.uom.addUom')}
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

export default UOMList;
