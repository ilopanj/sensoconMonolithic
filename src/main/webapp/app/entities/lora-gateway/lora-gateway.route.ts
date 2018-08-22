import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoraGateway } from 'app/shared/model/lora-gateway.model';
import { LoraGatewayService } from './lora-gateway.service';
import { LoraGatewayComponent } from './lora-gateway.component';
import { LoraGatewayDetailComponent } from './lora-gateway-detail.component';
import { LoraGatewayUpdateComponent } from './lora-gateway-update.component';
import { LoraGatewayDeletePopupComponent } from './lora-gateway-delete-dialog.component';
import { ILoraGateway } from 'app/shared/model/lora-gateway.model';

@Injectable({ providedIn: 'root' })
export class LoraGatewayResolve implements Resolve<ILoraGateway> {
    constructor(private service: LoraGatewayService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((loraGateway: HttpResponse<LoraGateway>) => loraGateway.body));
        }
        return of(new LoraGateway());
    }
}

export const loraGatewayRoute: Routes = [
    {
        path: 'lora-gateway',
        component: LoraGatewayComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraGateways'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lora-gateway/:id/view',
        component: LoraGatewayDetailComponent,
        resolve: {
            loraGateway: LoraGatewayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraGateways'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lora-gateway/new',
        component: LoraGatewayUpdateComponent,
        resolve: {
            loraGateway: LoraGatewayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraGateways'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lora-gateway/:id/edit',
        component: LoraGatewayUpdateComponent,
        resolve: {
            loraGateway: LoraGatewayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraGateways'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loraGatewayPopupRoute: Routes = [
    {
        path: 'lora-gateway/:id/delete',
        component: LoraGatewayDeletePopupComponent,
        resolve: {
            loraGateway: LoraGatewayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraGateways'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
