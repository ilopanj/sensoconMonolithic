import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    SensorGroupComponent,
    SensorGroupDetailComponent,
    SensorGroupUpdateComponent,
    SensorGroupDeletePopupComponent,
    SensorGroupDeleteDialogComponent,
    sensorGroupRoute,
    sensorGroupPopupRoute
} from './';

const ENTITY_STATES = [...sensorGroupRoute, ...sensorGroupPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SensorGroupComponent,
        SensorGroupDetailComponent,
        SensorGroupUpdateComponent,
        SensorGroupDeleteDialogComponent,
        SensorGroupDeletePopupComponent
    ],
    entryComponents: [SensorGroupComponent, SensorGroupUpdateComponent, SensorGroupDeleteDialogComponent, SensorGroupDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicSensorGroupModule {}
