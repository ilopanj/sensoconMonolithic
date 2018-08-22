import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';
import { Principal } from 'app/core';
import { SensorThresholdService } from './sensor-threshold.service';

@Component({
    selector: 'jhi-sensor-threshold',
    templateUrl: './sensor-threshold.component.html'
})
export class SensorThresholdComponent implements OnInit, OnDestroy {
    sensorThresholds: ISensorThreshold[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sensorThresholdService: SensorThresholdService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sensorThresholdService.query().subscribe(
            (res: HttpResponse<ISensorThreshold[]>) => {
                this.sensorThresholds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSensorThresholds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISensorThreshold) {
        return item.id;
    }

    registerChangeInSensorThresholds() {
        this.eventSubscriber = this.eventManager.subscribe('sensorThresholdListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
