import { HomeComponent } from './';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ILocation } from 'app/shared/model/location.model';

/**
 * LocationResolve
 */
@Injectable({ providedIn: 'root' })
export class LocationResolve implements Resolve<ILocation> {
    constructor(private service: LocationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((location: HttpResponse<Location>) => location.body));
        }
        return of(new Location());
    }
}

/**
 * HOME_ROUTE
 *
 * @type {({path: string; component: HomeComponent; data: {authorities: any[]; pageTitle: string};
 *          canActivate: UserRouteAccessService[]} |
 *          {path: string; component: HomeComponent;
 *          data: {authorities: any[]; pageTitle: string}; canActivate: UserRouteAccessService[]})[]}
 */
export const HOME_ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'Sensicon'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detail/:id/view',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'Sensicon Details'
        },
        canActivate: [UserRouteAccessService]
    }
];
