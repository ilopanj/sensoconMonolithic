import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensorDevice } from 'app/shared/model/sensor-device.model';

@Component({
    selector: 'jhi-sensor-device-detail',
    templateUrl: './sensor-device-detail.component.html'
})
export class SensorDeviceDetailComponent implements OnInit {
    sensorDevice: ISensorDevice;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sensorDevice }) => {
            this.sensorDevice = sensorDevice;
        });
    }

    previousState() {
        window.history.back();
    }
}
