import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import { AppProvider } from './contexts/app-context/index.tsx'
import { worker } from './mocks/index.ts'
import './index.css'
import './utils/i18n'
import { CustomThemeProvider } from "./contexts/theme-context";


if (import.meta.env.MODE === 'development') {
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <AppProvider>
        <RouterProvider
          router={router}
        />
      </AppProvider>
    </CustomThemeProvider>
  </StrictMode>,
)
