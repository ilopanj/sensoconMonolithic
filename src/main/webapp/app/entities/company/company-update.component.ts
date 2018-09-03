import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';
import { ICompanySettings } from 'app/shared/model/company-settings.model';
import { CompanySettingsService } from 'app/entities/company-settings';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    private _company: ICompany;
    isSaving: boolean;

    companysettings: ICompanySettings[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyService,
        private companySettingsService: CompanySettingsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.companySettingsService.query({ filter: 'company-is-null' }).subscribe(
            (res: HttpResponse<ICompanySettings[]>) => {
                if (!this.company.companySettingsId) {
                    this.companysettings = res.body;
                } else {
                    this.companySettingsService.find(this.company.companySettingsId).subscribe(
                        (subRes: HttpResponse<ICompanySettings>) => {
                            this.companysettings = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
        result.subscribe((res: HttpResponse<ICompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanySettingsById(index: number, item: ICompanySettings) {
        return item.id;
    }
    get company() {
        return this._company;
    }

    set company(company: ICompany) {
        this._company = company;
    }
}
