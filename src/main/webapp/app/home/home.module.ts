///<reference path="../../../../../node_modules/@angular/core/src/metadata/ng_module.d.ts"/>
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent, LocationSensorDialogComponent } from './';
import { SensorGraphComponent } from 'app/sensor-graph/sensor-graph.component';

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(HOME_ROUTE)],
    declarations: [HomeComponent, LocationSensorDialogComponent, SensorGraphComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicHomeModule {}
