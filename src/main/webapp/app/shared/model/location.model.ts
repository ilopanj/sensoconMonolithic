import { ISensorDevice } from 'app/shared/model//sensor-device.model';
import { ILoraGateway } from 'app/shared/model//lora-gateway.model';
import { ICompany } from 'app/shared/model//company.model';

export interface ILocation {
    id?: number;
    name?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    sensorDevices?: ISensorDevice[];
    gateways?: ILoraGateway[];
    company?: ICompany;
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
        public gateways?: ILoraGateway[],
        public company?: ICompany
    ) {}
}
