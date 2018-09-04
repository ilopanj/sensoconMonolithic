import { ISensorDevice } from 'app/shared/model//sensor-device.model';
import { ISensor } from 'app/shared/model//sensor.model';
import { ISensorGroup } from 'app/shared/model//sensor-group.model';

export const enum ThresholdType {
    THRESHOLD_GE = 'THRESHOLD_GE',
    THRESHOLD_LE = 'THRESHOLD_LE',
    THRESHOLD_TIMEOUT = 'THRESHOLD_TIMEOUT',
    THRESHOLD_RSSI = 'THRESHOLD_RSSI',
    THRESHOLD_BATTERY_LEVEL = 'THRESHOLD_BATTERY_LEVEL'
}

export interface ISensorThreshold {
    id?: number;
    name?: string;
    type?: ThresholdType;
    value?: number;
    sensorDevice?: ISensorDevice;
    sensor?: ISensor;
    sensorGroup?: ISensorGroup;
}

export class SensorThreshold implements ISensorThreshold {
    constructor(
        public id?: number,
        public name?: string,
        public type?: ThresholdType,
        public value?: number,
        public sensorDevice?: ISensorDevice,
        public sensor?: ISensor,
        public sensorGroup?: ISensorGroup
    ) {}
}
