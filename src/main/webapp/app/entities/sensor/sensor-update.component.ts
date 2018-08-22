import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from 'app/entities/sensor-device';

@Component({
    selector: 'jhi-sensor-update',
    templateUrl: './sensor-update.component.html'
})
export class SensorUpdateComponent implements OnInit {
    private _sensor: ISensor;
    isSaving: boolean;

    sensordevices: ISensorDevice[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sensorService: SensorService,
        private sensorDeviceService: SensorDeviceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensor }) => {
            this.sensor = sensor;
        });
        this.sensorDeviceService.query().subscribe(
            (res: HttpResponse<ISensorDevice[]>) => {
                this.sensordevices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sensor.id !== undefined) {
            this.subscribeToSaveResponse(this.sensorService.update(this.sensor));
        } else {
            this.subscribeToSaveResponse(this.sensorService.create(this.sensor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISensor>>) {
        result.subscribe((res: HttpResponse<ISensor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSensorDeviceById(index: number, item: ISensorDevice) {
        return item.id;
    }
    get sensor() {
        return this._sensor;
    }

    set sensor(sensor: ISensor) {
        this._sensor = sensor;
    }
}
