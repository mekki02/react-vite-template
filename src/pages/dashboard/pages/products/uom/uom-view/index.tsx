import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../../../../../../hooks/context/notification';
import PageContainer from '../../../../shared/page-container';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetUOMByIdQuery } from '../../../../redux/slices/uom/uomSlice';

export const UOMView: FC = (): JSX.Element => {
    const { uomId } = useParams<{ uomId: string }>();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const {
        data: uom,
        isLoading,
        isError,
        error,
    } = useGetUOMByIdQuery(uomId || '', {
        skip: !uomId,
    });

    useEffect(() => {
        if (isError) {
            notifications.show('Error loading UOM details.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [isError, notifications]);

    const handleEdit = useCallback(() => {
        if (uomId) {
            navigate(`/dashboard/products/uom/${uomId}/edit`);
        }
    }, [navigate, uomId]);

    const renderContent = useMemo(() => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Typography>Loading UOM details...</Typography>
                </Box>
            );
        }

        if (isError || !uom) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">
                        {error ? 'Error loading UOM details' : 'UOM not found'}
                    </Alert>
                </Box>
            );
        }

        return (
            <Stack spacing={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Basic Information
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Unit Name
                                </Typography>
                                <Typography variant="body1">
                                    {uom.name}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Category
                                </Typography>
                                <Typography variant="body1">
                                    {uom.category}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Base Unit
                                </Typography>
                                <Typography variant="body1">
                                    {uom.isBase ? 'Yes' : 'No'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Ratio to Base Unit
                                </Typography>
                                <Typography variant="body1">
                                    {uom.ratioToBase.toFixed(3)}
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            System Information
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Organization ID
                                </Typography>
                                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                    {uom.organizationId}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Created
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(uom.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Last Updated
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(uom.updatedAt).toLocaleString()}
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        );
    }, [isLoading, isError, error, uom]);

    return (
        <PageContainer
            title="Unit of Measure Details"
            breadcrumbs={[
                { title: 'Products', path: '/dashboard/products' },
                { title: 'Units of Measure', path: '/dashboard/products/uom' },
                { title: uom?.name || 'UOM Details' },
            ]}
            actions={
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    disabled={!uom}
                >
                    Edit UOM
                </Button>
            }
        >
            <Box sx={{ display: 'flex', flex: 1 }}>
                {renderContent}
            </Box>
        </PageContainer>
    );
};

export default UOMView;
