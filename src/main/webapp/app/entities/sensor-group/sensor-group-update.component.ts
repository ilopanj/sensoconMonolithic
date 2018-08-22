import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISensorGroup } from 'app/shared/model/sensor-group.model';
import { SensorGroupService } from './sensor-group.service';

@Component({
    selector: 'jhi-sensor-group-update',
    templateUrl: './sensor-group-update.component.html'
})
export class SensorGroupUpdateComponent implements OnInit {
    private _sensorGroup: ISensorGroup;
    isSaving: boolean;

    constructor(private sensorGroupService: SensorGroupService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensorGroup }) => {
            this.sensorGroup = sensorGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sensorGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.sensorGroupService.update(this.sensorGroup));
        } else {
            this.subscribeToSaveResponse(this.sensorGroupService.create(this.sensorGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISensorGroup>>) {
        result.subscribe((res: HttpResponse<ISensorGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get sensorGroup() {
        return this._sensorGroup;
    }

    set sensorGroup(sensorGroup: ISensorGroup) {
        this._sensorGroup = sensorGroup;
    }
}
