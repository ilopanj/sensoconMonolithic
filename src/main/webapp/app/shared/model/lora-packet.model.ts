import { Moment } from 'moment';

export interface ILoraPacket {
    id?: number;
    gatewayId?: string;
    rssi?: number;
    timestamp?: Moment;
    temperatureFarenheit?: number;
    pressurePsi?: number;
    sensorDeviceId?: number;
}

export class LoraPacket implements ILoraPacket {
    constructor(
        public id?: number,
        public gatewayId?: string,
        public rssi?: number,
        public timestamp?: Moment,
        public temperatureFarenheit?: number,
        public pressurePsi?: number,
        public sensorDeviceId?: number
    ) {}
}
