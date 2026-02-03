import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './slices/users/userSlice'
import { resourcesApi } from './slices/resources/resourcesSlice'
import { companiesApi } from './slices/companies/companiesSlice'
import { warehousesApi } from './slices/warehouses/warehousesSlice'
import { productsApi } from './slices/products/productSlice'
import { lotsApi } from './slices/lots/lotSlice'
import { invitationsApi } from './slices/invitations/invitationSlice'
import { uomApi } from './slices/uom/uomSlice'
import { authApi } from './slices/auth/authSlice'

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
        ),
})

export type DashboardStoreState = ReturnType<typeof store.getState>
export type DashboardStoreDispatch = typeof store.dispatch
