import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanySettings } from 'app/shared/model/company-settings.model';

@Component({
    selector: 'jhi-company-settings-detail',
    templateUrl: './company-settings-detail.component.html'
})
export class CompanySettingsDetailComponent implements OnInit {
    companySettings: ICompanySettings;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companySettings }) => {
            this.companySettings = companySettings;
        });
    }

    previousState() {
        window.history.back();
    }
}
