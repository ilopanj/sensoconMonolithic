import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    SensorDeviceComponent,
    SensorDeviceDetailComponent,
    SensorDeviceUpdateComponent,
    SensorDeviceDeletePopupComponent,
    SensorDeviceDeleteDialogComponent,
    sensorDeviceRoute,
    sensorDevicePopupRoute
} from './';

const ENTITY_STATES = [...sensorDeviceRoute, ...sensorDevicePopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SensorDeviceComponent,
        SensorDeviceDetailComponent,
        SensorDeviceUpdateComponent,
        SensorDeviceDeleteDialogComponent,
        SensorDeviceDeletePopupComponent
    ],
    entryComponents: [
        SensorDeviceComponent,
        SensorDeviceUpdateComponent,
        SensorDeviceDeleteDialogComponent,
        SensorDeviceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicSensorDeviceModule {}
