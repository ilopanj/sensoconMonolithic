import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from './sensor-device.service';
import { INotificationGroup } from 'app/shared/model/notification-group.model';
import { NotificationGroupService } from 'app/entities/notification-group';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
    selector: 'jhi-sensor-device-update',
    templateUrl: './sensor-device-update.component.html'
})
export class SensorDeviceUpdateComponent implements OnInit {
    private _sensorDevice: ISensorDevice;
    isSaving: boolean;

    notificationgroups: INotificationGroup[];

    locations: ILocation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sensorDeviceService: SensorDeviceService,
        private notificationGroupService: NotificationGroupService,
        private locationService: LocationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensorDevice }) => {
            this.sensorDevice = sensorDevice;
        });
        this.notificationGroupService.query().subscribe(
            (res: HttpResponse<INotificationGroup[]>) => {
                this.notificationgroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocation[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sensorDevice.id !== undefined) {
            this.subscribeToSaveResponse(this.sensorDeviceService.update(this.sensorDevice));
        } else {
            this.subscribeToSaveResponse(this.sensorDeviceService.create(this.sensorDevice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISensorDevice>>) {
        result.subscribe((res: HttpResponse<ISensorDevice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNotificationGroupById(index: number, item: INotificationGroup) {
        return item.id;
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }
    get sensorDevice() {
        return this._sensorDevice;
    }

    set sensorDevice(sensorDevice: ISensorDevice) {
        this._sensorDevice = sensorDevice;
    }
}
