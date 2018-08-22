import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanySettings } from 'app/shared/model/company-settings.model';
import { Principal } from 'app/core';
import { CompanySettingsService } from './company-settings.service';

@Component({
    selector: 'jhi-company-settings',
    templateUrl: './company-settings.component.html'
})
export class CompanySettingsComponent implements OnInit, OnDestroy {
    companySettings: ICompanySettings[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private companySettingsService: CompanySettingsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.companySettingsService.query().subscribe(
            (res: HttpResponse<ICompanySettings[]>) => {
                this.companySettings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanySettings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanySettings) {
        return item.id;
    }

    registerChangeInCompanySettings() {
        this.eventSubscriber = this.eventManager.subscribe('companySettingsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
