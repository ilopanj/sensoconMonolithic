import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { SensorComponent } from './sensor.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorUpdateComponent } from './sensor-update.component';
import { SensorDeletePopupComponent } from './sensor-delete-dialog.component';
import { ISensor } from 'app/shared/model/sensor.model';

@Injectable({ providedIn: 'root' })
export class SensorResolve implements Resolve<ISensor> {
    constructor(private service: SensorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sensor: HttpResponse<Sensor>) => sensor.body));
        }
        return of(new Sensor());
    }
}

export const sensorRoute: Routes = [
    {
        path: 'sensor',
        component: SensorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sensors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor/:id/view',
        component: SensorDetailComponent,
        resolve: {
            sensor: SensorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sensors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor/new',
        component: SensorUpdateComponent,
        resolve: {
            sensor: SensorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sensors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor/:id/edit',
        component: SensorUpdateComponent,
        resolve: {
            sensor: SensorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sensors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sensorPopupRoute: Routes = [
    {
        path: 'sensor/:id/delete',
        component: SensorDeletePopupComponent,
        resolve: {
            sensor: SensorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sensors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
