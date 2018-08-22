import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';

@Component({
    selector: 'jhi-sensor-threshold-detail',
    templateUrl: './sensor-threshold-detail.component.html'
})
export class SensorThresholdDetailComponent implements OnInit {
    sensorThreshold: ISensorThreshold;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sensorThreshold }) => {
            this.sensorThreshold = sensorThreshold;
        });
    }

    previousState() {
        window.history.back();
    }
}
