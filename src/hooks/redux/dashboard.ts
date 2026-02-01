import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { DashboardStoreState, DashboardStoreDispatch } from './../../pages/dashboard/redux/store'

export const useDashboardStoreDispatch = () => useDispatch<DashboardStoreDispatch>()
export const useDashboardStoreSelector: TypedUseSelectorHook<DashboardStoreState> = useSelector