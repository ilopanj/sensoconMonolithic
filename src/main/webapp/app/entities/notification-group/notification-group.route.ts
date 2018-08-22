import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationGroup } from 'app/shared/model/notification-group.model';
import { NotificationGroupService } from './notification-group.service';
import { NotificationGroupComponent } from './notification-group.component';
import { NotificationGroupDetailComponent } from './notification-group-detail.component';
import { NotificationGroupUpdateComponent } from './notification-group-update.component';
import { NotificationGroupDeletePopupComponent } from './notification-group-delete-dialog.component';
import { INotificationGroup } from 'app/shared/model/notification-group.model';

@Injectable({ providedIn: 'root' })
export class NotificationGroupResolve implements Resolve<INotificationGroup> {
    constructor(private service: NotificationGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((notificationGroup: HttpResponse<NotificationGroup>) => notificationGroup.body));
        }
        return of(new NotificationGroup());
    }
}

export const notificationGroupRoute: Routes = [
    {
        path: 'notification-group',
        component: NotificationGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-group/:id/view',
        component: NotificationGroupDetailComponent,
        resolve: {
            notificationGroup: NotificationGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-group/new',
        component: NotificationGroupUpdateComponent,
        resolve: {
            notificationGroup: NotificationGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-group/:id/edit',
        component: NotificationGroupUpdateComponent,
        resolve: {
            notificationGroup: NotificationGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificationGroupPopupRoute: Routes = [
    {
        path: 'notification-group/:id/delete',
        component: NotificationGroupDeletePopupComponent,
        resolve: {
            notificationGroup: NotificationGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
