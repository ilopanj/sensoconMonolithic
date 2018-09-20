import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlotChartComponent } from './flot-chart.component';

@NgModule({
    imports: [CommonModule, FlotChartComponent],
    declarations: [FlotChartComponent],
    exports: [FlotChartComponent]
})
export class FlotChartModule {}
