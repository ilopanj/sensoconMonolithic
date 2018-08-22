import { Moment } from 'moment';

export interface ILoraPacket {
    id?: number;
    rssi?: number;
    batteryLevel?: number;
    timestamp?: Moment;
    temperature?: number;
    pressure?: number;
    sensorDeviceId?: number;
}

export class LoraPacket implements ILoraPacket {
    constructor(
        public id?: number,
        public rssi?: number,
        public batteryLevel?: number,
        public timestamp?: Moment,
        public temperature?: number,
        public pressure?: number,
        public sensorDeviceId?: number
    ) {}
}
