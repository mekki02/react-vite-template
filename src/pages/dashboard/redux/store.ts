import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './slices/users/userSlice'
import { resourcesApi } from './slices/resources/resourcesSlice'
import { companiesApi } from './slices/companies/companiesSlice'
import { warehousesApi } from './slices/warehouses/warehousesSlice'

export const store = configureStore({
    reducer: {
        // resources: resourcesReducer, // without RTK Query
        [usersApi.reducerPath]: usersApi.reducer,
        [resourcesApi.reducerPath]: resourcesApi.reducer,
        [companiesApi.reducerPath]: companiesApi.reducer,
        [warehousesApi.reducerPath]: warehousesApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            usersApi.middleware,
            companiesApi.middleware,
            warehousesApi.middleware,
            resourcesApi.middleware
        ),
})

export type DashboardStoreState = ReturnType<typeof store.getState>
export type DashboardStoreDispatch = typeof store.dispatch
