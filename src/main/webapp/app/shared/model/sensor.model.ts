import { Moment } from 'moment';
import { ISensorThreshold } from 'app/shared/model//sensor-threshold.model';

export const enum SensorStatus {
    STATE_NORMAL = 'STATE_NORMAL',
    STATE_ALERT = 'STATE_ALERT',
    STATE_INACTIVE = 'STATE_INACTIVE'
}

export const enum SensorType {
    PRESSURE = 'PRESSURE',
    TEMPERATURE = 'TEMPERATURE',
    HUMIDITY = 'HUMIDITY',
    ON_OFF = 'ON_OFF'
}

export interface ISensor {
    id?: number;
    name?: string;
    status?: SensorStatus;
    sensorType?: SensorType;
    lastAlert?: Moment;
    sensorGroupId?: number;
    thresholds?: ISensorThreshold[];
    sensorDeviceId?: number;
}

export class Sensor implements ISensor {
    constructor(
        public id?: number,
        public name?: string,
        public status?: SensorStatus,
        public sensorType?: SensorType,
        public lastAlert?: Moment,
        public sensorGroupId?: number,
        public thresholds?: ISensorThreshold[],
        public sensorDeviceId?: number
    ) {}
}
