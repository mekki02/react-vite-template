// Redux utilities for easy access throughout the app
export { useAppDispatch, useAppSelector } from '../store/hooks'
export type { RootState, AppDispatch } from '../store'

// Auth hooks
export { useLoginMutation, useRegisterMutation, useVerifyEmailMutation, useForgotPasswordMutation, useResetPasswordMutation, useGetCurrentUserQuery, useLogoutMutation } from '../pages/dashboard/redux/slices/auth/authSlice'

// User hooks  
export { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUserByIdQuery } from '../pages/dashboard/redux/slices/users/userSlice'

// Company hooks
export { useGetCompaniesQuery, useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation, useGetCompanyByIdQuery } from '../pages/dashboard/redux/slices/companies/companiesSlice'

// Product hooks
export { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery } from '../pages/dashboard/redux/slices/products/productSlice'

// Warehouse hooks
export { useGetWarehousesQuery, useCreateWarehouseMutation, useUpdateWarehouseMutation, useDeleteWarehouseMutation, useGetWarehouseByIdQuery } from '../pages/dashboard/redux/slices/warehouses/warehousesSlice'
