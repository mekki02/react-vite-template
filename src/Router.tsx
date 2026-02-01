import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
// import AuthGuard from "./guards/auth-guard";

const Page = lazy(() => import("./pages/page/Page"));
const Login = lazy(() => import("./pages/login/Login2"));
const Register = lazy(() => import("./pages/register/Register"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Home = lazy(() => import("./pages/dashboard/pages/home/index"));

const UserList = lazy(() => import("./pages/dashboard/pages/users/index"));
const UserUpdate = lazy(() => import("./pages/dashboard/pages/users/update-user/index"));
const UserView = lazy(() => import("./pages/dashboard/pages/users/user-view/index"));

const WarehouseList = lazy(() => import("./pages/dashboard/pages/warehouses/index"));
const WarehouseCreate = lazy(() => import("./pages/dashboard/pages/warehouses/create-warehouse/index"));
const WarehouseUpdate = lazy(() => import("./pages/dashboard/pages/warehouses/update-warehouse/index"));
const WarehouseView = lazy(() => import("./pages/dashboard/pages/warehouses/warehouse-view/index"));

const CompaniesList = lazy(() => import("./pages/dashboard/pages/companies/index"));
const CompanyCreate = lazy(() => import("./pages/dashboard/pages/companies/create-company/index"));
const CompanyUpdate = lazy(() => import("./pages/dashboard/pages/companies/update-company/index"));
const CompanyView = lazy(() => import("./pages/dashboard/pages/companies/company-view/index"));
 

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
            }
        ]
    }
]);