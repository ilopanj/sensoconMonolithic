import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { ISensorGroup } from 'app/shared/model/sensor-group.model';
import { SensorGroupService } from 'app/entities/sensor-group';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from 'app/entities/sensor-device';

@Component({
    selector: 'jhi-sensor-update',
    templateUrl: './sensor-update.component.html'
})
export class SensorUpdateComponent implements OnInit {
    private _sensor: ISensor;
    isSaving: boolean;

    sensorgroups: ISensorGroup[];

    sensordevices: ISensorDevice[];
    lastAlert: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sensorService: SensorService,
        private sensorGroupService: SensorGroupService,
        private sensorDeviceService: SensorDeviceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensor }) => {
            this.sensor = sensor;
        });
        this.sensorGroupService.query({ filter: 'sensor-is-null' }).subscribe(
            (res: HttpResponse<ISensorGroup[]>) => {
                if (!this.sensor.sensorGroup || !this.sensor.sensorGroup.id) {
                    this.sensorgroups = res.body;
                } else {
                    this.sensorGroupService.find(this.sensor.sensorGroup.id).subscribe(
                        (subRes: HttpResponse<ISensorGroup>) => {
                            this.sensorgroups = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.sensor.lastAlert = moment(this.lastAlert, DATE_TIME_FORMAT);
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

    trackSensorGroupById(index: number, item: ISensorGroup) {
        return item.id;
    }

    trackSensorDeviceById(index: number, item: ISensorDevice) {
        return item.id;
    }
    get sensor() {
        return this._sensor;
    }

    set sensor(sensor: ISensor) {
        this._sensor = sensor;
        this.lastAlert = moment(sensor.lastAlert).format(DATE_TIME_FORMAT);
    }
}
