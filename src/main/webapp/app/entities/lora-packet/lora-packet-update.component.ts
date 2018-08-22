import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ILoraPacket } from 'app/shared/model/lora-packet.model';
import { LoraPacketService } from './lora-packet.service';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from 'app/entities/sensor-device';

@Component({
    selector: 'jhi-lora-packet-update',
    templateUrl: './lora-packet-update.component.html'
})
export class LoraPacketUpdateComponent implements OnInit {
    private _loraPacket: ILoraPacket;
    isSaving: boolean;

    sensordevices: ISensorDevice[];
    timestamp: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private loraPacketService: LoraPacketService,
        private sensorDeviceService: SensorDeviceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loraPacket }) => {
            this.loraPacket = loraPacket;
        });
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
        this.loraPacket.timestamp = moment(this.timestamp, DATE_TIME_FORMAT);
        if (this.loraPacket.id !== undefined) {
            this.subscribeToSaveResponse(this.loraPacketService.update(this.loraPacket));
        } else {
            this.subscribeToSaveResponse(this.loraPacketService.create(this.loraPacket));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILoraPacket>>) {
        result.subscribe((res: HttpResponse<ILoraPacket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get loraPacket() {
        return this._loraPacket;
    }

    set loraPacket(loraPacket: ILoraPacket) {
        this._loraPacket = loraPacket;
        this.timestamp = moment(loraPacket.timestamp).format(DATE_TIME_FORMAT);
    }
}
