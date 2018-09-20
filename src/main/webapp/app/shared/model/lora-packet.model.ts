import { Moment } from 'moment';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';

export interface ILoraPacket {
    id?: number;
    messageId?: string;
    gatewayId?: string;
    rssi?: number;
    timestamp?: Moment;
    temperatureFarenheit?: number;
    pressurePsi?: number;
    frequency?: number;
    dataRate?: string;
    sensorDevice?: ISensorDevice;
}

export class LoraPacket implements ILoraPacket {
    constructor(
        public id?: number,
        public messageId?: string,
        public gatewayId?: string,
        public rssi?: number,
        public timestamp?: Moment,
        public temperatureFarenheit?: number,
        public pressurePsi?: number,
        public frequency?: number,
        public dataRate?: string,
        public sensorDevice?: ISensorDevice
    ) {}
}
