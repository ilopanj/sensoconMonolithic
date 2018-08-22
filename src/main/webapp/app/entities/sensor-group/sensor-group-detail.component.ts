import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensorGroup } from 'app/shared/model/sensor-group.model';

@Component({
    selector: 'jhi-sensor-group-detail',
    templateUrl: './sensor-group-detail.component.html'
})
export class SensorGroupDetailComponent implements OnInit {
    sensorGroup: ISensorGroup;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sensorGroup }) => {
            this.sensorGroup = sensorGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
