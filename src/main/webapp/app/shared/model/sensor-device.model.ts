import { ISensor } from 'app/shared/model//sensor.model';
import { ILoraPacket } from 'app/shared/model//lora-packet.model';

export interface ISensorDevice {
    id?: number;
    deviceId?: string;
    name?: string;
    sensors?: ISensor[];
    loraPackets?: ILoraPacket[];
    locationId?: number;
    notificationGroupId?: number;
}

export class SensorDevice implements ISensorDevice {
    constructor(
        public id?: number,
        public deviceId?: string,
        public name?: string,
        public sensors?: ISensor[],
        public loraPackets?: ILoraPacket[],
        public locationId?: number,
        public notificationGroupId?: number
    ) {}
}
