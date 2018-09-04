import { ISensorThreshold } from 'app/shared/model//sensor-threshold.model';
import { ICompany } from 'app/shared/model//company.model';

export const enum SensorType {
    PRESSURE = 'PRESSURE',
    TEMPERATURE = 'TEMPERATURE',
    HUMIDITY = 'HUMIDITY',
    ON_OFF = 'ON_OFF'
}

export interface ISensorGroup {
    id?: number;
    name?: string;
    sensorType?: SensorType;
    defaultThresholds?: ISensorThreshold[];
    company?: ICompany;
}

export class SensorGroup implements ISensorGroup {
    constructor(
        public id?: number,
        public name?: string,
        public sensorType?: SensorType,
        public defaultThresholds?: ISensorThreshold[],
        public company?: ICompany
    ) {}
}
