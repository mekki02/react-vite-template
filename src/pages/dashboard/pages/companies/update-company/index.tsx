import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import type { CompanyFormState } from '../company-form';
import CompanyForm from '../company-form';
import useNotifications from '../../../../../hooks/context/notification';
import PageContainer from '../../../shared/page-container';
import { getErrorMessage } from '../../../../../utils/toolkit-query';
import { useCallback, useEffect, useMemo, type FC, type JSX } from 'react';
import { useGetCompanyByIdQuery, useUpdateCompanyMutation } from '../../../redux/slices/companies/companiesSlice';

export const CompanyUpdate: FC = (): JSX.Element => {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();
    const {
        data: company,
        isLoading,
        isError: isFetchError,
        isSuccess: isFetchSuccess,
        error,
    } = useGetCompanyByIdQuery(companyId!, {
        skip: !companyId,
    });

    const [updateCompany, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateCompanyMutation();
    
    useEffect(() => {
        if (isUpdateSuccess) {
            notifications.show('Company edited successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/companies');
        }
    }, [isUpdateSuccess])

    useEffect(() => {
        if (isUpdateError || isFetchError)
            notifications.show('Error updating the company.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
    }, [isUpdateError, isFetchError])

    useEffect(() => {
        if (isFetchSuccess && !company) {
            notifications.show('Company not found.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/companies');
        }
    }, [isFetchSuccess, company]);

    const handleSubmit = useCallback(
        async (formValues: Partial<CompanyFormState['values']>) => {
            updateCompany({ id: companyId!, ...formValues });
        },
        [companyId],
    );

    const renderEdit = useMemo(() => {
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
                    <CircularProgress />
                </Box>
            );
        }
        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">{getErrorMessage(error)}</Alert>
                </Box>
            );
        }

        return company ? (
            <CompanyForm
                defaultValues={company}
                isSubmitting={isUpdating}
                onSubmit={handleSubmit}
                submitButtonLabel="Save"
                backButtonPath={`/dashboard/companies/${companyId}`}
            />
        ) : null;
    }, [isLoading, error, company, handleSubmit]);

    return (
        <PageContainer
            title={`Edit ${company?.legalName || ''}`}
            breadcrumbs={[
                { title: 'Companies', path: '/dashboard/companies' },
                { title: `Company ${company?.legalName || ''}`, path: `/dashboard/companies/${companyId}` },
                { title: 'Edit Company' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
        </PageContainer>
    );
}

export default CompanyUpdate;