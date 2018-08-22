import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensoconMonolithicSharedModule } from 'app/shared';
import {
    LoraPacketComponent,
    LoraPacketDetailComponent,
    LoraPacketUpdateComponent,
    LoraPacketDeletePopupComponent,
    LoraPacketDeleteDialogComponent,
    loraPacketRoute,
    loraPacketPopupRoute
} from './';

const ENTITY_STATES = [...loraPacketRoute, ...loraPacketPopupRoute];

@NgModule({
    imports: [SensoconMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LoraPacketComponent,
        LoraPacketDetailComponent,
        LoraPacketUpdateComponent,
        LoraPacketDeleteDialogComponent,
        LoraPacketDeletePopupComponent
    ],
    entryComponents: [LoraPacketComponent, LoraPacketUpdateComponent, LoraPacketDeleteDialogComponent, LoraPacketDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicLoraPacketModule {}
