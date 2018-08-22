import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    SensorComponent,
    SensorDetailComponent,
    SensorUpdateComponent,
    SensorDeletePopupComponent,
    SensorDeleteDialogComponent,
    sensorRoute,
    sensorPopupRoute
} from './';

const ENTITY_STATES = [...sensorRoute, ...sensorPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SensorComponent, SensorDetailComponent, SensorUpdateComponent, SensorDeleteDialogComponent, SensorDeletePopupComponent],
    entryComponents: [SensorComponent, SensorUpdateComponent, SensorDeleteDialogComponent, SensorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicSensorModule {}
