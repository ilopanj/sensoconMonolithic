import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILoraGateway } from 'app/shared/model/lora-gateway.model';
import { Principal } from 'app/core';
import { LoraGatewayService } from './lora-gateway.service';

@Component({
    selector: 'jhi-lora-gateway',
    templateUrl: './lora-gateway.component.html'
})
export class LoraGatewayComponent implements OnInit, OnDestroy {
    loraGateways: ILoraGateway[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private loraGatewayService: LoraGatewayService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.loraGatewayService.query().subscribe(
            (res: HttpResponse<ILoraGateway[]>) => {
                this.loraGateways = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLoraGateways();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILoraGateway) {
        return item.id;
    }

    registerChangeInLoraGateways() {
        this.eventSubscriber = this.eventManager.subscribe('loraGatewayListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
