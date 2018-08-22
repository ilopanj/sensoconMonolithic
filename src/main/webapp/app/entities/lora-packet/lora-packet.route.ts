import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoraPacket } from 'app/shared/model/lora-packet.model';
import { LoraPacketService } from './lora-packet.service';
import { LoraPacketComponent } from './lora-packet.component';
import { LoraPacketDetailComponent } from './lora-packet-detail.component';
import { LoraPacketUpdateComponent } from './lora-packet-update.component';
import { LoraPacketDeletePopupComponent } from './lora-packet-delete-dialog.component';
import { ILoraPacket } from 'app/shared/model/lora-packet.model';

@Injectable({ providedIn: 'root' })
export class LoraPacketResolve implements Resolve<ILoraPacket> {
    constructor(private service: LoraPacketService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((loraPacket: HttpResponse<LoraPacket>) => loraPacket.body));
        }
        return of(new LoraPacket());
    }
}

export const loraPacketRoute: Routes = [
    {
        path: 'lora-packet',
        component: LoraPacketComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraPackets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lora-packet/:id/view',
        component: LoraPacketDetailComponent,
        resolve: {
            loraPacket: LoraPacketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraPackets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lora-packet/new',
        component: LoraPacketUpdateComponent,
        resolve: {
            loraPacket: LoraPacketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraPackets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lora-packet/:id/edit',
        component: LoraPacketUpdateComponent,
        resolve: {
            loraPacket: LoraPacketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraPackets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loraPacketPopupRoute: Routes = [
    {
        path: 'lora-packet/:id/delete',
        component: LoraPacketDeletePopupComponent,
        resolve: {
            loraPacket: LoraPacketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoraPackets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
