import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';
import { SensorThresholdService } from './sensor-threshold.service';

@Component({
    selector: 'jhi-sensor-threshold-update',
    templateUrl: './sensor-threshold-update.component.html'
})
export class SensorThresholdUpdateComponent implements OnInit {
    private _sensorThreshold: ISensorThreshold;
    isSaving: boolean;

    constructor(private sensorThresholdService: SensorThresholdService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensorThreshold }) => {
            this.sensorThreshold = sensorThreshold;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sensorThreshold.id !== undefined) {
            this.subscribeToSaveResponse(this.sensorThresholdService.update(this.sensorThreshold));
        } else {
            this.subscribeToSaveResponse(this.sensorThresholdService.create(this.sensorThreshold));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISensorThreshold>>) {
        result.subscribe((res: HttpResponse<ISensorThreshold>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get sensorThreshold() {
        return this._sensorThreshold;
    }

    set sensorThreshold(sensorThreshold: ISensorThreshold) {
        this._sensorThreshold = sensorThreshold;
    }
}
