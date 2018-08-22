import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from './sensor-device.service';
import { SensorDeviceComponent } from './sensor-device.component';
import { SensorDeviceDetailComponent } from './sensor-device-detail.component';
import { SensorDeviceUpdateComponent } from './sensor-device-update.component';
import { SensorDeviceDeletePopupComponent } from './sensor-device-delete-dialog.component';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';

@Injectable({ providedIn: 'root' })
export class SensorDeviceResolve implements Resolve<ISensorDevice> {
    constructor(private service: SensorDeviceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sensorDevice: HttpResponse<SensorDevice>) => sensorDevice.body));
        }
        return of(new SensorDevice());
    }
}

export const sensorDeviceRoute: Routes = [
    {
        path: 'sensor-device',
        component: SensorDeviceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorDevices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-device/:id/view',
        component: SensorDeviceDetailComponent,
        resolve: {
            sensorDevice: SensorDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorDevices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-device/new',
        component: SensorDeviceUpdateComponent,
        resolve: {
            sensorDevice: SensorDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorDevices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sensor-device/:id/edit',
        component: SensorDeviceUpdateComponent,
        resolve: {
            sensorDevice: SensorDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorDevices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sensorDevicePopupRoute: Routes = [
    {
        path: 'sensor-device/:id/delete',
        component: SensorDeviceDeletePopupComponent,
        resolve: {
            sensorDevice: SensorDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SensorDevices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
