import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompanySettings } from 'app/shared/model/company-settings.model';
import { CompanySettingsService } from './company-settings.service';

@Component({
    selector: 'jhi-company-settings-update',
    templateUrl: './company-settings-update.component.html'
})
export class CompanySettingsUpdateComponent implements OnInit {
    private _companySettings: ICompanySettings;
    isSaving: boolean;

    constructor(private companySettingsService: CompanySettingsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companySettings }) => {
            this.companySettings = companySettings;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companySettings.id !== undefined) {
            this.subscribeToSaveResponse(this.companySettingsService.update(this.companySettings));
        } else {
            this.subscribeToSaveResponse(this.companySettingsService.create(this.companySettings));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanySettings>>) {
        result.subscribe((res: HttpResponse<ICompanySettings>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get companySettings() {
        return this._companySettings;
    }

    set companySettings(companySettings: ICompanySettings) {
        this._companySettings = companySettings;
    }
}
