import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoraGateway } from 'app/shared/model/lora-gateway.model';

@Component({
    selector: 'jhi-lora-gateway-detail',
    templateUrl: './lora-gateway-detail.component.html'
})
export class LoraGatewayDetailComponent implements OnInit {
    loraGateway: ILoraGateway;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loraGateway }) => {
            this.loraGateway = loraGateway;
        });
    }

    previousState() {
        window.history.back();
    }
}
