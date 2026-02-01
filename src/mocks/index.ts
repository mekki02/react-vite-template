import { setupWorker } from 'msw/browser';

import { userHandlers } from './handlers/users';
import { resourceHandlers } from './handlers/resources';
import { companiesHandlers } from './handlers/companies';
import { warehousesHandlers } from './handlers/warehouses';

// Setup browser service worker using the given handlers
export const worker = setupWorker(
    ...userHandlers,
    ...companiesHandlers,
    ...warehousesHandlers,
    ...resourceHandlers
);

export const startMockServiceWorker = () => {
    worker.start();
}

export const stopMockServiceWorker = () => {
    worker.stop();
}