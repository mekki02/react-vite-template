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
import type { Company } from '@pages/dashboard/types';
import { getErrorMessage } from '@utils/toolkit-query';
import { useDeleteCompanyMutation, useGetCompaniesQuery } from '@pages/dashboard/redux/slices/companies/companiesSlice';
import { companyFormSchema } from '@pages/dashboard/shared/schemas/company-schema';
import { useTranslation } from 'react-i18next';

const INITIAL_PAGE_SIZE = 10;

export const CompaniesList: FC = () => {
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

    const { data, isLoading, error, refetch } = useGetCompaniesQuery({
        page: paginationModel.page + 1, // Convert to 1-based index for the API
        pageSize: paginationModel.pageSize,
        search: filterModel.quickFilterValues
            ? filterModel.quickFilterValues.join(' ')
            : '',
    });
    const [deleteCompany] = useDeleteCompanyMutation();

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
            navigate(`/dashboard/companies/${row.id}`);
        },
        [navigate],
    );

    const handleCreateClick = useCallback(() => {
        navigate('/dashboard/companies/new');
    }, [navigate]);

    const handleRowDelete = useCallback(
        (company: Company) => async () => {
            const confirmed = await dialogs.confirm(
                t('pages.dashboard.companies.messages.deleteConfirm', { name: company.legalName }),
                {
                    title: t('pages.dashboard.companies.messages.deleteTitle'),
                    severity: 'error',
                    okText: t('common.actions.delete'),
                    cancelText: t('common.actions.cancel'),
                },
            );

            if (confirmed) {
                try {
                    await deleteCompany(company.id);

                    notifications.show(t('pages.dashboard.companies.messages.deleteSuccess'), {
                        severity: 'success',
                        autoHideDuration: 3000,
                    });
                    refetch();
                } catch (deleteError) {
                    notifications.show(
                        t('pages.dashboard.companies.messages.deleteFailed', { error: (deleteError as Error).message }),
                        {
                            severity: 'error',
                            autoHideDuration: 3000,
                        },
                    );
                }
            }
        },
        [dialogs, notifications, deleteCompany, refetch, t],
    );

    const initialState = useMemo(
        () => ({
            pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
        }),
        [],
    );

    const companyColumns = companyFormSchema.map(field => ({
        field: field.name,
        headerName: t(`pages.dashboard.companies.columns.${field.name}`),
    }));

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: t('pages.dashboard.companies.columns.id') },
            ...companyColumns,
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
                        onClick={() => navigate(`/dashboard/companies/${params.id}/edit`)}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label={t('common.actions.delete')}
                        onClick={() => handleRowDelete(params.row as Company)}
                    />,
                ],
            },
        ],
        [navigate, handleRowDelete, t],
    );

    const pageTitle = t('pages.dashboard.companies.title');

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: pageTitle, path: '/dashboard/companies' },
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
                        {t('pages.dashboard.companies.addCompany')}
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


export default CompaniesList;