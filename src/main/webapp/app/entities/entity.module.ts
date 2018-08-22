import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SensoconMonolithicCompanyModule } from './company/company.module';
import { SensoconMonolithicCompanySettingsModule } from './company-settings/company-settings.module';
import { SensoconMonolithicContactModule } from './contact/contact.module';
import { SensoconMonolithicSensorDeviceModule } from './sensor-device/sensor-device.module';
import { SensoconMonolithicSensorModule } from './sensor/sensor.module';
import { SensoconMonolithicSensorThresholdModule } from './sensor-threshold/sensor-threshold.module';
import { SensoconMonolithicSensorGroupModule } from './sensor-group/sensor-group.module';
import { SensoconMonolithicNotificationGroupModule } from './notification-group/notification-group.module';
import { SensoconMonolithicLoraGatewayModule } from './lora-gateway/lora-gateway.module';
import { SensoconMonolithicLoraPacketModule } from './lora-packet/lora-packet.module';
import { SensoconMonolithicLocationModule } from './location/location.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SensoconMonolithicCompanyModule,
        SensoconMonolithicCompanySettingsModule,
        SensoconMonolithicContactModule,
        SensoconMonolithicSensorDeviceModule,
        SensoconMonolithicSensorModule,
        SensoconMonolithicSensorThresholdModule,
        SensoconMonolithicSensorGroupModule,
        SensoconMonolithicNotificationGroupModule,
        SensoconMonolithicLoraGatewayModule,
        SensoconMonolithicLoraPacketModule,
        SensoconMonolithicLocationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SensoconMonolithicEntityModule {}
