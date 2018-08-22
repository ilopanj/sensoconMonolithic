import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    CompanySettingsComponent,
    CompanySettingsDetailComponent,
    CompanySettingsUpdateComponent,
    CompanySettingsDeletePopupComponent,
    CompanySettingsDeleteDialogComponent,
    companySettingsRoute,
    companySettingsPopupRoute
} from './';

const ENTITY_STATES = [...companySettingsRoute, ...companySettingsPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanySettingsComponent,
        CompanySettingsDetailComponent,
        CompanySettingsUpdateComponent,
        CompanySettingsDeleteDialogComponent,
        CompanySettingsDeletePopupComponent
    ],
    entryComponents: [
        CompanySettingsComponent,
        CompanySettingsUpdateComponent,
        CompanySettingsDeleteDialogComponent,
        CompanySettingsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicCompanySettingsModule {}
