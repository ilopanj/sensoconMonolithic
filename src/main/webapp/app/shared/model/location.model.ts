import { ISensorDevice } from 'app/shared/model//sensor-device.model';

export interface ILocation {
    id?: number;
    name?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    sensorDevices?: ISensorDevice[];
    companyId?: number;
}

export class Location implements ILocation {
    constructor(
        public id?: number,
        public name?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public sensorDevices?: ISensorDevice[],
        public companyId?: number
    ) {}
}
