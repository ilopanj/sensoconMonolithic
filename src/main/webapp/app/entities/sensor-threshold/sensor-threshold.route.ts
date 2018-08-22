import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorThreshold } from 'app/shared/model/sensor-threshold.model';
import { SensorThresholdService } from './sensor-threshold.service';
import { SensorThresholdComponent } from './sensor-threshold.component';
import { SensorThresholdDetailComponent } from './sensor-threshold-detail.component';
import { SensorThresholdUpdateComponent } from './sensor-threshold-update.component';
import { SensorThresholdDeletePopupComponent } from './sensor-threshold-delete-dialog.component';
import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';

@Injectable({ providedIn: 'root' })
export class SensorThresholdResolve implements Resolve<ISensorThreshold> {
    constructor(private service: SensorThresholdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sensorThreshold: HttpResponse<SensorThreshold>) => sensorThreshold.body));
        }
        return of(new SensorThreshold());
    }
}

export const sensorThresholdRoute: Routes = [
    {
        path: 'sensor-threshold',
        component: SensorThresholdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorThresholds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-threshold/:id/view',
        component: SensorThresholdDetailComponent,
        resolve: {
            sensorThreshold: SensorThresholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorThresholds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-threshold/new',
        component: SensorThresholdUpdateComponent,
        resolve: {
            sensorThreshold: SensorThresholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorThresholds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-threshold/:id/edit',
        component: SensorThresholdUpdateComponent,
        resolve: {
            sensorThreshold: SensorThresholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorThresholds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sensorThresholdPopupRoute: Routes = [
    {
        path: 'sensor-threshold/:id/delete',
        component: SensorThresholdDeletePopupComponent,
        resolve: {
            sensorThreshold: SensorThresholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorThresholds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
