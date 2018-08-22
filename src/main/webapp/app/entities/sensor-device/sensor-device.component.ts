import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { Principal } from 'app/core';
import { SensorDeviceService } from './sensor-device.service';

@Component({
    selector: 'jhi-sensor-device',
    templateUrl: './sensor-device.component.html'
})
export class SensorDeviceComponent implements OnInit, OnDestroy {
    sensorDevices: ISensorDevice[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sensorDeviceService: SensorDeviceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sensorDeviceService.query().subscribe(
            (res: HttpResponse<ISensorDevice[]>) => {
                this.sensorDevices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSensorDevices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISensorDevice) {
        return item.id;
    }

    registerChangeInSensorDevices() {
        this.eventSubscriber = this.eventManager.subscribe('sensorDeviceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
