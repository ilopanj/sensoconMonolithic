import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SensoconMonolithicBarchartModule } from './barchart/barchart.module';
import { SensoconMonolithicDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { SensoconMonolithicLinechartModule } from './linechart/linechart.module';
import { SensoconMonolithicPiechartModule } from './piechart/piechart.module';
import { SensoconMonolithicPolarareachartModule } from './polarareachart/polarareachart.module';
import { SensoconMonolithicRadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        SensoconMonolithicBarchartModule,
        SensoconMonolithicDoughnutchartModule,
        SensoconMonolithicLinechartModule,
        SensoconMonolithicPiechartModule,
        SensoconMonolithicPolarareachartModule,
        SensoconMonolithicRadarchartModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicDashboardModule {}
