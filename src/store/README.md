# Global Redux Store

This directory contains the global Redux store configuration for the entire application.

## Structure

```
src/store/
├── index.ts          # Main store configuration
├── hooks.ts          # Typed Redux hooks
└── README.md         # This file
```

## Usage

### Basic Hooks

```typescript
import { useAppSelector, useAppDispatch } from '@/store/hooks'

// Typed selector
const user = useAppSelector(state => state.authApi)

// Typed dispatch
const dispatch = useAppDispatch()
```

### Utility Imports

For convenience, you can import commonly used hooks from the utils:

```typescript
import { 
  useAppSelector, 
  useAppDispatch,
  useLoginMutation,
  useGetUsersQuery 
} from '@/utils/redux'
```

### Available APIs

- **Auth**: `useLoginMutation`, `useRegisterMutation`, `useGetCurrentUserQuery`, etc.
- **Users**: `useGetUsersQuery`, `useCreateUserMutation`, etc.
- **Companies**: `useGetCompaniesQuery`, `useCreateCompanyMutation`, etc.
- **Products**: `useGetProductsQuery`, `useCreateProductMutation`, etc.
- **Warehouses**: `useGetWarehousesQuery`, `useCreateWarehouseMutation`, etc.

## Store Configuration

The store includes all RTK Query APIs:
- `authApi` - Authentication and user management
- `usersApi` - User CRUD operations
- `companiesApi` - Company CRUD operations
- `productsApi` - Product CRUD operations
- `warehousesApi` - Warehouse CRUD operations
- `lotsApi` - Lot management
- `invitationsApi` - User invitations
- `uomApi` - Unit of measurements
- `resourcesApi` - Resource management

## Global Provider

The Redux store is provided at the root level in `main.tsx`:

```typescript
<Provider store={store}>
  <App>
    {/* Your app */}
  </App>
</Provider>
```

This means:
- ✅ Auth state is available globally (login, register, etc.)
- ✅ All API slices are available throughout the app
- ✅ Single source of truth for all state
- ✅ Better performance (one store instance)
- ✅ Consistent state management patterns

## Migration Notes

- Removed duplicate Redux provider from dashboard layout
- Auth context now uses global Redux store
- All components can access any API slice from anywhere
- TypeScript types are exported for better IntelliSense
