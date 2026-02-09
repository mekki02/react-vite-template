import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from '../pages/dashboard/redux/slices/users/userSlice'
import { resourcesApi } from '../pages/dashboard/redux/slices/resources/resourcesSlice'
import { companiesApi } from '../pages/dashboard/redux/slices/companies/companiesSlice'
import { warehousesApi } from '../pages/dashboard/redux/slices/warehouses/warehousesSlice'
import { productsApi } from '../pages/dashboard/redux/slices/products/productSlice'
import { lotsApi } from '../pages/dashboard/redux/slices/lots/lotSlice'
import { invitationsApi } from '../pages/dashboard/redux/slices/invitations/invitationSlice'
import { uomApi } from '../pages/dashboard/redux/slices/uom/uomSlice'
import { authApi } from '../pages/dashboard/redux/slices/auth/authSlice'
import { organizationsApi } from '../pages/dashboard/redux/slices/organizations/organizationSlice'

export const store = configureStore({
    reducer: {
        // resources: resourcesReducer, // without RTK Query
        [usersApi.reducerPath]: usersApi.reducer,
        [resourcesApi.reducerPath]: resourcesApi.reducer,
        [companiesApi.reducerPath]: companiesApi.reducer,
        [warehousesApi.reducerPath]: warehousesApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [lotsApi.reducerPath]: lotsApi.reducer,
        [invitationsApi.reducerPath]: invitationsApi.reducer,
        [uomApi.reducerPath]: uomApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [organizationsApi.reducerPath]: organizationsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            usersApi.middleware,
            companiesApi.middleware,
            warehousesApi.middleware,
            resourcesApi.middleware,
            productsApi.middleware,
            lotsApi.middleware,
            invitationsApi.middleware,
            uomApi.middleware,
            authApi.middleware,
            organizationsApi.middleware,
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
