import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    SensorThresholdComponent,
    SensorThresholdDetailComponent,
    SensorThresholdUpdateComponent,
    SensorThresholdDeletePopupComponent,
    SensorThresholdDeleteDialogComponent,
    sensorThresholdRoute,
    sensorThresholdPopupRoute
} from './';

const ENTITY_STATES = [...sensorThresholdRoute, ...sensorThresholdPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SensorThresholdComponent,
        SensorThresholdDetailComponent,
        SensorThresholdUpdateComponent,
        SensorThresholdDeleteDialogComponent,
        SensorThresholdDeletePopupComponent
    ],
    entryComponents: [
        SensorThresholdComponent,
        SensorThresholdUpdateComponent,
        SensorThresholdDeleteDialogComponent,
        SensorThresholdDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicSensorThresholdModule {}
