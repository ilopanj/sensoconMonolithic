import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILoraGateway } from 'app/shared/model/lora-gateway.model';
import { LoraGatewayService } from './lora-gateway.service';

@Component({
    selector: 'jhi-lora-gateway-update',
    templateUrl: './lora-gateway-update.component.html'
})
export class LoraGatewayUpdateComponent implements OnInit {
    private _loraGateway: ILoraGateway;
    isSaving: boolean;

    constructor(private loraGatewayService: LoraGatewayService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loraGateway }) => {
            this.loraGateway = loraGateway;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.loraGateway.id !== undefined) {
            this.subscribeToSaveResponse(this.loraGatewayService.update(this.loraGateway));
        } else {
            this.subscribeToSaveResponse(this.loraGatewayService.create(this.loraGateway));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILoraGateway>>) {
        result.subscribe((res: HttpResponse<ILoraGateway>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get loraGateway() {
        return this._loraGateway;
    }

    set loraGateway(loraGateway: ILoraGateway) {
        this._loraGateway = loraGateway;
    }
}
