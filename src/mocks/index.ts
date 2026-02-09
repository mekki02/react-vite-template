import { setupWorker } from 'msw/browser';

import { userHandlers } from './handlers/users';
import { resourceHandlers } from './handlers/resources';
import { companiesHandlers } from './handlers/companies';
import { warehousesHandlers } from './handlers/warehouses';
import { productHandlers } from './handlers/products';
import { lotHandlers } from './handlers/lots';
import { invitationHandlers } from './handlers/invitations';
import { uomHandlers } from './handlers/uom';
import { organizationHandlers } from './handlers/organizations';

// Setup browser service worker using the given handlers
export const worker = setupWorker(
    ...userHandlers,
    ...companiesHandlers,
    ...warehousesHandlers,
    ...resourceHandlers,
    ...productHandlers,
    ...lotHandlers,
    ...invitationHandlers,
    ...uomHandlers,
    ...organizationHandlers
);

export const startMockServiceWorker = () => {
    worker.start();
}

export const stopMockServiceWorker = () => {
    worker.stop();
}