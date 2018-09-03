export const enum ThresholdType {
    THRESHOLD_GE = 'THRESHOLD_GE',
    THRESHOLD_LE = 'THRESHOLD_LE',
    THRESHOLD_TIMEOUT = 'THRESHOLD_TIMEOUT',
    THRESHOLD_RSSI = 'THRESHOLD_RSSI',
    THRESHOLD_BATTERY_LEVEL = 'THRESHOLD_BATTERY_LEVEL'
}

export interface ISensorThreshold {
    id?: number;
    type?: ThresholdType;
    value?: number;
    sensorDeviceId?: number;
    sensorId?: number;
    sensorGroupId?: number;
}

export class SensorThreshold implements ISensorThreshold {
    constructor(
        public id?: number,
        public type?: ThresholdType,
        public value?: number,
        public sensorDeviceId?: number,
        public sensorId?: number,
        public sensorGroupId?: number
    ) {}
}
