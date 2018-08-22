import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISensorGroup } from 'app/shared/model/sensor-group.model';
import { Principal } from 'app/core';
import { SensorGroupService } from './sensor-group.service';

@Component({
    selector: 'jhi-sensor-group',
    templateUrl: './sensor-group.component.html'
})
export class SensorGroupComponent implements OnInit, OnDestroy {
    sensorGroups: ISensorGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sensorGroupService: SensorGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sensorGroupService.query().subscribe(
            (res: HttpResponse<ISensorGroup[]>) => {
                this.sensorGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSensorGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISensorGroup) {
        return item.id;
    }

    registerChangeInSensorGroups() {
        this.eventSubscriber = this.eventManager.subscribe('sensorGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
