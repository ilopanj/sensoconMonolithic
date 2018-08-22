import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorGroup } from 'app/shared/model/sensor-group.model';
import { SensorGroupService } from './sensor-group.service';
import { SensorGroupComponent } from './sensor-group.component';
import { SensorGroupDetailComponent } from './sensor-group-detail.component';
import { SensorGroupUpdateComponent } from './sensor-group-update.component';
import { SensorGroupDeletePopupComponent } from './sensor-group-delete-dialog.component';
import { ISensorGroup } from 'app/shared/model/sensor-group.model';

@Injectable({ providedIn: 'root' })
export class SensorGroupResolve implements Resolve<ISensorGroup> {
    constructor(private service: SensorGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sensorGroup: HttpResponse<SensorGroup>) => sensorGroup.body));
        }
        return of(new SensorGroup());
    }
}

export const sensorGroupRoute: Routes = [
    {
        path: 'sensor-group',
        component: SensorGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-group/:id/view',
        component: SensorGroupDetailComponent,
        resolve: {
            sensorGroup: SensorGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-group/new',
        component: SensorGroupUpdateComponent,
        resolve: {
            sensorGroup: SensorGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-group/:id/edit',
        component: SensorGroupUpdateComponent,
        resolve: {
            sensorGroup: SensorGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sensorGroupPopupRoute: Routes = [
    {
        path: 'sensor-group/:id/delete',
        component: SensorGroupDeletePopupComponent,
        resolve: {
            sensorGroup: SensorGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
