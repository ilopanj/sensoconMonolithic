import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    NotificationGroupComponent,
    NotificationGroupDetailComponent,
    NotificationGroupUpdateComponent,
    NotificationGroupDeletePopupComponent,
    NotificationGroupDeleteDialogComponent,
    notificationGroupRoute,
    notificationGroupPopupRoute
} from './';

const ENTITY_STATES = [...notificationGroupRoute, ...notificationGroupPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NotificationGroupComponent,
        NotificationGroupDetailComponent,
        NotificationGroupUpdateComponent,
        NotificationGroupDeleteDialogComponent,
        NotificationGroupDeletePopupComponent
    ],
    entryComponents: [
        NotificationGroupComponent,
        NotificationGroupUpdateComponent,
        NotificationGroupDeleteDialogComponent,
        NotificationGroupDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicNotificationGroupModule {}
