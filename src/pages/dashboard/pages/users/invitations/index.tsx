import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useNavigate, } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useDialogs } from '@hooks/context/dialog';
import useNotifications from '@hooks/context/notification';
import PageContainer from '@pages/dashboard/shared/page-container';
import { useCallback, useMemo, useState, type FC } from 'react';
import type { Invitation } from '@pages/dashboard/types';
import { getErrorMessage } from '@utils/toolkit-query';
import { useDeleteInvitationMutation, useGetInvitationsQuery } from '@pages/dashboard/redux/slices/invitations/invitationSlice';
import { useTranslation } from 'react-i18next';

const INITIAL_PAGE_SIZE = 10;

export const InvitationsList: FC = () => {
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
        data: invitationsData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetInvitationsQuery({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        search: '',
    });

    const [deleteInvitation, { isLoading: isDeleting }] = useDeleteInvitationMutation();

    const handleRowClick = useCallback<GridEventListener<'rowClick'>>(
        ({ row }) => {
            navigate(`/dashboard/users/invitations/${row.id}`);
        },
        [navigate],
    );

    const handleDeleteInvitation = useCallback(
        async (invitationId: string) => {
            const confirmed = await dialogs.confirm(
                t('pages.dashboard.invitations.messages.deleteConfirm'),
                {
                    title: t('pages.dashboard.invitations.messages.deleteTitle'),
                    severity: 'error',
                    okText: t('common.actions.delete'),
                    cancelText: t('common.actions.cancel'),
                },
            );

            if (confirmed) {
                try {
                    await deleteInvitation(invitationId).unwrap();
                    notifications.show(t('pages.dashboard.invitations.messages.deleteSuccess'), {
                        severity: 'success',
                        autoHideDuration: 3000,
                    });
                } catch (err) {
                    notifications.show(t('pages.dashboard.invitations.messages.deleteError'), {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        },
        [deleteInvitation, dialogs, notifications, t],
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'accepted':
                return 'success';
            case 'expired':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const columns = useMemo<GridColDef<Invitation>[]>(
        () => [
            {
                field: 'email',
                headerName: t('pages.dashboard.invitations.columns.email'),
                flex: 2,
                minWidth: 200,
            },
            {
                field: 'role',
                headerName: t('pages.dashboard.invitations.columns.role'),
                flex: 1,
                minWidth: 120,
            },
            {
                field: 'status',
                headerName: t('pages.dashboard.invitations.columns.status'),
                flex: 1,
                minWidth: 120,
                renderCell: (params) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Chip
                            label={params.value}
                            color={getStatusColor(params.value)}
                            size="small"
                        />
                    </Box>
                ),
            },
            {
                field: 'senderEmail',
                headerName: t('pages.dashboard.invitations.columns.senderEmail'),
                flex: 1,
                minWidth: 180,
            },
            {
                field: 'createdAt',
                headerName: t('pages.dashboard.invitations.columns.createdAt'),
                flex: 1,
                minWidth: 120,
                valueFormatter: (value) => formatDate(value as string),
            },
            {
                field: 'expiresAt',
                headerName: t('pages.dashboard.invitations.columns.expiresAt'),
                flex: 1,
                minWidth: 120,
                valueFormatter: (value) => formatDate(value as string),
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
                        icon={<VisibilityIcon />}
                        label={t('common.actions.view')}
                        onClick={() => navigate(`/dashboard/users/invitations/${params.id}`)}
                    />,
                    <GridActionsCellItem
                        key="edit"
                        icon={<EditIcon />}
                        label={t('common.actions.edit')}
                        onClick={() => navigate(`/dashboard/users/invitations/${params.id}/edit`)}
                        disabled={params.row.status !== 'pending'}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label={t('common.actions.delete')}
                        onClick={() => handleDeleteInvitation(params.id as string)}
                        disabled={isDeleting || params.row.status !== 'pending'}
                    />,
                ],
            },
        ],
        [navigate, handleDeleteInvitation, isDeleting, t],
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
                    <Box>Loading {t('pages.dashboard.invitations.loadingInvitations')}</Box>
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
                    rows={invitationsData?.result || []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    filterModel={filterModel}
                    onFilterModelChange={handleFilterModelChange}
                    sortModel={sortModel}
                    onSortModelChange={handleSortModelChange}
                    rowCount={invitationsData?.totalCount || 0}
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
        invitationsData,
        columns,
        paginationModel,
        handlePaginationModelChange,
        filterModel,
        handleFilterModelChange,
        sortModel,
        handleSortModelChange,
    ]);

    const pageTitle = t('pages.dashboard.invitations.title');
    const usersTitle = t('pages.dashboard.users.title');

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: usersTitle, path: '/dashboard/users' },
                { title: pageTitle, path: '/dashboard/users/invitations' },
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
                        onClick={() => navigate('/dashboard/users/invitations/create')}
                    >
                        {t('pages.dashboard.invitations.sendInvitation')}
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

export default InvitationsList;
