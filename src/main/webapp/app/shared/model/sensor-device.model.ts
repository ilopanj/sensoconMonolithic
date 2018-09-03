import { ISensor } from 'app/shared/model//sensor.model';
import { ISensorThreshold } from 'app/shared/model//sensor-threshold.model';
import { ILoraPacket } from 'app/shared/model//lora-packet.model';

export interface ISensorDevice {
    id?: number;
    deviceId?: string;
    name?: string;
    sensors?: ISensor[];
    thresholds?: ISensorThreshold[];
    notificationGroupId?: number;
    loraPackets?: ILoraPacket[];
    locationId?: number;
}

export class SensorDevice implements ISensorDevice {
    constructor(
        public id?: number,
        public deviceId?: string,
        public name?: string,
        public sensors?: ISensor[],
        public thresholds?: ISensorThreshold[],
        public notificationGroupId?: number,
        public loraPackets?: ILoraPacket[],
        public locationId?: number
    ) {}
}
