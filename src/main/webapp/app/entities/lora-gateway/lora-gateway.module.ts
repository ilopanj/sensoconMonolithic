import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    LoraGatewayComponent,
    LoraGatewayDetailComponent,
    LoraGatewayUpdateComponent,
    LoraGatewayDeletePopupComponent,
    LoraGatewayDeleteDialogComponent,
    loraGatewayRoute,
    loraGatewayPopupRoute
} from './';

const ENTITY_STATES = [...loraGatewayRoute, ...loraGatewayPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LoraGatewayComponent,
        LoraGatewayDetailComponent,
        LoraGatewayUpdateComponent,
        LoraGatewayDeleteDialogComponent,
        LoraGatewayDeletePopupComponent
    ],
    entryComponents: [LoraGatewayComponent, LoraGatewayUpdateComponent, LoraGatewayDeleteDialogComponent, LoraGatewayDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicLoraGatewayModule {}
