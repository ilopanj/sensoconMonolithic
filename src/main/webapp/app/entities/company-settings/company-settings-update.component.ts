import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompanySettings } from 'app/shared/model/company-settings.model';
import { CompanySettingsService } from './company-settings.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-company-settings-update',
    templateUrl: './company-settings-update.component.html'
})
export class CompanySettingsUpdateComponent implements OnInit {
    private _companySettings: ICompanySettings;
    isSaving: boolean;

    companies: ICompany[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private companySettingsService: CompanySettingsService,
        private companyService: CompanyService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companySettings }) => {
            this.companySettings = companySettings;
        });
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
    get companySettings() {
        return this._companySettings;
    }

    set companySettings(companySettings: ICompanySettings) {
        this._companySettings = companySettings;
    }
}
