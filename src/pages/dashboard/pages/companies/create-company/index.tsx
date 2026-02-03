import { useNavigate } from 'react-router';
import useNotifications from '../../../../../hooks/context/notification';
import { useCreateCompanyMutation } from '../../../redux/slices/companies/companiesSlice';
import PageContainer from '../../../shared/page-container';
import CompanyForm, { type CompanyFormState } from '../company-form';
import { useCallback, useEffect } from 'react';
import type { Company } from '../../../types';

const defaultCompanyValues: Partial<Company> = {
    legalName: '',
    brandName: '',
    registrationNumber: '',
    taxId: '',
    vatNumber: '',
    timezone: '',
    currency: ''
};

export default function CompanyCreate() {
    const navigate = useNavigate();

    const notifications = useNotifications();

    const [createCompany, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError }] = useCreateCompanyMutation();

    useEffect(() => {
        if (isCreateSuccess) {
            notifications.show('Company created successfully.', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/dashboard/companies');
        }
    }, [isCreateSuccess])

    useEffect(() => {
        if (isCreateError)
            notifications.show('Error creating the company.', {
                severity: 'error',
                autoHideDuration: 3000,
            });
    }, [isCreateError]);

    const handleSubmit = useCallback(async (formValues: Partial<CompanyFormState['values']>) => {
        createCompany({ ...formValues });
    }, []);

    return (
        <PageContainer
            title="New Company"
            breadcrumbs={[{ title: 'Companies', path: '/dashboard/companies' }, { title: 'New Company' }]}
        >
            <CompanyForm
                defaultValues={defaultCompanyValues}
                isSubmitting={isCreating}
                onSubmit={handleSubmit}
                submitButtonLabel="Save"
                backButtonPath={`/dashboard/companies`}
            />
        </PageContainer>
    );
}
