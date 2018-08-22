import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanySettings } from 'app/shared/model/company-settings.model';
import { CompanySettingsService } from './company-settings.service';
import { CompanySettingsComponent } from './company-settings.component';
import { CompanySettingsDetailComponent } from './company-settings-detail.component';
import { CompanySettingsUpdateComponent } from './company-settings-update.component';
import { CompanySettingsDeletePopupComponent } from './company-settings-delete-dialog.component';
import { ICompanySettings } from 'app/shared/model/company-settings.model';

@Injectable({ providedIn: 'root' })
export class CompanySettingsResolve implements Resolve<ICompanySettings> {
    constructor(private service: CompanySettingsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((companySettings: HttpResponse<CompanySettings>) => companySettings.body));
        }
        return of(new CompanySettings());
    }
}

export const companySettingsRoute: Routes = [
    {
        path: 'company-settings',
        component: CompanySettingsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanySettings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-settings/:id/view',
        component: CompanySettingsDetailComponent,
        resolve: {
            companySettings: CompanySettingsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanySettings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-settings/new',
        component: CompanySettingsUpdateComponent,
        resolve: {
            companySettings: CompanySettingsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanySettings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-settings/:id/edit',
        component: CompanySettingsUpdateComponent,
        resolve: {
            companySettings: CompanySettingsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanySettings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companySettingsPopupRoute: Routes = [
    {
        path: 'company-settings/:id/delete',
        component: CompanySettingsDeletePopupComponent,
        resolve: {
            companySettings: CompanySettingsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanySettings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
