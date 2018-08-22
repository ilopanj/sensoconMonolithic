export const enum ThresholdType {
    THRESHOLD_GE = 'THRESHOLD_GE',
    THRESHOLD_LE = 'THRESHOLD_LE',
    THRESHOLD_TIMEOUT = 'THRESHOLD_TIMEOUT',
    THRESHOLD_BATTERY_LEVEL = 'THRESHOLD_BATTERY_LEVEL'
}

export interface ISensorThreshold {
    id?: number;
    type?: ThresholdType;
    value?: number;
}

export class SensorThreshold implements ISensorThreshold {
    constructor(public id?: number, public type?: ThresholdType, public value?: number) {}
}
