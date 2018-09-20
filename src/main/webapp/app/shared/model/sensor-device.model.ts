import { ISensor } from 'app/shared/model/sensor.model';
import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';
import { ILoraPacket } from 'app/shared/model/lora-packet.model';
import { ILocation } from 'app/shared/model/location.model';
import { INotificationGroup } from 'app/shared/model/notification-group.model';

export interface ISensorDevice {
    id?: number;
    deviceId?: string;
    name?: string;
    sensors?: ISensor[];
    thresholds?: ISensorThreshold[];
    packets?: ILoraPacket[];
    location?: ILocation;
    notificationGroup?: INotificationGroup;
}

export class SensorDevice implements ISensorDevice {
    constructor(
        public id?: number,
        public deviceId?: string,
        public name?: string,
        public sensors?: ISensor[],
        public thresholds?: ISensorThreshold[],
        public packets?: ILoraPacket[],
        public location?: ILocation,
        public notificationGroup?: INotificationGroup
    ) {}
}
