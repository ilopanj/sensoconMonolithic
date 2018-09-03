import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';
import { SensorThresholdService } from './sensor-threshold.service';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from 'app/entities/sensor-device';
import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from 'app/entities/sensor';
import { ISensorGroup } from 'app/shared/model/sensor-group.model';
import { SensorGroupService } from 'app/entities/sensor-group';

@Component({
    selector: 'jhi-sensor-threshold-update',
    templateUrl: './sensor-threshold-update.component.html'
})
export class SensorThresholdUpdateComponent implements OnInit {
    private _sensorThreshold: ISensorThreshold;
    isSaving: boolean;

    sensordevices: ISensorDevice[];

    sensors: ISensor[];

    sensorgroups: ISensorGroup[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sensorThresholdService: SensorThresholdService,
        private sensorDeviceService: SensorDeviceService,
        private sensorService: SensorService,
        private sensorGroupService: SensorGroupService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensorThreshold }) => {
            this.sensorThreshold = sensorThreshold;
        });
        this.sensorDeviceService.query().subscribe(
            (res: HttpResponse<ISensorDevice[]>) => {
                this.sensordevices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sensorService.query().subscribe(
            (res: HttpResponse<ISensor[]>) => {
                this.sensors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sensorGroupService.query().subscribe(
            (res: HttpResponse<ISensorGroup[]>) => {
                this.sensorgroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sensorThreshold.id !== undefined) {
            this.subscribeToSaveResponse(this.sensorThresholdService.update(this.sensorThreshold));
        } else {
            this.subscribeToSaveResponse(this.sensorThresholdService.create(this.sensorThreshold));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISensorThreshold>>) {
        result.subscribe((res: HttpResponse<ISensorThreshold>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSensorById(index: number, item: ISensor) {
        return item.id;
    }

    trackSensorGroupById(index: number, item: ISensorGroup) {
        return item.id;
    }
    get sensorThreshold() {
        return this._sensorThreshold;
    }

    set sensorThreshold(sensorThreshold: ISensorThreshold) {
        this._sensorThreshold = sensorThreshold;
    }
}
