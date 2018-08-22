import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISensor } from 'app/shared/model/sensor.model';
import { Principal } from 'app/core';
import { SensorService } from './sensor.service';

@Component({
    selector: 'jhi-sensor',
    templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit, OnDestroy {
    sensors: ISensor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sensorService: SensorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sensorService.query().subscribe(
            (res: HttpResponse<ISensor[]>) => {
                this.sensors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSensors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISensor) {
        return item.id;
    }

    registerChangeInSensors() {
        this.eventSubscriber = this.eventManager.subscribe('sensorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
