import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISensorGroup } from 'app/shared/model/sensor-group.model';
import { SensorGroupService } from './sensor-group.service';
import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from 'app/entities/sensor';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-sensor-group-update',
    templateUrl: './sensor-group-update.component.html'
})
export class SensorGroupUpdateComponent implements OnInit {
    private _sensorGroup: ISensorGroup;
    isSaving: boolean;

    sensors: ISensor[];

    companies: ICompany[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sensorGroupService: SensorGroupService,
        private sensorService: SensorService,
        private companyService: CompanyService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sensorGroup }) => {
            this.sensorGroup = sensorGroup;
        });
        this.sensorService.query().subscribe(
            (res: HttpResponse<ISensor[]>) => {
                this.sensors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSensorById(index: number, item: ISensor) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
    get sensorGroup() {
        return this._sensorGroup;
    }

    set sensorGroup(sensorGroup: ISensorGroup) {
        this._sensorGroup = sensorGroup;
    }
}
