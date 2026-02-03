import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridPaginationModel,
    type GridFilterModel,
    type GridSortModel,
    type GridEventListener,
    gridClasses,
} from '@mui/x-data-grid';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useGetLotsQuery, useDeleteLotMutation } from '@pages/dashboard/redux/slices/lots/lotSlice';
import PageContainer from '@pages/dashboard/shared/page-container';
import { useDialogs } from '@hooks/context/dialog';
import useNotifications from '@hooks/context/notification';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { getErrorMessage } from '@utils/toolkit-query';
import { useTranslation } from 'react-i18next';

const INITIAL_PAGE_SIZE = 10;

const LotsList: React.FC = () => {
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

    const { data, isLoading, error } = useGetLotsQuery({
        page: paginationModel.page + 1, // Convert to 1-based index for the API
        pageSize: paginationModel.pageSize,
        search: filterModel.quickFilterValues
            ? filterModel.quickFilterValues.join(' ')
            : '',
    });

    const [deleteLot] = useDeleteLotMutation();

    const handleRowClick = useCallback<GridEventListener<'rowClick'>>(
        ({ row }) => {
            navigate(`/dashboard/products/lots/${row.id}`);
        },
        [navigate],
    );

    const handleCreateLot = () => {
        navigate('/dashboard/products/lots/create');
    };

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


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'released':
                return 'success';
            case 'quarantined':
                return 'warning';
            case 'expired':
                return 'error';
            default:
                return 'default';
        }
    };

    const getQcStateColor = (qcState: string) => {
        switch (qcState) {
            case 'passed':
                return 'success';
            case 'failed':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    const initialState = useMemo(
        () => ({
            pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
        }),
        [],
    );

    const columns = useMemo<GridColDef[]>(
        () => [
        {
            field: 'lotNumber',
            headerName: t('pages.dashboard.lots.columns.lotNumber'),
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'productId',
            headerName: t('pages.dashboard.lots.columns.productId'),
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'manufactureDate',
            headerName: t('pages.dashboard.lots.columns.manufactureDate'),
            flex: 1,
            minWidth: 150,
            valueFormatter: (value) => {
                if (!value) return '';
                return new Date(value).toLocaleDateString();
            },
        },
        {
            field: 'expirationDate',
            headerName: t('pages.dashboard.lots.columns.expiryDate'),
            flex: 1,
            minWidth: 150,
            valueFormatter: (value) => {
                if (!value) return '';
                return new Date(value).toLocaleDateString();
            },
        },
        {
            field: 'status',
            headerName: t('common.status.status'),
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={getStatusColor(params.value) as any}
                    size="small"
                />
            ),
        },
        {
            field: 'qcState',
            headerName: t('pages.dashboard.lots.columns.qcState'),
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={getQcStateColor(params.value) as any}
                    size="small"
                />
            ),
        },
        {
            field: 'actions',
            headerName: t('common.actions.actions'),
            type: 'actions',
            flex: 1,
            minWidth: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    key="view"
                    icon={<VisibilityIcon />}
                    label={t('common.actions.view')}
                    onClick={() => navigate(`/dashboard/products/lots/${params.id}`)}
                />,
                <GridActionsCellItem
                    key="edit"
                    icon={<EditIcon />}
                    label={t('common.actions.edit')}
                    onClick={() => navigate(`/dashboard/products/lots/${params.id}/edit`)}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label={t('common.actions.delete')}
                    onClick={() => {
                        dialogs.confirm(t('common.messages.deleteConfirm', { item: 'lot' }), {
                            title: t('common.actions.delete') + ' Lot',
                            severity: 'warning',
                            okText: t('common.actions.delete'),
                            cancelText: t('common.actions.cancel'),
                        }).then((confirmed: boolean) => {
                            if (confirmed) {
                                deleteLot(params.id as string)
                                    .unwrap()
                                    .then(() => {
                                        notifications.show(t('common.messages.deleteSuccess', { item: 'Lot' }), {
                                            severity: 'success',
                                            autoHideDuration: 3000,
                                        });
                                    })
                                    .catch(() => {
                                        notifications.show(t('common.messages.errorOccurred', { error: 'Failed to delete lot' }), {
                                            severity: 'error',
                                            autoHideDuration: 3000,
                                        });
                                    });
                            }
                        });
                    }}
                />,
            ],
        },
        ],
        [t, navigate, dialogs, deleteLot, notifications],
    );

    if (error) {
        return (
            <PageContainer title={t('pages.dashboard.lots.title')}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography color="error">
                        {t('common.messages.errorOccurred', { error: getErrorMessage(error) })}
                    </Typography>
                </Box>
            </PageContainer>
        );
    }

    const pageTitle = t('pages.dashboard.lots.title');
    const productsTitle = t('pages.dashboard.products.title');
    
    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: productsTitle, path: '/dashboard/products' },
                { title: pageTitle, path: '/dashboard/products/lots' },
            ]}
            actions={
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateLot}
                >
                    {t('pages.dashboard.lots.addLot')}
                </Button>
            }
        >
            <Box sx={{ flex: 1, width: '100%' }}>
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
                />
            </Box>
        </PageContainer>
    );
};

export default LotsList;
