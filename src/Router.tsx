import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
// import AuthGuard from "@guards/auth-guard";

const Page = lazy(() => import("@pages/page/Page"));
const Login = lazy(() => import("@pages/login/Login2"));
const Register = lazy(() => import("@pages/register/Register"));
const EmailVerification = lazy(() => import("@pages/email-verification/index"));

const Dashboard = lazy(() => import("@pages/dashboard"));
const Home = lazy(() => import("@pages/dashboard/pages/home/index"));

const UserList = lazy(() => import("@pages/dashboard/pages/users/index"));
const UserUpdate = lazy(() => import("@pages/dashboard/pages/users/update-user/index"));
const UserView = lazy(() => import("@pages/dashboard/pages/users/user-view/index"));

const InvitationsList = lazy(() => import("@pages/dashboard/pages/users/invitations/index"));
const InvitationCreate = lazy(() => import("@pages/dashboard/pages/users/invitations/create-invitation/index"));
const InvitationView = lazy(() => import("@pages/dashboard/pages/users/invitations/invitation-view/index"));
const InvitationUpdate = lazy(() => import("@pages/dashboard/pages/users/invitations/update-invitation/index"));

const WarehouseList = lazy(() => import("@pages/dashboard/pages/warehouses/index"));
const WarehouseCreate = lazy(() => import("@pages/dashboard/pages/warehouses/create-warehouse/index"));
const WarehouseUpdate = lazy(() => import("@pages/dashboard/pages/warehouses/update-warehouse/index"));
const WarehouseView = lazy(() => import("@pages/dashboard/pages/warehouses/warehouse-view/index"));

const CompaniesList = lazy(() => import("@pages/dashboard/pages/companies/index"));
const CompanyCreate = lazy(() => import("@pages/dashboard/pages/companies/create-company/index"));
const CompanyUpdate = lazy(() => import("@pages/dashboard/pages/companies/update-company/index"));
const CompanyView = lazy(() => import("@pages/dashboard/pages/companies/company-view/index"));

const ProductsList = lazy(() => import("@pages/dashboard/pages/products/index"));
const ProductCreate = lazy(() => import("@pages/dashboard/pages/products/create-product/index"));
const ProductUpdate = lazy(() => import("@pages/dashboard/pages/products/update-product/index"));
const ProductView = lazy(() => import("@pages/dashboard/pages/products/product-view/index"));

const LotsList = lazy(() => import("@pages/dashboard/pages/products/lots/index"));
const LotCreate = lazy(() => import("@pages/dashboard/pages/products/lots/create-lot/index"));
const LotUpdate = lazy(() => import("@pages/dashboard/pages/products/lots/update-lot/index"));
const LotView = lazy(() => import("@pages/dashboard/pages/products/lots/lot-view/index"));

const UOMList = lazy(() => import("@pages/dashboard/pages/products/uom/index"));
const UOMCreate = lazy(() => import("@pages/dashboard/pages/products/uom/create-uom/index"));
const UOMUpdate = lazy(() => import("@pages/dashboard/pages/products/uom/update-uom/index"));
const UOMView = lazy(() => import("@pages/dashboard/pages/products/uom/uom-view/index"));
 

const LoadingFallback = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
    }}>
        Loading...
    </div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element:
            // <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
                <Page />
            </Suspense>,
        // </AuthGuard>,
        children: []
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <Login />
            </Suspense>
        )
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <Register />
            </Suspense>
        )
    },
    {
        path: "/verify-email",
        element: (
            <Suspense fallback={<LoadingFallback />}> 
                <EmailVerification />
            </Suspense>
        )
    },
    {
        path: "dashboard",
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
            </Suspense>
        ),
        children: [
            {
                path: "",
                element: (
                    <Home />
                )
            },
            {
                path: "users",
                element: (
                    <UserList />
                )
            },
            {
                path: "users/:userId",
                element: (
                    <UserView />
                )
            },
            {
                path: "users/:userId/edit",
                element: (
                    <UserUpdate />
                )
            },
            {
                path: "users/invitations",
                element: (
                    <InvitationsList />
                )
            },
            {
                path: "users/invitations/create",
                element: (
                    <InvitationCreate />
                )
            },
            {
                path: "users/invitations/:invitationId",
                element: (
                    <InvitationView />
                )
            },
            {
                path: "users/invitations/:invitationId/edit",
                element: (
                    <InvitationUpdate />
                )
            },
            {
                path: "warehouses",
                element: (
                    <WarehouseList />
                )
            },
            {
                path: "warehouses/new",
                element: (
                    <WarehouseCreate />
                )
            },
            {
                path: "warehouses/:warehouseId",
                element: (
                    <WarehouseView />
                )
            },
            {
                path: "warehouses/:warehouseId/edit",
                element: (
                    <WarehouseUpdate />
                )
            },
            {
                path: "companies",
                element: (
                    <CompaniesList />
                )
            },
            {
                path: "companies/new",
                element: (
                    <CompanyCreate />
                )
            },
            {
                path: "companies/:companyId",
                element: (
                    <CompanyView />
                )
            },
            {
                path: "companies/:companyId/edit",
                element: (
                    <CompanyUpdate />
                )
            },
            {
                path: "products",
                element: (
                    <ProductsList />
                )
            },
            {
                path: "products/create",
                element: (
                    <ProductCreate />
                )
            },
            {
                path: "products/:productId",
                element: (
                    <ProductView />
                )
            },
            {
                path: "products/:productId/edit",
                element: (
                    <ProductUpdate />
                )
            },
            {
                path: "products/lots",
                element: (
                    <LotsList />
                )
            },
            {
                path: "products/lots/create",
                element: (
                    <LotCreate />
                )
            },
            {
                path: "products/lots/:lotId",
                element: (
                    <LotView />
                )
            },
            {
                path: "products/lots/:lotId/edit",
                element: (
                    <LotUpdate />
                )
            },
            {
                path: "products/uom",
                element: (
                    <UOMList />
                )
            },
            {
                path: "products/uom/create",
                element: (
                    <UOMCreate />
                )
            },
            {
                path: "products/uom/:uomId",
                element: (
                    <UOMView />
                )
            },
            {
                path: "products/uom/:uomId/edit",
                element: (
                    <UOMUpdate />
                )
            }
        ]
    }
]);