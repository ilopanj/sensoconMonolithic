import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { HiThereComponent } from './';

export const HI_THERE_ROUTE: Route = {
    path: 'hi-there',
    component: HiThereComponent,
    data: {
        authorities: [],
        pageTitle: 'hi-there.title'
    },
    canActivate: [UserRouteAccessService]
};
