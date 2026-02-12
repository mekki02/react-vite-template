import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import { AppProvider } from '@contexts/app-context/index.tsx'
import { store } from './store'
import { worker } from '@mocks/index.ts'
import './index.css'
import './utils/i18n'
import { CustomThemeProvider } from "@contexts/theme-context";
import NotificationsProvider from '@contexts/notification-context/index.tsx'

if (import.meta.env.MODE === 'development') {
  // worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <NotificationsProvider>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </NotificationsProvider>
      </CustomThemeProvider>
    </Provider>
  </StrictMode>,
)
